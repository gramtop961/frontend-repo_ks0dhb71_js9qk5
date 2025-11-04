import { Trophy, Lightbulb, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const challengesData = [
  {
    id: 'web-101',
    title: 'Login Bypass Basics',
    category: 'Web',
    difficulty: 'Easy',
    description: 'Bypass a weak login form using basic SQL injection techniques.',
    hint: 'Try using logical operators to make a condition always true.',
    flag: 'FLAG{BAS1C_SQLI}',
  },
  {
    id: 'crypto-201',
    title: 'XOR Secrets',
    category: 'Crypto',
    difficulty: 'Medium',
    description: 'Recover a plaintext by analyzing repeated-key XOR.',
    hint: 'Frequency analysis on XORed text can reveal the key.',
    flag: 'FLAG{X0R_K3Y}',
  },
  {
    id: 'pwn-301',
    title: 'Buffer Overflow Warmup',
    category: 'Pwn',
    difficulty: 'Hard',
    description: 'Exploit a classic stack buffer overflow to overwrite return address.',
    hint: 'Understand calling conventions and NOP sleds.',
    flag: 'FLAG{0V3RFL0W}',
  },
];

const leaderboardData = [
  { user: 'cyberfox', points: 420 },
  { user: 'n00b_hunter', points: 360 },
  { user: 'packetwizard', points: 300 },
  { user: 'rooted', points: 280 },
];

export default function CTFSection({ t }) {
  const [submissions, setSubmissions] = useState({});
  const [revealed, setRevealed] = useState({});

  const handleSubmit = (id, value) => {
    const chal = challengesData.find((c) => c.id === id);
    if (!chal) return;
    const correct = value.trim() === chal.flag;
    setSubmissions((s) => ({ ...s, [id]: { value, correct } }));
  };

  return (
    <section id="ctf" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t.ctf.title}</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {challengesData.map((c) => {
              const state = submissions[c.id];
              const isCorrect = state?.correct;
              return (
                <article key={c.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {c.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t.ctf.category}: {c.category} • {t.ctf.difficulty}: {t.ctf.difficulties[c.difficulty] || c.difficulty}
                      </p>
                    </div>
                    {isCorrect && (
                      <span className="inline-flex items-center gap-1 text-emerald-600 text-sm font-medium">
                        <CheckCircle2 className="h-4 w-4" /> {t.ctf.correct}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{c.description}</p>

                  <button
                    onClick={() => setRevealed((r) => ({ ...r, [c.id]: !r[c.id] }))}
                    className="mt-3 inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    <Lightbulb className="h-4 w-4" /> {revealed[c.id] ? t.ctf.hideHint : t.ctf.showHint}
                  </button>
                  {revealed[c.id] && (
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{c.hint}</div>
                  )}

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder={t.ctf.flagPlaceholder}
                      value={submissions[c.id]?.value || ''}
                      onChange={(e) => setSubmissions((s) => ({ ...s, [c.id]: { value: e.target.value, correct: false } }))}
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      onClick={() => handleSubmit(c.id, submissions[c.id]?.value || '')}
                      className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                    >
                      {t.ctf.submit}
                    </button>
                  </div>

                  {submissions[c.id] && !isCorrect && submissions[c.id].value && (
                    <p className="mt-2 text-sm text-red-600">{t.ctf.incorrect}</p>
                  )}
                </article>
              );
            })}
          </div>

          <aside className="lg:col-span-1">
            <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{t.ctf.leaderboard}</h3>
              <ul className="space-y-2">
                {leaderboardData.map((row, i) => (
                  <li key={row.user} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">#{i + 1} {row.user}</span>
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">{row.points} pts</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
