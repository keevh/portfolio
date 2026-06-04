import { useRef, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import type { Mesh } from 'three';

const PHOTO_SRC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzKThiuJBg63w6hkaDjTrb92nzpD5xBh9l5BfqNlLW5HVYEJJHIAQ7icbM4F4meNyfc8f7YjcDEPq2N5A-M-dYtED2DPh_86KqSmYqzleqYKAEZneCy6GXeEHmfyvaTq5qrF1uqqW-SM2bVKOXkeH2o0gpW3L3DcUPfTU6RwqCsOg2EZ4-JxzfsFOu7WUNoBb823NfLdN-JRWoMV4rU6TBvAB1ktRlLiHEvrZuD_PXB199egvCHqHCyElgy3rqTzTzD0rleIH6y8x_';

function AbstractShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float floatIntensity={2} speed={1.5} rotationIntensity={1.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshDistortMaterial
          color="#1e1e1e"
          emissive="#2a0a00"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.6}
          roughness={0.2}
          distort={0.4}
          speed={2}
        />
      </mesh>
      <mesh scale={[2.8, 2.8, 2.8]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#00f2ff" wireframe transparent opacity={0.12} />
      </mesh>
    </Float>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="about" className="min-h-screen flex items-center relative pt-20">
      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary-container/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px]" />
        <div className="absolute left-10 top-1/3 text-surface-container font-code-sm opacity-20 select-none hidden md:block">
          &lt;html&gt;<br />
          &nbsp;&nbsp;&lt;body&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;<br />
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — text content */}
          <motion.div
            className="flex flex-col gap-6 z-10 order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex flex-col gap-2">
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-on-surface">
                {t('hero.greeting')} {t('hero.im')}<span className="text-primary-container">.</span>
              </h1>
              <h2 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl text-gradient pb-2">
                {t('hero.specialty')}
              </h2>
            </div>
            <p className="font-code-sm text-sm text-on-surface-variant max-w-md border-l-2 border-primary-container pl-4">
              {t('hero.desc')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                className="inline-flex items-center justify-center h-12 px-8 rounded-full font-label-caps text-xs bg-primary-container text-on-primary-container hover:bg-primary transition-colors shadow-[0_0_15px_rgba(0,242,255,0.15)]"
                href="#projects"
              >
                {t('hero.btn.projects')}
              </a>
              <a
                className="inline-flex items-center justify-center h-12 px-8 rounded-full font-label-caps text-xs border border-primary/30 text-primary-container hover:bg-primary-container/10 transition-colors"
                href="#contact"
              >
                {t('hero.btn.contact')}
              </a>
            </div>
          </motion.div>

          {/* RIGHT — photo on mobile, 3D on desktop */}
          <motion.div
            className="flex justify-center items-center order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Mobile: photo card */}
            <div className="lg:hidden flex justify-center">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden ring-2 ring-primary-container/30 shadow-[0_0_40px_rgba(0,242,255,0.1)]">
                <img
                  alt="Kevin Gallardo"
                  className="w-full h-full object-cover grayscale-[20%]"
                  src={PHOTO_SRC}
                />
              </div>
            </div>

            {/* Desktop: 3D scene only */}
            <div className="hidden lg:block relative w-full h-[560px] cursor-grab active:cursor-grabbing">
              {/* Glow behind 3D */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[380px] h-[380px] rounded-full bg-gradient-to-tr from-primary-container/15 to-secondary/15 blur-[80px]" />
              </div>
              {/* Spinning ring */}
              <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="w-[480px] h-[480px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]">
                  <div className="absolute top-0 left-[20%] w-4 h-[1px] bg-primary-container shadow-[0_0_10px_#00f2ff]" />
                  <div className="absolute bottom-0 right-[20%] w-4 h-[1px] bg-secondary shadow-[0_0_10px_#14b8a6]" />
                  <div className="absolute top-1/2 left-0 w-[1px] h-4 bg-white/20" />
                  <div className="absolute top-1/2 right-0 w-[1px] h-4 bg-white/20" />
                </div>
              </div>
              <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                  <AbstractShape />
                </Suspense>
                <Environment preset="city" />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
