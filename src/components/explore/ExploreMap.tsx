import { motion } from 'motion/react';
import { Professional } from '../../types';
import { MapPin, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ExploreMapProps {
  professionals: Professional[];
}

export const ExploreMap = ({ professionals }: ExploreMapProps) => {
  const [activeProfessional, setActiveProfessional] = useState<Professional>(professionals[0] || {} as Professional);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const mapRef = useRef<HTMLDivElement>(null);

  const roles = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Data'];

  const filteredProfessionals = professionals.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || p.role.includes(selectedRole);
    return matchesSearch && matchesRole;
  });

  const cityCoordinates: Record<string, { top: string, left: string }> = {
    'Hyderabad, Telangana': { top: '65%', left: '48%' },
    'Mumbai, Maharashtra': { top: '58%', left: '26%' },
    'Bangalore, Karnataka': { top: '78%', left: '42%' },
    'Delhi, NCR': { top: '28%', left: '45%' },
    'Chennai, Tamil Nadu': { top: '82%', left: '52%' },
    'Pune, Maharashtra': { top: '62%', left: '30%' },
  };

  const getPos = (location: string, id: string) => {
    if (cityCoordinates[location]) return cityCoordinates[location];
    // Default or seed-based fallback for other locations
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      top: `${20 + (seed % 60)}%`,
      left: `${25 + ((seed * 13) % 50)}%`
    };
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
          />
          <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                selectedRole === role 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-blue-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[600px] w-full rounded-[40px] bg-blue-50/50 border border-gray-200 overflow-hidden shadow-inner cursor-grab active:cursor-grabbing" ref={mapRef}>
        {/* Zoomable Container */}
        <motion.div 
          className="relative w-full h-full"
          animate={{ 
            scale: zoom,
            x: position.x,
            y: position.y
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          drag={zoom > 1}
          dragConstraints={mapRef}
          onDragEnd={(_, info) => {
            setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
          }}
        >
          {/* Map Background (Styled SVG) */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg
              viewBox="0 0 500 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-full opacity-30"
            >
              <path
                d="M246,13.6c-4.4,0-8.8,3.3-11.4,7.4c-2.4,3.7-4.8,7.4-7.2,11.1c-2.4,3.7-4.8,11.4-8.8,15.1c-3.1,2.9-7.9,2.9-11.4,5.4c-3.4,2.5-6.8,5.1-10.3,7.6c-3.4,2.6-6.9,5.2-10.4,7.8c-3.5,2.6-7,8.2-10.5,10.8c-2.6,2-6.5,2-9.1,4c-1.8,1.4-3.5,2.9-5.3,4.3c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-1.8,1.4-3.6,2.8-5.4,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-0.6,1.4-1.1,2.8-1.7,4.2c-4.4,11-8.7,21.9-13.1,32.9c-2.7,6.8-5.3,13.6-8,20.4c-2.7,6.8-5.3,13.7-8,20.5c-2.7,6.8-5.3,13.7-8,20.5c-1.3,3.3-2.6,6.6-3.9,9.9c-0.6,1.6-1.3,3.3-1.9,4.9c-0.6,1.6-1.3,3.3-1.9,4.9c-2,5-4.1,10.1-6.1,15.1c-2,5-4.1,10.1-6.1,15.1c-1.4,3.5-2.8,7-4.2,10.5c-2.2,5.2-4.4,10.5-6.6,15.7c-3.1,7.4-6.3,14.8-9.4,22.2c-3.1,7.4-6.3,14.8-9.4,22.2c-0.9,2.2-1.9,4.4-2.8,6.6c0,4.4,3.3,8.8,7.4,11.4c3.7,2.4,7.4,4.8,11.1,7.2c3.7,2.4,11.4,4.8,15.1,8.8c2.9,3.1,2.9,7.9,5.4,11.4c2.5,3.4,5.1,6.8,7.6,10.3c2.6,3.4,5.2,6.9,7.8,10.4c2.6,3.5,8.2,7,10.8,10.5c2,2.6,2,6.5,4,9.1c1.4,1.8,2.9,3.5,4.3,5.3c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,1.8,2.8,3.6,4.2,5.4c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c1.4,0.6,2.8,1.1,4.2,1.7c11,4.4,21.9,8.7,32.9,13.1c6.8,2.7,13.6,5.3,20.4,8c6.8,2.7,13.7,5.3,20.5,8c6.8,2.7,13.7,5.3,20.5,8c3.3,1.3,6.6,2.6,9.9,3.9c0.7,0.3,1.3,0.6,2,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c0.7,0.3,1.4,0.6,2.1,0.9c23.6,9.6,47.3,19.3,70.9,28.9c3.1,1.3,6.3,2.5,9.4,3.8l0.9,4.4l4.4,0.9c3.1,0.6,6.2,1.2,9.3,1.8c3.1,0.6,6.2,1.2,9.3,1.8c3.1,0.6,6.2,1.2,9.3,1.8c0.8,0.2,1.7,0.3,2.5,0.5l4.4,0.9c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c3.6,0.7,7.2,1.4,10.8,2.2c21.8,4.4,43.7,8.7,65.5,13.1c11.1,2.2,22.2,4.4,33.3,6.7c11.1,2.2,22.2,4.4,33.3,6.7c11.1,2.2,22.2,4.4,33.3,6.7c1.7,0.3,3.3,0.7,5,1h1c0-0.7,0-1.3,0-2c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-0.2-2.5-0.3-5-0.5-7.5c-1.1-16.1-2.2-32.3-3.3-48.4c-0.6-8.1-1.1-16.1-1.7-24.2c-0.6-8.1-1.1-16.1-1.7-24.2c-0.6-8.1-1.1-16.1-1.7-24.2c-0.3-4-0.6-8.1-0.9-12.1c-0.2-2-0.3-4-0.5-6.1c-0.2-2-0.3-4-0.5-6.1c-1.2-15.1-2.4-30.3-3.6-45.4c-1.2-15.1-2.4-30.3-3.6-45.4c-0.8-10.6-1.7-21.2-2.5-31.8c-1.3-15.7-2.6-31.5-3.9-47.2c-1.9-22.2-3.7-44.5-5.6-66.7c-1.9-22.2-3.7-44.5-5.6-66.7c-0.5-6.6-1.1-13.1-1.7-19.7c0-4.4-3.3-8.8-7.4-11.4c-3.7-2.4-7.4-4.8-11.1-7.2c-3.7-2.4-11.4-4.8-15.1-8.8c-2.9-3.1-2.9-7.9-5.4-11.4c-2.5-3.4-5.1-6.8-7.6-10.3c-2.6-3.4-5.2-6.9-7.8-10.4c-2.6-3.5-8.2-7-10.8-10.5c-2-2.6-2-6.5-4-9.1c-1.4-1.8-2.9-3.5-4.3-5.3c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-1.8-2.8-3.6-4.2-5.4c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-1.4-0.6-2.8-1.1-4.2-1.7c-11-4.4-21.9-8.7-32.9-13.1c-6.8-2.7-13.6-5.3-20.4-8c-6.8-2.7-13.7-5.3-20.5-8c-6.8-2.7-13.7-5.3-20.5-8c-3.3-1.3-6.6-2.6-9.9-3.9c-1.6-0.6-3.3-1.3-4.9-1.9c-1.6-0.6-3.3-1.3-4.9-1.9c-5-2-10.1-4.1-15.1-6.1c-5-2-10.1-4.1-15.1-6.1c-3.5-1.4-7-2.8-10.5-4.2c-5.2-2.2-10.5-4.4-15.7-6.6c-7.4-3.1-14.8-6.3-22.2-9.4c-7.4-3.1-14.8-6.3-22.2-9.4c-2.2-0.9-4.4-1.9-6.6-2.8c0-4.4-3.3-8.8-7.4-11.4c-3.7-2.4-7.4-4.8-11.1-7.2c-3.7-2.4-11.4-4.8-15.1-8.8c-3.1-2.9-7.9-2.9-11.4-5.4c-3.4-2.5-6.8-5.1-10.3-7.6c-3.4-2.6-6.9-5.2-10.4-7.8c-3.5-2.6-7-8.2-10.5-10.8c-2.6-2-6.5-2-9.1-4c-1.8-1.4-3.5-2.9-5.3-4.3c-1.8-1.4-3.6-2.8-5.4-4.2c-1.8-1.4-3.6-2.8-5.4-4.2c-1.8-1.4-3.6-2.8-5.4-4.2l-0.5,0.5c0,1,0,2.1,0,3.1c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c0.1,2.8,0.2,5.6,0.3,8.4c1.1,31.7,2.2,63.4,3.3,95.1c0.6,15.9,1.1,31.7,1.7,47.6c0.6,15.9,1.1,31.7,1.7,47.6c0.6,15.9,1.1,31.7,1.7,47.6c0.3,7.9,0.6,15.9,0.9,23.8c0.2,4,0.3,7.9,0.5,11.9c0.2,4,0.3,7.9,0.5,11.9c1.2,29.7,2.4,59.4,3.6,89c1.2,29.7,2.4,59.4,3.6,89c0.8,20.8,1.7,41.6,2.5,62.4c1.3,30.8,2.6,61.7,3.9,92.5c1.9,43.6,3.7,87.2,5.6,130.8c1.9,43.6,3.7,87.2,5.6,131l0.5,0.5c4.4,0,8.8-3.3,11.4-7.4c2.4-3.7,4.8-7.4,7.2-11.1c2.4-3.7,4.8-11.4,8.8-15.1c3.1-2.9,7.9-2.9,11.4-5.4c3.4-2.5,6.8-5.1,10.3-7.6c3.4-2.6,6.9-5.2,10.4-7.8c3.5-2.6,7-8.2,10.5-10.8c2.6-2,6.5-2,9.1-4c1.8-1.4,3.5-2.9,5.3-4.3c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c1.8-1.4,3.6-2.8,5.4-4.2c0.6-1.4,1.1-2.8,1.7-4.2c0.6-1.4,1.1-2.8,1.7-4.2"
                fill="#3b82f6"
              />
            </svg>
          </div>

          {/* Grid Lines for that "Map" feel */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ 
            backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} />

          {/* City Labels */}
          <div className="absolute inset-0 pointer-events-none">
            {Object.entries(cityCoordinates).map(([city, coord]) => (
              <motion.div
                key={city}
                style={{ top: coord.top, left: coord.left }}
                animate={{ 
                  opacity: zoom > 1.5 ? 0.8 : 0.4,
                  scale: zoom > 2 ? 1.2 : 1
                }}
                className="absolute -translate-x-1/2 -mt-8 whitespace-nowrap"
              >
                <span className="bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-gray-400 border border-gray-100">
                  {city.split(',')[0]}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Markers */}
          <div className="absolute inset-0">
            {filteredProfessionals.map((prof) => {
              const pos = getPos(prof.location, prof.id);
              return (
                <Marker 
                  key={prof.id}
                  top={pos.top} 
                  left={pos.left}
                  active={activeProfessional.id === prof.id}
                  imageUrl={prof.imageUrl}
                  zoom={zoom}
                  onClick={() => setActiveProfessional(prof)}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Floating Info Card */}
        {activeProfessional.id && (
          <div className="absolute top-6 right-6 z-10">
            <motion.div 
              key={activeProfessional.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-72 bg-white rounded-[32px] p-6 shadow-2xl border border-gray-100"
            >
              <div className="flex gap-4">
                <img 
                  src={activeProfessional.imageUrl} 
                  alt={activeProfessional.name} 
                  className="h-16 w-16 rounded-2xl object-cover ring-4 ring-blue-50 shadow-inner"
                />
                <div>
                  <h4 className="font-bold text-gray-900 leading-tight">{activeProfessional.name}</h4>
                  <p className="text-sm text-gray-500 truncate w-40">{activeProfessional.role}</p>
                  <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-wider">{activeProfessional.experience} EXP</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex flex-wrap gap-1.5">
                {activeProfessional.skills.slice(0, 3).map(s => (
                  <span key={s} className="px-2 py-0.5 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-lg border border-gray-100 uppercase tracking-tighter">{s}</span>
                ))}
                {activeProfessional.skills.length > 3 && (
                  <span className="px-2 py-0.5 bg-gray-50 text-[10px] font-bold text-gray-400 rounded-lg border border-gray-100">+{activeProfessional.skills.length - 3}</span>
                )}
              </div>
              <Link to={`/profile/${activeProfessional.id}`}>
                <button className="w-full mt-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
                  View Full Profile
                </button>
              </Link>
            </motion.div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2">
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-2">
             <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
               <ZoomIn size={20} className="text-gray-600" />
             </button>
             <div className="h-px bg-gray-100 w-full" />
             <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
               <ZoomOut size={20} className="text-gray-600" />
             </button>
             <div className="h-px bg-gray-100 w-full" />
             <button onClick={handleReset} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
               <Maximize size={20} className="text-gray-600" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Marker = ({ top, left, active, imageUrl, zoom, onClick }: any) => (
  <button 
    onClick={onClick}
    style={{ top, left, scale: 1 / Math.sqrt(zoom) }}
    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 z-10"
  >
    <div className={`
      relative h-10 w-10 overflow-hidden rounded-full border-2 bg-white shadow-xl
      ${active ? 'border-blue-600 scale-125 z-20 ring-4 ring-blue-500/20' : 'border-white hover:scale-110'}
    `}>
      <img src={imageUrl} className="h-full w-full object-cover" />
    </div>
    {active && (
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 bg-blue-600 rotate-45" />
    )}
  </button>
);
