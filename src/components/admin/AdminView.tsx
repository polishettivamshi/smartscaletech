import { useState, useEffect } from 'react';
import { db, auth } from '../../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { Professional } from '../../types';
import { Button } from '../ui/Button';
import { CheckCircle, XCircle, Shield, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AdminView = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }

      // Check if user is admin (by email whitelist or DB field)
      if (user.email === 'polishettivamshi123@gmail.com') {
        setIsAdmin(true);
      } else {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().isAdmin) {
          setIsAdmin(true);
        }
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        const approvedQ = query(collection(db, 'professionals'), where('status', '==', 'active'));
        const pendingQ = query(collection(db, 'professionals'), where('status', '==', 'review'));
        
        const [approvedSnap, pendingSnap] = await Promise.all([
          getDocs(approvedQ),
          getDocs(pendingQ)
        ]);

        const totalApproved = approvedSnap.size;
        const totalPending = pendingSnap.size;
        const pendingDocs = pendingSnap.docs.map(doc => ({ ...doc.data(), id: doc.id } as Professional));

        setProfessionals(pendingDocs);

        // Simple city analytics
        const cityMap: Record<string, number> = {};
        approvedSnap.docs.forEach(doc => {
          const loc = doc.data().location;
          cityMap[loc] = (cityMap[loc] || 0) + 1;
        });

        const topCity = Object.entries(cityMap).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

        setStats({
          approved: totalApproved,
          pending: totalPending,
          topCity
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    topCity: 'Loading...'
  });

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const docRef = doc(db, 'professionals', id);
      await updateDoc(docRef, {
        status: 'active',
        isPaid: true, // Auto-mark as paid if approved by admin
        updatedAt: serverTimestamp()
      });
      setProfessionals(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error approving profile:", error);
      alert("Failed to approve profile. Check console for details.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this profile?")) return;
    
    setActionLoading(id);
    try {
      // For rejection, we could delete it or set status to rejected.
      // For now, let's just delete to keep it simple or set a flag.
      // Rules allow deletion by admin.
      const docRef = doc(db, 'professionals', id);
      await updateDoc(docRef, {
        status: 'rejected',
        updatedAt: serverTimestamp()
      });
      setProfessionals(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error rejecting profile:", error);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] text-center px-4">
        <AlertCircle size={64} className="text-red-500 mb-6" />
        <h1 className="text-3xl font-black text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-500 max-w-md italic">
          "With great power comes great responsibility." You do not have admin privileges.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4 mb-12">
        <div className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
          <Shield size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Admin Terminal</h1>
          <p className="text-gray-500 font-medium tracking-wide border-l-2 border-blue-600 pl-3 mt-1">
            Community Governance & Analytics
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Total Community</p>
          <p className="text-4xl font-black text-gray-900">{stats.approved}</p>
          <div className="h-1 w-12 bg-blue-600 mt-4 rounded-full" />
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Pending Review</p>
          <p className="text-4xl font-black text-blue-600">{stats.pending}</p>
          <div className="h-1 w-12 bg-blue-200 mt-4 rounded-full" />
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Hottest City</p>
          <p className="text-2xl font-black text-gray-900 truncate">{stats.topCity.split(',')[0]}</p>
          <p className="text-xs text-gray-400 mt-1 font-bold">Most Active Talent</p>
        </div>
      </div>

      {professionals.length === 0 ? (
        <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-4 opacity-20" />
          <p className="text-gray-400 font-bold text-xl uppercase tracking-widest">Inbox Zero</p>
          <p className="text-gray-400 text-sm mt-2">All profiles have been reviewed.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {professionals.map((prof) => (
              <motion.div
                key={prof.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 hover:shadow-xl transition-all duration-500"
              >
                <div className="h-24 w-24 flex-shrink-0 rounded-3xl overflow-hidden border-4 border-gray-50 shadow-inner">
                  <img src={prof.imageUrl} alt={prof.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black text-gray-900">{prof.name}</h3>
                  <p className="text-blue-600 font-bold uppercase tracking-wider text-sm mt-1">{prof.role}</p>
                  <p className="text-gray-500 mt-2 line-clamp-2 italic text-sm">{prof.bio || "No bio provided"}</p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-gray-100">
                      {prof.location}
                    </span>
                    <span className="text-xs font-bold text-blue-400 bg-blue-50 px-3 py-1 rounded-full uppercase tracking-tighter border border-blue-100">
                      {prof.experience} Exp
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => handleApprove(prof.id)}
                    disabled={actionLoading === prof.id}
                    className="bg-green-600 hover:bg-green-700 text-white border-none shadow-lg shadow-green-200 min-w-[140px]"
                  >
                    {actionLoading === prof.id ? "Approving..." : (
                      <>
                        <CheckCircle size={18} className="mr-2" />
                        Approve
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleReject(prof.id)}
                    disabled={actionLoading === prof.id}
                    variant="outline"
                    className="border-red-200 text-red-600 hover:bg-red-50 min-w-[140px]"
                  >
                    <XCircle size={18} className="mr-2" />
                    Reject
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
