"use client";

import * as React from "react";

type Props = {
  children: React.ReactNode;
};

/**
 * ClientBoundary
 * A tiny client component wrapper used when a layout/page needs to force a client boundary.
 * Keep it minimal + safe for SSR by pushing client-only logic into this file if needed later.
 */
export default function ClientBoundary({ children }: Props) {
  return <>{children}</>;
}
