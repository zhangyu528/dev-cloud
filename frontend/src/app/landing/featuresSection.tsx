import { motion } from 'framer-motion';
import { FaCloud, FaUsers, FaLock, FaPuzzlePiece } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCloud className="w-10 h-10" />,
      title: 'Cloud Development Environment',
      description: 'Access your development environment anytime, anywhere, without local setup.',
    },
    {
      icon: <FaUsers className="w-10 h-10" />,
      title: 'Real-time Collaboration',
      description: 'Collaborate with team members in real-time to enhance development efficiency.',
    },
    {
      icon: <FaLock className="w-10 h-10" />,
      title: 'Enterprise-grade Security',
      description: 'Data encryption and access control ensure your code is safe.',
    },
    {
      icon: <FaPuzzlePiece className="w-10 h-10" />,
      title: 'Seamless Integration',
      description: 'Supports mainstream development tools and frameworks for easy integration into existing workflows.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Core Features
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-blue-400 mb-6 group-hover:text-green-400 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
