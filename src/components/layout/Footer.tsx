import { Link } from 'react-router-dom';
import { Zap, Facebook, Linkedin, Instagram, Github, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-50 border-t border-slate-100 pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-16">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <Zap size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                Smart<span className="text-primary">Scale</span>Tech
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
              We help businesses and professionals build powerful digital presence and achieve their goals through expert branding and technology.
            </p>
            <div className="flex gap-4">
               {[
                 { Icon: Facebook, url: "https://facebook.com/smartscaletech" },
                 { Icon: Linkedin, url: "https://linkedin.com/company/smartscaletech" },
                 { Icon: Instagram, url: "https://instagram.com/smartscaletech" },
                 { Icon: Github, url: "https://github.com/smartscaletech" },
                 { Icon: MessageCircle, url: "https://whatsapp.com/channel/0029VbCFJRKJJhzXxOaL7g28" }
               ].map((item, i) => (
                 <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all">
                    <item.Icon size={18} />
                 </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'Portfolio', 'Pricing', 'FAQ', 'About Us'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="text-slate-500 text-sm hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
             <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Services</h4>
             <ul className="space-y-4">
               {['Career Branding', 'Web Development', 'Resume Writing', 'LinkedIn Optimization', 'GitHub Optimization'].map(item => (
                 <li key={item}>
                   <a href="#" className="text-slate-500 text-sm hover:text-primary transition-colors">{item}</a>
                 </li>
               ))}
             </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
             <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Contact Us</h4>
             <ul className="space-y-4">
               <li className="flex items-start gap-3">
                  <Mail size={18} className="text-primary mt-0.5" />
                  <span className="text-slate-500 text-sm">smartscaletechforyou@gmail.com</span>
               </li>
               <li className="flex items-start gap-3">
                  <Phone size={18} className="text-primary mt-0.5" />
                  <span className="text-slate-500 text-sm">+91 9000859695</span>
               </li>
               <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-0.5" />
                  <span className="text-slate-500 text-sm">India</span>
               </li>
               <li className="text-xs font-bold text-slate-400 pt-2 uppercase">Mon - Sat: 9:00 AM - 8:00 PM</li>
             </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
           <p className="text-slate-400 text-xs font-medium">
             &copy; {new Date().getFullYear()} SmartScaleTech. All rights reserved.
           </p>
           <div className="flex gap-8">
              <a href="#" className="text-slate-400 text-xs font-medium hover:text-slate-900">Privacy Policy</a>
              <a href="#" className="text-slate-400 text-xs font-medium hover:text-slate-900">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  );
};
