// src/components/AboutImageRotator.jsx
import React, { useEffect, useRef, useState } from 'react';
import aboutImages from '../assets/aboutImages'; // <-- explicit array

export default function AboutImageRotator({ intervalMs = 2000, className = '' }) {
  const IMAGES = Array.isArray(aboutImages) ? aboutImages : [];
  const poolSize = IMAGES.length;

  // initial unique indices for the four cards
  const pickInitial = () => {
    if (poolSize === 0) return [-1, -1, -1, -1];
    if (poolSize <= 4) return [0, 1 % poolSize, 2 % poolSize, 3 % poolSize];
    return [0, 1, 2, 3];
  };

  const [indices, setIndices] = useState(pickInitial);
  const [fading, setFading] = useState([false, false, false, false]);
  const paused = useRef(false);
  const timerRef = useRef(null);

  // helper: pick a random index not currently visible (if possible)
  function pickNewIndex(excludeSet) {
    if (poolSize === 0) return -1;
    if (excludeSet.size >= poolSize) {
      // everything excluded — pick any different from last attempt
      return Math.floor(Math.random() * poolSize);
    }
    let attempts = 0;
    while (attempts < 30) {
      const r = Math.floor(Math.random() * poolSize);
      if (!excludeSet.has(r)) return r;
      attempts++;
    }
    // fallback: linear scan
    for (let i = 0; i < poolSize; i++) if (!excludeSet.has(i)) return i;
    return 0;
  }

  useEffect(() => {
    if (poolSize === 0) return;

    function tick() {
      if (paused.current) return;

      // choose a card (0..3) to change — round-robin for predictability
      const cardToChange = Math.floor(Math.random() * 4);

      // build exclusion of currently visible indices
      const exclude = new Set(indices.filter(idx => idx >= 0));

      // pick new index not in exclude (if pool size allows)
      let newIdx = pickNewIndex(exclude);

      // fade-out that card, swap and fade-in
      setFading(prev => {
        const c = [...prev];
        c[cardToChange] = true;
        return c;
      });

      setTimeout(() => {
        setIndices(prev => {
          const next = [...prev];
          next[cardToChange] = newIdx;
          return next;
        });
        setFading(prev => {
          const c = [...prev];
          c[cardToChange] = false;
          return c;
        });
      }, 300);
    }

    timerRef.current = setInterval(tick, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [poolSize, indices, intervalMs]);

  const handleMouseEnter = () => { paused.current = true; };
  const handleMouseLeave = () => { paused.current = false; };

  const heightClasses = ['h-48', 'h-64', 'h-64', 'h-48'];

  return (
    <div className={`relative ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="grid grid-cols-2 gap-3">
        {[0,1,2,3].map(slot => {
          const i = indices[slot];
          const src = (i >= 0 && i < IMAGES.length) ? IMAGES[i] : null;
          return (
            <div key={slot} className={slot % 2 === 0 ? '' : 'pt-4'}>
              <div className={`rounded-2xl shadow-xl overflow-hidden transform hover:scale-[1.03] transition-all duration-300 ${heightClasses[slot]}`} style={{ background: '#f8fafc' }}>
                <img
                  src={src || ''}
                  alt=""
                  className={`w-full h-full object-cover block transition-all duration-300 ${fading[slot] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                  style={{ willChange: 'opacity, transform' }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
