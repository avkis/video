import {
  CaptionButton,
  FullscreenButton,
  isTrackCaptionKind,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  Tooltip,
  useMediaState,
  type TooltipPlacement,
} from '@vidstack/react';
import {
  PlayIcon,
  CaptionOnIcon,
  CaptionOfIcon,
  EnterFullScreenIcon,
  ExitFullScreenIcon,
  MuteIcon,
  PauseIcon,
  ExitPIPIcon,
  EnterPIPIcon,
  SeekBackwardIcon,
  SeekForwardIcon,
  VolumeHighIcon,
  VolumeLowIcon,
} from '../icons';

export interface MediaButtonProps {
  tooltipPlacement: TooltipPlacement;
}

export function Play({ tooltipPlacement }: MediaButtonProps) {
  const isPaused = useMediaState('paused');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PlayButton className="vds-button">{isPaused ? <PlayIcon /> : <PauseIcon />}</PlayButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isPaused ? 'Play' : 'Pause'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Mute({ tooltipPlacement }: MediaButtonProps) {
  const volume = useMediaState('volume');
  const isMuted = useMediaState('muted');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <MuteButton className="vds-button">
          {isMuted || volume == 0 ? (
            <MuteIcon />
          ) : volume < 0.5 ? (
            <VolumeLowIcon />
          ) : (
            <VolumeHighIcon />
          )}
        </MuteButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isMuted ? 'Unmute' : 'Mute'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Caption({ tooltipPlacement }: MediaButtonProps) {
  const track = useMediaState('textTrack');
  const isOn = track && isTrackCaptionKind(track);
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <CaptionButton className="vds-button">
          {isOn ? <CaptionOnIcon /> : <CaptionOfIcon />}
        </CaptionButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isOn ? 'Closed-Captions Off' : 'Closed-Captions On'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function PIP({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState('pictureInPicture');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <PIPButton className="vds-button">
          {isActive ? <ExitPIPIcon /> : <EnterPIPIcon />}
        </PIPButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isActive ? 'Exit PIP' : 'Enter PIP'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export function Fullscreen({ tooltipPlacement }: MediaButtonProps) {
  const isActive = useMediaState('fullscreen');
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <FullscreenButton className="vds-button">
          {isActive ? <ExitFullScreenIcon /> : <EnterFullScreenIcon />}
        </FullscreenButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isActive ? 'Exit Fullscreen' : 'Enter Fullscreen'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

export interface SeekButtonProps extends MediaButtonProps {
  seconds: number;
}

export function Seek({ seconds, tooltipPlacement }: SeekButtonProps) {
  const isBackward = seconds < 0;
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <SeekButton className="vds-button" seconds={seconds}>
          {isBackward ? <SeekBackwardIcon /> : <SeekForwardIcon />}
        </SeekButton>
      </Tooltip.Trigger>
      <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
        {isBackward ? 'Seek Backward' : 'Seek Forward'}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}
