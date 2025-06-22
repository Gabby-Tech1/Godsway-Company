
import { X, Calendar, DollarSign, Settings, Truck } from 'lucide-react';

interface EquipmentDetailsModalProps {
  equipment: {
    name: string;
    specs: string;
    availability: string;
    price: string;
    description?: string;
    features?: string[];
    technicalSpecs?: {
      [key: string]: string;
    };
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
}

const EquipmentDetailsModal = ({ equipment, isOpen, onClose, onRequestQuote }: EquipmentDetailsModalProps) => {
  if (!isOpen || !equipment) return null;

  const defaultDescription = `The ${equipment.name} is a high-performance piece of equipment designed for demanding construction and mining operations. Built with reliability and efficiency in mind, this machine delivers exceptional performance in challenging environments.`;

  const defaultFeatures = [
    "Advanced hydraulic system",
    "Fuel-efficient engine",
    "Ergonomic operator cabin",
    "Heavy-duty construction",
    "Low maintenance requirements",
    "GPS tracking system",
    "Emergency safety features"
  ];

  const defaultTechnicalSpecs = {
    "Operating Weight": "Available on request",
    "Engine Power": "Available on request",
    "Fuel Tank Capacity": "Available on request",
    "Maximum Reach": "Available on request",
    "Travel Speed": "Available on request",
    "Hydraulic Flow": "Available on request"
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg mr-4">
              <Truck className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{equipment.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Settings className="text-orange-500 mr-3" size={20} />
              <div>
                <p className="text-sm text-gray-600">Specifications</p>
                <p className="font-semibold">{equipment.specs}</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Calendar className="text-orange-500 mr-3" size={20} />
              <div>
                <p className="text-sm text-gray-600">Availability</p>
                <p className={`font-semibold ${
                  equipment.availability === 'Available' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {equipment.availability}
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <DollarSign className="text-orange-500 mr-3" size={20} />
              <div>
                <p className="text-sm text-gray-600">Pricing</p>
                <p className="font-semibold text-orange-600">{equipment.price}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {equipment.description || defaultDescription}
            </p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {(equipment.features || defaultFeatures).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Technical Specifications</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(equipment.technicalSpecs || defaultTechnicalSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onRequestQuote}
              className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 font-semibold"
            >
              Request Quote
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-orange-500 text-orange-600 py-3 px-6 rounded-lg hover:bg-orange-50 transition-all duration-300 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetailsModal;
