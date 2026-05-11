import { useParams, Link } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Professional } from '../../types';
import { mockProfessionals } from '../../data/mockProfessionals';
import { Button } from '../ui/Button';
import { MapPin, Linkedin, Twitter, Link as LinkIcon, Edit3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const ProfileView = () => {
  const { id } = useParams();
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);

  const cityCoordinates: Record<string, { top: string, left: string }> = {
    'Hyderabad, Telangana': { top: '65%', left: '48%' },
    'Mumbai, Maharashtra': { top: '58%', left: '26%' },
    'Bangalore, Karnataka': { top: '78%', left: '42%' },
    'Delhi, NCR': { top: '28%', left: '45%' },
    'Chennai, Tamil Nadu': { top: '82%', left: '52%' },
    'Pune, Maharashtra': { top: '62%', left: '30%' },
  };

  const getPos = (location?: string) => {
    if (location && cityCoordinates[location]) return cityCoordinates[location];
    return { top: '50%', left: '50%' };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'professionals', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfessional({ ...docSnap.data(), id: docSnap.id } as Professional);
        } else {
          // Fallback to mock data for demo purposes if not found in DB
          const mock = mockProfessionals.find(p => p.id === id);
          setProfessional(mock || mockProfessionals[0]);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setProfessional(mockProfessionals[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!professional) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Profile Info */}
        <div className="flex-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row items-start gap-8"
          >
            <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-3xl border-4 border-gray-50 shadow-inner bg-slate-50">
              <img 
                src={professional.imageUrl} 
                alt={professional.name}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col">
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight">{professional.name}</h1>
                  <span className={`mt-2 inline-flex w-fit px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                    professional.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {professional.status || 'Review'}
                  </span>
                </div>
                <Link to="/join">
                  <Button variant="outline" size="sm">
                    <Edit3 size={16} className="mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
              <p className="text-xl font-medium text-gray-600 mt-1">{professional.role}</p>
              
              <div className="flex flex-wrap items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={18} className="text-blue-500" />
                  <span className="font-semibold">{professional.location}</span>
                </div>
                {professional.linkedinUrl && (
                  <Link to={professional.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 font-medium hover:underline">
                    <Linkedin size={18} />
                    <span>View LinkedIn</span>
                  </Link>
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {professional.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 font-bold rounded-lg text-xs uppercase tracking-wide border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-gray-600 leading-relaxed max-w-2xl">
                  {professional.bio || `Passionate ${professional.role.toLowerCase()} with a focus on building exceptional digital experiences. Representative professional contributing to the growing Indian tech ecosystem from ${professional.location.split(',')[0]}.`}
                </p>
              </div>

              {professional.status === 'review' && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-3xl">
                  <h4 className="font-bold text-blue-900">Verification Pending</h4>
                  <p className="text-sm text-blue-700 mt-1">Your profile is currently under review by our community moderators. You'll appear on the map once verified.</p>
                  <Link to="/join">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-200">
                      Update Details
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Connect & Share</h3>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#0A66C2] text-white hover:bg-[#004182]">
                <Linkedin size={18} className="mr-2 fill-white" />
                Share on LinkedIn
              </Button>
              <Button className="bg-[#1DA1F2] text-white hover:bg-[#0c85d0]">
                <Twitter size={18} className="mr-2 fill-white" />
                Share on Twitter
              </Button>
              <Button variant="outline" onClick={() => navigator.clipboard.writeText(window.location.href)}>
                <LinkIcon size={18} className="mr-2" />
                Copy Link
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side - Small Map Visualization */}
        <div className="w-full lg:w-[400px] space-y-8">
           <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 overflow-hidden">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Location Mapping</h3>
            <div className="aspect-square bg-slate-50 rounded-2xl relative flex items-center justify-center p-8 overflow-hidden border border-gray-100 shadow-inner">
              <svg viewBox="0 0 500 600" className="opacity-10 h-full w-full">
                <path d="M246,13.6c-4.4,0-8.8,3.3-11.4,7.4c-2.4,3.7-4.8,7.4-7.2,11.1c-2.4,3.7-4.8,11.4-8.8,15.1c-3.1,2.9-7.9,2.9-11.4,5.4c-3.4,2.5-6.8,5.1-10.3,7.6" fill="#2563eb" />
              </svg>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={getPos(professional.location)}
                className="absolute h-10 w-10 bg-white rounded-full border-2 border-blue-600 shadow-lg flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              >
                <img src={professional.imageUrl} className="h-full w-full object-cover" />
              </motion.div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Community Match</h3>
              <p className="text-blue-100 text-sm leading-relaxed">Based on your skills in {professional.skills[0]}, we've found someone you might want to collaborate with.</p>
              <div className="mt-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=match" alt="Match" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">Potential Peer</p>
                    <p className="text-xs text-blue-200">Full Stack Engineer</p>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-white text-blue-600 hover:bg-blue-50 border-none font-bold text-xs" size="sm">
                  View Match Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
