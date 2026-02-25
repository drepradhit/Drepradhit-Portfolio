import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Trophy, RefreshCw, Terminal, MousePointer2, Code2, AlertTriangle, ChevronRight } from "lucide-react";

export default function FlappyTech() {
  const [gameState, setGameState] = useState("idle"); // idle, playing, over
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [bird, setBird] = useState({ y: 50, velocity: 0 });
  const [pipes, setPipes] = useState([]);
  const containerRef = useRef(null);
  const gameLoopRef = useRef();
  
  const GRAVITY = 0.45;
  const JUMP_STRENGTH = -7;
  const PIPE_SPEED = 3.5;
  const PIPE_SPAWN_RATE = 1500;
  const BIRD_SIZE = 36;
  const PIPE_WIDTH = 60;
  const GAP_SIZE = 160;

  const jump = () => {
    if (gameState === "playing") {
      setBird(prev => ({ ...prev, velocity: JUMP_STRENGTH }));
    } else if (gameState === "idle" || gameState === "over") {
      startGame();
    }
  };

  const startGame = () => {
    setScore(0);
    setBird({ y: 50, velocity: 0 });
    setPipes([]);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing") return;

    const gameLoop = () => {
      // Update Bird
      setBird(prev => {
        const newVelocity = prev.velocity + GRAVITY;
        const newY = prev.y + newVelocity;
        
        // Ground/Ceiling collision
        if (newY < 0 || newY > (containerRef.current?.offsetHeight || 500) - BIRD_SIZE) {
          setGameState("over");
          return prev;
        }
        return { y: newY, velocity: newVelocity };
      });

      // Update Pipes
      setPipes(prev => {
        let newPipes = prev.map(p => ({ ...p, x: p.x - PIPE_SPEED }));
        
        // Remove off-screen pipes
        if (newPipes[0] && newPipes[0].x < -PIPE_WIDTH) {
          newPipes.shift();
          setScore(s => s + 1);
        }

        return newPipes;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    // Pipe Spawning
    const spawnPipes = setInterval(() => {
      const containerH = containerRef.current?.offsetHeight || 500;
      const minPipeH = 50;
      const maxPipeH = containerH - GAP_SIZE - minPipeH;
      const topHeight = Math.random() * (maxPipeH - minPipeH) + minPipeH;

      setPipes(prev => [...prev, { x: 1000, topHeight, id: Date.now() }]);
    }, PIPE_SPAWN_RATE);

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(gameLoopRef.current);
      clearInterval(spawnPipes);
    };
  }, [gameState]);

  // Collision Detection
  useEffect(() => {
    if (gameState !== "playing" || !containerRef.current) return;

    const containerW = containerRef.current.offsetWidth;
    const birdX = 100; // Fixed x position

    const hasCollision = pipes.some(p => {
       const pipeXOnScreen = (p.x / 1000) * containerW;
       const collisionX = birdX + BIRD_SIZE > pipeXOnScreen && birdX < pipeXOnScreen + PIPE_WIDTH;
       const collisionY = bird.y < p.topHeight || bird.y + BIRD_SIZE > p.topHeight + GAP_SIZE;
       return collisionX && collisionY;
    });

    if (hasCollision) setGameState("over");
  }, [bird.y, pipes, gameState]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score]);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4 select-none font-mono">
      {/* HUD */}
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-3xl border border-neutral-200 shadow-sm overflow-hidden relative">
         <div className="flex gap-8 relative z-10">
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Score</span>
               <span className="text-2xl font-black text-neutral-900 leading-none">{score}</span>
            </div>
            <div className="flex flex-col border-l border-neutral-100 pl-8">
               <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Best</span>
               <span className="text-2xl font-black text-neutral-900 leading-none">{highScore}</span>
            </div>
         </div>
         <div className="flex items-center gap-4 relative z-10">
            <div className="hidden sm:flex flex-col text-right">
               <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">System</span>
               <span className="text-[10px] font-bold text-neutral-500 uppercase">Flappy_v2.0.sh</span>
            </div>
            <div className={`p-2 rounded-xl border ${gameState === "playing" ? 'bg-green-50 border-green-100' : 'bg-neutral-50 border-neutral-100'}`}>
               <div className={`w-2 h-2 rounded-full ${gameState === "playing" ? 'bg-green-500 animate-pulse' : 'bg-neutral-300'}`} />
            </div>
         </div>
      </div>

      {/* Game Stage */}
      <div 
        ref={containerRef}
        onClick={jump}
        className="w-full h-[500px] bg-white border-2 border-neutral-200 rounded-[3rem] relative overflow-hidden cursor-pointer shadow-xl shadow-neutral-100 group"
      >
        {/* Sky/Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
        />

        {/* The Character (Bird) */}
        {gameState !== "idle" && (
          <motion.div 
            animate={{ 
              top: bird.y,
              rotate: Math.min(Math.max(bird.velocity * 3, -25), 90)
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
            style={{ left: 100 }}
            className="absolute z-30"
          >
            <div className="relative group/bird">
               <div className="w-9 h-9 bg-neutral-900 rounded-xl flex items-center justify-center shadow-lg border-2 border-white">
                  <Code2 className="w-5 h-5 text-white" />
               </div>
               {/* Wing/Trail effect */}
               <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="absolute -left-2 top-1 w-4 h-6 bg-neutral-200 rounded-full blur-sm -z-10" 
               />
            </div>
          </motion.div>
        )}

        {/* Pipes */}
        {pipes.map(p => (
          <React.Fragment key={p.id}>
            {/* Top Pipe */}
            <div 
              style={{ left: `${(p.x / 1000) * 100}%`, height: p.topHeight }}
              className="absolute top-0 w-[60px] bg-neutral-50 border-x border-b border-neutral-200 flex flex-col items-center justify-end pb-4 rounded-b-2xl shadow-sm overflow-hidden"
            >
               <div className="flex flex-col gap-1 opacity-[0.05] pointer-events-none">
                  {Array.from({length: 10}).map((_, i) => <div key={i} className="h-1 w-8 bg-neutral-900" />)}
               </div>
            </div>
            {/* Bottom Pipe */}
            <div 
              style={{ left: `${(p.x / 1000) * 100}%`, top: p.topHeight + GAP_SIZE, height: '100%' }}
              className="absolute w-[60px] bg-neutral-50 border-x border-t border-neutral-200 flex flex-col items-center pt-4 rounded-t-2xl shadow-sm overflow-hidden"
            >
               <div className="flex flex-col gap-1 opacity-[0.05] pointer-events-none">
                  {Array.from({length: 10}).map((_, i) => <div key={i} className="h-1 w-8 bg-neutral-900" />)}
               </div>
            </div>
          </React.Fragment>
        ))}

        {/* Overlays */}
        <AnimatePresence>
          {gameState === "idle" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-sm z-40 flex items-center justify-center p-6"
            >
               <div className="text-center bg-white p-10 rounded-[3rem] border border-neutral-200 shadow-2xl max-w-sm">
                  <div className="w-16 h-16 bg-neutral-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl text-white">
                      <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-3xl font-black text-neutral-900 mb-2 italic">FLAPPY_CODE</h3>
                  <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest mb-10 leading-relaxed">
                    Navigasikan kursor melalui celah kode. Klik untuk terbang!
                  </p>
                  <button 
                    onClick={startGame}
                    className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:scale-[1.02] transition-all"
                  >
                    Deploy Script
                  </button>
               </div>
            </motion.div>
          )}

          {gameState === "over" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-500/5 backdrop-blur-md z-40 flex items-center justify-center p-6"
            >
               <div className="text-center bg-white p-12 rounded-[3.5rem] border-2 border-red-500/20 shadow-2xl">
                  <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                     <AlertTriangle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-4xl font-black text-neutral-900 mb-1 italic tracking-tighter uppercase">Process Failed</h3>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-10">Memory Leak Detected</p>
                  
                  <div className="flex gap-4 justify-center mb-10">
                     <div className="bg-neutral-50 px-8 py-4 rounded-3xl">
                        <span className="block text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Score</span>
                        <span className="text-3xl font-black text-neutral-900 italic">{score}</span>
                     </div>
                     <div className="bg-neutral-50 px-8 py-4 rounded-3xl border border-neutral-200">
                        <span className="block text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Best</span>
                        <span className="text-3xl font-black text-neutral-900 italic">{highScore}</span>
                     </div>
                  </div>

                  <button 
                    onClick={startGame}
                    className="flex items-center gap-3 px-10 py-4 bg-neutral-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-neutral-800 transition-all mx-auto"
                  >
                    <RefreshCw className="w-3 h-3" /> Re-Initialize
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Controls Info */}
        {gameState === "playing" && score === 0 && (
           <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-x-0 bottom-20 flex flex-col items-center gap-3 text-neutral-300 pointer-events-none"
           >
              <MousePointer2 className="w-10 h-10" />
              <span className="font-black uppercase tracking-[0.5em] text-[10px]">Click to jump</span>
           </motion.div>
        )}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-widest text-neutral-300">
         <span>Platform: Browser</span>
         <ChevronRight className="w-3 h-3" />
         <span>Engine: Framer Motion</span>
         <ChevronRight className="w-3 h-3" />
         <span>Mode: Production</span>
      </div>
    </div>
  );
}
