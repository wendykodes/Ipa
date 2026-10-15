import React, { useEffect, useState } from 'react';

interface MagneticCursorProps {
  cursorLabel?: string;
}

export const MagneticCursor: React.FC<MagneticCursorProps> = ({ cursorLabel }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState(cursorLabel || '');

  useEffect(() => {
    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Check if hovering over magnetic or interactive elements
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-magnetic], button, a, input, [role="button"]');
      if (interactiveEl) {
        setIsHovering(true);
        const customLabel = interactiveEl.getAttribute('data-cursor-label');
        setLabel(customLabel || cursorLabel || 'INSPECT');
      } else {
        setIsHovering(false);
        setLabel(cursorLabel || '');
      }
    };

    const updateCursor = () => {
      // Elastic lerp
      const factor = isHovering ? 0.25 : 0.4;
      currentX += (targetX - currentX) * factor;
      currentY += (targetY - currentY) * factor;

      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [cursorLabel, isHovering]);

  // Don't render on mobile / touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Outer Magnetic Ring */}
      <div
        className={`rounded-full border border-neutral-400/80 transition-all duration-300 flex items-center justify-center ${
          isHovering
            ? 'w-14 h-14 bg-white/10 backdrop-blur-none border-white scale-110'
            : 'w-7 h-7 bg-transparent border-neutral-500/60'
        }`}
      >
        {/* Inner Precision Dot */}
        <div
          className={`rounded-full bg-white transition-all duration-200 ${
            isHovering ? 'w-1.5 h-1.5 bg-[#D4A373]' : 'w-1 h-1'
          }`}
        />
      </div>

      {/* Micro Hover Label */}
      {isHovering && label && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 bg-black/90 border border-neutral-700 text-[8px] font-mono-tech tracking-[0.2em] uppercase text-neutral-300">
          {label}
        </div>
      )}
    </div>
  );
};
