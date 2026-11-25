import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#F3EEE3] py-24 border-b border-[#D8D3C9]">
      <div className="mx-auto max-w-2xl text-center px-4 sm:px-6 lg:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D9541E]">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#111111]">
          Page not found
        </h1>
        <p className="mt-4 text-[#57534E] text-base leading-relaxed">
          The page you are looking for does not exist or may have moved. Explore our services, work
          showcase, or return to the homepage.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/">
            <Button variant="primary" size="lg">
              Back to Home <ArrowRight size={15} />
            </Button>
          </Link>
          <Link to="/services/web-development">
            <Button variant="secondary" size="lg">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
