
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Truck, Building2, Pickaxe, Wrench, Users, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Truck,
      title: "Machine Rentals",
      description: "Comprehensive fleet of construction and mining machinery available for short-term and long-term rentals",
      features: [
        "Excavators & Bulldozers",
        "Roller Compactors",
        "Concrete Pumps", 
        "Drilling Rigs",
        "Tipper Trucks",
        "Rock Breakers",
        "24/7 Technical Support",
        "Maintenance Included",
        "Competitive Pricing",
        "Flexible Rental Terms"
      ]
    },
    {
      icon: Wrench,
      title: "Machine Sales",
      description: "High-quality construction and mining equipment from world-renowned manufacturers",
      features: [
        "New Equipment Sales",
        "Certified Used Machinery",
        "Equipment Financing Options",
        "Comprehensive Warranties",
        "Technical Training Programs",
        "Parts & Service Support",
        "Trade-in Programs",
        "Equipment Customization"
      ]
    },
    {
      icon: Building2,
      title: "Construction Services",
      description: "Full-scale construction and infrastructure development projects across Ghana",
      features: [
        "Road Construction & Rehabilitation",
        "Railway Infrastructure Development",
        "Urban High-Rise Developments",
        "Port Expansion Projects",
        "Bridge Construction",
        "Industrial Facilities",
        "Project Management",
        "Quality Assurance"
      ]
    },
    {
      icon: Pickaxe,
      title: "Mining Support",
      description: "Specialized equipment supply and technical consultation for mining operations",
      features: [
        "Mining Equipment Supply",
        "Technical Consultation Services",
        "Safety Compliance Solutions",
        "Equipment Maintenance",
        "Operational Optimization",
        "Training & Certification",
        "Emergency Support Services",
        "Sustainability Solutions"
      ]
    },
    {
      icon: Users,
      title: "Technical Consultation",
      description: "Expert advisory services leveraging decades of international industry experience",
      features: [
        "Project Planning & Design",
        "Equipment Selection Guidance",
        "Operational Efficiency Analysis",
        "Safety Protocol Development",
        "Cost Optimization Strategies",
        "Technology Implementation",
        "Staff Training Programs",
        "Compliance & Regulatory Support"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Comprehensive construction and mining solutions tailored to drive Ghana's industrial growth
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg">
                    <service.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold ml-4 text-gray-800">{service.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 text-lg">{service.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <CheckCircle className="text-orange-500 mr-3 flex-shrink-0" size={16} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Godsway Company Limited?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence and decades of experience set us apart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">20+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
              <p className="text-gray-600">Two decades of industry expertise and international knowledge</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-gray-600">Rigorous quality control and international safety standards</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-gray-600">Highly skilled professionals with global industry experience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock technical support and maintenance services</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
