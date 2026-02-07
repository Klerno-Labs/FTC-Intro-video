import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Easing,
} from 'remotion';
import { BackgroundMotion } from '../components/BackgroundMotion';
import { TextBlock } from '../components/TextBlock';
import { AccentLine } from '../components/AccentLine';
import { FadeTransition } from '../components/FadeTransition';
import { colors, fonts, fontWeights, fontSizes, letterSpacing, motion, layout } from '../theme';
import { scenes, transitions } from '../timing';

/**
 * Scene 04 — Trust & Quality (11s)
 *
 * Minimal typography. Strong negative space.
 * Core values appear one by one with quiet confidence.
 *
 * Narration: "Every product is designed, tested, and manufactured to outperform —
 * delivering consistency, precision, and measurable results."
 */

const pillars = [
  {
    word: 'Quality',
    detail: 'Products that outperform the competition',
  },
  {
    word: 'Service',
    detail: 'Custom solutions with 24/7 support',
  },
  {
    word: 'Innovation',
    detail: 'State-of-the-art research and development',
  },
  {
    word: 'Integrity',
    detail: 'The right product for every application',
  },
];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = scenes.scene04.duration;

  return (
    <FadeTransition totalDuration={duration} fadeInDuration={15} fadeOutDuration={15}>
      <AbsoluteFill>
        <BackgroundMotion variant="default" intensity={0.5} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: `${layout.safeArea.vertical}px ${layout.safeArea.horizontal}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Heading */}
        <TextBlock
          text="Engineered to Outperform"
          variant="heading"
          delay={5}
          align="left"
          maxWidth={700}
        />

        <div style={{ marginTop: 20, marginBottom: 50 }}>
          <AccentLine delay={20} width={100} />
        </div>

        {/* Four pillars grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 60,
            marginTop: 10,
          }}
        >
          {pillars.map((pillar, i) => {
            const itemDelay = 30 + i * 18;
            const f = Math.max(0, frame - itemDelay);

            const opacity = interpolate(f, [0, 25], [0, 1], {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(...motion.easeOut),
            });

            const translateY = interpolate(f, [0, 25], [24, 0], {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(...motion.easeOut),
            });

            // Counter animation for the number
            const numberOpacity = interpolate(f, [10, 30], [0, 0.15], {
              extrapolateRight: 'clamp',
              extrapolateLeft: 'clamp',
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
                {/* Large background number */}
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

                {/* Pillar word */}
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

                {/* Small accent line */}
                <div
                  style={{
                    width: interpolate(f, [15, 40], [0, 40], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                      easing: Easing.bezier(...motion.easeOut),
                    }),
                    height: 2,
                    backgroundColor: colors.blue,
                    opacity: interpolate(f, [15, 35], [0, 0.8], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                    }),
                  }}
                />

                {/* Detail text */}
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.xs,
                    fontWeight: fontWeights.regular,
                    color: colors.grey300,
                    lineHeight: 1.5,
                    maxWidth: 260,
                    opacity: interpolate(f, [20, 40], [0, 1], {
                      extrapolateRight: 'clamp',
                      extrapolateLeft: 'clamp',
                    }),
                  }}
                >
                  {pillar.detail}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </FadeTransition>
  );
};
