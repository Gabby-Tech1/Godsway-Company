
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Wrench, Truck, Building2, Pickaxe, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const services = [
    {
      icon: Truck,
      title: "Machine Rentals",
      description: "Reliable construction and mining machinery for hire",
      features: ["Excavators & Bulldozers", "24/7 Support", "Competitive Rates", "Maintenance Included"]
    },
    {
      icon: Building2,
      title: "Construction",
      description: "Comprehensive infrastructure and development projects",
      features: ["Road Construction", "Urban Development", "Port Expansion", "Railway Infrastructure"]
    },
    {
      icon: Pickaxe,
      title: "Mining Support",
      description: "Equipment and consultation for mining operations",
      features: ["Equipment Supply", "Technical Consultation", "Large-scale Projects", "Safety Compliance"]
    },
    {
      icon: Wrench,
      title: "Equipment Sales",
      description: "High-quality machinery from top manufacturers",
      features: ["New & Used Equipment", "Financing Options", "Warranty Support", "Training Included"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* About Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted Since <span className="text-orange-500">2004</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With deep roots in Ghana's construction and mining industries, we've grown into a trusted name 
              delivering reliable equipment and expert-led services across West Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">20+ Years Experience</h3>
              <p className="text-gray-600">Our CEO's journey from Atlas Copco to Epiroc brings unmatched expertise</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Major Projects</h3>
              <p className="text-gray-600">From railway infrastructure to mining equipment for Newmont</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pickaxe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry Leader</h3>
              <p className="text-gray-600">Serving Ghana's top mining companies and construction projects</p>
            </div>
          </div>

          <div className="text-center">
            <Link 
              to="/about"
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
            >
              Learn More About Us
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive construction and mining solutions tailored to your project needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/services"
              className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all duration-300"
            >
              View All Services
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl text-yellow-100 mb-8">
            Get in touch with our expert team for a consultation on your construction or mining needs
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Contact Us Today
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
