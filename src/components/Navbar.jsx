import { useState } from 'react';
import { Globe, Moon, Sun, Shield } from 'lucide-react';

export default function Navbar({ lang, setLang, t, theme, setTheme }) {
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('theme', next);
    }
  };

  const switchLang = () => {
    const next = lang === 'en' ? 'id' : 'en';
    setLang(next);
    if (typeof localStorage !== 'undefined') localStorage.setItem('lang', next);
  };

  const NavLink = ({ href, children }) => (
    <a
      href={href}
      onClick={() => setOpen(false)}
      className="px-3 py-2 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 hover:text-emerald-500 dark:hover:text-emerald-400"
    >
      {children}
    </a>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 border-b border-white/10 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            <span className="font-semibold text-gray-900 dark:text-white">SecPlay</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="#tools">{t.nav.tools}</NavLink>
            <NavLink href="#ctf">{t.nav.ctf}</NavLink>
            <NavLink href="#about">{t.nav.about}</NavLink>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={switchLang}
              aria-label="Toggle language"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">{lang === 'en' ? 'EN' : 'ID'}</span>
            </button>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden inline-flex items-center px-3 py-2 text-gray-700 dark:text-gray-200"
              aria-label="Open menu"
            >
              <span className="sr-only">Menu</span>
              <div className="space-y-1">
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="block h-0.5 w-5 bg-current"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col rounded-lg border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
            <NavLink href="#tools">{t.nav.tools}</NavLink>
            <NavLink href="#ctf">{t.nav.ctf}</NavLink>
            <NavLink href="#about">{t.nav.about}</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
