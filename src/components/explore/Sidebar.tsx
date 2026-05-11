import { Search, Filter, X } from 'lucide-react';
import { Button } from '../ui/Button';

export const Sidebar = () => {
  return (
    <div className="w-full lg:w-80 space-y-8 pr-0 lg:pr-8 border-r-0 lg:border-r border-gray-100 h-fit">
      <div className="space-y-4">
        <label className="text-sm font-semibold text-gray-700 block">Search</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by skill, role or city..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Filters</h3>
          <button className="text-xs text-blue-600 font-medium hover:underline">Clear Filters</button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Location</label>
            <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>All Cities</option>
              <option>Hyderabad, Telangana</option>
              <option>Mumbai, Maharashtra</option>
              <option>Bangalore, Karnataka</option>
              <option>Delhi, NCR</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Role</label>
            <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>All Roles</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Full Stack Developer</option>
              <option>Product Manager</option>
              <option>Designer</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-500 uppercase">Skills</label>
            <select className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Frontend Developer</option>
              <option>React</option>
              <option>Vue.js</option>
              <option>Angular</option>
              <option>Node.js</option>
            </select>
          </div>
        </div>

        <Button className="w-full py-3">Search</Button>
      </div>

      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
        <h4 className="text-sm font-bold text-blue-900">Found 124 Results</h4>
        <p className="text-xs text-blue-700 mt-1">Professionals matching your filters in Hyderabad</p>
      </div>
    </div>
  );
};
