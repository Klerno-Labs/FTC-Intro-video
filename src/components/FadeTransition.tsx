import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

/**
 * FadeTransition — Wraps children with fade-in and optional fade-out.
 */

interface FadeTransitionProps {
  children: React.ReactNode;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  totalDuration: number;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  fadeInDuration = 15,
  fadeOutDuration = 15,
  totalDuration,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, fadeInDuration, totalDuration - fadeOutDuration, totalDuration],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
  );

  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};
