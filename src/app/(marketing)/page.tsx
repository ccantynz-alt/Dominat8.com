export const runtime = 'nodejs';

// Shim page to satisfy Next.js build tracing when route-groups are involved.
// Re-export the actual homepage.
export { default } from '../page';
