import { Download, ExternalLink, Shield, Network } from 'lucide-react';
import { useState } from 'react';

const toolsData = [
  {
    id: 'nmap',
    name: 'Nmap',
    category: 'Network Security',
    description:
      'A powerful network scanning tool used to discover hosts and services on a computer network.',
    usage: [
      'Install via package manager or from nmap.org',
      'Run: nmap -sV target.com to detect services',
      'Use -A for aggressive scan with OS detection',
    ],
    links: {
      website: 'https://nmap.org',
      download: 'https://nmap.org/download.html',
    },
  },
  {
    id: 'burp',
    name: 'Burp Suite',
    category: 'Penetration Testing',
    description:
      'An integrated platform for performing security testing of web applications with a powerful proxy and scanner.',
    usage: [
      'Install Community or Pro edition',
      'Configure your browser to use Burp proxy (127.0.0.1:8080)',
      'Intercept and analyze requests; use Repeater/Intruder for testing',
    ],
    links: {
      website: 'https://portswigger.net/burp',
      download: 'https://portswigger.net/burp/releases',
    },
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    category: 'Network Security',
    description:
      'A protocol analyzer for network troubleshooting, analysis, and development.',
    usage: [
      'Install and open a network interface',
      'Apply display filters (e.g., http, dns, tcp.port==443)',
      'Inspect packet details and follow TCP streams',
    ],
    links: {
      website: 'https://www.wireshark.org/',
      download: 'https://www.wireshark.org/download.html',
    },
  },
  {
    id: 'hashcat',
    name: 'Hashcat',
    category: 'Cryptography',
    description:
      'Advanced password recovery tool supporting GPU acceleration for fast cracking.',
    usage: [
      'Prepare hashes and select attack mode',
      'Run: hashcat -m 0 -a 0 hashes.txt wordlist.txt',
      'Use rules and masks to optimize attacks',
    ],
    links: {
      website: 'https://hashcat.net/hashcat/',
      download: 'https://hashcat.net/hashcat/',
    },
  },
];

const categories = ['All', 'Penetration Testing', 'Network Security', 'Cryptography'];

export default function ToolsSection({ t, lang }) {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? toolsData : toolsData.filter((x) => x.category === active);

  return (
    <section id="tools" className="relative py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-6 w-6 text-emerald-500" />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t.tools.title}</h2>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                active === c
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-emerald-500'
              }`}
            >
              {t.tools.categories[c] || c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tool) => (
            <article key={tool.id} className="group rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur p-5 hover:border-emerald-500 transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</h3>
                  <p className="text-xs mt-1 inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                    <Network className="h-3.5 w-3.5" /> {t.tools.categories[tool.category] || tool.category}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">{tool.description}</p>
              <ul className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                {tool.usage.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={tool.links.download}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500"
                >
                  <Download className="h-4 w-4" /> {t.common.download}
                </a>
                <a
                  href={tool.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400"
                >
                  <ExternalLink className="h-4 w-4" /> {t.common.learnMore}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
