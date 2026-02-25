import TypingTest from "@/components/TypingTest";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden font-sans">
      {/* Texture Layer */}
      <div className="paper-overlay" />
      
      {/* Header */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-black shadow-xl shadow-accent/20">
            TP
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground/80">Type Paper</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted/60">
          <a href="#" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">Discord</a>
          <a href="#" className="hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" className="hover:text-accent transition-colors">Settings</a>
        </div>
      </nav>

      {/* Hero / Main Content */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="mb-4 px-4 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold tracking-widest uppercase">
              Minimalist Typing Test
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-foreground bg-clip-text">
              Write with <span className="text-accent underline decoration-4 underline-offset-8">Purpose.</span>
            </h1>
            <p className="text-muted text-lg max-w-xl">
              A clean typing playground designed to elevate your speed and precision. No distractions, just you and the paper.
            </p>
          </div>

          <TypingTest />
        </div>
      </section>

      {/* Background Graphic */}
      <div className="absolute bottom-0 right-0 p-12 opacity-10 pointer-events-none">
        <Image 
          src="/type-paper.png" 
          alt="Type Paper Texture" 
          width={400} 
          height={400} 
          className="grayscale invert"
        />
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full p-8 flex justify-center text-xs text-muted/40 font-mono tracking-widest uppercase">
        &copy; 2025 Type Paper. Dev by Drepradhit.
      </footer>
    </main>
  );
}
