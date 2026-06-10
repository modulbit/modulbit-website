"use client";

import { useState, useEffect, useMemo } from "react";

const HeroAIAnimation = ({ messages: messageList }: { messages: string[] }) => {
  const messages = useMemo(() => messageList, [messageList]);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayResponse, setDisplayResponse] = useState("");
  const [completedTyping, setCompletedTyping] = useState(false);

  useEffect(() => {
    setCompletedTyping(false);
    let i = 0;
    const stringResponse = messages[currentMessageIndex];

    const intervalId = setInterval(() => {
      setDisplayResponse(stringResponse.slice(0, i));
      i++;

      if (i > stringResponse.length) {
        clearInterval(intervalId);
        setCompletedTyping(true);

        // Wait for a bit then move to next message
        setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 3000);
      }
    }, 50); // Slightly slower for better readability

    return () => clearInterval(intervalId);
  }, [currentMessageIndex, messages]);

  const CursorSVG = () => (
    <span className="inline-block w-[1ch] h-[1.2em] bg-accent ml-1 translate-y-[0.2em] animate-[flicker_0.8s_infinite]" />
  );

  return (
    <div className="relative w-full md:w-[500px] aspect-[4/3]">
      {/* Main Terminal Window */}
      <div className="relative h-full w-full rounded-2xl bg-[#0f141a] border border-white/10 overflow-hidden flex flex-col shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="flex-1 text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold font-mono">modulBit AI Terminal</span>
          </div>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-6 font-mono text-sm md:text-base leading-relaxed">
          <div className="flex gap-3">
            <span className="text-accent shrink-0 font-bold">❯</span>
            <div className="text-gray-200">
              <span className="text-gray-500 mr-2">system.init()</span>
              <br />
              <span className="text-gray-500 mr-2">loading modules...</span>
              <br />
              <span className="text-accent font-bold">READY</span>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <span className="text-accent shrink-0 font-bold">❯</span>
            <div className="text-white min-h-[4em]">
              {displayResponse}
              {!completedTyping && <CursorSVG />}
              {completedTyping && (
                <span className="inline-block w-[1ch] h-[1.2em] bg-accent/50 ml-1 translate-y-[0.2em]" />
              )}
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-mono">
          <span>UTF-8</span>
          <span>Ln 1, Col {displayResponse.length + 1}</span>
          <span>AI-Core v1.0.4</span>
        </div>
      </div>
    </div>
  );
};

export default HeroAIAnimation;
