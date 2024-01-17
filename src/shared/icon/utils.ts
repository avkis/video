import * as React from "react";
import Icon from "./icon.tsx";
import {DionIconProps} from "./types.ts";

export function createIcon(paths: string) {
  function DionIcon(props: DionIconProps) {
    return /* @__PURE__ */ React.createElement(Icon, { paths, ...props });
  }
  DionIcon.displayName = "DionIcon";
  return DionIcon;
}
