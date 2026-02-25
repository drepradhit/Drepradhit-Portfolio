"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCcw, Timer, Percent, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const WORDS_POOL = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

export default function TypingTest() {
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, raw: 0 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef(null);

  const generateWords = useCallback(() => {
    const shuffled = [...WORDS_POOL].sort(() => Math.random() - 0.5);
    setWords(shuffled.slice(0, 50));
    setUserInput("");
    setStartTime(null);
    setTimeLeft(30);
    setIsActive(false);
    setIsFinished(false);
    setCurrentIndex(0);
  }, []);

  useEffect(() => {
    generateWords();
  }, [generateWords]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setStartTime(Date.now());
  };

  const finishTest = () => {
    setIsActive(false);
    setIsFinished(true);
    calculateStats();
  };

  const calculateStats = () => {
    const timeInMinutes = (30 - timeLeft) / 60 || 0.5;
    const typedEntries = userInput.length;
    const wpm = Math.round((typedEntries / 5) / timeInMinutes);
    
    // Simple accuracy calculation
    const targetText = words.join(" ").substring(0, userInput.length);
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === targetText[i]) correctChars++;
    }
    const accuracy = Math.round((correctChars / userInput.length) * 100) || 0;

    setStats({ wpm, accuracy, raw: wpm });
  };

  const handleInput = (e) => {
    if (isFinished) return;
    if (!isActive) startTest();
    
    const value = e.target.value;
    setUserInput(value);
  };

  const renderWords = () => {
    let charOffset = 0;
    const targetText = words.join(" ");

    return (
      <div className="word-row leading-relaxed select-none relative">
        {words.map((word, wordIdx) => {
          const isCurrentWord = wordIdx === targetText.substring(0, userInput.length).split(" ").length - 1;
          
          return (
            <span key={wordIdx} className="mr-3 inline-block">
              {word.split("").map((char, charIdx) => {
                const globalIdx = charOffset + charIdx;
                let status = "pending";
                
                if (globalIdx < userInput.length) {
                  status = userInput[globalIdx] === char ? "correct" : "incorrect";
                }

                charOffset++;
                if (charIdx === word.length - 1) charOffset++; // for space

                return (
                  <span 
                    key={charIdx} 
                    className={cn(
                      "char transition-all duration-100",
                      status === "correct" && "text-foreground",
                      status === "incorrect" && "text-red-500 bg-red-100 rounded-sm",
                      status === "pending" && "text-muted/40"
                    )}
                  >
                    {globalIdx === userInput.length && (
                      <motion.div 
                        layoutId="caret"
                        className="absolute left-0 top-0 w-[2px] h-full bg-accent caret shadow-[0_0_8px_var(--accent)]"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {char}
                  </span>
                );
              })}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col gap-12">
      {/* Stats Header */}
      <div className="flex justify-between items-center text-muted font-mono tracking-widest uppercase text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Timer size={16} className="text-accent" />
            <span>00:{timeLeft.toString().padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-accent" />
            <span>{Math.round((userInput.split(" ").length - 1) / ((30-timeLeft)/60 || 1)) || 0} WPM</span>
          </div>
        </div>
        <button 
          onClick={generateWords}
          className="hover:text-accent transition-colors flex items-center gap-2"
        >
          <RefreshCcw size={16} />
          Reset
        </button>
      </div>

      {/* Typing Area */}
      <div 
        className="relative min-h-[120px] cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key="test"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {renderWords()}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-8 py-10"
            >
              <h2 className="text-4xl font-bold text-accent">Game Over</h2>
              <div className="flex gap-20">
                <div className="flex flex-col items-center">
                  <span className="text-6xl font-black">{stats.wpm}</span>
                  <span className="text-muted uppercase text-xs tracking-tighter">WPM</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-6xl font-black">{stats.accuracy}%</span>
                  <span className="text-muted uppercase text-xs tracking-tighter">Accuracy</span>
                </div>
              </div>
              <button 
                onClick={generateWords}
                className="mt-8 bg-accent text-white px-8 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center gap-2"
              >
                <RefreshCcw size={20} />
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={inputRef}
          type="text"
          className="absolute inset-0 opacity-0 cursor-default pointer-events-none"
          value={userInput}
          onChange={handleInput}
          autoFocus
        />
      </div>

      {/* Footer Info */}
      {!isFinished && (
        <div className="text-center text-muted/30 text-xs font-mono">
          <p>Click elsewhere and start typing to begin the test.</p>
          <p className="mt-2">Press 'Esc' to restart (coming soon).</p>
        </div>
      )}
    </div>
  );
}
