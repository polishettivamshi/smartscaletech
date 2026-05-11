/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/home/Hero';
import { HowItWorks, WhyJoin } from './components/home/HomeSections';
import { Sidebar } from './components/explore/Sidebar';
import { ExploreMap } from './components/explore/ExploreMap';
import { ProfessionalCard } from './components/explore/ProfessionalCard';
import { mockProfessionals } from './data/mockProfessionals';
import { Button } from './components/ui/Button';
import { MapPin } from 'lucide-react';

import { JoinForm } from './components/profile/JoinForm';
import { ProfileView } from './components/profile/ProfileView';
import { AdminView } from './components/admin/AdminView';
import { AuthProvider } from './contexts/AuthContext';

import { useProfessionals } from './hooks/useProfessionals';

function HomePage() {
  const { professionals, loading } = useProfessionals();

  return (
    <main>
      <Hero />
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">India's Professional Landscape</h2>
             <p className="text-gray-500 max-w-2xl mx-auto">Explore talent across the country. Find collaborators, mentors, and peers in your city.</p>
          </div>
          <div className="bg-white p-4 rounded-[40px] shadow-2xl border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="h-[600px] flex items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              </div>
            ) : (
              <ExploreMap professionals={professionals} />
            )}
          </div>
        </div>
      </section>
      <HowItWorks />
      <WhyJoin />
    </main>
  );
}

function CitiesPage() {
  const { professionals, loading } = useProfessionals();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // Group by city
  const cityGroups = professionals.reduce((acc, p) => {
    const city = p.location.split(',')[0];
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const cities = Object.entries(cityGroups)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Professionals by City</h2>
      <p className="text-gray-500 mb-12 text-lg">Connecting talent across the growing Indian landscape.</p>
      
      {cities.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
           <p className="text-gray-400 font-medium">No professionals found yet. Be the first from your city!</p>
           <Link to="/join">
             <Button className="mt-6">Join Now</Button>
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map(city => (
            <div key={city.name} className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{city.name}</h3>
                  <p className="text-blue-600 font-bold mt-2 uppercase tracking-wider text-sm">{city.count} Professionals</p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MapPin size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ExplorePage() {
  const { professionals, loading } = useProfessionals();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-12">
        <Sidebar />
        <div className="flex-1 space-y-12">
          <ExploreMap professionals={professionals} />
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Professionals</h2>
              <p className="text-sm text-gray-500">Showing {professionals.length} Professionals</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {professionals.map(p => (
                <ProfessionalCard key={p.id} professional={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/how-it-works" element={<HomePage />} />
            <Route path="/cities" element={<CitiesPage />} />
            <Route path="/blog" element={<HomePage />} />
            <Route path="/join" element={<JoinForm />} />
            <Route path="/profile/:id" element={<ProfileView />} />
            <Route path="/admin" element={<AdminView />} />
          </Routes>
          
          <footer className="border-t border-gray-100 py-12 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 text-center text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} India Professionals Map. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}
