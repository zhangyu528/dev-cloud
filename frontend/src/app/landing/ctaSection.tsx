import React from 'react';
import { IoMdRocket } from 'react-icons/io';
import Button from '@/components/buttons/Button';
import { useRouter } from 'next/navigation';

const CtaSection = () => {
  const router = useRouter();
  return (
    <section id="cta" className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-6">
          Ready to Supercharge Your Development?
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Start your journey with DevCloud and turn your most ambitious projects into reality
        </p>
        <Button 
          variant="secondary" 
          size="lg" 
          className="flex items-center space-x-2 group mx-auto"
          onClick={() => router.push("/login")}
        >
          <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
          <span>Get Started Now</span>
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;