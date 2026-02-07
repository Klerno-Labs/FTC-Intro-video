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
import { colors, fonts, fontWeights, fontSizes, letterSpacing, springPresets, layout } from '../theme';
import { scenes } from '../timing';

/**
 * Scene 03 — What FTC Delivers (11s)
 *
 * Products slide in with spring(damping:200), active highlight borders.
 * TransitionSeries handles scene transitions.
 *
 * Narration: "Invicta liquid-solid filtration. Strata liquid-liquid separation.
 * Tersus gas filtration. Engineered for performance. Built for demanding environments."
 */

type ProductLine = {
  name: string;
  description: string;
  detail: string;
  visualVariant: 'filtration' | 'separation' | 'system';
};

const products: ProductLine[] = [
  {
    name: 'Invicta',
    description: 'Liquid-Solid Filtration',
    detail: '99.98% efficiency  \u00B7  Up to 1200 GPM',
    visualVariant: 'filtration',
  },
  {
    name: 'Strata',
    description: 'Liquid-Liquid Separation',
    detail: 'Coalescing technology  \u00B7  Process reliability',
    visualVariant: 'separation',
  },
  {
    name: 'Tersus',
    description: 'Gas Filtration',
    detail: 'Downstream protection  \u00B7  High performance',
    visualVariant: 'system',
  },
];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = scenes.scene03.duration;
  const productInterval = Math.floor(duration / products.length);

  return (
    <AbsoluteFill>
      <BackgroundMotion variant="particles" intensity={0.6} />

      <AbsoluteFill
        style={{
          padding: `${layout.safeArea.vertical}px ${layout.safeArea.horizontal}px`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 40 }}>
          <Sequence from={Math.round(0.2 * fps)} premountFor={fps}>
            <TextBlock text="Filtration Solutions" variant="label" delay={0} align="left" />
          </Sequence>

          <Sequence from={Math.round(0.4 * fps)} premountFor={fps}>
            <AccentLine delay={0} width={60} />
          </Sequence>

          {products.map((product, i) => {
            const productDelay = Math.round((0.8 + i * 1.0) * fps);
            const inProgress = spring({
              frame: frame - productDelay,
              fps,
              config: springPresets.smooth,
            });
            const opacity = interpolate(inProgress, [0, 1], [0, 1]);
            const translateX = interpolate(inProgress, [0, 1], [-30, 0]);
            const isActive =
              frame >= productDelay + Math.round(0.3 * fps) &&
              frame < productDelay + productInterval;

            return (
              <div
                key={product.name}
                style={{
                  opacity,
                  transform: `translateX(${translateX}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  paddingLeft: 20,
                  borderLeft: `2px solid ${isActive ? colors.blue : 'rgba(46, 109, 173, 0.2)'}`,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: fontSizes.xl,
                    fontWeight: fontWeights.bold,
                    color: colors.white,
                    letterSpacing: letterSpacing.tight,
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.md,
                    fontWeight: fontWeights.regular,
                    color: colors.grey200,
                    letterSpacing: letterSpacing.wide,
                    textTransform: 'uppercase',
                  }}
                >
                  {product.description}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: fontSizes.sm,
                    fontWeight: fontWeights.regular,
                    color: colors.grey300,
                    marginTop: 2,
                  }}
                >
                  {product.detail}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          {products.map((product, i) => {
            const productDelay = Math.round((0.8 + i * 1.0) * fps);
            const visualIn = spring({
              frame: frame - productDelay,
              fps,
              config: springPresets.gentle,
            });
            const visualOpacity = interpolate(visualIn, [0, 1], [0, 0.18]);

            return (
              <AbsoluteFill key={product.name} style={{ opacity: visualOpacity }}>
                <IndustrialVisual variant={product.visualVariant} delay={0} />
              </AbsoluteFill>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
