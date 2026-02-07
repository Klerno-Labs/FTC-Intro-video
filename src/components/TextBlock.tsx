import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import {
  colors,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacing,
  motion,
} from '../theme';

/**
 * TextBlock — Animated typography component with fade + slide entrance.
 * Used for headings, subheadings, and body text across all scenes.
 */

type TextVariant = 'heading' | 'subheading' | 'body' | 'label' | 'metric';

interface TextBlockProps {
  text: string;
  variant?: TextVariant;
  delay?: number;
  duration?: number;
  fadeOut?: boolean;
  fadeOutStart?: number;
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;
  color?: string;
}

const variantStyles: Record<
  TextVariant,
  {
    fontSize: number;
    fontWeight: number;
    letterSpacing: string;
    lineHeight: number;
    uppercase: boolean;
    color: string;
  }
> = {
  heading: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: 1.1,
    uppercase: false,
    color: colors.white,
  },
  subheading: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.light,
    letterSpacing: letterSpacing.normal,
    lineHeight: 1.3,
    uppercase: false,
    color: colors.grey100,
  },
  body: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.regular,
    letterSpacing: letterSpacing.normal,
    lineHeight: 1.5,
    uppercase: false,
    color: colors.grey200,
  },
  label: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    letterSpacing: letterSpacing.xwide,
    lineHeight: 1.4,
    uppercase: true,
    color: colors.grey300,
  },
  metric: {
    fontSize: fontSizes.hero,
    fontWeight: fontWeights.bold,
    letterSpacing: letterSpacing.tight,
    lineHeight: 1.0,
    uppercase: false,
    color: colors.blue,
  },
};

export const TextBlock: React.FC<TextBlockProps> = ({
  text,
  variant = 'body',
  delay = 0,
  duration = 25,
  fadeOut = false,
  fadeOutStart,
  align = 'left',
  maxWidth,
  color,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  const style = variantStyles[variant];

  // Entrance animation
  const opacity = interpolate(f, [0, duration], [0, 1], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const translateY = interpolate(f, [0, duration], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  // Exit animation
  let exitOpacity = 1;
  if (fadeOut && fadeOutStart !== undefined) {
    const ef = Math.max(0, frame - fadeOutStart);
    exitOpacity = interpolate(ef, [0, 15], [1, 0], {
      extrapolateRight: 'clamp',
    });
  }

  return (
    <div
      style={{
        opacity: opacity * exitOpacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: fonts.heading,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        lineHeight: style.lineHeight,
        textTransform: style.uppercase ? 'uppercase' : 'none',
        color: color || style.color,
        textAlign: align,
        maxWidth: maxWidth || 'none',
      }}
    >
      {text}
    </div>
  );
};
