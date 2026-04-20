import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const GridBackground = () => {
  const { scrollY } = useScroll();
  
  // Parallax layers for different background elements
  const blob1Y = useTransform(scrollY, [0, 2000], [0, 500]);
  const blob2Y = useTransform(scrollY, [0, 2000], [0, -300]);
  const blob3Y = useTransform(scrollY, [0, 2000], [0, 250]);
  
  // Grid moves slower than scroll to create depth
  const gridY = useTransform(scrollY, [0, 2000], [0, -200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#fdfdfd] overflow-hidden">
      
      {/* Moving Color Blobs */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-100/80 mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-70"
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute top-[40%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-purple-100/70 mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-60"
      />
      <motion.div 
        style={{ y: blob3Y }}
        className="absolute -bottom-[20%] left-[20%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-emerald-50/70 mix-blend-multiply filter blur-[100px] md:blur-[120px] opacity-70"
      />

      {/* Parallax Grid */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute -top-[50vh] -left-[10vw] w-[120vw] h-[300vh]"
      >
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />
        {/* Soft radial mask over the grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#fdfdfd_85%)]" />
      </motion.div>
      
    </div>
  );
};

export default GridBackground;
