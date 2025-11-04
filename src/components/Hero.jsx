import Spline from '@splinetool/react-spline';
import { PlayCircle } from 'lucide-react';

export default function Hero({ t }) {
  return (
    <section id="hero" className="relative pt-24 sm:pt-28">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/mwBbOy4jrazr59EO/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white dark:from-gray-950/80 dark:via-gray-950/70 dark:to-gray-950 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[70vh]">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-gray-900 via-emerald-600 to-gray-900 dark:from-white dark:via-emerald-400 dark:to-white bg-clip-text text-transparent">
              {t.hero.title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#tools" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition">
                {t.cta.exploreTools}
              </a>
              <a href="#ctf" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition">
                <PlayCircle className="h-5 w-5" />
                {t.cta.startCTF}
              </a>
            </div>
          </div>
          <div className="lg:block hidden" aria-hidden>
            {/* Empty column for balanced layout with 3D scene background */}
          </div>
        </div>
      </div>
    </section>
  );
}
