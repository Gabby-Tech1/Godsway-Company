
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-yellow-400">Godsway</span>
                <span className="text-orange-400 ml-2">Company Ltd</span>
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Trusted construction and mining support company in Ghana since 2004. 
              Specializing in machine rentals, equipment sales, and comprehensive infrastructure projects.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                <Linkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-orange-400 transition-colors">About</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-orange-400 transition-colors">Services</Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-orange-400 transition-colors">Projects</Link></li>
              <li><Link to="/equipment" className="text-gray-300 hover:text-orange-400 transition-colors">Equipment</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin size={16} className="text-orange-400 mr-2" />
                <span className="text-gray-300 text-sm">Accra, Ghana</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="text-orange-400 mr-2" />
                <span className="text-gray-300 text-sm">+233 XX XXX XXXX</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="text-orange-400 mr-2" />
                <span className="text-gray-300 text-sm">info@godswaycompany.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Godsway Company Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
