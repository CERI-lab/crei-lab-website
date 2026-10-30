import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: '**/*.md' }),
  schema: z.object({
    name: z.string(),
    role: z.enum(['pi', 'researcher', 'student', 'alumni', 'staff']),
    /** People page section. Falls back to role when omitted. `visiting` = visiting faculty. */
    group: z
      .enum(['pi', 'visiting', 'postdoc', 'phd', 'masters', 'visiting-researcher', 'collaborator', 'alumni'])
      .optional(),
    /** Year the person joined the lab; sorts members within a section (earliest first). */
    since: z.number().optional(),
    /** Start term within `since`; orders same-year joiners. */
    term: z.enum(['Spring', 'Summer', 'Fall']).optional(),
    /** Alumni only: section they belonged to while in the lab. */
    formerGroup: z.enum(['postdoc', 'research-affiliate', 'phd', 'masters', 'visiting-researcher']).optional(),
    /** Years in the lab, e.g. "2023–2026" (alumni list). */
    years: z.string().optional(),
    /** Alumni only: current position, e.g. "Assistant Professor, University of X". */
    current: z.string().optional(),
    title: z.string(),
    affiliation: z.string(),
    email: z.string().email().optional(),
    /** Extra spellings used in bylines ("Family, Given"), for blue author highlighting. */
    authorAs: z.array(z.string()).default([]),
    scholar: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    website: z.string().url().optional(),
    orcid: z.string().optional(),
    photo: z.string().optional(),
    /** Square crop centred on the face, for round portraits on Home. Falls back to `photo`. */
    avatar: z.string().optional(),
    /** Research keywords shown as chips on the profile page. */
    keywords: z.array(z.string()).default([]),
    order: z.number().default(99),
    highlight: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    volume: z.coerce.string().optional(),
    issue: z.coerce.string().optional(),
    /** Page range or article number. */
    pages: z.coerce.string().optional(),
    /** Keys from PUB_TOPICS; first is the primary topic. */
    topics: z.array(z.string()).default([]),
    doi: z.string().optional(),
    /** Abstract or standfirst, shown in Home Highlighted Publications. */
    abstract: z.string().optional(),
    url: z.string().url().optional(),
    pdf: z.string().url().optional(),
    code: z.string().url().optional(),
    topic: z.string().optional(),
    type: z.enum(['journal', 'conference', 'report', 'other']).optional(),
    highlight: z.boolean().default(false),
    /** Default Publications list (findings.md §7). */
    listed: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    status: z.enum(['current', 'completed']).default('current'),
    year: z.number().optional(),
    funder: z.string().optional(),
    /** Farshid's role on the award, e.g. "PI", "Co-PI", "Technical Lead". */
    role: z.string().optional(),
    /** Lead investigator when Farshid is not PI, e.g. "Alireza Ermagun (George Mason University)". */
    lead: z.string().optional(),
    /** Period of performance (ISO dates); `end` decides ongoing vs completed at build time. */
    start: z.coerce.date().optional(),
    end: z.coerce.date().optional(),
    url: z.string().url().optional(),
    highlight: z.boolean().default(false),
    /** Card title (1 to 4 words) and one-line tagline, as on HuMNet's project grid. */
    short: z.string().optional(),
    tagline: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    coverWidth: z.number().optional(),
    coverHeight: z.number().optional(),
    /** Publication ids linked to this project (grant acknowledgment); add new papers here. */
    pubs: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});

const news = defineCollection({
  loader: glob({ base: './src/content/news', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    /** Label shown before the item on /news. */
    category: z.enum(['Grant', 'Award', 'Publication', 'Media', 'Conference', 'Lab']).default('Lab'),
    source: z.string().optional(),
    url: z.string().url().optional(),
  }),
});

const teaching = defineCollection({
  loader: glob({ base: './src/content/teaching', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    code: z.string().optional(),
    term: z.string().optional(),
    year: z.number().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { people, publications, projects, news, teaching };
