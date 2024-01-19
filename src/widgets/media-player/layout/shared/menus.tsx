import {
  Menu,
  Tooltip,
  useCaptionOptions,
  type MenuPlacement,
  type TooltipPlacement, IconComponent, usePlaybackRateOptions, useVideoQualityOptions,
} from '@vidstack/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon, ClosedCaptionsIcon,
  OdometerIcon,
  SettingsIcon, SettingsMenuIcon,
} from '@vidstack/react/icons';

export interface SettingsProps {
  placement: MenuPlacement;
  tooltipPlacement: TooltipPlacement;
}

export function Settings({ placement, tooltipPlacement }: SettingsProps) {
  return (
    <Menu.Root className="vds-menu">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Menu.Button className="vds-menu-button vds-button">
            <SettingsIcon className="vds-rotate-icon" />
          </Menu.Button>
        </Tooltip.Trigger>
        <Tooltip.Content className="vds-tooltip-content" placement={tooltipPlacement}>
          Настройки
        </Tooltip.Content>
      </Tooltip.Root>
      <Menu.Content className="vds-menu-items" placement={placement}>
        <CaptionsSubmenu />

        <Menu.Item><QualitySubmenu /></Menu.Item>

        <Menu.Item><SpeedSubmenu /></Menu.Item>
        <SpeedSubmenu />
      </Menu.Content>
    </Menu.Root>
  );
}

export function CaptionsSubmenu() {
  const options = useCaptionOptions(),
    hint = options.selectedTrack?.label ?? 'Off';
  return (
    <Menu.Root>
      <SubmenuButton
        label="Субтитры"
        hint={hint}
        disabled={options.disabled}
        icon={ClosedCaptionsIcon}
      />
      <Menu.Content className="vds-menu-items">
        <Menu.RadioGroup className="vds-radio-group" value={options.selectedValue}>
          {options.map(({ label, value, select }) => (
            <Menu.Radio className="vds-radio" value={value} onSelect={select} key={value}>
              <div className="vds-radio-check" />
              <span className="vds-radio-label">{label}</span>
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

export function QualitySubmenu() {
  const options = useVideoQualityOptions(),
    currentQuality = options.selectedQuality?.height,
    hint =
      options.selectedValue !== 'auto' && currentQuality
        ? `${currentQuality}p`
        : `Auto${currentQuality ? ` (${currentQuality}p)` : ''}`;
  return (
    <Menu.Root>
      <SubmenuButton
        label="Качество"
        hint={hint}
        disabled={options.disabled}
        icon={SettingsMenuIcon}
      />
      <Menu.Content className="vds-menu-items">
        <Menu.RadioGroup className="vds-radio-group" value={options.selectedValue}>
          {options.map(({ label, value, bitrateText, select }) => (
            <Menu.Radio className="vds-radio" value={value} onSelect={select} key={value}>
              <div className="vds-radio-check" />
              <span className="vds-radio-label">{label}</span>
              {bitrateText ? <span className="vds-radio-hint">{bitrateText}</span> : null}
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

export function SpeedSubmenu() {
  const options = usePlaybackRateOptions(),
    hint = options.selectedValue === '1' ? 'Normal' : options.selectedValue + 'x';
  return (
    <Menu.Root>
      <SubmenuButton label="Скорость" hint={hint} disabled={options.disabled} icon={OdometerIcon} />
      <Menu.Content className="vds-menu-items">
        <Menu.RadioGroup className="vds-radio-group" value={options.selectedValue}>
          {options.map(({ label, value, select }) => (
            <Menu.Radio className="vds-radio" value={value} onSelect={select} key={value}>
              <div className="vds-radio-check" />
              <span className="vds-radio-label">{label}</span>
            </Menu.Radio>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

export interface SubmenuButtonProps {
  label: string;
  hint: string;
  disabled?: boolean;
  icon: IconComponent;
}

function SubmenuButton({ label, hint, icon: Icon, disabled }: SubmenuButtonProps) {
  return (
    <Menu.Button className="vds-menu-button" disabled={disabled}>
      <ChevronLeftIcon className="vds-menu-button-close-icon" />
      <Icon className="vds-menu-button-icon" />
      <span className="vds-menu-button-label">{label}</span>
      <span className="vds-menu-button-hint">{hint}</span>
      <ChevronRightIcon className="vds-menu-button-open-icon" />
    </Menu.Button>
  );
}
