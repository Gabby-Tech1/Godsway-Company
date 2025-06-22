
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TrendingUp, MapPin, DollarSign, Users, Pickaxe, BarChart3 } from 'lucide-react';

const MiningInsights = () => {
  const topProducers = [
    {
      company: "Newmont Corporation",
      mine: "Ahafo & Akyem Mines",
      production: "1.2M oz/year",
      location: "Brong-Ahafo & Eastern Region",
      description: "Leading gold producer with modern, sustainable mining operations"
    },
    {
      company: "Gold Fields",
      mine: "Tarkwa & Damang Mines",
      production: "900K oz/year",
      location: "Western Region",
      description: "Major open-pit operations with significant reserves"
    },
    {
      company: "AngloGold Ashanti",
      mine: "Obuasi Mine",
      production: "400K oz/year",
      location: "Ashanti Region",
      description: "Ghana's oldest underground mine, recently modernized"
    },
    {
      company: "Asanko Gold",
      mine: "Asanko Gold Mine",
      production: "200K oz/year",
      location: "Ashanti Region",
      description: "Joint venture operation with growing production"
    }
  ];

  const economicData = [
    { metric: "Gold Production (2023)", value: "3.2M oz", icon: Pickaxe },
    { metric: "Mining GDP Contribution", value: "15.2%", icon: DollarSign },
    { metric: "Mining Employment", value: "200K+", icon: Users },
    { metric: "Export Revenue", value: "$6.8B", icon: TrendingUp }
  ];

  const opportunities = [
    {
      title: "Infrastructure Development",
      description: "Growing demand for mining infrastructure and transportation networks",
      potential: "High"
    },
    {
      title: "Equipment Modernization",
      description: "Mines upgrading to more efficient, environmentally friendly equipment",
      potential: "Very High"
    },
    {
      title: "Technical Services",
      description: "Increasing need for specialized technical consultation and support",
      potential: "High"
    },
    {
      title: "Sustainable Mining",
      description: "Shift towards sustainable practices creating new service opportunities",
      potential: "Growing"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">Ghana Mining Insights</h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            Comprehensive overview of Ghana's mining sector and opportunities for growth
          </p>
        </div>
      </section>

      {/* Economic Impact */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Economic Impact of Mining</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mining plays a crucial role in Ghana's economy, contributing significantly to GDP and employment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {economicData.map((data, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <data.icon className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{data.value}</h3>
                <p className="text-gray-600">{data.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Producers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ghana's Top Gold Producers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Leading mining companies driving Ghana's position as Africa's largest gold producer
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {topProducers.map((producer, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg">
                    <Pickaxe className="text-white" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{producer.company}</h3>
                    <p className="text-gray-600">{producer.mine}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <BarChart3 className="text-orange-500 mr-3" size={16} />
                    <span className="text-gray-700">Production: <strong>{producer.production}</strong></span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="text-orange-500 mr-3" size={16} />
                    <span className="text-gray-700">{producer.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600">{producer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Obuasi Mine Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Obuasi Mine: A Historical Landmark</h2>
              <p className="text-lg text-gray-600 mb-6">
                The Obuasi Mine, owned by AngloGold Ashanti, holds the distinction of being Ghana's oldest 
                underground gold mine. Operating since the late 1800s, it has been a cornerstone of Ghana's 
                mining industry for over a century.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                After a period of redevelopment, the mine has been modernized with state-of-the-art equipment 
                and sustainable mining practices, ensuring its continued contribution to Ghana's economy for 
                generations to come.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">130+</div>
                  <div className="text-gray-600">Years of Operation</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">50M+</div>
                  <div className="text-gray-600">Ounces Produced</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop" 
                alt="Mining operation"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Growth Opportunities */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Growth Opportunities</h2>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Ghana's mining sector continues to evolve, creating new opportunities for service providers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{opportunity.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    opportunity.potential === 'Very High' ? 'bg-green-500 text-white' :
                    opportunity.potential === 'High' ? 'bg-yellow-500 text-black' :
                    'bg-blue-500 text-white'
                  }`}>
                    {opportunity.potential}
                  </span>
                </div>
                <p className="text-yellow-100">{opportunity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Outlook */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Outlook</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Ghana's mining sector is positioned for continued growth, driven by favorable geology, 
              supportive government policies, and increasing global demand for gold and other minerals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Stable Growth</h3>
              <p className="text-gray-600">Consistent production growth with new discoveries and expansions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Attraction</h3>
              <p className="text-gray-600">Continued foreign investment in mining infrastructure and technology</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Pickaxe className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainability Focus</h3>
              <p className="text-gray-600">Increasing emphasis on sustainable and responsible mining practices</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MiningInsights;
