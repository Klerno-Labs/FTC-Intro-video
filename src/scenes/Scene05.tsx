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
import { colors, fonts, fontWeights, fontSizes, letterSpacing, springPresets } from '../theme';
import { scenes } from '../timing';

/**
 * Scene 05 — Presentation Handoff (7s)
 *
 * Calm ending with brand mark. spring(damping:200) entrance.
 * TransitionSeries handles the final fade.
 *
 * Narration: "Filtration Technology Corporation.
 * Quality matched by unparalleled service."
 */

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(0.3 * fps),
  });
  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.95, 1]);

  const lineProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(0.8 * fps),
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 160]);

  const closingProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(1.3 * fps),
  });
  const closingOpacity = interpolate(closingProgress, [0, 1], [0, 1]);
  const closingY = interpolate(closingProgress, [0, 1], [10, 0]);

  return (
    <AbsoluteFill>
      <BackgroundMotion variant="default" intensity={0.4} />

      <AbsoluteFill
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})` }}>
          <Img src={staticFile('logo.svg')} style={{ width: 400, height: 'auto' }} />
        </div>

        <div
          style={{
            width: lineWidth,
            height: 1,
            background: `linear-gradient(90deg, transparent, ${colors.blue}, transparent)`,
            opacity: interpolate(lineProgress, [0, 1], [0, 1]),
            marginTop: 32,
            marginBottom: 28,
          }}
        />

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
    </AbsoluteFill>
  );
};
