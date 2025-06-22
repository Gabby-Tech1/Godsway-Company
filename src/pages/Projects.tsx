
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Users } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "Railway Infrastructure Development",
      partner: "Afcons Infrastructure",
      location: "Ghana National Railway Network",
      year: "2022-2024",
      description: "Major railway infrastructure development project enhancing Ghana's transportation network",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
      scope: ["Track laying equipment", "Heavy machinery rental", "Technical consultation", "Project management support"]
    },
    {
      title: "Takoradi-Tarkwa Road Construction",
      partner: "Gabriel Couto Construction",
      location: "Western Region, Ghana",
      year: "2021-2023",
      description: "Critical road infrastructure connecting major mining and commercial centers",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=600&h=400&fit=crop",
      scope: ["Road construction equipment", "Roller compactors", "Excavators and bulldozers", "Quality assurance"]
    },
    {
      title: "Newmont Ahafo Mining Equipment Supply",
      partner: "Newmont Corporation",
      location: "Ahafo Mine, Ghana",
      year: "2020-Present",
      description: "Comprehensive equipment supply and support for one of Ghana's largest gold mines",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop",
      scope: ["Mining equipment supply", "Maintenance services", "Technical training", "Safety compliance"]
    },
    {
      title: "Port Expansion Project",
      partner: "Eiffage Construction",
      location: "Tema Port, Ghana",
      year: "2019-2022",
      description: "Major port infrastructure expansion to enhance Ghana's maritime trade capacity",
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&h=400&fit=crop",
      scope: ["Marine construction equipment", "Heavy lifting machinery", "Concrete pumps", "Logistics support"]
    },
    {
      title: "Urban High-Rise Development",
      partner: "Multiple Developers",
      location: "Accra & Kumasi",
      year: "2018-2024",
      description: "Supporting Ghana's urban development with modern high-rise construction projects",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      scope: ["Tower cranes", "Concrete pumps", "Construction equipment", "Technical consultation"]
    },
    {
      title: "Quarry Operations & Demolition",
      partner: "Various Mining Companies",
      location: "Multiple Sites Across Ghana",
      year: "2017-Present",
      description: "Quarry drilling operations and controlled demolition services",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop",
      scope: ["Drilling equipment", "Rock breakers", "Demolition services", "Site preparation"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Our Projects</h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Showcasing our major achievements and contributions to Ghana's infrastructure development
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {project.year}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <Users className="mr-2" size={16} />
                    <span className="text-sm">Partner: {project.partner}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="mr-2" size={16} />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Project Scope:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {project.scope.map((item, scopeIndex) => (
                        <div key={scopeIndex} className="flex items-center">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Project Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our projects have significantly contributed to Ghana's infrastructure and economic development
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">100+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Projects Completed</h3>
              <p className="text-gray-600">Successful delivery across multiple sectors</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">50+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Partners</h3>
              <p className="text-gray-600">Trusted collaborations with industry leaders</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">500M+</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Project Value (USD)</h3>
              <p className="text-gray-600">Combined value of major infrastructure projects</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">10</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Regions Served</h3>
              <p className="text-gray-600">Nationwide coverage across Ghana</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
