import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene01 } from './scenes/Scene01';
import { Scene02 } from './scenes/Scene02';
import { Scene03 } from './scenes/Scene03';
import { Scene04 } from './scenes/Scene04';
import { Scene05 } from './scenes/Scene05';
import { scenes } from './timing';
import { colors } from './theme';

/**
 * FTCIntro — Main composition.
 *
 * Orchestrates all five scenes with sequential timing.
 * Each scene handles its own fade-in/fade-out transitions.
 */

export const FTCIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgDark }}>
      <Sequence from={scenes.scene01.start} durationInFrames={scenes.scene01.duration}>
        <Scene01 />
      </Sequence>

      <Sequence from={scenes.scene02.start} durationInFrames={scenes.scene02.duration}>
        <Scene02 />
      </Sequence>

      <Sequence from={scenes.scene03.start} durationInFrames={scenes.scene03.duration}>
        <Scene03 />
      </Sequence>

      <Sequence from={scenes.scene04.start} durationInFrames={scenes.scene04.duration}>
        <Scene04 />
      </Sequence>

      <Sequence from={scenes.scene05.start} durationInFrames={scenes.scene05.duration}>
        <Scene05 />
      </Sequence>
    </AbsoluteFill>
  );
};
