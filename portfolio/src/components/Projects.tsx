'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import NanoBanana from './NanoBanana';

const PROJECTS = [
  {
    title: 'MOVIGOO',
    category: 'Full-Stack Platform',
    year: '2024',
    description: 'A full-stack movie booking platform serving 500+ active users with real-time seat availability and Razorpay integration.',
    tech: ['React', 'Node.js', 'MongoDB', 'Razorpay'],
    link: 'https://www.movigoo.in',
  },
  {
    title: 'AI Code Snippet Manager',
    category: 'AI / Tooling',
    year: '2024',
    description: 'Intelligent developer productivity tool using Next.js and OpenAI API to auto-generate documentation via Supabase.',
    tech: ['Next.js', 'Supabase', 'OpenAI API']
  },
  {
    title: 'Microservices LMS',
    category: 'Cloud Architecture',
    year: '2025',
    description: 'Distributed e-learning architecture decoupled for independent scaling, containerized with Docker and Kubernetes.',
    tech: ['Docker', 'Kubernetes', 'Redis', 'PostgreSQL']
  }
];

export default function Projects() {
  return (
    <section className="relative z-20 min-h-screen bg-slate-950 py-32 px-4 md:px-12 text-zinc-50 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight">
            Featured <br /><span className="text-zinc-500">Projects</span>
          </h2>
          <NanoBanana />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
              className="group relative h-full"
              style={{ cursor: project.link ? 'pointer' : 'default' }}
              onClick={() => {
                if (project.link) window.open(project.link, '_blank');
              }}
            >
              {/* Glassmorphism card inner */}
              <div className="h-full min-h-[26rem] w-full rounded-2xl p-8 flex flex-col justify-between 
                            bg-white/[0.03] backdrop-blur-2xl border border-white/5 
                            transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20
                            hover:shadow-[0_0_40px_-10px_rgba(120,119,198,0.3)] z-10 relative overflow-hidden">
                
                {/* Glow behind content */}
                <div className="absolute top-0 right-0 -m-32 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px] 
                                transition-all duration-700 group-hover:bg-indigo-400/30 group-hover:scale-150" />

                <div className="flex justify-between items-start z-10 relative mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-300">
                    {project.category}
                  </span>
                  <div className="flex gap-2">
                    {project.link && (
                      <div className="p-3 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 hover:bg-white/20">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="z-10 relative flex-1 flex flex-col">
                  <h3 className="text-2xl font-medium tracking-tight mb-4 transition-colors duration-300 group-hover:text-indigo-200">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 font-light mb-6 flex-1 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs font-mono px-2 py-1 bg-white/[0.05] rounded-md text-zinc-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm font-medium text-zinc-600 mt-auto">
                    {project.year}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
