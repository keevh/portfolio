import type { ElementType } from 'react';
import { ExternalLink, Github, FlaskConical } from 'lucide-react';
import projectsJson from './projects.json';

export type Category = 'all' | 'fullstack' | 'frontend' | 'backend' | 'hardware';
export type Lang = 'es' | 'en';

export type ProjectDetailContent = {
  tagline: string;
  role: string;
  timeline: string;
  team: string;
  context?: string;
  overview?: string[];
  problem?: string;
  solution?: string;
  features: { label: string; text: string }[];
  challenges?: string[];
  outcomes: string[];
  credentials?: { label: string; value: string }[];
  diagrams?: {
    title: string;
    description: string | string[];
    image: string;
  }[];
  blocks?: {
    title: string;
    intro?: string;
    paragraphs?: string[];
    items?: string[];
  }[];
};

export type LocalizedProjectContent = {
  title: string;
  desc: string;
  highlights: string[];
  detail: ProjectDetailContent;
};

const ICON_MAP: Record<string, ElementType> = {
  ExternalLink,
  Github,
  FlaskConical,
};

export type ProjectRecord = {
  id: string;
  slug: string;
  category: Exclude<Category, 'all'>;
  year: number;
  stack: string[];
  image: string;
  imageFit?: 'cover' | 'contain' | 'scale-down';
  gallery: string[];
  liveUrl?: string;
  tags: { labelKey: string; color: string }[];
  links: { type: string; url: string; labelKey: string; icon: string }[];
  i18n: Record<Lang, LocalizedProjectContent>;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  category: Exclude<Category, 'all'>;
  year: number;
  stack: string[];
  image: string;
  imageFit: 'cover' | 'contain' | 'scale-down';
  gallery: string[];
  liveUrl?: string;
  highlights: string[];
  tags: { label: string; color: string }[];
  desc: string;
  detail: ProjectDetailContent;
  links: { type: string; url: string; label: string; icon: ElementType }[];
};

const projectRecords = projectsJson as ProjectRecord[];

function resolveProject(record: ProjectRecord, t: (key: string) => string, lang: Lang): Project {
  return {
    id:         record.id,
    slug:       record.slug,
    title:      record.i18n[lang].title,
    category:   record.category,
    year:       record.year,
    stack:      record.stack,
    image:      record.image,
    imageFit:   record.imageFit ?? 'cover',
    gallery:    record.gallery,
    liveUrl:    record.liveUrl,
    highlights: record.i18n[lang].highlights,
    tags:       record.tags.map(({ labelKey, color }) => ({ label: t(labelKey), color })),
    desc:       record.i18n[lang].desc,
    detail:     record.i18n[lang].detail,
    links:      record.links.map(({ labelKey, icon, ...rest }) => ({
      ...rest,
      label: t(labelKey),
      icon:  ICON_MAP[icon] ?? ExternalLink,
    })),
  };
}

export function getProjectRecords(): ProjectRecord[] {
  return projectRecords;
}

export function getAllProjectSlugs(): string[] {
  return projectRecords.map((project) => project.slug);
}

export function getProjectRecordBySlug(slug: string): ProjectRecord | undefined {
  return projectRecords.find((project) => project.slug === slug);
}

export function getProjectBySlug(
  slug: string,
  t: (key: string) => string,
  lang: Lang,
): Project | undefined {
  const record = getProjectRecordBySlug(slug);
  return record ? resolveProject(record, t, lang) : undefined;
}

export function resolveProjects(
  t: (key: string) => string,
  lang: Lang,
): Project[] {
  return projectRecords.map((project) => resolveProject(project, t, lang));
}
