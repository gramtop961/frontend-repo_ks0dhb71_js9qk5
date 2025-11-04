import { Trophy, Lightbulb, CheckCircle2, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function CTFSection({ t }) {
  const [challenges, setChallenges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [revealed, setRevealed] = useState({});
  const [flags, setFlags] = useState({});
  const [results, setResults] = useState({});
  const [username, setUsername] = useState(() => localStorage.getItem('ctf_user') || '');
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [cRes, lRes] = await Promise.all([
        fetch(`${BACKEND}/api/ctf/challenges`),
        fetch(`${BACKEND}/api/ctf/leaderboard`),
      ]);
      const [cData, lData] = await Promise.all([cRes.json(), lRes.json()]);
      setChallenges(cData);
      setLeaderboard(lData);
    } catch (e) {
      console.error('Failed to load CTF data', e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitFlag = async (challenge_id) => {
    const flag = flags[challenge_id] || '';
    if (!flag.trim()) return;
    const uname = username.trim() || 'guest';
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/ctf/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ challenge_id, username: uname, flag }),
      });
      const data = await res.json();
      setResults((r) => ({ ...r, [challenge_id]: data }));
      if (data?.correct) fetchData();
    } catch (e) {
      console.error('Submit failed', e);
    } finally {
      setLoading(false);
    }
  };

  const saveUsername = (val) => {
    setUsername(val);
    try { localStorage.setItem('ctf_user', val); } catch {}
  };

  return (
    <section id="ctf" className="relative py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="h-6 w-6 text-emerald-500" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t.ctf.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex items-center border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 bg-white/70 dark:bg-gray-900/70">
              <User className="h-4 w-4 text-gray-500 mr-2" />
              <input
                value={username}
                onChange={(e) => saveUsername(e.target.value)}
                placeholder="username"
                className="bg-transparent outline-none text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {challenges.map((c) => {
              const res = results[c.challenge_id];
              const isCorrect = res?.correct;
              return (
                <article key={c.challenge_id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{c.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {t.ctf.category}: {c.category} • {t.ctf.difficulty}: {t.ctf.difficulties[c.difficulty] || c.difficulty} • {c.points} pts
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
                    onClick={() => setRevealed((r) => ({ ...r, [c.challenge_id]: !r[c.challenge_id] }))}
                    className="mt-3 inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    <Lightbulb className="h-4 w-4" /> {revealed[c.challenge_id] ? t.ctf.hideHint : t.ctf.showHint}
                  </button>
                  {revealed[c.challenge_id] && (
                    <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">{c.hint}</div>
                  )}

                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder={t.ctf.flagPlaceholder}
                      value={flags[c.challenge_id] || ''}
                      onChange={(e) => setFlags((s) => ({ ...s, [c.challenge_id]: e.target.value }))}
                      className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-950/60 text-gray-900 dark:text-gray-100"
                    />
                    <button
                      onClick={() => submitFlag(c.challenge_id)}
                      disabled={loading}
                      className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60"
                    >
                      {t.ctf.submit}
                    </button>
                  </div>

                  {res && !isCorrect && (flags[c.challenge_id] || '').trim() && (
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
                {leaderboard.map((row, i) => (
                  <li key={row.user + i} className="flex items-center justify-between text-sm">
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
