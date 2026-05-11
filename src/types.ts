export interface Professional {
  id: string;
  name: string;
  role: string;
  experience: string;
  location: string;
  skills: string[];
  imageUrl: string;
  linkedinUrl?: string;
  bio?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  userId?: string;
  status?: 'review' | 'active';
  isPaid?: boolean;
  paymentId?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface CityStats {
  name: string;
  professionalCount: number;
}
