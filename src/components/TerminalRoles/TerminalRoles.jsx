import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TerminalRoles({ roles = ["UI/UX Designer", "Frontend Developer", "Web Developer"] }) {
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
    <div className="w-full max-w-md bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-lg font-mono">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-neutral-50 border-b border-neutral-200">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 text-[10px] text-neutral-400 font-sans uppercase tracking-widest">zsh</span>
      </div>

      {/* Terminal Content */}
      <div className="p-4 min-h-[60px] flex items-center">
        <div className="flex items-center flex-wrap gap-2 text-sm md:text-base">
          <span className="text-neutral-500">computer:~$</span>
          <span className="text-neutral-900 font-bold">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-2.5 h-5 ml-1 bg-neutral-900 align-middle"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
