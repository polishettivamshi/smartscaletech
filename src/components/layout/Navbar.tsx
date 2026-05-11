import { Link, useLocation } from 'react-router-dom';
import { MapPin, User, LogOut } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { signInWithGoogle, logout } from '../../lib/firebase';

export const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Top Cities', href: '/cities' },
    ...(isAdmin ? [{ name: 'Admin', href: '/admin' }] : []),
    ...(user ? [{ name: 'My Profile', href: `/profile/${user.uid}` }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-bottom border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">
            <MapPin size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            India Professionals Map
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-blue-600',
                location.pathname === link.href ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img 
                  src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.displayName}`} 
                  alt={user.displayName || 'User'} 
                  className="h-8 w-8 rounded-full border border-gray-200"
                />
                <span className="hidden lg:block text-sm font-medium text-gray-700">{user.displayName}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} title="Logout">
                <LogOut size={18} />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={signInWithGoogle}>
                Login
              </Button>
              <Link to="/join">
                <Button size="sm">Join Now</Button>
              </Link>
            </>
          )}
          <Button variant="outline" size="sm" className="px-2 sm:hidden">
            <User size={18} />
          </Button>
        </div>
      </div>
    </nav>
  );
};
