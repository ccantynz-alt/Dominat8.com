import type { AcePath } from "./types";
import { normalizePath } from "./engine";

const KEY = "d8:ace:path";

export function readAcePath(): AcePath | null {
  try {
    const v = sessionStorage.getItem(KEY);
    return normalizePath(v);
  } catch {
    return null;
  }
}

export function writeAcePath(path: AcePath) {
  try {
    sessionStorage.setItem(KEY, path);
  } catch {
    // ignore
  }
}