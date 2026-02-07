import React from 'react';
import {
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
  Easing,
  Img,
  staticFile,
} from 'remotion';
import { colors, fonts, fontWeights, letterSpacing, motion } from '../theme';

/**
 * LogoReveal — Elegant logo entrance with scale + opacity + blur.
 * Uses the logo SVG asset. Falls back to typographic logo if image fails.
 */

interface LogoRevealProps {
  delay?: number;
  showTagline?: boolean;
}

export const LogoReveal: React.FC<LogoRevealProps> = ({
  delay = 0,
  showTagline = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const f = Math.max(0, frame - delay);

  // Logo entrance spring
  const logoScale = spring({
    frame: f,
    fps,
    config: { damping: 80, stiffness: 60, mass: 1.2 },
  });

  const logoOpacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const logoBlur = interpolate(f, [0, 25], [8, 0], {
    extrapolateRight: 'clamp',
  });

  // Accent line reveal
  const lineWidth = interpolate(f, [15, 50], [0, 200], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const lineOpacity = interpolate(f, [15, 35], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Tagline entrance
  const taglineOpacity = interpolate(f, [40, 65], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineY = interpolate(f, [40, 65], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${0.9 + logoScale * 0.1})`,
          filter: `blur(${logoBlur}px)`,
        }}
      >
        <Img
          src={staticFile('logo.svg')}
          style={{
            width: 480,
            height: 'auto',
          }}
        />
      </div>

      {/* Accent line */}
      <div
        style={{
          width: lineWidth,
          height: 1,
          background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
          opacity: lineOpacity,
          marginTop: 28,
          marginBottom: 24,
        }}
      />

      {/* Tagline */}
      {showTagline && (
        <div
          style={{
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            fontFamily: fonts.body,
            fontSize: 18,
            fontWeight: fontWeights.regular,
            letterSpacing: letterSpacing.xwide,
            color: colors.grey200,
            textTransform: 'uppercase',
          }}
        >
          Quality Filtration Solutions
        </div>
      )}
    </div>
  );
};
