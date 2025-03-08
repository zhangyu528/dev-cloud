import { motion } from 'framer-motion';
import { FaRocket, FaUsers, FaShieldAlt, FaPlug } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.5
    }
  }
};

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Increased Productivity",
      description: "Dev Cloud provides a seamless development environment that allows developers to focus on coding without worrying about local setup."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Real-time Collaboration",
      description: "Collaborate with team members in real-time, making it easier to share ideas and solve problems together."
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Enhanced Security",
      description: "With enterprise-grade security measures, Dev Cloud ensures that your code and data are protected."
    },
    {
      icon: <FaPlug className="w-8 h-8" />,
      title: "Seamless Integration",
      description: "Easily integrate with popular development tools and frameworks, allowing for a smooth workflow."
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose DevCloud?
        </motion.h2>
        
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-start mb-16 last:mb-0 gap-8"
              variants={itemVariants}
            >
              {/* Icon with hover animation */}
              <motion.div 
                className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center border-2 border-green-400 relative z-10 cursor-pointer shrink-0"
                whileHover="hover"
                variants={itemVariants}
              >
                <div className="text-green-400">
                  {benefit.icon}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 hover:opacity-20 transition-opacity duration-300" />
              </motion.div>

              {/* Content with fade-in animation */}
              <motion.div 
                className="flex-1"
                variants={contentVariants}
              >
                <h3 className="text-2xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
