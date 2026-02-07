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
import { colors, fonts, fontWeights, fontSizes, letterSpacing, motion, layout } from '../theme';
import { scenes, transitions } from '../timing';

/**
 * Scene 03 — What FTC Delivers (11s)
 *
 * Product categories with performance focus.
 * Visual rhythm synced to narration cadence.
 *
 * Narration: "Invicta liquid-solid filtration. Strata liquid-liquid separation.
 * Tersus gas filtration. Engineered for performance. Built for demanding environments."
 */

interface ProductLine {
  name: string;
  description: string;
  detail: string;
  visualVariant: 'filtration' | 'separation' | 'system';
}

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
  const duration = scenes.scene03.duration;

  // Calculate which product is "active" based on timing
  const productDuration = Math.floor(duration / products.length);

  return (
    <FadeTransition totalDuration={duration} fadeInDuration={15} fadeOutDuration={15}>
      <AbsoluteFill>
        <BackgroundMotion variant="particles" intensity={0.6} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          padding: `${layout.safeArea.vertical}px ${layout.safeArea.horizontal}px`,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* Left column — Product list */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          <TextBlock
            text="Filtration Solutions"
            variant="label"
            delay={5}
            align="left"
          />
          <AccentLine delay={12} width={60} />

          {products.map((product, i) => {
            const itemDelay = 20 + i * 30;
            const f = Math.max(0, frame - itemDelay);

            const opacity = interpolate(f, [0, 25], [0, 1], {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(...motion.easeOut),
            });

            const translateX = interpolate(f, [0, 25], [-30, 0], {
              extrapolateRight: 'clamp',
              easing: Easing.bezier(...motion.easeOut),
            });

            // Active highlight — product pulses when narration reaches it
            const isActive =
              frame >= itemDelay + 10 && frame < itemDelay + productDuration;
            const highlightOpacity = isActive
              ? interpolate(
                  frame - (itemDelay + 10),
                  [0, 15],
                  [0, 1],
                  { extrapolateRight: 'clamp' }
                )
              : 0;

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
                  borderLeft: `2px solid ${
                    isActive
                      ? colors.blue
                      : `rgba(46, 109, 173, ${0.2 + highlightOpacity * 0.8})`
                  }`,
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

        {/* Right column — Abstract industrial visual */}
        <div style={{ flex: 1, position: 'relative', height: '100%' }}>
          {products.map((product, i) => {
            const itemDelay = 20 + i * 30;
            const f = Math.max(0, frame - itemDelay);
            const visualOpacity = interpolate(
              f,
              [0, 20, productDuration - 10, productDuration],
              [0, 0.15, 0.15, 0],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );

            return (
              <AbsoluteFill key={product.name} style={{ opacity: visualOpacity }}>
                <IndustrialVisual variant={product.visualVariant} delay={0} />
              </AbsoluteFill>
            );
          })}
        </div>
      </AbsoluteFill>
    </FadeTransition>
  );
};
