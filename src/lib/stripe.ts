import Stripe from 'stripe';

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Missing STRIPE_SECRET_KEY');
  return new Stripe(key, { apiVersion: '2024-06-20' as any });
}

export function getAppUrl() {
  const url = process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || '';
  if (!url) throw new Error('Missing NEXT_PUBLIC_APP_URL (e.g. https://www.dominat8.com)');
  return url.replace(/\/+$/, '');
}