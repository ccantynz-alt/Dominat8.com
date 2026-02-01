"use client";

import * as React from "react";

/**
 * Build-safe fallback style injector.
 * Exists to prevent accidental syntax breaks from taking down CI.
 * Does not change UI unless explicitly rendered.
 */
export default function FallbackStyles(): JSX.Element {
  const css = 
/* D8_FALLBACK_STYLES_SAFE_20260201_132350 */
:root { color-scheme: dark; }
;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
