import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Github, Link as LinkIcon, Maximize2, X } from 'lucide-react';
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

function resolveAssetHref(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  if (!path.startsWith('/')) return `${BASE_PATH}/${path}`.replace(/^\//, '/');
  return `${BASE_PATH}${path}`.replace(/^\/\//, '/');
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
    diagrams: 'Diagramas tecnicos',
    challenges: 'Retos tecnicos',
    capabilities: 'Cobertura principal',
    credentials: 'Credenciales demo',
    outcomes: 'Por que importa',
    expand: 'Ampliar imagen',
    close: 'Cerrar vista ampliada',
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
    diagrams: 'Technical diagrams',
    challenges: 'Technical challenges',
    capabilities: 'Core coverage',
    credentials: 'Demo credentials',
    outcomes: 'Why it matters',
    expand: 'Expand image',
    close: 'Close expanded view',
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

type LightboxKind = 'gallery' | 'diagram';

type MediaItem = {
  src: string;
  alt: string;
};

function wrapIndex(index: number, length: number) {
  if (length === 0) return 0;
  return (index + length) % length;
}

export function ProjectDetailPage({ project }: Props) {
  const { language } = useLanguage();
  const copy = uiCopy[language];
  const content = project.i18n[language];
  const detail = content.detail;
  const images = project.gallery.length > 0 ? project.gallery : [project.image];
  const detailBlocks = detail.blocks ?? [];
  const credentials = detail.credentials ?? [];
  const diagrams = detail.diagrams ?? [];
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [lightbox, setLightbox] = useState<{ open: boolean; kind: LightboxKind; index: number }>({ open: false, kind: 'gallery', index: 0 });
  const [isGalleryHovered, setIsGalleryHovered] = useState(false);
  const [isGalleryManuallyPaused, setIsGalleryManuallyPaused] = useState(false);
  const mobileThumbsRef = useRef<HTMLDivElement>(null);
  const desktopThumbsRef = useRef<HTMLDivElement>(null);
  const manualPauseTimeoutRef = useRef<number | null>(null);
  const tags = project.tags.map((tag) => ({ ...tag, label: resolveTagLabel(tag, language) }));
  const links = project.links.filter((link) => link.url && link.url !== '#').map((link) => ({
    ...link,
    label: resolveLinkLabel(link, language),
  }));
  const galleryItems = useMemo<MediaItem[]>(() => images.map((image, index) => ({
    src: resolveAssetHref(image),
    alt: `${content.title} media ${index + 1}`,
  })), [content.title, images]);
  const diagramItems = useMemo<MediaItem[]>(() => diagrams.map((diagram) => ({
    src: resolveAssetHref(diagram.image),
    alt: diagram.title,
  })), [diagrams]);
  const activeGalleryItem = galleryItems[activeGalleryIndex] ?? galleryItems[0];
  const lightboxItems = lightbox.kind === 'diagram' ? diagramItems : galleryItems;
  const activeLightboxItem = lightboxItems[lightbox.index] ?? lightboxItems[0];
  const isGalleryPaused = isGalleryHovered || isGalleryManuallyPaused || lightbox.open;

  const pauseGalleryTemporarily = (duration = 8000) => {
    if (manualPauseTimeoutRef.current) window.clearTimeout(manualPauseTimeoutRef.current);
    setIsGalleryManuallyPaused(true);
    manualPauseTimeoutRef.current = window.setTimeout(() => {
      setIsGalleryManuallyPaused(false);
      manualPauseTimeoutRef.current = null;
    }, duration);
  };

  const goToGalleryIndex = (nextIndex: number, pause = false) => {
    if (pause) pauseGalleryTemporarily();
    setActiveGalleryIndex(wrapIndex(nextIndex, galleryItems.length));
  };

  const stepGallery = (direction: number) => {
    if (galleryItems.length < 2) return;
    goToGalleryIndex(activeGalleryIndex + direction, true);
  };

  const openLightbox = (kind: LightboxKind, index: number) => {
    pauseGalleryTemporarily();
    setLightbox({ open: true, kind, index });
  };

  const closeLightbox = () => {
    setLightbox((current) => ({ ...current, open: false }));
  };

  const stepLightbox = (direction: number) => {
    if (lightboxItems.length < 2) return;
    setLightbox((current) => ({
      ...current,
      index: wrapIndex(current.index + direction, lightboxItems.length),
    }));
  };

  useEffect(() => {
    const mobileContainer = mobileThumbsRef.current;
    const desktopContainer = desktopThumbsRef.current;

    if (mobileContainer) {
      const activeButton = mobileContainer.querySelector<HTMLButtonElement>('[data-active="true"]');
      if (activeButton) {
        const buttonLeft = activeButton.offsetLeft;
        const buttonRight = buttonLeft + activeButton.clientWidth;
        const viewLeft = mobileContainer.scrollLeft;
        const viewRight = viewLeft + mobileContainer.clientWidth;

        if (buttonLeft < viewLeft || buttonRight > viewRight) {
          mobileContainer.scrollTo({ left: activeButton.offsetLeft, behavior: 'smooth' });
        }
      }
    }

    if (desktopContainer) {
      const activeButton = desktopContainer.querySelector<HTMLButtonElement>('[data-active="true"]');
      if (activeButton) {
        const buttonTop = activeButton.offsetTop;
        const buttonBottom = buttonTop + activeButton.clientHeight;
        const viewTop = desktopContainer.scrollTop;
        const viewBottom = viewTop + desktopContainer.clientHeight;

        if (buttonTop < viewTop) {
          desktopContainer.scrollTo({ top: buttonTop, behavior: 'smooth' });
        } else if (buttonBottom > viewBottom) {
          desktopContainer.scrollTo({ top: buttonBottom - desktopContainer.clientHeight, behavior: 'smooth' });
        }
      }
    }
  }, [activeGalleryIndex]);

  useEffect(() => {
    if (galleryItems.length < 2 || isGalleryPaused) return;

    const intervalId = window.setInterval(() => {
      setActiveGalleryIndex((current) => wrapIndex(current + 1, galleryItems.length));
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [galleryItems.length, isGalleryPaused]);

  useEffect(() => {
    if (!lightbox.open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') stepLightbox(-1);
      if (event.key === 'ArrowRight') stepLightbox(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.open, lightboxItems.length]);

  useEffect(() => () => {
    if (manualPauseTimeoutRef.current) window.clearTimeout(manualPauseTimeoutRef.current);
  }, []);

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
          src={resolveAssetHref(project.image)}
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
            <motion.div
              className="mt-10 border-t border-white/8 pt-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55 }}
            >
              <h2 className="mb-5 font-headline-md text-2xl text-white">{copy.gallery}</h2>
              <div className="-mx-6 sm:mx-0">
                <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-stretch">
                  <div
                    className="space-y-4"
                    onMouseEnter={() => setIsGalleryHovered(true)}
                    onMouseLeave={() => setIsGalleryHovered(false)}
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-none border border-white/8 bg-white/[0.02] sm:min-h-[420px] sm:rounded-[28px] xl:h-[520px] xl:min-h-0 xl:aspect-auto">
                      <motion.button
                        type="button"
                        onClick={() => openLightbox('gallery', activeGalleryIndex)}
                        aria-label={copy.expand}
                        whileTap={{ scale: 0.94 }}
                        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65"
                      >
                        <Maximize2 size={18} />
                      </motion.button>

                      <AnimatePresence mode="wait">
                        <motion.img
                          key={activeGalleryItem?.src}
                          src={activeGalleryItem?.src}
                          alt={activeGalleryItem?.alt ?? `${content.title} featured media`}
                          initial={{ opacity: 0, scale: 1.02, x: 14 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.985, x: -14 }}
                          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
                          className={`absolute inset-0 h-full w-full ${getImageClass(project.imageFit)}`}
                        />
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-linear-to-t from-background/70 to-transparent" />
                    </div>
                  </div>

                  <div
                    ref={mobileThumbsRef}
                    onMouseEnter={() => setIsGalleryHovered(true)}
                    onMouseLeave={() => setIsGalleryHovered(false)}
                    className="flex gap-[10px] overflow-x-auto px-4 pb-2 sm:hidden scroll-smooth [&::-webkit-scrollbar]:h-4 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20"
                  >
                    {galleryItems.map((item, index) => {
                      const isActive = activeGalleryIndex === index;

                      return (
                        <motion.button
                          key={`${item.src}-${index}-mobile`}
                          type="button"
                          onClick={() => goToGalleryIndex(index, true)}
                          aria-label={`Go to media ${index + 1}`}
                          data-active={isActive}
                          whileTap={{ scale: 0.96 }}
                          className={`relative h-20 w-32 flex-none snap-start overflow-hidden border-2 transition-all ${
                            isActive
                              ? 'border-white shadow-[0_0_18px_rgba(255,255,255,0.25)]'
                              : 'border-white/10 opacity-70'
                          }`}
                        >
                          <img
                            src={item.src}
                            alt={`${content.title} thumbnail ${index + 1}`}
                            className={`h-full w-full ${getImageClass(project.imageFit)}`}
                          />
                        </motion.button>
                      );
                    })}
                  </div>

                  <div
                    ref={desktopThumbsRef}
                    onMouseEnter={() => setIsGalleryHovered(true)}
                    onMouseLeave={() => setIsGalleryHovered(false)}
                    className="hidden gap-[10px] pr-2 sm:grid sm:grid-cols-3 xl:mt-0 xl:h-[520px] xl:self-stretch xl:content-start xl:grid-cols-1 xl:overflow-y-auto sm:[&::-webkit-scrollbar]:w-2 sm:[&::-webkit-scrollbar-track]:bg-transparent sm:[&::-webkit-scrollbar-thumb]:rounded-full sm:[&::-webkit-scrollbar-thumb]:bg-white/20"
                  >
                    {galleryItems.map((item, index) => (
                      <motion.button
                        key={`${item.src}-${index}`}
                        type="button"
                        data-active={activeGalleryIndex === index}
                        onClick={() => goToGalleryIndex(index, true)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        className={`group relative overflow-hidden rounded-[24px] border bg-white/[0.02] transition-all xl:min-h-[160px] ${
                          activeGalleryIndex === index ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/8 hover:border-white/20'
                        }`}
                      >
                        <img
                          src={item.src}
                          alt={`${content.title} gallery ${index + 1}`}
                          className={`h-28 w-full xl:h-40 ${getImageClass(project.imageFit)}`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
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

          <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
            <div className="space-y-6 rounded-[28px] border border-white/8 bg-white/[0.02] p-6 sm:p-8">
              <h2 className="font-headline-md text-3xl text-white">{copy.capabilities}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {detail.features.map((item, index) => (
                  <div key={item} className="rounded-[24px] border border-white/8 bg-background/40 p-5">
                    <p className="font-label-caps text-[11px] tracking-[0.18em] text-primary-container">0{index + 1}</p>
                    <p className="mt-3 font-body-md text-sm leading-7 text-on-surface-variant sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {credentials.length > 0 && (
              <aside className="space-y-4 rounded-[28px] border border-white/8 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="font-headline-md text-2xl text-white">{copy.credentials}</h2>
                <div className="space-y-3">
                  {credentials.map((item) => (
                    <div key={`${item.label}-${item.value}`} className="rounded-[22px] border border-white/8 bg-background/50 p-4">
                      <p className="font-label-caps text-[11px] tracking-[0.18em] text-on-surface-variant">{item.label}</p>
                      <p className="mt-2 break-all font-code-sm text-sm text-white sm:text-base">{item.value}</p>
                    </div>
                  ))}
                </div>
              </aside>
            )}
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

          {detailBlocks.map((block) => {
            const hasParagraphs = (block.paragraphs?.length ?? 0) > 0;
            const hasItems = (block.items?.length ?? 0) > 0;

            return (
              <section key={block.title} className="space-y-6 border-t border-white/8 pt-10">
                <div className="max-w-4xl space-y-3">
                  <h2 className="font-headline-md text-3xl text-white">{block.title}</h2>
                  {block.intro && <p className={proseClass}>{block.intro}</p>}
                </div>

                {hasParagraphs && (
                  <div className="max-w-5xl space-y-5">
                    {block.paragraphs?.map((paragraph, index) => (
                      <p key={`${block.title}-paragraph-${index}`} className={proseClass}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {hasItems && (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {block.items?.map((item, index) => (
                      <div key={`${block.title}-item-${index}`} className="rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
                        <p className="font-label-caps text-[11px] tracking-[0.18em] text-primary-container">0{index + 1}</p>
                        <p className="mt-3 font-body-md text-sm leading-7 text-on-surface-variant sm:text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}

          {diagrams.length > 0 && (
            <section className="space-y-8 border-t border-white/8 pt-10">
              <div className="max-w-4xl space-y-3">
                <h2 className="font-headline-md text-3xl text-white">{copy.diagrams}</h2>
                <p className={proseClass}>
                  {language === 'es'
                    ? 'Tres vistas que condensan la arquitectura, el modelo de datos y la organizacion interna del proyecto.'
                    : 'Three views that condense the architecture, data model, and internal organization of the project.'}
                </p>
              </div>

              <div className="space-y-6">
                {diagrams.map((diagram, index) => (
                  <motion.article
                    key={diagram.image}
                    className="mx-auto max-w-4xl space-y-4 rounded-[28px] border border-white/8 bg-white/[0.02] p-4 sm:p-6"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <div className="space-y-2">
                      <h3 className="font-headline-md text-2xl text-white">{diagram.title}</h3>
                      <p className="font-body-md text-sm leading-7 text-on-surface-variant sm:text-base">{diagram.description}</p>
                    </div>

                    <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-surface/60 p-2 sm:p-4">
                      <motion.button
                        type="button"
                        onClick={() => openLightbox('diagram', index)}
                        aria-label={copy.expand}
                        whileTap={{ scale: 0.94 }}
                        className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/65"
                      >
                        <Maximize2 size={18} />
                      </motion.button>
                      <img
                        src={resolveAssetHref(diagram.image)}
                        alt={diagram.title}
                        loading="lazy"
                        className="mx-auto max-h-[240px] w-full object-contain sm:max-h-[300px]"
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          )}

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

          {detail.outcomes.length > 0 && (
            <section className="space-y-6 border-t border-white/8 pt-10">
              <h2 className="font-headline-md text-3xl text-white">{copy.outcomes}</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {detail.outcomes.map((item) => (
                  <div key={item} className="rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
                    <p className="font-body-md text-sm leading-7 text-on-surface-variant sm:text-base">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      <AnimatePresence>
        {lightbox.open && activeLightboxItem && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-4 backdrop-blur-md sm:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label={copy.expand}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.button
              type="button"
              onClick={closeLightbox}
              aria-label={copy.close}
              whileTap={{ scale: 0.94 }}
              className="absolute right-4 top-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <X size={18} />
            </motion.button>

            {lightbox.kind === 'gallery' && lightboxItems.length > 1 && (
              <>
                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    stepLightbox(-1);
                  }}
                  aria-label="Previous media"
                  whileTap={{ scale: 0.94 }}
                  className="absolute left-3 top-1/2 z-30 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 text-white/45 transition hover:bg-white/12 hover:text-white sm:left-6"
                >
                  <ChevronLeft size={34} strokeWidth={1.75} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    stepLightbox(1);
                  }}
                  aria-label="Next media"
                  whileTap={{ scale: 0.94 }}
                  className="absolute right-3 top-1/2 z-30 inline-flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/6 text-white/45 transition hover:bg-white/12 hover:text-white sm:right-6"
                >
                  <ChevronRight size={34} strokeWidth={1.75} />
                </motion.button>
              </>
            )}

            <div className="relative w-full max-w-[min(92vw,1600px)]" onClick={(event) => event.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${lightbox.kind}-${lightbox.index}-${activeLightboxItem.src}`}
                  src={activeLightboxItem.src}
                  alt={activeLightboxItem.alt}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
                  className="max-h-[90vh] w-full rounded-[24px] border border-white/10 bg-surface/80 object-contain"
                />
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
