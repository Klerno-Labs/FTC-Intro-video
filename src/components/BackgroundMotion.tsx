import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from 'remotion';
import { colors, motion } from '../theme';

/**
 * BackgroundMotion — Animated dark gradient background with subtle
 * moving geometric elements that suggest industrial precision.
 */

interface BackgroundMotionProps {
  variant?: 'default' | 'gradient' | 'grid' | 'particles';
  intensity?: number;
}

export const BackgroundMotion: React.FC<BackgroundMotionProps> = ({
  variant = 'default',
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  // Slow continuous drift
  const drift = interpolate(frame, [0, 900], [0, 1], {
    extrapolateRight: 'extend',
  });

  // Subtle gradient shift
  const gradientAngle = interpolate(frame, [0, 1800], [135, 155], {
    extrapolateRight: 'extend',
  });

  const baseGradient = `linear-gradient(${gradientAngle}deg, ${colors.bgDark} 0%, ${colors.navy} 50%, ${colors.navyLight} 100%)`;

  return (
    <AbsoluteFill>
      {/* Base gradient */}
      <AbsoluteFill
        style={{
          background: baseGradient,
        }}
      />

      {/* Grid pattern overlay */}
      {(variant === 'default' || variant === 'grid') && (
        <AbsoluteFill
          style={{
            opacity: 0.04 * intensity,
            backgroundImage: `
              linear-gradient(${colors.grey300} 1px, transparent 1px),
              linear-gradient(90deg, ${colors.grey300} 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            transform: `translate(${drift * -20}px, ${drift * -10}px)`,
          }}
        />
      )}

      {/* Floating geometric accents */}
      {(variant === 'default' || variant === 'particles') &&
        Array.from({ length: 6 }).map((_, i) => {
          const baseX = 200 + i * 300;
          const baseY = 150 + (i % 3) * 300;
          const size = 80 + i * 40;
          const speed = 0.3 + i * 0.1;

          const x = interpolate(
            frame,
            [0, 1800],
            [baseX, baseX + 60 * speed],
            { extrapolateRight: 'extend' }
          );
          const y = interpolate(
            frame,
            [0, 1800],
            [baseY, baseY - 40 * speed],
            { extrapolateRight: 'extend' }
          );
          const opacity = interpolate(
            frame,
            [0, 60, 1200, 1800],
            [0, 0.03 * intensity, 0.05 * intensity, 0.02 * intensity],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: size,
                height: size,
                border: `1px solid ${colors.blueSubtle}`,
                borderRadius: i % 2 === 0 ? '50%' : '4px',
                opacity,
                transform: `rotate(${drift * 20 + i * 15}deg)`,
              }}
            />
          );
        })}

      {/* Horizontal accent lines */}
      {Array.from({ length: 3 }).map((_, i) => {
        const lineY = 200 + i * 300;
        const lineWidth = interpolate(
          frame,
          [30 + i * 20, 80 + i * 20],
          [0, 400 + i * 200],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.bezier(...motion.easeOut),
          }
        );
        const lineOpacity = interpolate(
          frame,
          [30 + i * 20, 60 + i * 20, 300],
          [0, 0.06 * intensity, 0.03 * intensity],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );

        return (
          <div
            key={`line-${i}`}
            style={{
              position: 'absolute',
              left: 0,
              top: lineY,
              width: lineWidth,
              height: 1,
              background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
              opacity: lineOpacity,
            }}
          />
        );
      })}

      {/* Vignette overlay */}
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(6,14,26,0.6) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
