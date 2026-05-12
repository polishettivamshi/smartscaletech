import { useState } from 'react';
import { Professional } from '../types';
import { mockProfessionals } from '../data/mockProfessionals';

export const useProfessionals = (showAll = false) => {
  const [professionals] = useState<Professional[]>(mockProfessionals);
  const [loading] = useState(false);

  return { professionals, loading };
};
