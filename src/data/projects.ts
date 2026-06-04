import { ElementType } from 'react';
import { ExternalLink, Github, FlaskConical } from 'lucide-react';
import projectsJson from './projects.json';

export type Category = 'all' | 'fullstack' | 'frontend' | 'backend' | 'hardware';
type Lang = 'es' | 'en';

const ICON_MAP: Record<string, ElementType> = {
  ExternalLink,
  Github,
  FlaskConical,
};

type ProjectJSON = {
  id: string;
  category: Exclude<Category, 'all'>;
  image: string;
  gallery: string[];
  tags: { labelKey: string; color: string }[];
  links: { type: string; url: string; labelKey: string; icon: string }[];
  i18n: Record<Lang, { title: string; desc: string; highlights: string[] }>;
};

export type Project = {
  id: string;
  title: string;
  category: Exclude<Category, 'all'>;
  image: string;
  gallery: string[];
  highlights: string[];
  tags: { label: string; color: string }[];
  desc: string;
  links: { type: string; url: string; label: string; icon: ElementType }[];
};

export function resolveProjects(
  t: (key: string) => string,
  lang: Lang,
): Project[] {
  return (projectsJson as ProjectJSON[]).map((p) => ({
    id:         p.id,
    title:      p.i18n[lang].title,
    category:   p.category,
    image:      p.image,
    gallery:    p.gallery,
    highlights: p.i18n[lang].highlights,
    tags:       p.tags.map(({ labelKey, color }) => ({ label: t(labelKey), color })),
    desc:       p.i18n[lang].desc,
    links:      p.links.map(({ labelKey, icon, ...rest }) => ({
      ...rest,
      label: t(labelKey),
      icon:  ICON_MAP[icon] ?? ExternalLink,
    })),
  }));
}
