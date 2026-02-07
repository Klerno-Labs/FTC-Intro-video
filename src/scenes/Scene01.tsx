import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { BackgroundMotion } from '../components/BackgroundMotion';
import { LogoReveal } from '../components/LogoReveal';
import { FadeTransition } from '../components/FadeTransition';
import { scenes } from '../timing';

/**
 * Scene 01 — Authority Open (6s)
 *
 * Logo reveal on dark, engineered background.
 * Establishes brand presence with calm confidence.
 *
 * Narration: "Since 1987, Filtration Technology Corporation has been
 * engineering quality filtration solutions — at the forefront of
 * filtration technology."
 */

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const duration = scenes.scene01.duration;

  // Subtle camera push-in
  const scale = interpolate(frame, [0, duration], [1.0, 1.02], {
    extrapolateRight: 'clamp',
  });

  return (
    <FadeTransition totalDuration={duration} fadeInDuration={20} fadeOutDuration={15}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <BackgroundMotion variant="default" intensity={0.8} />
        <AbsoluteFill
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LogoReveal delay={10} showTagline={true} />
        </AbsoluteFill>
      </AbsoluteFill>
    </FadeTransition>
  );
};
