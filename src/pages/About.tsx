
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Users, Target, Award, Calendar } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">About Godsway Company Limited</h1>
          <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
            A full-service construction and mining support company with deep roots in Ghana's industrial landscape
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who We Are</h2>
              <p className="text-lg text-gray-600 mb-6">
                Godsway Company Limited is a full-service construction and mining support company based in Ghana. 
                We specialize in machine rentals, equipment sales, and comprehensive infrastructure projects that 
                drive Ghana's economic growth.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our expertise spans across multiple sectors, from large-scale mining operations to urban development 
                projects, railway infrastructure, and port expansions. We pride ourselves on delivering reliable 
                solutions that meet the demanding requirements of Ghana's industrial sector.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">20+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">100+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1487887235947-a955ef187fcc?w=600&h=400&fit=crop" 
                alt="Construction equipment"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Calendar className="text-white" size={24} />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900">2004 - Foundation</h3>
                <p className="text-gray-600">Godsway Company Limited was established with a vision to serve Ghana's growing industrial needs.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Users className="text-white" size={24} />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900">2019 - Full Launch</h3>
                <p className="text-gray-600">After our CEO's transition from Epiroc, we fully launched our comprehensive services, bringing decades of international experience to Ghana.</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <Award className="text-white" size={24} />
                </div>
              </div>
              <div className="ml-6">
                <h3 className="text-xl font-semibold text-gray-900">2024 - Industry Leader</h3>
                <p className="text-gray-600">Today, we're recognized as a trusted partner for major mining companies and construction projects across West Africa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Visionary leadership with decades of industry experience
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=300&fit=crop&crop=face" 
                  alt="CEO"
                  className="w-48 h-48 rounded-full mx-auto object-cover"
                />
              </div>
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our CEO's Journey</h3>
                <p className="text-lg text-gray-600 mb-4">
                  With over 20 years in the industry, our CEO started his remarkable journey in 1993 with Atlas Copco. 
                  His progression from technician to international sales leader reflects our company's commitment to 
                  technical excellence and visionary leadership.
                </p>
                <p className="text-lg text-gray-600 mb-4">
                  His extensive experience with global equipment manufacturers, including his tenure at Epiroc, 
                  brings invaluable international perspective and technical depth to every project we undertake.
                </p>
                <p className="text-lg text-gray-600">
                  This wealth of experience ensures that Godsway Company Limited remains at the forefront of 
                  industry innovation and best practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-xl text-yellow-100 max-w-4xl mx-auto">
              To deliver reliable equipment and expert-led construction and mining services across Ghana and West Africa, 
              driving economic growth and industrial development through innovative solutions and unwavering commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Excellence</h3>
              <p className="text-yellow-100">Committed to delivering the highest quality in every project</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Reliability</h3>
              <p className="text-yellow-100">Building lasting partnerships through consistent, dependable service</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
              <p className="text-yellow-100">Embracing cutting-edge technology and industry best practices</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
