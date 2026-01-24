'use client';

import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

/**
 * ClientBoundary
 * A minimal client component wrapper for layouts/pages that need a client boundary.
 */
export default function ClientBoundary({ children }: Props) {
  return <>{children}</>;
}
