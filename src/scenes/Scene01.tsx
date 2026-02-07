import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from 'remotion';
import { BackgroundMotion } from '../components/BackgroundMotion';
import { colors, fonts, fontWeights, letterSpacing, springPresets } from '../theme';
import { scenes } from '../timing';

/**
 * Scene 01 — Authority Open (7s)
 *
 * Logo reveal on dark, engineered background.
 * Uses spring(damping:200) for smooth corporate reveal (no bounce).
 * TransitionSeries handles fade-in/out between scenes.
 *
 * Narration: "Since 1987, Filtration Technology Corporation has been
 * engineering quality filtration solutions — at the forefront of
 * filtration technology."
 */

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = scenes.scene01.duration;

  // Logo entrance — smooth corporate spring
  const logoProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(0.3 * fps),
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.92, 1]);
  const logoBlur = interpolate(logoProgress, [0, 1], [6, 0]);

  // Accent line
  const lineProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(1.2 * fps),
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 200]);

  // Tagline
  const taglineProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(1.6 * fps),
  });
  const taglineOpacity = interpolate(taglineProgress, [0, 1], [0, 1]);
  const taglineY = interpolate(taglineProgress, [0, 1], [12, 0]);

  // "Since 1987"
  const sinceProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(2.2 * fps),
  });

  // Subtle camera push-in
  const scale = interpolate(frame, [0, duration], [1.0, 1.015], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ transform: `scale(${scale})` }}>
      <BackgroundMotion variant="default" intensity={0.8} />
      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* "Since 1987" */}
        <div
          style={{
            opacity: interpolate(sinceProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(sinceProgress, [0, 1], [8, 0])}px)`,
            fontFamily: fonts.body,
            fontSize: 14,
            fontWeight: fontWeights.regular,
            letterSpacing: letterSpacing.xxwide,
            color: colors.grey300,
            textTransform: 'uppercase',
            marginBottom: 28,
          }}
        >
          Est. 1987 &middot; Houston, Texas
        </div>

        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            filter: `blur(${logoBlur}px)`,
          }}
        >
          <Img
            src={staticFile('logo.svg')}
            style={{ width: 480, height: 'auto' }}
          />
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
            opacity: interpolate(lineProgress, [0, 1], [0, 1]),
            marginTop: 28,
            marginBottom: 24,
          }}
        />

        {/* Tagline */}
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
          At the Forefront of Filtration Technology
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
