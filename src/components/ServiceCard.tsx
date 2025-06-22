// import { HomeIcon } from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  features,
}: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-l-4 border-orange-500">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-3 rounded-lg">
          <Icon className="text-white" size={24} />
        </div>
        <h3 className="text-xl font-bold ml-4 text-gray-800">{title}</h3>
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard;
export type { ServiceCardProps };
