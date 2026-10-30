import type { CollectionEntry } from 'astro:content';

export type Person = CollectionEntry<'people'>;
export type Group = NonNullable<Person['data']['group']>;

const ROLE_FALLBACK: Record<Person['data']['role'], Group> = {
  pi: 'pi',
  student: 'phd',
  researcher: 'collaborator',
  staff: 'collaborator',
  alumni: 'alumni',
};

/** People page section; falls back to role when `group` is omitted. */
export const groupOf = (p: Person): Group => p.data.group ?? ROLE_FALLBACK[p.data.role];

const PROFILE_GROUPS = new Set<string>(['postdoc', 'phd']);

/** Current postdocs and Ph.D. students get a /people/[id] page; alumni only when their file has a bio. */
export function hasProfile(p: Person) {
  const group = groupOf(p);
  if (group === 'alumni') return Boolean(p.body?.trim());
  return PROFILE_GROUPS.has(group);
}

export const profilePath = (p: Person) => `/people/${p.id}`;

/** Singular role labels, used on profile pages and in the alumni list. */
export const ROLE_LABEL: Record<string, string> = {
  postdoc: 'Postdoctoral Associate',
  'research-affiliate': 'Research Affiliate',
  phd: 'Ph.D. Student',
  masters: 'Master’s Student',
  'visiting-researcher': 'Visiting Researcher',
};

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('');
