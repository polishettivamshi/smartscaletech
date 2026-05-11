import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl"
            >
              Let's Build India's <span className="text-blue-600">Professional Network</span> Together
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto lg:mx-0"
             motion-initial={{ opacity: 0, y: 20 }}
            >
              Join thousands of professionals across India. Add your profile to the map and discover amazing people around you. 
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start"
            >
              <Link to="/join">
                <Button size="lg" className="h-14 px-8 rounded-full">
                  Join Now — ₹5
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full group">
                  Explore Map
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 lg:justify-start border-t border-gray-100 pt-8"
            >
              <div>
                <p className="text-3xl font-bold text-gray-900">1,248+</p>
                <p className="text-sm text-gray-500">Professionals Joined</p>
              </div>
              <div className="h-10 w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-gray-900">200+</p>
                <p className="text-sm text-gray-500">Cities Covered</p>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Map Visualization */}
          <div className="relative flex-1 w-full max-w-2xl">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-50 p-4 shadow-inner">
               <IndiaMapVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const IndiaMapVisualization = () => {
  // More accurate simplified path for India
  return (
    <div className="relative h-full w-full flex items-center justify-center p-8 bg-blue-50/30 rounded-3xl backdrop-blur-sm border border-blue-100/50 shadow-2xl">
      <svg
        viewBox="0 0 500 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full opacity-40 drop-shadow-md"
      >
        <path
          d="M246,13.6c-4.4,0-8.8,3.3-11.4,7.4c-2.4,3.7-4.8,7.4-7.2,11.1c-2.4,3.7-4.8,11.4-8.8,15.1c-3.1,2.9-7.9,2.9-11.4,5.4c-3.4,2.5-6.8,5.1-10.3,7.6c-3.4,2.6-6.9,5.2-10.4,7.8c-3.5,2.6-7,8.2-10.5,10.8c-2.6,2-6.5,2-9.1,4c-1.8,1.4-3.5,2.9-5.3,4.3c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-4.4,11-8.7,21.9-13.1,32.9c-2.7,6.8-5.3,13.6-8,20.4c-2.7,6.8-5.3,13.7-8,20.5c-2.7,6.8-5.3,13.7-8,20.5c-1.3,3.3-2.6,6.6-3.9,9.9c-0.6,1.6-1.3,3.3-1.9,4.9c-0.6,1.6-1.3,3.3-1.9,4.9c-2,5-4.1,10.1-6.1,15.1c-2,5-4.1,10.1-6.1,15.1c-1.4,3.5-2.8,7-4.2,10.5c-2.2,5.2-4.4,10.5-6.6,15.7c-3.1,7.4-6.3,14.8-9.4,22.2c-3.1,7.4-6.3,14.8-9.4,22.2c-0.9,2.2-1.9,4.4-2.8,6.6c0,4.4,3.3,8.8,7.4,11.4c3.7,2.4,7.4,4.8,11.1,7.2c3.7,2.4,11.4,4.8,15.1,8.8c2.9,3.1,2.9,7.9,5.4,11.4c2.5,3.4,5.1,6.8,7.6,10.3c2.6,3.4,5.2,6.9,7.8,10.4c2.6,3.5,8.2,7,10.8,10.5c2,2.6,2,6.5,4,9.1c1.4,1.8,2.9,3.5,4.3,5.3c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c11,4.4,21.9,8.7,32.9,13.1c6.8,2.7,13.6,5.3,20.4,8c6.8,2.7,13.7,5.3,20.5,8c6.8,2.7,13.7,5.3,20.5,8c3.3,1.3,6.6,2.6,9.9,3.9c0.7,0.3,1.3,0.6,2,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c23.6,9.6,47.3,19.3,70.9,28.9c3.1,1.3,6.3,2.5,9.4,3.8l0.9,4.4l4.4,0.9c3.1,0.6,6.2,1.2,9.3,1.8c3.1,0.6,6.2,1.2,9.3,1.8c3.1,0.6,6.2,1.2,9.3,1.8c0.8,0.2,1.7,0.3,2.5,0.5l4.4,0.9c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c21.8,4.4,43.7,8.7,65.5,13.1c11.1,2.2,22.2,4.4,33.3,6.7c11.1,2.2,22.2,4.4,33.3,6.7c11.1,2.2,22.2,4.4,33.3,6.7c1.7,0.3,3.3,0.7,5,1h1c0-0.7,0-1.3,0-2c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-1.1-16.1-2.2-32.3-3.3-48.4c-0.6-8.1-1.1-16.1-1.7-24.2c-0.6-8.1-1.1-16.1-1.7-24.2c-0.6-8.1-1.1-16.1-1.7-24.2c-0.3-4-0.6-8.1-0.9-12.1c-0.2-2-0.3-4-0.5-6.1c-0.2-2-0.3-4-0.5-6.1c-1.2-15.1-2.4-30.3-3.6-45.4c-1.2-15.1-2.4-30.3-3.6-45.4c-0.8-10.6-1.7-21.2-2.5-31.8c-1.3-15.7-2.6-31.5-3.9-47.2c-1.9-22.2-3.7-44.5-5.6-66.7c-1.9-22.2-3.7-44.5-5.6-66.7c-0.5-6.6-1.1-13.1-1.7-19.7c0-4.4-3.3-8.8-7.4-11.4c-3.7-2.4-7.4-4.8-11.1-7.2c-3.7-2.4-11.4-4.8-15.1-8.8c-2.9-3.1-2.9-7.9-5.4-11.4c-2.5-3.4-5.1-6.8-7.6-10.3c-2.6-3.4-5.2-6.9-7.8-10.4c-2.6-3.5-8.2-7-10.8-10.5c-2-2.6-2-6.5-4-9.1c-1.4-1.8-2.9-3.5-4.3-5.3c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-11-4.4-21.9-8.7-32.9-13.1c-6.8-2.7-13.6-5.3-20.4-8c-6.8-2.7-13.7-5.3-20.5-8c-6.8-2.7-13.7-5.3-20.5-8c-3.3-1.3-6.6-2.6-9.9-3.9c-1.6-0.6-3.3-1.3-4.9-1.9c-1.6-0.6-3.3-1.3-4.9-1.9c-5-2-10.1-4.1-15.1-6.1c-5-2-10.1-4.1-15.1-6.1c-3.5-1.4-7-2.8-10.5-4.2c-5.2-2.2-10.5-4.4-15.7-6.6c-7.4-3.1-14.8-6.3-22.2-9.4c-7.4-3.1-14.8-6.3-22.2-9.4c-2.2-0.9-4.4-1.9-6.6-2.8c0-4.4-3.3-8.8-7.4-11.4c-3.7-2.4-7.4-4.8-11.1-7.2c-3.7-2.4-11.4-4.8-15.1-8.8c-3.1-2.9-7.9-2.9-11.4-5.4c-3.4-2.5-6.8-5.1-10.3-7.6c-3.4-2.6-6.9-5.2-10.4-7.8c-3.5-2.6-7-8.2-10.5-10.8c-2.6-2-6.5-2-9.1-4c-1.8-1.4-3.5-2.9-5.3-4.3c-1.8-1.4-3.6-2.8-5.4-4.2c-1.8-1.4-3.6-2.8-5.4-4.2c-1.8-1.4-3.6-2.8-5.4-4.2l-0.5,0.5c0,1,0,2.1,0,3.1c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c1.1,31.7,2.2,63.4,3.3,95.1c0.6,15.9,1.1,31.7,1.7,47.6c0.6,15.9,1.1,31.7,1.7,47.6c0.6,15.9,1.1,31.7,1.7,47.6c0.3,7.9,0.6,15.9,0.9,23.8c0.2,4,0.3,7.9,0.5,11.9c0.2,4,0.3,7.9,0.5,11.9c1.2,29.7,2.4,59.4,3.6,89c1.2,29.7,2.4,59.4,3.6,89c0.8,20.8,1.7,41.6,2.5,62.4c1.3,30.8,2.6,61.7,3.9,92.5c1.9,43.6,3.7,87.2,5.6,130.8c1.9,43.6,3.7,87.2,5.6,131l0.5,0.5c4.4,0,8.8-3.3,11.4-7.4c2.4-3.7,4.8-7.4,7.2-11.1c2.4-3.7,4.8-11.4,8.8-15.1c3.1-2.9,7.9-2.9,11.4-5.4c3.4-2.5,6.8-5.1,10.3-7.6c3.4-2.6,6.9-5.2,10.4-7.8c3.5-2.6,7-8.2,10.5-10.8c2.6-2,6.5-2,9.1-4c1.8-1.4,3.5-2.9,5.3-4.3c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c0.6-1.4,1.1-2.8,1.7-4.2c0.6-1.4,1.1-2.8,1.7-4.2"
          fill="#3b82f6"
        />
      </svg>
      {/* Markers */}
      <div className="absolute inset-0">
         <ProfileMarker top="20%" left="50%" name="Rahul Verma" />
         <ProfileMarker top="45%" left="65%" name="Sneha Reddy" />
         <ProfileMarker top="60%" left="40%" name="Abhishek M" />
         <ProfileMarker top="30%" left="35%" name="Kiran Kumar" />
         <ProfileMarker top="75%" left="55%" name="Vamshi P" />
      </div>
    </div>
  );
};

const ProfileMarker = ({ top, left, name }: { top: string; left: string; name: string }) => (
  <motion.div 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: Math.random() * 2 }}
    style={{ top, left }}
    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
  >
    <div className="relative">
      <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-blue-100 shadow-lg ring-2 ring-blue-500/20 transition-transform group-hover:scale-110">
        <img 
          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} 
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-900 shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </div>
    </div>
  </motion.div>
);
