import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion';
import { BackgroundMotion } from '../components/BackgroundMotion';
import { AccentLine } from '../components/AccentLine';
import { colors, fonts, fontWeights, fontSizes, letterSpacing, springPresets, layout } from '../theme';
import { scenes } from '../timing';

/**
 * Scene 04 — Trust & Quality (11s)
 *
 * Minimal typography. Strong negative space.
 * Core values appear with spring(damping:200) entrances.
 *
 * Narration: "Every product is designed, tested, and manufactured to outperform —
 * delivering consistency, precision, and measurable results."
 */

const pillars = [
  { word: 'Quality', detail: 'Products that outperform the competition' },
  { word: 'Service', detail: 'Custom solutions with 24/7 support' },
  { word: 'Innovation', detail: 'State-of-the-art research and development' },
  { word: 'Integrity', detail: 'The right product for every application' },
];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headingProgress = spring({
    frame,
    fps,
    config: springPresets.smooth,
    delay: Math.round(0.2 * fps),
  });

  return (
    <AbsoluteFill>
      <BackgroundMotion variant="default" intensity={0.5} />

      <AbsoluteFill
        style={{
          padding: `${layout.safeArea.vertical}px ${layout.safeArea.horizontal}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            opacity: interpolate(headingProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headingProgress, [0, 1], [20, 0])}px)`,
            fontFamily: fonts.heading,
            fontSize: fontSizes.xxl,
            fontWeight: fontWeights.bold,
            letterSpacing: letterSpacing.tight,
            lineHeight: 1.1,
            color: colors.white,
            maxWidth: 700,
          }}
        >
          Engineered to Outperform
        </div>

        <Sequence from={Math.round(0.6 * fps)} premountFor={fps}>
          <div style={{ marginTop: 20, marginBottom: 50 }}>
            <AccentLine delay={0} width={100} />
          </div>
        </Sequence>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 60, marginTop: 10 }}>
          {pillars.map((pillar, i) => {
            const itemDelay = Math.round((1.0 + i * 0.5) * fps);
            const inProgress = spring({
              frame: frame - itemDelay,
              fps,
              config: springPresets.smooth,
            });
            const opacity = interpolate(inProgress, [0, 1], [0, 1]);
            const translateY = interpolate(inProgress, [0, 1], [24, 0]);
            const numberOpacity = interpolate(inProgress, [0, 1], [0, 0.08]);
            const lineWidth = interpolate(inProgress, [0, 1], [0, 40]);

            const detailProgress = spring({
              frame: frame - itemDelay - Math.round(0.3 * fps),
              fps,
              config: springPresets.smooth,
            });

            return (
              <div
                key={pillar.word}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  position: 'relative',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: -30,
                    left: -5,
                    fontFamily: fonts.heading,
                    fontSize: 120,
                    fontWeight: fontWeights.bold,
                    color: colors.blue,
                    opacity: numberOpacity,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.lg,
                    fontWeight: fontWeights.semibold,
                    color: colors.white,
                    letterSpacing: letterSpacing.normal,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {pillar.word}
                </div>

                <div
                  style={{
                    width: lineWidth,
                    height: 2,
                    backgroundColor: colors.blue,
                    opacity: interpolate(inProgress, [0, 1], [0, 0.8]),
                  }}
                />

                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.xs,
                    fontWeight: fontWeights.regular,
                    color: colors.grey300,
                    lineHeight: 1.5,
                    maxWidth: 260,
                    opacity: interpolate(detailProgress, [0, 1], [0, 1]),
                  }}
                >
                  {pillar.detail}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
