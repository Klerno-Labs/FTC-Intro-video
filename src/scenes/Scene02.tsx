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
import { TextBlock } from '../components/TextBlock';
import { AccentLine } from '../components/AccentLine';
import { IndustrialVisual } from '../components/IndustrialVisual';
import { colors, fonts, fontWeights, letterSpacing, springPresets, layout } from '../theme';
import { scenes } from '../timing';

/**
 * Scene 02 — Industrial Environment (9s)
 *
 * Industry tags stagger in with spring(damping:200) reveals.
 * TransitionSeries handles scene transitions.
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
  const { fps } = useVideoConfig();
  const duration = scenes.scene02.duration;

  const panX = interpolate(frame, [0, duration], [0, -30], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${panX}px)` }}>
        <BackgroundMotion variant="grid" intensity={1.2} />
        <IndustrialVisual variant="system" delay={10} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: `${layout.safeArea.vertical}px ${layout.safeArea.horizontal}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Sequence from={Math.round(0.3 * fps)} premountFor={fps}>
          <div style={{ marginBottom: 16 }}>
            <TextBlock text="Industries Served" variant="label" delay={0} align="left" />
          </div>
        </Sequence>

        <Sequence from={Math.round(0.5 * fps)} premountFor={fps}>
          <AccentLine delay={0} width={80} />
        </Sequence>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 16,
            marginTop: 40,
            maxWidth: 900,
          }}
        >
          {industries.map((industry, i) => {
            const itemDelay = Math.round((0.8 + i * 0.15) * fps);
            const progress = spring({
              frame: frame - itemDelay,
              fps,
              config: springPresets.smooth,
            });
            const opacity = interpolate(progress, [0, 1], [0, 1]);
            const translateY = interpolate(progress, [0, 1], [14, 0]);

            return (
              <div
                key={industry}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  padding: '14px 32px',
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

        <Sequence from={Math.round(2.5 * fps)} premountFor={fps}>
          <div style={{ marginTop: 48, maxWidth: 640 }}>
            <TextBlock
              text="Where reliability is non-negotiable."
              variant="subheading"
              delay={0}
              align="left"
            />
          </div>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
