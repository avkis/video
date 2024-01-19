import React from "react";
import {DefaultLayoutIcons} from "@vidstack/react/player/layouts/default";
import {MediaState} from "@vidstack/react";
import * as TooltipBase from './tooltip';

declare const DefaultLayoutContext: React.Context<DefaultLayoutContext>;
interface DefaultLayoutContext {
  thumbnails?: string;
  menuContainer?: React.RefObject<HTMLElement | null>;
  translations?: DefaultLayoutTranslations | null;
  isSmallLayout: boolean;
  showMenuDelay?: number;
  showTooltipDelay?: number;
  hideQualityBitrate?: boolean;
  menuGroup: 'top' | 'bottom';
  noModal: boolean;
  Icons: DefaultLayoutIcons;
}


export type PrimitivePropsWithRef<E extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<E>,
  'style'
> & {
  asChild?: boolean;
  style?:
    | React.CSSProperties
    | (React.CSSProperties & Record<`--${string}`, string | null | undefined>)
    | undefined;
};

export interface ThumbnailCoords {
  x: number;
  y: number;
}

export interface ThumbnailImageInit {
  url: string | URL;
  startTime: number;
  endTime?: number;
  width?: number;
  height?: number;
  coords?: ThumbnailCoords;
}

export interface ThumbnailTile {
  startTime: number;
  x: number;
  y: number;
}

export interface ThumbnailStoryboard {
  url: string;
  tileWidth: number;
  tileHeight: number;
  tiles: ThumbnailTile[];
}

export interface MuxThumbnailTile {
  start: number;
  x: number;
  y: number;
}

export interface MuxThumbnailStoryboard {
  url: string;
  tile_width: number;
  tile_height: number;
  tiles: MuxThumbnailTile[];
}

export type ThumbnailSrc =
  | string
  | ThumbnailImageInit[]
  | ThumbnailStoryboard
  | MuxThumbnailStoryboard
  | null;

export type DefaultLayoutWord =
  | 'Closed-Captions Off'
  | 'Closed-Captions On'
  | 'Enter Fullscreen'
  | 'Enter PiP'
  | 'Exit Fullscreen'
  | 'Exit PiP'
  | 'Font Styles'
  | 'Font Family'
  | 'Font Size'
  | 'Text Color'
  | 'Text Opacity'
  | 'Text Shadow'
  | 'Background Color'
  | 'Background Opacity'
  | 'Display Background Color'
  | 'Display Background Opacity'
  | 'Reset'
  | 'Seek Backward'
  | 'Seek Forward'
  | 'AirPlay'
  | 'Audio'
  | 'Auto'
  | 'Captions'
  | 'Chapters'
  | 'Connected'
  | 'Connecting'
  | 'Disconnected'
  | 'Default'
  | 'Google Cast'
  | 'LIVE'
  | 'Mute'
  | 'Normal'
  | 'Off'
  | 'Pause'
  | 'Play'
  | 'Quality'
  | 'Seek'
  | 'Settings'
  | 'Skip To Live'
  | 'Speed'
  | 'Unmute'
  | 'Volume'
  | 'White'
  | 'Yellow'
  | 'Green'
  | 'Cyan'
  | 'Blue'
  | 'Magenta'
  | 'Red'
  | 'Black';

export type DefaultLayoutTranslations = {
  [word in DefaultLayoutWord]: string;
};

export interface MediaPlayerState extends MediaState {}

export interface MediaPlayerQueryCallback {
  (state: MediaPlayerState): boolean;
}

/* -------------------------------------------------------------------------------------------------
 * DefaultMediaLayout
 * -----------------------------------------------------------------------------------------------*/

export interface DefaultMediaLayoutProps<Slots = unknown> extends PrimitivePropsWithRef<'div'> {
  children?: React.ReactNode;
  /**
   * The icons to be rendered and displayed inside the layout.
   */
  icons: DefaultLayoutIcons;
  /**
   * The thumbnails resource.
   *
   * @see {@link https://www.vidstack.io/docs/player/core-concepts/loading#thumbnails}
   */
  thumbnails?: ThumbnailSrc;
  /**
   * Translation map from english to your desired language for words used throughout the layout.
   */
  translations?: DefaultLayoutTranslations | null;
  /**
   * Specifies the number of milliseconds to wait before tooltips are visible after interacting
   * with a control.
   *
   * @defaultValue 700
   */
  showTooltipDelay?: number;
  /**
   * Specifies the number of milliseconds to wait before menus are visible after opening them.
   *
   * @defaultValue 0
   */
  showMenuDelay?: number;
  /**
   * Whether the bitrate should be hidden in the settings quality menu next to each option.
   *
   * @defaultValue false
   */
  hideQualityBitrate?: boolean;
  /**
   * Determines when the small (e.g., mobile) UI should be displayed.
   *
   * @defaultValue `({ width, height }) => width < 576 || height < 380`
   */
  smallLayoutWhen?: boolean | MediaPlayerQueryCallback;
  /**
   * Specifies whether menu buttons should be placed in the top or bottom controls group. This
   * only applies to the large video layout.
   *
   * @defaultValue 'bottom'
   */
  menuGroup?: 'top' | 'bottom';
  /**
   * Whether modal menus should be disabled when the small layout is active. A modal menu is
   * a floating panel that floats up from the bottom of the screen (outside the player). It's
   * enabled by default as it provides a better user experience for touch devices.
   *
   * @defaultValue false
   */
  noModal?: boolean;
  /**
   * Provide additional content to be inserted in specific positions.
   */
  slots?: Slots;
  /**
   * The minimum width to start displaying slider chapters when available.
   *
   * @defaultValue 600
   */
  sliderChaptersMinWidth?: number;
  /**
   * Whether the time slider should be disabled.
   */
  disableTimeSlider?: boolean;
  /**
   * Whether all gestures such as pressing to play or seek should not be active.
   */
  noGestures?: boolean;
  /**
   * Whether keyboard actions should not be displayed.
   */
  noKeyboardActionDisplay?: boolean;
}

export type DefaultLayoutSlotName =
  | 'bufferingIndicator'
  | 'captionButton'
  | 'captions'
  | 'chapterTitle'
  | 'currentTime'
  | 'endTime'
  | 'fullscreenButton'
  | 'liveButton'
  | 'livePlayButton'
  | 'muteButton'
  | 'pipButton'
  | 'airPlayButton'
  | 'googleCastButton'
  | 'playButton'
  | 'loadButton'
  | 'seekBackwardButton'
  | 'seekForwardButton'
  | 'startDuration'
  | 'timeSlider'
  | 'volumeSlider'
  | DefaultLayoutMenuSlotName;

export type DefaultLayoutMenuSlotName =
  | 'chaptersMenu'
  | 'settingsMenu'
  | 'settingsMenuStartItems'
  | 'settingsMenuEndItems';

export type SlotPositions<Name extends string> =
  | `before${Capitalize<Name>}`
  | Name
  | `after${Capitalize<Name>}`;

export type Slots<Names extends string> = {
  [slotName in SlotPositions<Names>]?: React.ReactNode;
};

export interface DefaultLayoutSlots extends Slots<DefaultLayoutSlotName> {}

export interface DefaultVideoLayoutSlots {
  smallLayout?: DefaultLayoutSlots;
  largeLayout?: DefaultLayoutSlots;
}

export interface DefaultMediaButtonProps {
  tooltip: TooltipBase.ContentProps['placement'];
}
