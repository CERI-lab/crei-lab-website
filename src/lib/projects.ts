import type { CollectionEntry } from 'astro:content';

type Project = CollectionEntry<'projects'>;

/** Ongoing when the period of performance has not ended; falls back to `status` without an end date. */
export const isOngoing = (p: Project, now = new Date()) =>
  p.data.end ? p.data.end >= now : p.data.status === 'current';

const startYear = (p: Project) => p.data.start?.getUTCFullYear() ?? p.data.year;

/** "2026–2029", or "2026–present" / "Started 2016" when the end date is unknown. */
export function periodOf(p: Project) {
  const from = startYear(p);
  const to = p.data.end?.getUTCFullYear();
  if (!from) return undefined;
  if (to) return from === to ? String(from) : `${from}–${to}`;
  return isOngoing(p) ? `${from}–present` : `Started ${from}`;
}

/** Ongoing first, then most recent start. */
export const byRecency = (a: Project, b: Project) =>
  Number(isOngoing(b)) - Number(isOngoing(a)) || (startYear(b) ?? 0) - (startYear(a) ?? 0) || a.data.order - b.data.order;
