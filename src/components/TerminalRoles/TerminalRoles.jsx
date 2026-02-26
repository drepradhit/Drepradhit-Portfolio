import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TerminalRoles({ roles = ["UI/UX Designer", "Mobile Developer", "Web Developer", "Graphic Designer", "Video Editor"] }) {
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const role = roles[currentRoleIdx];
    
    const handleTyping = () => {
      if (!isDeleting) {
        // Typing
        setDisplayedText(role.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === role) {
          // Finished typing, wait before deleting
          setIsDeleting(true);
          setTypingSpeed(2000);
        }
      } else {
        // Deleting
        setDisplayedText(role.substring(0, displayedText.length - 1));
        setTypingSpeed(50);

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIdx, roles, typingSpeed]);

  return (
    <div className="w-full max-w-md bg-[#0D0D0D] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl font-mono">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-neutral-800">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[10px] text-neutral-500 font-sans uppercase tracking-widest">role</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 md:p-6 min-h-[70px] flex flex-row items-center bg-[#0D0D0D] overflow-hidden">
        <div className="flex flex-row items-center flex-nowrap gap-1.5 md:gap-2 text-[10px] sm:text-xs md:text-base w-full">
          <span className="text-[#32CD32] font-semibold whitespace-nowrap shrink-0">computer:~$</span>
          <span className="text-white font-bold tracking-tight whitespace-nowrap shrink-0 flex items-center">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-1.5 md:w-2.5 h-3 md:h-5 ml-1 bg-[#32CD32]"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
