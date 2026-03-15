import ScrollyCanvas from '@/components/ScrollyCanvas';
import Overlay from '@/components/Overlay';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';

export default function Home() {
  return (
    <main className="bg-slate-950 font-sans selection:bg-indigo-500/30">
      <div className="relative w-full">
        {/* ScrollyCanvas provides the 500vh container and sticky canvas */}
        <ScrollyCanvas />
        
        {/* Overlay matches the 500vh container exactly to pin text sections */}
        <Overlay />
      </div>

      {/* Imported Resume Section */}
      <Experience />

      <Projects />
      
      {/* Simple Footer */}
      <footer className="w-full bg-slate-950 py-12 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-zinc-500">
        <p className="font-mono text-sm tracking-widest text-indigo-400">DESIGNED TO WOW</p>
        <p className="text-sm">© {new Date().getFullYear()} Rohit Revankar</p>
      </footer>
    </main>
  );
}
