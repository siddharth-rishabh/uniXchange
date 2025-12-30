import React, { useEffect, useState } from "react";
import { Wrench } from "lucide-react";

export default function ComingSoon() {
  // Typewriter text state
  const message = "initializing secure build environment...";
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTyped((prev) => prev + message[i]);
      i++;
      if (i >= message.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Fake loading %
  const [loading, setLoading] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => (prev < 100 ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Matrix letters
  const letters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const [matrix, setMatrix] = useState([]);
  useEffect(() => {
    const cols = 60;
    setMatrix(
      Array.from({ length: cols }, () => letters[Math.floor(Math.random() * letters.length)])
    );
    const interval = setInterval(() => {
      setMatrix((prev) =>
        prev.map(() => letters[Math.floor(Math.random() * letters.length)])
      );
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Matrix Rain */}
      <div className="absolute inset-0 z-0 flex flex-wrap">
        {matrix.map((letter, i) => (
          <span
            key={i}
            className="text-green-500/20 text-sm animate-[rain_3s_linear_infinite]"
            style={{ width: "1.5rem", animationDelay: `${Math.random() * 2}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Scanlines + CRT glow */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,0,0.03)_50%)] bg-size-[100%_4px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-green-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.4))] pointer-events-none"></div>


      <main className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="max-w-3xl text-center space-y-10 animate-[fadeIn_1s_ease-out]">

          {/* Floating Glitch Icon */}
          <div className="inline-flex items-center justify-center p-8 border border-green-500/30 rounded-md ">
            <Wrench className="w-16 h-16 text-green-400" />
          </div>

          {/* Terminal Header */}
          <div className="space-y-4">
            <p className="text-sm text-green-500/70">root@system:~$ status</p>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-widest">
              COMING_SOON
              <span className="inline-block ml-1 animate-[blink_1s_step-end_infinite]">█</span>
            </h1>

            {/* Typewriter effect */}
            <p className="text-green-500/70 mx-auto">{typed}</p>
          </div>

          {/* Terminal Output + Fake Loading */}
          <div className="text-left max-w-xl mx-auto space-y-2 text-sm sm:text-base">
            <p>&gt; loading modules... {loading}%</p>
            <p>&gt; decrypting assets... {(loading * 0.76).toFixed(0)}%</p>
            <p className="text-green-300">
              &gt; feature status: <span className="font-semibold">LOCKED</span>
            </p>
          </div>

          {/* Access Denied Hover Button */}
          <div className="pt-6">
            <button  onClick={() => window.location.href = "/"} 
                 className="px-8 py-3 border border-green-500/40 rounded hover:bg-green-500/10  transition-all duration-300">
              exit_to_home
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-green-500/20">
        <div className="py-6 text-center text-green-500/50 text-sm">
          © system.message — unauthorized access prohibited
        </div>
      </footer>

      {/* Tailwind keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px,2px); }
          40% { transform: translate(2px,-2px); }
          60% { transform: translate(-1px,1px); }
          80% { transform: translate(1px,-1px); }
          100% { transform: translate(0); }
        }
        @keyframes rain { to { transform: translateY(120vh); } }
      `}</style>
    </div>
  );
}
