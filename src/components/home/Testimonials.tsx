import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Senior Software Engineer @ Google",
    content: "The ATS resume package was a game changer. I started getting calls from top-tier companies within a week of updating my profile.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
  },
  {
    name: "Priya Varma",
    role: "Marketing Director",
    content: "Our business website's conversion rate increased by 40% after the redesign. The team at SmartScaleTech knows exactly what works.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
  },
  {
    name: "Ankit Gupta",
    role: "Freelance Developer",
    content: "The LinkedIn optimization service is underrated. My impressions went from 500 to 5000+ per month. Highly recommended!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ankit"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-slate-50/50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">What Our Clients Say</h2>
          <p className="text-slate-500 dark:text-slate-400">Success stories from professionals who transformed their digital presence.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[40px] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="relative mb-8">
                <Quote className="absolute -top-4 -left-4 text-primary/10" size={48} />
                <p className="relative text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="h-12 w-12 rounded-full border border-slate-100 dark:border-slate-700" />
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
