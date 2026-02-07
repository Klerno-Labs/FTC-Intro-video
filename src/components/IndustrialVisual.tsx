import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from 'remotion';
import { colors, motion } from '../theme';

/**
 * IndustrialVisual — Abstract geometric representation of filtration
 * systems and industrial processes. SVG-based, no external images needed.
 *
 * Creates a technical schematic aesthetic with animated elements.
 */

interface IndustrialVisualProps {
  variant?: 'filtration' | 'separation' | 'system';
  delay?: number;
}

export const IndustrialVisual: React.FC<IndustrialVisualProps> = ({
  variant = 'filtration',
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  const reveal = interpolate(f, [0, 60], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const opacity = interpolate(f, [0, 30], [0, 0.2], {
    extrapolateRight: 'clamp',
  });

  // Animated flow particles
  const flowOffset = interpolate(frame, [0, 120], [0, 200], {
    extrapolateRight: 'extend',
  });

  return (
    <AbsoluteFill style={{ opacity }}>
      <svg
        viewBox="0 0 1920 1080"
        style={{ width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Technical grid */}
        <defs>
          <pattern
            id="techGrid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={colors.steel}
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#techGrid)" />

        {variant === 'filtration' && (
          <>
            {/* Vessel outline */}
            <rect
              x={760}
              y={200}
              width={400}
              height={680}
              rx={200}
              fill="none"
              stroke={colors.blue}
              strokeWidth={1.5}
              strokeDasharray={`${reveal * 2400}`}
              strokeDashoffset={2400 - reveal * 2400}
              opacity={0.6}
            />
            {/* Internal filter layers */}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={i}
                x1={820}
                y1={320 + i * 70}
                x2={820 + reveal * 280}
                y2={320 + i * 70}
                stroke={colors.blueLight}
                strokeWidth={1}
                opacity={0.3 * reveal}
              />
            ))}
            {/* Flow indicators */}
            {Array.from({ length: 5 }).map((_, i) => {
              const yPos = 300 + i * 100;
              const xPos =
                660 - ((flowOffset + i * 40) % 200);
              return (
                <circle
                  key={`flow-${i}`}
                  cx={xPos}
                  cy={yPos}
                  r={3}
                  fill={colors.blueLight}
                  opacity={0.4 * reveal}
                />
              );
            })}
          </>
        )}

        {variant === 'separation' && (
          <>
            {/* Dual-chamber vessel */}
            <rect
              x={600}
              y={240}
              width={720}
              height={600}
              rx={8}
              fill="none"
              stroke={colors.blue}
              strokeWidth={1}
              strokeDasharray={`${reveal * 3000}`}
              strokeDashoffset={3000 - reveal * 3000}
              opacity={0.5}
            />
            {/* Divider */}
            <line
              x1={960}
              y1={240}
              x2={960}
              y2={240 + reveal * 600}
              stroke={colors.blueLight}
              strokeWidth={1.5}
              opacity={0.6}
            />
            {/* Coalescing media dots (left) */}
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={`coal-${i}`}
                cx={700 + (i % 4) * 60}
                cy={360 + Math.floor(i / 4) * 80}
                r={8 * reveal}
                fill="none"
                stroke={colors.gold}
                strokeWidth={0.8}
                opacity={0.4}
              />
            ))}
          </>
        )}

        {variant === 'system' && (
          <>
            {/* Pipeline layout */}
            <path
              d={`M 200 540 H ${200 + reveal * 500} L ${200 + reveal * 500} 340 H ${200 + reveal * 900}`}
              fill="none"
              stroke={colors.blue}
              strokeWidth={2}
              opacity={0.5}
            />
            <path
              d={`M 200 540 H ${200 + reveal * 500} L ${200 + reveal * 500} 740 H ${200 + reveal * 900}`}
              fill="none"
              stroke={colors.blueSubtle}
              strokeWidth={2}
              opacity={0.4}
            />
            {/* Component nodes */}
            {[
              { x: 500, y: 540 },
              { x: 700, y: 340 },
              { x: 700, y: 740 },
              { x: 1100, y: 340 },
              { x: 1100, y: 740 },
            ].map((pos, i) => (
              <React.Fragment key={`node-${i}`}>
                <rect
                  x={pos.x - 30 * reveal}
                  y={pos.y - 30 * reveal}
                  width={60 * reveal}
                  height={60 * reveal}
                  rx={4}
                  fill="none"
                  stroke={colors.blue}
                  strokeWidth={1}
                  opacity={0.5}
                />
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={4 * reveal}
                  fill={colors.blue}
                  opacity={0.6}
                />
              </React.Fragment>
            ))}
          </>
        )}
      </svg>
    </AbsoluteFill>
  );
};
