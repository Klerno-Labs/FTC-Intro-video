import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { colors, motion } from '../theme';

/**
 * AccentLine — Animated horizontal rule accent.
 */

interface AccentLineProps {
  delay?: number;
  width?: number;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const AccentLine: React.FC<AccentLineProps> = ({
  delay = 0,
  width = 120,
  color = colors.blue,
  align = 'left',
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);

  const lineWidth = interpolate(f, [0, 30], [0, width], {
    extrapolateRight: 'clamp',
    easing: Easing.bezier(...motion.easeOut),
  });

  const opacity = interpolate(f, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent:
          align === 'center'
            ? 'center'
            : align === 'right'
              ? 'flex-end'
              : 'flex-start',
      }}
    >
      <div
        style={{
          width: lineWidth,
          height: 2,
          backgroundColor: color,
          opacity,
        }}
      />
    </div>
  );
};
