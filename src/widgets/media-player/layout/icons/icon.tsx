"use client"

import * as React from 'react';
import {DionIconProps} from "./types";


const Icon = /* @__PURE__ */ React.forwardRef((props: DionIconProps, ref) => {
  const { width, height, size = null, fill = '#EBEDF0', paths, ...restProps } = props;
  return React.createElement("svg", {
    ...restProps,
    width: width ?? size,
    height: height ?? size,
    viewBox: "0 0 32 32",
    fill,
    "aria-hidden": "true",
    focusable: "false",
    xmlns: "http://www.w3.org/2000/svg",
    ref,
    dangerouslySetInnerHTML: { __html: paths }
  });
});
Icon.displayName = "DionIcon";

export default Icon;

