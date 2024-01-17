import {
  CaptionOnIcon,
  CaptionOfIcon,
  EnterPIPIcon,
  ExitPIPIcon,
  ExitFullScreenIcon,
  EnterFullScreenIcon,
  MenuArrowLeftIcon,
  MenuArrowRightIcon,
  MenuAudioIcon,
  MenuChaptersIcon,
  MenuQualityIcon,
  MenuCaptionsIcon,
  MenuSettingsIcon,
  MenuSpeedIcon,
  PlayIcon,
  PauseIcon,
  ReplayIcon,
  MuteIcon,
  VolumeLowIcon,
  VolumeHighIcon, SeekBackwardIcon, SeekForwardIcon
} from "./icons";
import {createIcon} from "../../shared/icon/utils.ts";
import {DefaultLayoutIcons} from "@vidstack/react/player/layouts/default";


export const customIcons: DefaultLayoutIcons = {
  PlayButton: {
    Play: createIcon(PlayIcon),
    Pause: createIcon(PauseIcon),
    Replay: createIcon(ReplayIcon),
  },
  MuteButton: {
    Mute: createIcon(MuteIcon),
    VolumeLow: createIcon(VolumeLowIcon),
    VolumeHigh: createIcon(VolumeHighIcon),
  },
  CaptionButton: {
    On: createIcon(CaptionOnIcon),
    Off: createIcon(CaptionOfIcon),
  },
  PIPButton: {
    Enter: createIcon(EnterPIPIcon),
    Exit: createIcon(ExitPIPIcon),
  },
  FullscreenButton: {
    Enter: createIcon(EnterFullScreenIcon),
    Exit: createIcon(ExitFullScreenIcon),
  },
  SeekButton: {
    Backward: createIcon(SeekBackwardIcon),
    Forward: createIcon(SeekForwardIcon),
  },
  Menu: {
    ArrowLeft: createIcon(MenuArrowLeftIcon),
    ArrowRight: createIcon(MenuArrowRightIcon),
    Audio: createIcon(MenuAudioIcon),
    Chapters: createIcon(MenuChaptersIcon),
    Quality: createIcon(MenuQualityIcon),
    Captions: createIcon(MenuCaptionsIcon),
    Settings: createIcon(MenuSettingsIcon),
    Speed: createIcon(MenuSpeedIcon),
  },
};
