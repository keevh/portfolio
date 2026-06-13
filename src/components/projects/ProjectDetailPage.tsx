import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ExternalLink, Github, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { translations } from '../../i18n/translations';
import type { ProjectRecord } from '../../data/projects';
import { setPendingHomeScrollTarget } from '../../utils/scroll';

type Lang = 'es' | 'en';

type StackVisual = {
  logo?: string;
  label: string;
  className?: string;
};

const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');

function getHomeHref() {
  return BASE_PATH || '/';
}

function getImageClass(imageFit: ProjectRecord['imageFit']) {
  if (imageFit === 'contain') return 'object-contain bg-surface';
  if (imageFit === 'scale-down') return 'object-scale-down bg-surface';
  return 'object-cover';
}

function getStackVisual(stackItem: string): StackVisual {
  const value = stackItem.toLowerCase();

  if (value.includes('next')) return { label: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', className: 'bg-white' };
  if (value.includes('react')) return { label: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' };
  if (value.includes('typescript')) return { label: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' };
  if (value.includes('tailwind')) return { label: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' };
  if (value.includes('node')) return { label: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' };
  if (value.includes('mongo')) return { label: 'MongoDB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' };
  if (value.includes('postgres')) return { label: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' };
  if (value.includes('redis')) return { label: 'Redis', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' };
  if (value.includes('javascript')) return { label: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' };
  if (value.includes('css')) return { label: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' };
  if (value.includes('html')) return { label: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' };
  if (value.includes('python')) return { label: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' };
  if (value.includes('docker')) return { label: 'Docker', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' };
  if (value.includes('mqtt')) return { label: 'MQTT', logo: 'https://cdn.simpleicons.org/mqtt/34d399' };
  if (value.includes('astro')) return { label: 'Astro', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/astro/astro-original.svg' };
  if (value.includes('canvas')) return { label: 'Canvas', logo: 'https://cdn.simpleicons.org/html5/e34f26' };
  if (value.includes('indexeddb')) return { label: 'IndexedDB' };
  if (value.includes('local storage')) return { label: 'Local Storage' };
  if (value.includes('mockapi')) return { label: 'MockAPI' };
  if (value.includes('analytics')) return { label: 'Analytics' };

  return { label: stackItem };
}

const uiCopy = {
  es: {
    back: 'Volver al portafolio',
    overview: 'Detalles del proyecto',
    stack: 'Tecnologias utilizadas',
    build: 'Implementacion y arquitectura',
    gallery: 'Galeria del proyecto',
    challenges: 'Retos tecnicos',
    year: 'Ano',
    role: 'Rol',
    team: 'Equipo',
    timeline: 'Timeline',
    live: 'Abrir demo',
  },
  en: {
    back: 'Back to portfolio',
    overview: 'Project details',
    stack: 'Technologies used',
    build: 'Implementation and architecture',
    gallery: 'Project gallery',
    challenges: 'Technical challenges',
    year: 'Year',
    role: 'Role',
    team: 'Team',
    timeline: 'Timeline',
    live: 'Open live demo',
  },
} as const;

function resolveTagLabel(tag: ProjectRecord['tags'][number], language: Lang) {
  const key = tag.labelKey as keyof typeof translations.es;
  return translations[language][key] ?? tag.labelKey;
}

function resolveLinkLabel(link: ProjectRecord['links'][number], language: Lang) {
  const key = link.labelKey as keyof typeof translations.es;
  return translations[language][key] ?? link.labelKey;
}

type Props = {
  project: ProjectRecord;
};

export function ProjectDetailPage({ project }: Props) {
  const { language } = useLanguage();
  const copy = uiCopy[language];
  const content = project.i18n[language];
  const detail = content.detail;
  const images = project.gallery.length > 0 ? project.gallery : [project.image];
  const [activeImage, setActiveImage] = useState(images[0] ?? project.image);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const tags = project.tags.map((tag) => ({ ...tag, label: resolveTagLabel(tag, language) }));
  const links = project.links.filter((link) => link.url && link.url !== '#').map((link) => ({
    ...link,
    label: resolveLinkLabel(link, language),
  }));

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;

    const activeButton = container.querySelector<HTMLButtonElement>('[data-active="true"]');
    if (!activeButton) return;

    const buttonLeft = activeButton.offsetLeft;
    const buttonRight = buttonLeft + activeButton.clientWidth;
    const viewLeft = container.scrollLeft;
    const viewRight = viewLeft + container.clientWidth;

    if (buttonLeft < viewLeft || buttonRight > viewRight) {
      container.scrollTo({ left: activeButton.offsetLeft, behavior: 'smooth' });
    }
  }, [activeImage]);

  useEffect(() => {
    if (images.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveImage((current) => {
        const currentIndex = images.indexOf(current);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % images.length;
        return images[nextIndex] ?? images[0];
      });
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [images]);

  const proseClass = 'font-body-md text-base leading-8 text-on-surface-variant sm:text-lg';
  const metaItems = useMemo(() => [
    { label: copy.year, value: String(project.year) },
    { label: copy.role, value: detail.role },
    { label: copy.team, value: detail.team },
    { label: copy.timeline, value: detail.timeline },
  ].filter((item) => item.value), [copy.role, copy.team, copy.timeline, copy.year, detail.role, detail.team, detail.timeline, project.year]);
  const buildParagraphs = useMemo(() => [detail.context, detail.solution].filter(Boolean), [detail.context, detail.solution]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <section className="relative h-[38vh] min-h-[300px] w-full overflow-hidden sm:h-[44vh] sm:min-h-[400px]">
        <img
          src={project.image}
          alt={content.title}
          className={`absolute inset-0 h-full w-full ${getImageClass(project.imageFit)}`}
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/65 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
      </section>

      <article className="relative z-10 mx-auto -mt-36 max-w-6xl px-4 pb-24 sm:-mt-40 sm:px-6 lg:-mt-44 lg:px-8">
        <div className="relative overflow-hidden rounded-t-[32px] rounded-b-none border-t border-white/6 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--background)_0%,transparent)_0%,color-mix(in_srgb,var(--background)_0%,transparent)_25%,color-mix(in_srgb,var(--background)_82%,transparent)_60%,color-mix(in_srgb,var(--background)_98%,transparent)_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:rounded-t-[32px] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-linear-to-b from-white/[0.05] via-white/[0.02] to-transparent" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-white/18 to-transparent" />
          <a
            href={getHomeHref()}
            onClick={() => setPendingHomeScrollTarget('projects')}
            className="relative z-10 mb-8 inline-flex items-center gap-2 font-code-sm text-on-surface-variant transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            {copy.back}
          </a>

          <div className="relative z-10 mb-6 flex flex-wrap gap-3">
            {tags.map((tag, index) => (
              <span
                key={`${tag.label}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-code-sm text-sm text-gray-200"
              >
                <span className={`block h-2 w-2 rounded-full ${tag.color}`} />
                {tag.label}
              </span>
            ))}
          </div>

          <h1 className="relative z-10 max-w-5xl font-headline-lg text-4xl text-white sm:text-5xl lg:text-6xl">{content.title}</h1>
          <p className="relative z-10 mt-4 max-w-4xl font-body-md text-lg leading-relaxed text-on-surface-variant sm:text-xl">
            {detail.tagline}
          </p>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            {links.map((link) => {
              const Icon = link.type === 'repo' ? Github : link.type === 'demo' ? ExternalLink : LinkIcon;
              const buttonClass = link.type === 'demo'
                ? 'bg-primary-container text-on-primary-container hover:bg-primary shadow-[0_0_20px_rgba(52,211,153,0.18)]'
                : 'border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.08]';

              return (
                <a
                  key={`${link.type}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 font-label-caps text-xs transition-all ${buttonClass}`}
                >
                  <Icon size={16} />
                  {link.label}
                </a>
              );
            })}

            {project.liveUrl && !links.some((link) => link.url === project.liveUrl) && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-container px-5 font-label-caps text-xs text-on-primary-container transition-all hover:bg-primary shadow-[0_0_20px_rgba(52,211,153,0.18)]"
              >
                <ExternalLink size={16} />
                {copy.live}
              </a>
            )}
          </div>

          {metaItems.length > 0 && (
            <div className="relative z-10 mt-10 border-t border-white/8 pt-6">
              <dl className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-8 sm:gap-y-5">
                {metaItems.map((item) => (
                  <div key={item.label} className="min-w-[150px]">
                    <dt className="font-label-caps text-[11px] tracking-[0.18em] text-on-surface-variant">{item.label}</dt>
                    <dd className="mt-1.5 font-body-md text-sm leading-relaxed text-white/92">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {images.length > 1 && (
            <div className="mt-10 border-t border-white/8 pt-8">
              <h2 className="mb-5 font-headline-md text-2xl text-white">{copy.gallery}</h2>
              <div className="-mx-6 sm:mx-0">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-start">
                  <div className="space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-none border border-white/8 bg-white/[0.02] sm:min-h-[420px] sm:rounded-[28px]">
                      <img
                        src={activeImage}
                        alt={`${content.title} featured media`}
                        className={`absolute inset-0 h-full w-full ${getImageClass(project.imageFit)}`}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background/70 to-transparent" />
                    </div>
                  </div>

                  <div ref={thumbsRef} className="flex gap-[10px] overflow-x-auto px-4 pb-2 sm:hidden scroll-smooth [&::-webkit-scrollbar]:h-4 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20">
                    {images.map((image, index) => {
                      const isActive = activeImage === image;

                      return (
                        <button
                          key={`${image}-${index}-mobile`}
                          type="button"
                          onClick={() => setActiveImage(image)}
                          aria-label={`Go to media ${index + 1}`}
                          data-active={isActive}
                          className={`relative h-20 w-32 flex-none snap-start overflow-hidden border-2 transition-all ${
                            isActive
                              ? 'border-white shadow-[0_0_18px_rgba(255,255,255,0.25)]'
                              : 'border-white/10 opacity-70'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`${content.title} thumbnail ${index + 1}`}
                            className={`h-full w-full ${getImageClass(project.imageFit)}`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="hidden gap-[10px] sm:grid sm:grid-cols-3 xl:grid-cols-1">
                    {images.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setActiveImage(image)}
                        className={`group relative overflow-hidden rounded-[24px] border bg-white/[0.02] transition-all ${
                          activeImage === image ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/8 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${content.title} gallery ${index + 1}`}
                          className={`h-28 w-full ${getImageClass(project.imageFit)}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 space-y-12">
          <section className="space-y-6">
            <h2 className="font-headline-md text-3xl text-white">{copy.overview}</h2>
            <div className="max-w-5xl space-y-5">
              <p className={proseClass}>{content.desc}</p>
              {detail.overview.map((paragraph, index) => (
                <p key={index} className={proseClass}>{paragraph}</p>
              ))}
            </div>
          </section>

          {project.stack.length > 0 && (
            <section className="space-y-6 border-y border-white/8 py-10">
              <h2 className="font-headline-md text-3xl text-white">{copy.stack}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {project.stack.map((item) => {
                  const visual = getStackVisual(item);
                  return (
                    <div key={item} className="flex flex-col items-center gap-3 rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-center">
                      <span className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/95 ${visual.className ?? ''}`}>
                        {visual.logo ? (
                          <img src={visual.logo} alt={visual.label} className="h-9 w-9 object-contain" loading="lazy" />
                        ) : (
                          <span className="font-label-caps text-xs text-surface">{visual.label.slice(0, 3)}</span>
                        )}
                      </span>
                      <div>
                        <p className="font-code-sm text-sm text-white">{item}</p>
                        <p className="mt-1 font-body-md text-xs text-on-surface-variant">{visual.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
            <div className="space-y-6">
              <h2 className="font-headline-md text-3xl text-white">{copy.build}</h2>
              <div className="max-w-5xl space-y-5">
                {buildParagraphs.map((paragraph, index) => (
                  <p key={index} className={proseClass}>{paragraph}</p>
                ))}
              </div>
            </div>

            {detail.features.length > 0 && (
              <div className="space-y-4">
                {detail.features.slice(0, 4).map((item, index) => (
                  <div key={item} className="border-l border-primary-container/25 pl-4">
                    <p className="font-label-caps text-[11px] tracking-[0.18em] text-primary-container">0{index + 1}</p>
                    <p className="mt-2 font-body-md text-sm leading-relaxed text-on-surface-variant">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {detail.challenges.length > 0 && (
            <section className="space-y-8 border-t border-white/8 pt-10">
              <div className="max-w-4xl">
                <h2 className="mt-3 font-headline-md text-3xl text-white">{copy.challenges}</h2>
                <p className="mt-4 font-body-md text-base leading-8 text-on-surface-variant sm:text-lg">{detail.problem}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {detail.challenges.map((item, index) => (
                  <div key={item} className="space-y-3">
                    <p className="font-headline-md text-3xl text-white/25">0{index + 1}</p>
                    <p className={proseClass}>{item}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
