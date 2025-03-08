// components/FeaturesSection.js
import Image from 'next/image';
import { FaCloud, FaUsers, FaLock, FaPuzzlePiece } from 'react-icons/fa';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCloud size={80} className="text-blue-500" />, // Cloud Development Environment icon
      title: 'Cloud Development Environment',
      description: 'Access your development environment anytime, anywhere, without local setup.',
    },
    {
      icon: <FaUsers size={80} className="text-green-500" />, // Real-time Collaboration icon
      title: 'Real-time Collaboration',
      description: 'Collaborate with team members in real-time to enhance development efficiency.',
    },
    {
      icon: <FaLock size={80} className="text-red-500" />, // Enterprise-grade Security icon
      title: 'Enterprise-grade Security',
      description: 'Data encryption and access control ensure your code is safe.',
    },
    {
      icon: <FaPuzzlePiece size={80} className="text-yellow-500" />, // Seamless Integration icon
      title: 'Seamless Integration',
      description: 'Supports mainstream development tools and frameworks for easy integration into existing workflows.',
    },
  ];

  return (
    <section id="features" className="py-12 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className={`text-center p-6 rounded-lg shadow-md bg-gray-700`}> 
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;