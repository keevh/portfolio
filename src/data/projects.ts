import { ElementType } from 'react';
import { ExternalLink, Github, FlaskConical } from 'lucide-react';

export type Category = 'all' | 'fullstack' | 'frontend' | 'backend';

export type ProjectLink = {
  type: string;
  url: string;
  labelKey: string;
  icon: ElementType;
};

export type ProjectTag = {
  labelKey: string;
  color: string;
};

export type ProjectData = {
  id: string;
  titleKey: string;
  category: Exclude<Category, 'all'>;
  image: string;
  gallery: string[];
  highlightKeys: string[];
  tagKeys: ProjectTag[];
  descKey: string;
  links: ProjectLink[];
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

export const PROJECT_DATA: ProjectData[] = [
  {
    id: 'facepet',
    titleKey: 'proj.facepet.title',
    category: 'frontend',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&q=80&w=2000',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=1964',
    ],
    highlightKeys: ['proj.facepet.h1', 'proj.facepet.h2', 'proj.facepet.h3'],
    tagKeys: [
      { labelKey: 'proj.uiux',     color: 'bg-secondary' },
      { labelKey: 'proj.frontend', color: 'bg-primary-container' },
    ],
    descKey: 'proj.facepet.desc',
    links: [
      { type: 'demo', url: '#', labelKey: 'proj.demo', icon: ExternalLink },
      { type: 'repo', url: '#', labelKey: 'proj.repo', icon: Github },
    ],
  },
  {
    id: 'votora',
    titleKey: 'proj.votora.title',
    category: 'backend',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=2070',
    ],
    highlightKeys: ['proj.votora.h1', 'proj.votora.h2', 'proj.votora.h3'],
    tagKeys: [
      { labelKey: 'proj.hardware', color: 'bg-[#7318ff]' },
    ],
    descKey: 'proj.votora.desc',
    links: [
      { type: 'repo', url: '#', labelKey: 'proj.repo', icon: Github },
    ],
  },
  {
    id: 'shortener',
    titleKey: 'proj.shortener.title',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015',
    ],
    highlightKeys: ['proj.shortener.h1', 'proj.shortener.h2', 'proj.shortener.h3'],
    tagKeys: [
      { labelKey: 'proj.utility', color: 'bg-primary-container' },
    ],
    descKey: 'proj.shortener.desc',
    links: [
      { type: 'demo', url: '#', labelKey: 'proj.demo', icon: ExternalLink },
      { type: 'repo', url: '#', labelKey: 'proj.repo', icon: Github },
    ],
  },
  {
    id: 'nilm',
    titleKey: 'proj.nilm.title',
    category: 'fullstack',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=2072',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
    ],
    highlightKeys: ['proj.nilm.h1', 'proj.nilm.h2', 'proj.nilm.h3'],
    tagKeys: [
      { labelKey: 'proj.ds',     color: 'bg-secondary' },
      { labelKey: 'proj.energy', color: 'bg-[#7318ff]' },
    ],
    descKey: 'proj.nilm.desc',
    links: [
      { type: 'research', url: '#', labelKey: 'proj.research', icon: FlaskConical },
      { type: 'repo',     url: '#', labelKey: 'proj.repo',     icon: Github },
    ],
  },
];

export function resolveProjects(
  data: ProjectData[],
  t: (key: string) => string,
): Project[] {
  return data.map((p) => ({
    id:         p.id,
    title:      t(p.titleKey),
    category:   p.category,
    image:      p.image,
    gallery:    p.gallery,
    highlights: p.highlightKeys.map(t),
    tags:       p.tagKeys.map(({ labelKey, color }) => ({ label: t(labelKey), color })),
    desc:       t(p.descKey),
    links:      p.links.map(({ labelKey, ...rest }) => ({ ...rest, label: t(labelKey) })),
  }));
}
