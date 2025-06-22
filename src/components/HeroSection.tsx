import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=1920&h=1080&fit=crop"
        >
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          {/* Fallback image if video doesn't load */}
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-transparent opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="text-yellow-400">Godsway</span>
          <br />
          <span className="text-white">Company Limited</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto animate-fade-in">
          <span className="text-yellow-400 font-semibold">Construction</span> •
          <span className="text-orange-400 font-semibold mx-2">
            Machine Rentals
          </span>{" "}
          •<span className="text-yellow-400 font-semibold">Mining Support</span>
        </p>

        <p className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto animate-fade-in">
          Trusted since 2004 — With deep roots in Ghana's construction and
          mining industries, we deliver reliable equipment and expert-led
          services across West Africa.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link
            to="/services"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
          >
            Explore Our Services
            <ArrowRight className="ml-2" size={20} />
          </Link>

          <Link
            to="/contact"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Contact Us Today
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
