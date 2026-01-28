//
// DOMINAT8 ENGINE â€” PROBE STAMP WIRING (006.1)
//
import { ENGINE_INSTALL_006, getEngineInstall006Info } from "./engineInstall006";

export function getEngineProbeStamp() {
  const info = getEngineInstall006Info();
  return {
    install: "006" as const,
    stamp: ENGINE_INSTALL_006,
    at: info.at,
  };
}