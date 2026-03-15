'use client';


export default function Experience() {
  return (
    <section className="relative z-20 bg-slate-950 py-32 px-4 md:px-12 text-zinc-50 border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32">
            
            <div className="md:w-1/3 flex-shrink-0">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-12 font-outfit">
                    Background
                </h2>
                
                {/* Education Block */}
                <div className="mb-12">
                   <h3 className="text-xl md:text-2xl text-white font-medium mb-1 group-hover:text-indigo-400 transition-colors font-outfit">
                     Jain College of Engineering & Tech
                   </h3>
                   <p className="text-zinc-400 mt-2 font-light">
                     Bachelor of Engineering in CS
                   </p>
                   <div className="inline-flex mt-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest">
                     2022 - 2026 | CGPA: 8.0
                   </div>
                </div>
            </div>

            <div className="md:w-2/3 flex-grow relative">
                
                {/* Mindmatrix Gen AI Intern */}
                <div className="border-l border-white/10 pl-8 pb-16 relative">
                  <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  
                  <h3 className="text-3xl font-medium text-white mb-2 font-outfit">Android App Development Intern</h3>
                  <p className="text-xl text-zinc-400 mb-4 font-light">Mindmatrix (Gen AI)</p>
                  <div className="inline-flex mb-8 bg-indigo-900/40 border border-indigo-700 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest text-indigo-300">
                    Feb 2026 - Ongoing
                  </div>
                  
                  <ul className="space-y-4 text-zinc-400 font-light text-lg leading-relaxed">
                      <li className="flex gap-4 items-start">
                        <span className="text-indigo-500 mt-1.5 text-sm">▹</span> 
                        <span>Developing intelligent Android applications leveraging <strong className="text-white font-normal">Generative AI</strong> capabilities.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-indigo-500 mt-1.5 text-sm">▹</span> 
                        <span>Integrating large language models (LLMs) deeply into mobile architecture flows.</span>
                      </li>
                  </ul>
                </div>

                {/* Cognifyz Technologies Intern */}
                <div className="border-l border-white/10 pl-8 pb-8 relative">
                  <div className="absolute top-0 left-[-5px] w-2.5 h-2.5 rounded-full bg-zinc-600" />
                  
                  <h3 className="text-3xl font-medium text-white mb-2 font-outfit">Web Development Intern</h3>
                  <p className="text-xl text-zinc-400 mb-4 font-light">Cognifyz Technologies</p>
                  <div className="inline-flex mb-8 bg-zinc-800/50 border border-zinc-700 font-mono text-xs px-3 py-1 rounded-full uppercase tracking-widest text-zinc-300">
                    Jan 2024 - July 2024 • Remote
                  </div>
                  
                  <ul className="space-y-6 text-zinc-400 font-light text-lg leading-relaxed">
                      <li className="flex gap-4 items-start">
                        <span className="text-zinc-500 mt-1.5 text-sm">▹</span> 
                        <span>Engineered responsive UI using <strong className="text-white font-normal">React.js</strong> and Tailwind CSS, substantially improving page load speeds and cross-device limits.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-zinc-500 mt-1.5 text-sm">▹</span> 
                        <span>Built scalable RESTful APIs utilizing <strong className="text-white font-normal">Node.js</strong> and Express.js, plugging into MongoDB for maximum retrieval efficiency.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-zinc-500 mt-1.5 text-sm">▹</span> 
                        <span>Implemented secure JWT authentication and role-based access control (RBAC) ensuring data privacy.</span>
                      </li>
                      <li className="flex gap-4 items-start">
                        <span className="text-zinc-500 mt-1.5 text-sm">▹</span> 
                        <span>Collaborated in Agile sprints employing <strong className="text-white font-normal">GitHub</strong> for strict version control and frequent code reviews.</span>
                      </li>
                  </ul>
                </div>
            </div>
            
        </div>
    </section>
  )
}
