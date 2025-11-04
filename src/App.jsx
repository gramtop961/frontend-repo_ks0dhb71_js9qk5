import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ToolsSection from './components/ToolsSection';
import CTFSection from './components/CTFSection';

const translations = {
  en: {
    nav: { tools: 'Tools', ctf: 'CTF', about: 'About' },
    hero: {
      title: 'Cyber Security Tools and CTF Playground',
      subtitle:
        'Explore a curated toolkit and sharpen your skills with hands-on Capture The Flag challenges. Built for speed, clarity, and a delightful dark mode.',
    },
    cta: { exploreTools: 'Explore Tools', startCTF: 'Start Challenge' },
    tools: {
      title: 'Cyber Security Tools',
      categories: {
        All: 'All',
        'Penetration Testing': 'Penetration Testing',
        'Network Security': 'Network Security',
        Cryptography: 'Cryptography',
      },
    },
    ctf: {
      title: 'CTF Challenges',
      category: 'Category',
      difficulty: 'Difficulty',
      difficulties: { Easy: 'Easy', Medium: 'Medium', Hard: 'Hard' },
      submit: 'Submit Flag',
      flagPlaceholder: 'Enter flag e.g. FLAG{example}',
      showHint: 'Show hint',
      hideHint: 'Hide hint',
      correct: 'Solved!',
      incorrect: 'That flag is not correct. Try again.',
      leaderboard: 'Leaderboard',
    },
    about: {
      title: 'About SecPlay',
      body:
        'SecPlay is a modern, bilingual space for security enthusiasts. Browse tools, tackle challenges, and grow your skills in a safe environment.',
      policy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact',
      rights: 'All rights reserved.',
    },
    common: { download: 'Download', learnMore: 'Learn More' },
  },
  id: {
    nav: { tools: 'Perkakas', ctf: 'CTF', about: 'Tentang' },
    hero: {
      title: 'Perkakas Keamanan Siber dan Arena CTF',
      subtitle:
        'Jelajahi kumpulan alat terkurasi dan asah kemampuan Anda dengan tantangan Capture The Flag. Cepat, jelas, dan nyaman dalam mode gelap.',
    },
    cta: { exploreTools: 'Jelajahi Perkakas', startCTF: 'Mulai Tantangan' },
    tools: {
      title: 'Perkakas Keamanan Siber',
      categories: {
        All: 'Semua',
        'Penetration Testing': 'Pengujian Penetrasi',
        'Network Security': 'Keamanan Jaringan',
        Cryptography: 'Kriptografi',
      },
    },
    ctf: {
      title: 'Tantangan CTF',
      category: 'Kategori',
      difficulty: 'Tingkat Kesulitan',
      difficulties: { Easy: 'Mudah', Medium: 'Menengah', Hard: 'Sulit' },
      submit: 'Kirim Flag',
      flagPlaceholder: 'Masukkan flag contoh: FLAG{contoh}',
      showHint: 'Lihat petunjuk',
      hideHint: 'Sembunyikan petunjuk',
      correct: 'Berhasil!',
      incorrect: 'Flag salah. Coba lagi.',
      leaderboard: 'Papan Peringkat',
    },
    about: {
      title: 'Tentang SecPlay',
      body:
        'SecPlay adalah ruang modern dan dwibahasa untuk pegiat keamanan. Jelajahi alat, taklukkan tantangan, dan tingkatkan kemampuan Anda.',
      policy: 'Kebijakan Privasi',
      terms: 'Syarat Layanan',
      contact: 'Kontak',
      rights: 'Hak cipta dilindungi.',
    },
    common: { download: 'Unduh', learnMore: 'Pelajari Lebih Lanjut' },
  },
};

function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const t = useMemo(() => translations[lang], [lang]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar lang={lang} setLang={setLang} t={t} theme={theme} setTheme={setTheme} />
      <main>
        <Hero t={t} />
        <ToolsSection t={t} lang={lang} />
        <CTFSection t={t} />

        <section id="about" className="py-16 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">{t.about.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-3xl">{t.about.body}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">© {new Date().getFullYear()} SecPlay. {t.about.rights}</p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">{t.about.policy}</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">{t.about.terms}</a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400">{t.about.contact}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
