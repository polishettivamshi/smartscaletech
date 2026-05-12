import { motion } from 'motion/react';

const logos = [
  // "https://upload.wikimedia.org/wikipedia/commons/b/b1/Google_Name.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
];

export const TrustedBy = () => {
  return (
    <div className="py-12 border-y border-slate-100 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 text-center mb-8">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Trusted by innovators at</p>
      </div>
      <div className="flex relative items-center">
        <div className="flex animate-marquee gap-20 items-center justify-around min-w-full">
          {logos.concat(logos).map((logo, i) => (
            <img 
              key={i} 
              src={logo} 
              alt="Logo" 
              className="h-6 sm:h-8 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
            />
          ))}
        </div>
      </div>
    </div>
  );
};
