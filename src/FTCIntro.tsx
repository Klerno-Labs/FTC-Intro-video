import React from 'react';
import { AbsoluteFill } from 'remotion';
import {
  TransitionSeries,
  linearTiming,
} from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Scene01 } from './scenes/Scene01';
import { Scene02 } from './scenes/Scene02';
import { Scene03 } from './scenes/Scene03';
import { Scene04 } from './scenes/Scene04';
import { Scene05 } from './scenes/Scene05';
import { scenes, FPS } from './timing';
import { colors } from './theme';

/**
 * FTCIntro — Main composition using TransitionSeries.
 *
 * Scenes are connected with fade() and slide() transitions
 * from @remotion/transitions per remotion-dev/skills best practices.
 *
 * Transition durations subtract from total video length.
 */

const TRANSITION_DURATION = Math.round(0.8 * FPS); // 24 frames = 0.8s crossfade

export const FTCIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bgDark }}>
      <TransitionSeries>
        {/* Scene 1 — Authority open */}
        <TransitionSeries.Sequence durationInFrames={scenes.scene01.duration}>
          <Scene01 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2 — Industrial environment */}
        <TransitionSeries.Sequence durationInFrames={scenes.scene02.duration}>
          <Scene02 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3 — Product showcase */}
        <TransitionSeries.Sequence durationInFrames={scenes.scene03.duration}>
          <Scene03 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4 — Trust & quality */}
        <TransitionSeries.Sequence durationInFrames={scenes.scene04.duration}>
          <Scene04 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5 — Presentation handoff */}
        <TransitionSeries.Sequence durationInFrames={scenes.scene05.duration}>
          <Scene05 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
