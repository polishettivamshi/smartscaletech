import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-24">
      <div className="mx-auto max-w-3xl text-center px-4 sm:px-6 lg:px-8">
        <span className="text-6xl font-black text-slate-900">404</span>
        <h1 className="mt-6 text-4xl font-black text-slate-900 sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          The page you are looking for does not exist on SmartScaleTech. It may have been moved or the URL may be incorrect.
        </p>
        <div className="mt-10 inline-flex rounded-full bg-primary/10 px-5 py-3">
          <Link to="/" className="text-primary font-semibold hover:text-primary/90">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};
