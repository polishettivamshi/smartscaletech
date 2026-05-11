import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Linkedin, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithGoogle, db } from '../../lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export const JoinForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    linkedinUrl: '',
    location: 'Hyderabad, Telangana',
    role: 'Frontend Developer',
    skills: ['React', 'Next.js', 'TypeScript']
  });

  React.useEffect(() => {
    if (user?.displayName && !formData.name) {
      setFormData(prev => ({ ...prev, name: user.displayName || '' }));
    }
  }, [user]);

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo = {
      error: error instanceof Error ? error.message : String(error),
      operationType,
      path
    };
    console.error('Firestore Error: ', JSON.stringify(errInfo));
    throw new Error(JSON.stringify(errInfo));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      await signInWithGoogle();
      return;
    }

    setSubmitting(true);
    const docRef = doc(db, 'professionals', user.uid);
    const path = `professionals/${user.uid}`;
    
    try {
      // Check if profile already exists to preserve createdAt
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.exists() ? docSnap.data() : null;
      
      const payload = {
        userId: user.uid,
        name: formData.name || user.displayName || 'Anonymous',
        role: formData.role,
        location: formData.location,
        skills: formData.skills,
        linkedinUrl: formData.linkedinUrl,
        imageUrl: user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`,
        status: 'review',
        isPaid: false,
        updatedAt: serverTimestamp(),
      };

      if (existingData) {
        await setDoc(docRef, {
          ...payload,
          status: existingData.status || 'review',
          isPaid: existingData.isPaid || false,
          createdAt: existingData.createdAt
        });
      } else {
        await setDoc(docRef, {
          ...payload,
          createdAt: serverTimestamp()
        });
      }
      
      // After submission, we stay on this page to show the "Payment" step if status is review
      // or navigate if already active
      if (existingData?.status === 'active') {
        navigate(`/profile/${user.uid}`);
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSimulatedPayment = async () => {
    if (!user) return;
    setSubmitting(true);
    try {
      const docRef = doc(db, 'professionals', user.uid);
      await setDoc(docRef, {
        status: 'active',
        isPaid: true,
        paymentId: 'SIM_' + Math.random().toString(36).substr(2, 9),
        updatedAt: serverTimestamp()
      }, { merge: true });
      navigate(`/profile/${user.uid}`);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `professionals/${user.uid}`);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Profile</h1>
          <p className="text-gray-500 mt-2">Join the map and represent your city</p>
        </div>

        <Button 
          variant="outline" 
          className="w-full h-14 bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
          onClick={signInWithGoogle}
        >
          <img src="https://www.google.com/favicon.ico" className="mr-2 h-5 w-5" alt="Google" />
          {user ? 'Logged in as ' + user.displayName : 'Continue with Google'}
        </Button>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100"></div>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-white px-4 text-gray-400 font-bold tracking-widest text-[10px]">or</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Vamshi Polishetti"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">LinkedIn Profile URL</label>
            <input 
              type="url" 
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              placeholder="https://www.linkedin.com/in/vamshi-polishetti"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">City</label>
              <select 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              >
                <option>Hyderabad, Telangana</option>
                <option>Mumbai, Maharashtra</option>
                <option>Bangalore, Karnataka</option>
                <option>Delhi, NCR</option>
                <option>Chennai, Tamil Nadu</option>
                <option>Pune, Maharashtra</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Role</label>
              <select 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option>Frontend Developer</option>
                <option>Backend Developer</option>
                <option>Full Stack Developer</option>
                <option>UI/UX Designer</option>
                <option>DevOps Engineer</option>
                <option>Product Manager</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Skills</label>
            <div className="flex flex-wrap gap-2 p-3 bg-gray-50 border border-gray-200 rounded-xl">
              {formData.skills.map(skill => (
                <span key={skill} className="px-2 py-1 bg-white border border-gray-100 rounded-lg text-xs font-semibold text-blue-600 flex items-center gap-1">
                  {skill} 
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, skills: formData.skills.filter(s => s !== skill) })}
                    className="text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input 
                type="text" 
                placeholder="Add skill..." 
                className="bg-transparent text-xs outline-none border-none ml-2 w-24"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val && !formData.skills.includes(val)) {
                      setFormData({ ...formData, skills: [...formData.skills, val] });
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                <ImageIcon className="text-gray-400" size={24} />
              </div>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>

          <div className="flex items-start gap-3 py-4">
             <input type="checkbox" className="mt-1" id="terms" required />
             <label htmlFor="terms" className="text-sm text-gray-500">I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms & Conditions</span></label>
          </div>

          <Button type="submit" className="w-full h-14 text-lg" disabled={submitting}>
            {submitting ? 'Processing...' : (user ? 'Save Profile Details' : 'Sign in to Continue')}
          </Button>

          {user && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-3xl">
              <h4 className="font-bold text-blue-900 flex items-center gap-2">
                <CheckCircle size={18} />
                Community Verification
              </h4>
              <p className="text-sm text-blue-700 mt-1">To maintain community quality, all profiles undergo a quick manual review by our moderators.</p>
              <Button 
                type="button"
                onClick={handleSimulatedPayment}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white" 
                disabled={submitting}
              >
                {submitting ? 'Verifying...' : 'Submit for Verification'}
              </Button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};
