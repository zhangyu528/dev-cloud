import { motion } from 'framer-motion';
import { IoMdRocket, IoMdFlash } from 'react-icons/io';
import Button from '@/components/buttons/Button';
import { InteractiveGradientOverlay } from '@/components/InteractiveGradientOverlay';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const router = useRouter();
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-24">
      <InteractiveGradientOverlay />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
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
          className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button 
            variant="primary" 
            size="lg" 
            className="w-full sm:w-auto flex items-center justify-center space-x-2 group"
            onClick={() => router.push("/login")}
          >
            <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
            <span>Start Building</span>
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            className="w-full sm:w-auto flex items-center justify-center space-x-2 group"
            onClick={() => {
              const featuresSection = document.getElementById('features');
              featuresSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <IoMdFlash className="w-6 h-6 group-hover:text-yellow-500" />
            <span>See Features</span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;