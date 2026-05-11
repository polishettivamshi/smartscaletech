import { useEffect, useState } from 'react';
import { collection, query, getDocs, orderBy, limit, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Professional } from '../types';
import { mockProfessionals } from '../data/mockProfessionals';

export const useProfessionals = (showAll = false) => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        // Only show active professionals in the explore view
        const baseQuery = collection(db, 'professionals');
        const q = showAll 
          ? query(baseQuery, orderBy('createdAt', 'desc'), limit(50))
          : query(baseQuery, where('status', '==', 'active'), orderBy('createdAt', 'desc'), limit(50));
        
        const querySnapshot = await getDocs(q);
        const fetchedProfs = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        })) as Professional[];

        // Filter mock professionals to only show them if no specific filter or if active
        // For demo, we treat all mock as active
        setProfessionals([...fetchedProfs, ...mockProfessionals]);
      } catch (error) {
        console.error("Error fetching professionals:", error);
        setProfessionals(mockProfessionals);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [showAll]);

  return { professionals, loading };
};
