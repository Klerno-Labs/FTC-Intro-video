import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
  Img,
  staticFile,
} from 'remotion';
import { BackgroundMotion } from '../components/BackgroundMotion';
import { FadeTransition } from '../components/FadeTransition';
import { colors, fonts, fontWeights, fontSizes, letterSpacing, motion, layout } from '../theme';
import { scenes } from '../timing';

/**
 * Scene 05 — Presentation Handoff (6s)
 *
 * Calm ending that returns to brand mark.
 * Prepares viewer for the salesperson presentation.
 *
 * Narration: "Filtration Technology Corporation.
 * Quality matched by unparalleled service."
 */

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = scenes.scene05.duration;

  // Logo re-entrance
  const logoOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const logoScale = interpolate(frame, [10, 35], [0.95, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  // Closing line
  const closingOpacity = interpolate(frame, [40, 65], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const closingY = interpolate(frame, [40, 65], [10, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  // Accent line
  const lineWidth = interpolate(frame, [25, 55], [0, 160], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const lineOpacity = interpolate(frame, [25, 45], [0, 1], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });

  return (
    <FadeTransition totalDuration={duration} fadeInDuration={15} fadeOutDuration={20}>
      <AbsoluteFill>
        <BackgroundMotion variant="default" intensity={0.4} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Logo */}
        <div
          style={{
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <Img
            src={staticFile('logo.svg')}
            style={{
              width: 400,
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
            marginTop: 32,
            marginBottom: 28,
          }}
        />

        {/* Closing statement */}
        <div
          style={{
            opacity: closingOpacity,
            transform: `translateY(${closingY}px)`,
            fontFamily: fonts.body,
            fontSize: fontSizes.sm,
            fontWeight: fontWeights.regular,
            letterSpacing: letterSpacing.xwide,
            color: colors.grey200,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Quality Matched by Unparalleled Service
        </div>
      </AbsoluteFill>
    </FadeTransition>
  );
};
