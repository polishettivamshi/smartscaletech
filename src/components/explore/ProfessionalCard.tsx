import React from 'react';
import { Professional } from '../../types';
import { Button } from '../ui/Button';
import { MapPin, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfessionalCardProps {
  professional: Professional;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  return (
    <div className="group relative rounded-2xl bg-white p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md hover:border-blue-200">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-100 bg-slate-50">
          <img 
            src={professional.imageUrl} 
            alt={professional.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {professional.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-600">
            <Briefcase size={14} className="text-gray-400" />
            <span className="truncate">{professional.role}</span>
            <span className="text-gray-300">•</span>
            <span>{professional.experience}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate">{professional.location}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {professional.skills.map((skill) => (
          <span 
            key={skill}
            className="px-2 py-0.5 text-[11px] font-medium bg-blue-50 text-blue-700 rounded-md border border-blue-100"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-50">
        <Link to={`/profile/${professional.id}`} className="w-full block">
          <Button variant="outline" size="sm" className="w-full text-blue-600 border-blue-100 hover:bg-blue-50">
            View Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};
