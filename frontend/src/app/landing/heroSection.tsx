import { motion } from 'framer-motion';
import { IoMdRocket, IoMdFlash } from 'react-icons/io';
import { InteractiveGradientOverlay } from '@/components/InteractiveGradientOverlay';
import BinaryFlow from '@/components/BinaryFlow';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(180deg,transparent,rgba(0,0,0,0.8))]"></div>
      <BinaryFlow />
      <InteractiveGradientOverlay />
      <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-extrabold 
            bg-clip-text text-transparent 
            bg-gradient-to-r
            dark:from-blue-400 dark:to-purple-400"
        >
          Turn Your Dev Ideas into Reality, Faster
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="mt-6 text-xl dark:text-gray-400 max-w-2xl mx-auto"
        >
          Accelerate your development workflow with AI-powered tools and seamless collaboration
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <button 
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-full shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-3 group transition-all duration-300 transform hover:translate-y-[-2px]"
            onClick={() => router.push("/login")}
          >
            <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
            <span className="text-lg">Start Building</span>
          </button>
          <button 
            className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-gray-800 dark:text-gray-200 font-medium rounded-full flex items-center justify-center space-x-3 group transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <IoMdFlash className="w-6 h-6 text-yellow-500 group-hover:animate-pulse" />
            <span className="text-lg">See Features</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
