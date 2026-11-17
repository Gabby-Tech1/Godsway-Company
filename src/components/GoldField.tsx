import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * One particle system, two shapes.
 *   progress 0      a faceted lump of gold ore, slowly turning
 *   progress ~0.3   it bursts into dust
 *   progress 1      the dust settles into a terraced open-pit mine,
 *                   brightest at the bottom where the gold is
 * Particles push away from the cursor. Colours and blending follow the theme.
 */

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform mat3 uOreRot;
  uniform vec3 uOreOffset;
  uniform vec3 uMouse;
  uniform float uMouseStrength;
  attribute vec3 aTarget;
  attribute vec3 aDir;
  attribute float aSeed;
  attribute float aBright;
  attribute float aGlow;
  varying float vBright;
  varying float vAlpha;

  void main() {
    vec3 ore = uOreRot * position + uOreOffset;
    ore += aDir * 0.012 * sin(uTime * 1.6 + aSeed * 40.0);

    float e = smoothstep(0.0, 0.36, uProgress);
    float m = smoothstep(0.26 + aSeed * 0.3, 0.68 + aSeed * 0.3, uProgress);

    vec3 burst = ore + aDir * e * (1.4 + aSeed * 4.5);
    float a = e * (1.0 - m) * (aSeed - 0.5) * 3.0;
    burst.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * burst.xz;

    vec3 p = mix(burst, aTarget, m);
    p.y += m * 0.025 * sin(uTime * 1.3 + aTarget.x * 2.5 + aTarget.z * 2.0);

    vec3 d = p - uMouse;
    float dist = length(d);
    p += normalize(d + 1e-4) * smoothstep(1.2, 0.0, dist) * 0.5 * uMouseStrength;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.5 + aSeed) / -mv.z;

    vBright = mix(aBright, aGlow, m);
    vAlpha = 1.0 - e * (1.0 - m) * 0.55;
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uGold;
  uniform vec3 uHot;
  uniform float uOpacity;
  varying float vBright;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.05, d);
    vec3 c = mix(uDeep, uGold, smoothstep(0.0, 0.55, vBright));
    c = mix(c, uHot, smoothstep(0.72, 1.0, vBright));
    gl_FragColor = vec4(c, soft * vAlpha * uOpacity * (0.28 + vBright * 0.72));
  }
