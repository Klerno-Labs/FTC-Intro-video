import React from 'react';
import { Composition } from 'remotion';
import { FTCIntro } from './FTCIntro';
import { FPS, TOTAL_DURATION } from './timing';
import { layout } from './theme';

/**
 * Root — Remotion entry point.
 * Registers all compositions available in the studio.
 */

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FTCIntro"
        component={FTCIntro}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={layout.width}
        height={layout.height}
      />
    </>
  );
};
