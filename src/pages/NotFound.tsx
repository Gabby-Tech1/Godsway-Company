import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[100svh] place-items-center py-32 text-center">
      <div>
        <p className="label mb-6 text-gold">Error 404</p>
        <h1 className="display text-[26vw] text-molten md:text-[16rem]">404</h1>
        <p className="mx-auto mt-6 max-w-md text-xl text-bone-muted">We dug deep, but this page isn't here.</p>
        <Link to="/" className="btn-gold mt-10">
          <ArrowLeft size={16} /> Back to the surface
        </Link>
      </div>
    </section>
  );
}
