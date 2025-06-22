
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EquipmentDetailsModal from '../components/EquipmentDetailsModal';
import QuoteRequestModal from '../components/QuoteRequestModal';
import { Truck, Settings, Calendar, DollarSign } from 'lucide-react';

const Equipment = () => {
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const equipmentCategories = [
    {
      category: "Excavators",
      items: [
        { name: "CAT 320D Excavator", specs: "20-ton class, 1.2m³ bucket", availability: "Available", price: "From $800/day" },
        { name: "Komatsu PC210 Excavator", specs: "21-ton class, versatile operation", availability: "Available", price: "From $850/day" },
        { name: "Volvo EC240B Excavator", specs: "24-ton class, fuel efficient", availability: "Rented", price: "From $900/day" }
      ]
    },
    {
      category: "Roller Compactors",
      items: [
        { name: "BOMAG BW219 Roller", specs: "Single drum, 9-ton", availability: "Available", price: "From $400/day" },
        { name: "Dynapac CA302 Roller", specs: "Double drum, smooth operation", availability: "Available", price: "From $450/day" },
        { name: "Caterpillar CS533E Roller", specs: "Vibratory compactor, 7-ton", availability: "Available", price: "From $500/day" }
      ]
    },
    {
      category: "Concrete Pumps",
      items: [
        { name: "Putzmeister BSF 36", specs: "36m boom, truck-mounted", availability: "Available", price: "From $1200/day" },
        { name: "Schwing S 24 X", specs: "24m reach, flexible operation", availability: "Available", price: "From $1000/day" },
        { name: "CIFA K31 XRZ", specs: "31m boom, precision placement", availability: "Rented", price: "From $1100/day" }
      ]
    },
    {
      category: "Drilling Rigs",
      items: [
        { name: "Atlas Copco FlexiROC T30", specs: "Surface drill rig, versatile", availability: "Available", price: "From $2000/day" },
        { name: "Sandvik DX780", specs: "Down-the-hole drilling", availability: "Available", price: "From $1800/day" },
        { name: "Epiroc SmartROC T35", specs: "Surface top hammer drill", availability: "Available", price: "From $2200/day" }
      ]
    },
    {
      category: "Tipper Trucks",
      items: [
        { name: "MAN TGS 35-ton Tipper", specs: "6x4 configuration, robust", availability: "Available", price: "From $300/day" },
        { name: "Volvo FMX 40-ton Tipper", specs: "8x4, heavy-duty operations", availability: "Available", price: "From $350/day" },
        { name: "Mercedes Arocs 32-ton", specs: "6x4, reliable performance", availability: "Available", price: "From $320/day" }
      ]
    },
    {
      category: "Rock Breakers",
      items: [
        { name: "Atlas Copco HB 3000", specs: "Hydraulic breaker, 3000 kg", availability: "Available", price: "From $600/day" },
        { name: "Sandvik BR 3288", specs: "Heavy-duty breaker", availability: "Available", price: "From $650/day" },
        { name: "Furukawa F35", specs: "High impact energy", availability: "Rented", price: "From $580/day" }
      ]
    }
  ];

  const handleViewDetails = (item: any) => {
    setSelectedEquipment(item);
    setIsDetailsModalOpen(true);
  };

  const handleRequestQuote = (item?: any) => {
    if (item) {
      setSelectedEquipment(item);
    }
    setIsDetailsModalOpen(false);
    setIsQuoteModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailsModalOpen(false);
    setIsQuoteModalOpen(false);
    setSelectedEquipment(null);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Equipment Fleet</h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Modern, well-maintained machinery from world-renowned manufacturers available for rent or purchase
          </p>
        </div>
      </section>

      {/* Equipment Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {equipmentCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{category.category}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg">
                        <Truck className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold ml-3 text-gray-800">{item.name}</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Settings className="text-gray-500 mr-2" size={16} />
                        <span className="text-gray-700 text-sm">{item.specs}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="text-gray-500 mr-2" size={16} />
                        <span className={`text-sm font-semibold ${
                          item.availability === 'Available' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.availability}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="text-gray-500 mr-2" size={16} />
                        <span className="text-orange-600 font-semibold">{item.price}</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex space-x-2">
                      <button 
                        onClick={() => handleRequestQuote(item)}
                        className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-2 px-4 rounded-md hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 text-sm font-semibold"
                      >
                        Request Quote
                      </button>
                      <button 
                        onClick={() => handleViewDetails(item)}
                        className="flex-1 border border-orange-500 text-orange-600 py-2 px-4 rounded-md hover:bg-orange-50 transition-all duration-300 text-sm font-semibold"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive support services with every equipment rental
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Maintenance</h3>
              <p className="text-gray-600">Regular maintenance and servicing included in rental</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Delivery</h3>
              <p className="text-gray-600">Equipment delivery and pickup at your site</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">24/7</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-gray-600">Round-the-clock technical support and assistance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexibility</h3>
              <p className="text-gray-600">Flexible rental terms to suit your project needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">Need Equipment for Your Project?</h2>
          <p className="text-xl text-yellow-100 mb-8">
            Contact our equipment specialists for personalized recommendations and competitive pricing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300">
              Get Equipment Quote
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">
              View Full Catalog
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <EquipmentDetailsModal
        equipment={selectedEquipment}
        isOpen={isDetailsModalOpen}
        onClose={closeModals}
        onRequestQuote={() => handleRequestQuote()}
      />

      <QuoteRequestModal
        equipment={selectedEquipment}
        isOpen={isQuoteModalOpen}
        onClose={closeModals}
      />
    </div>
  );
};

export default Equipment;
