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
import { IndustrialVisual } from '../components/IndustrialVisual';
import { FadeTransition } from '../components/FadeTransition';
import { colors, fonts, fontWeights, letterSpacing, motion, layout } from '../theme';
import { scenes, transitions } from '../timing';

/**
 * Scene 02 — Industrial Environment (9s)
 *
 * Visual cues of manufacturing and filtration systems.
 * Subtle text overlays show industries served.
 *
 * Narration: "From oil and gas to chemical processing, power generation,
 * and water treatment — FTC systems operate where reliability is non-negotiable."
 */

const industries = [
  'Oil & Gas',
  'Chemical Processing',
  'Power Generation',
  'Water Treatment',
  'Food & Beverage',
  'Semiconductor',
];

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = scenes.scene02.duration;

  // Slow pan
  const panX = interpolate(frame, [0, duration], [0, -30], {
    extrapolateRight: 'clamp',
  });

  return (
    <FadeTransition totalDuration={duration} fadeInDuration={15} fadeOutDuration={15}>
      <AbsoluteFill style={{ transform: `translateX(${panX}px)` }}>
        <BackgroundMotion variant="grid" intensity={1.2} />
        <IndustrialVisual variant="system" delay={10} />
      </AbsoluteFill>

      {/* Content overlay */}
      <AbsoluteFill
        style={{
          padding: `${layout.safeArea.vertical}px ${layout.safeArea.horizontal}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: 16 }}>
          <TextBlock
            text="Industries Served"
            variant="label"
            delay={10}
            align="left"
          />
        </div>

        <AccentLine delay={20} width={80} />

        {/* Industry tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 40,
            maxWidth: 800,
          }}
        >
          {industries.map((industry, i) => {
            const itemDelay = 30 + i * transitions.stagger;
            const f = Math.max(0, frame - itemDelay);

            const opacity = interpolate(f, [0, 20], [0, 1], {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(...motion.easeOut),
            });

            const translateY = interpolate(f, [0, 20], [14, 0], {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(...motion.easeOut),
            });

            return (
              <div
                key={industry}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  padding: '12px 28px',
                  border: `1px solid ${colors.blueSubtle}`,
                  borderRadius: 4,
                  fontFamily: fonts.body,
                  fontSize: 18,
                  fontWeight: fontWeights.medium,
                  letterSpacing: letterSpacing.wide,
                  color: colors.grey100,
                  textTransform: 'uppercase',
                  background: 'rgba(30, 58, 95, 0.15)',
                }}
              >
                {industry}
              </div>
            );
          })}
        </div>

        {/* Supporting text */}
        <div style={{ marginTop: 48, maxWidth: 640 }}>
          <TextBlock
            text="Where reliability is non-negotiable."
            variant="subheading"
            delay={70}
            align="left"
          />
        </div>
      </AbsoluteFill>
    </FadeTransition>
  );
};