`;

const palettes = {
  dark: { deep: "#5a3a0c", gold: "#e2aa40", hot: "#fff3cf", opacity: 1, blending: THREE.AdditiveBlending, dust: "#b88a3a" },
  light: { deep: "#c08a34", gold: "#8f5606", hot: "#3d2200", opacity: 1.7, blending: THREE.NormalBlending, dust: "#8a6a3a" },
};

// Seeded random so the rock and pit are identical on every visit.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

function build(count: number) {
  const rand = rng(11);
  const facets = Array.from({ length: 14 }, () => ({
    n: new THREE.Vector3(rand() * 2 - 1, rand() * 2 - 1, rand() * 2 - 1).normalize(),
    c: 0.95 + rand() * 0.4,
  }));
  const rockRadius = (d: THREE.Vector3) => {
    let r = 1.6;
    r += 0.22 * Math.sin(d.x * 2.1 + 0.5) * Math.cos(d.y * 2.7 - 0.3);
    r += 0.14 * Math.sin(d.z * 3.4 + d.x * 1.7);
    r += 0.05 * Math.sin(d.x * 9 + d.y * 7);
    for (const f of facets) {
      const k = d.dot(f.n);
      if (k > 0.05) r = Math.min(r, f.c / k);
    }
    return r;
  };

  const pos = new Float32Array(count * 3);
  const target = new Float32Array(count * 3);
  const dir = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const bright = new Float32Array(count);
  const glow = new Float32Array(count);

  const light = new THREE.Vector3(-0.5, 0.75, 0.6).normalize();
  const vein = new THREE.Vector3(3, 5, 2);
  const v = new THREE.Vector3();

  const R = 3.1;
  const benches = 8;
  const depth = 1.9;
  const pitY = -1.1;

  for (let i = 0; i < count; i++) {
    // ---- ore (local space) ----
    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    v.set(s * Math.cos(t), u, s * Math.sin(t));
    const surface = Math.random() < 0.78;
    const r = rockRadius(v) * (surface ? 1 : 0.3 + Math.random() * 0.65);
    pos[i * 3] = v.x * r * 1.1;
    pos[i * 3 + 1] = v.y * r * 0.92;
    pos[i * 3 + 2] = v.z * r;

    const j = 0.7;
    const dx = v.x + (Math.random() - 0.5) * j;
    const dy = v.y + (Math.random() - 0.5) * j + 0.25;
    const dz = v.z + (Math.random() - 0.5) * j;
    const len = Math.hypot(dx, dy, dz) || 1;
    dir[i * 3] = dx / len;
    dir[i * 3 + 1] = dy / len;
    dir[i * 3 + 2] = dz / len;

    seed[i] = Math.random();
    const lit = Math.pow(Math.max(0, v.dot(light) * 0.5 + 0.5), 1.6);
    const isVein = Math.abs(Math.sin(v.dot(vein) * 2.2)) > 0.93 ? 0.55 : 0;
    bright[i] = Math.min(1, (surface ? lit : lit * 0.35) + isVein + Math.random() * 0.18);

    // ---- open pit (world space) ----
    const theta = Math.random() * Math.PI * 2;
    const k = Math.random();
    let x: number, y: number, z: number, g: number;
    if (k < 0.84) {
      // inside the pit; 45% of these hug bench edges to draw contour lines
      let tr: number;
      if (k < 0.38) {
        const lvl = Math.floor(Math.random() * benches);
        tr = 1 - (lvl + 0.86 + Math.random() * 0.06) / benches;
      } else {
        tr = Math.sqrt(Math.random());
      }
      const sDepth = (1 - tr) * benches;
      const lvl = Math.floor(sDepth);
      const f = sDepth - lvl;
      const h = -((lvl + THREE.MathUtils.smoothstep(f, 0.8, 1)) / benches) * depth;
      const wob = 1 + 0.06 * Math.sin(theta * 3 + 1) + 0.04 * Math.sin(theta * 7);
      x = Math.cos(theta) * tr * R * 1.3 * wob;
      z = Math.sin(theta) * tr * R * 0.85 * wob;
      y = pitY + h;
      const deep = -h / depth;
      const edge = f > 0.8 ? 0.35 : 0;
      g = Math.min(1, deep * deep * 0.95 + edge + Math.random() * 0.12);
    } else {
      // surrounding ground, thinning out
      const tr = 1 + Math.pow(Math.random(), 1.6) * 0.9;
      x = Math.cos(theta) * tr * R * 1.3;
      z = Math.sin(theta) * tr * R * 0.85;
      y = pitY + (Math.random() - 0.5) * 0.05;
      g = 0.08 + Math.random() * 0.15;
    }
    target[i * 3] = x;
    target[i * 3 + 1] = y;
    target[i * 3 + 2] = z;
    glow[i] = g;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aTarget", new THREE.BufferAttribute(target, 3));
  geo.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  geo.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));
  geo.setAttribute("aGlow", new THREE.BufferAttribute(glow, 1));
  geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
  return geo;
}

export default function GoldField({ progress, className }: { progress: MutableRefObject<number>; className?: string }) {
  const mount = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mount.current;
    if (!el) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);

    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: small ? 34 : 30 },
      uPixelRatio: { value: dpr },
      uOreRot: { value: new THREE.Matrix3() },
      uOreOffset: { value: new THREE.Vector3() },
      uMouse: { value: new THREE.Vector3(99, 99, 99) },
      uMouseStrength: { value: 0 },
      uDeep: { value: new THREE.Color() },
      uGold: { value: new THREE.Color() },
      uHot: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    };

    const geo = build(small ? 10000 : 26000);
    const mat = new THREE.ShaderMaterial({ vertexShader: vertex, fragmentShader: fragment, uniforms, transparent: true, depthWrite: false });
    scene.add(new THREE.Points(geo, mat));

    // ambient dust
    const dustCount = small ? 500 : 1400;
    const dpos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dpos[i * 3] = (Math.random() - 0.5) * 24;
      dpos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      dpos[i * 3 + 2] = -Math.random() * 10 + 2;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.022, transparent: true, opacity: 0.5, depthWrite: false });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    const applyTheme = () => {
      const isLight = document.documentElement.dataset.theme === "light";
      const p = palettes[isLight ? "light" : "dark"];
      // Light mode: feed sRGB values straight to the shader (no linear
      // conversion) so mid-tone bronzes stay rich on paper.
      const put = (c: THREE.Color, hex: string) =>
        isLight ? c.setHex(parseInt(hex.slice(1), 16), THREE.LinearSRGBColorSpace) : c.set(hex);
      put(uniforms.uDeep.value, p.deep);
      put(uniforms.uGold.value, p.gold);
      put(uniforms.uHot.value, p.hot);
      uniforms.uOpacity.value = p.opacity;
      mat.blending = p.blending;
      mat.needsUpdate = true;
      dustMat.color.set(p.dust);
      dustMat.blending = p.blending;
      dustMat.needsUpdate = true;
    };
    applyTheme();
    window.addEventListener("themechange", applyTheme);

    let wide = true;
    let fit = 1;
    const layout = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      wide = camera.aspect > 1.1;
      fit = wide ? 1 : Math.max(1, 1.25 / camera.aspect);
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(el);

    // pointer → world point on a plane facing the camera
    const ndc = new THREE.Vector2(9, 9);
    let pointerActive = false;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      pointerActive = true;
    };
    const onLeave = () => (pointerActive = false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane();
    const hit = new THREE.Vector3();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const rot = new THREE.Euler();
    const m4 = new THREE.Matrix4();
    const camFrom = new THREE.Vector3();
    const camTo = new THREE.Vector3();
    const look = new THREE.Vector3();
    const tilt = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let spin = 0;
    let raf = 0;
    let shown = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;
      uniforms.uTime.value = t;

      const target = progress.current;
      shown += (target - shown) * (1 - Math.exp(-dt * 4.5));
      uniforms.uProgress.value = shown;

      // ore transform
      tilt.x += ((pointerActive ? ndc.x : 0) - tilt.x) * 0.04;
      tilt.y += ((pointerActive ? ndc.y : 0) - tilt.y) * 0.04;
      spin += dt * (reduced ? 0 : 0.14 + shown * 0.6);
      rot.set(0.35 - tilt.y * 0.2, -0.6 + spin + tilt.x * 0.35, 0.12);
      m4.makeRotationFromEuler(rot);
      uniforms.uOreRot.value.setFromMatrix4(m4);
      uniforms.uOreOffset.value.set(wide ? 1.9 : 0, wide ? 0.05 : 1.15, 0);
      const s = wide ? 1 : Math.min(0.85, camera.aspect * 1.1);
      uniforms.uOreRot.value.multiplyScalar(s);

      // camera glides from facing the ore to looking down into the pit
      const c = THREE.MathUtils.smoothstep(shown, 0.25, 1);
      camFrom.set(0, 0, 8);
      camTo.set(0, 4.3 * fit, 6.6 * fit);
      camera.position.lerpVectors(camFrom, camTo, c);
      camera.position.x += tilt.x * 0.4 * c;
      look.set(0, -1.15 * c, 0);
      camera.lookAt(look);

      // cursor repulsion: plane through the ore, or the pit floor
      if (pointerActive && !reduced) {
        ray.setFromCamera(ndc, camera);
        if (c < 0.5) plane.set(new THREE.Vector3(0, 0, 1), 0);
        else plane.set(new THREE.Vector3(0, 1, 0), 1.6);
        if (ray.ray.intersectPlane(plane, hit)) uniforms.uMouse.value.lerp(hit, 0.2);
        uniforms.uMouseStrength.value += (1 - uniforms.uMouseStrength.value) * 0.08;
      } else {
        uniforms.uMouseStrength.value *= 0.92;
      }

      dust.rotation.y = t * 0.01;
      dust.position.y = Math.sin(t * 0.2) * 0.1 + c * 1.5;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("themechange", applyTheme);
      geo.dispose();
      mat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [progress]);

  return <div ref={mount} className={className} aria-hidden />;
}
