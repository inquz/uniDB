'use client'

import Link from 'next/link'

const items = [
  { href: '/workshops', label: 'Справочник цехов' },
  { href: '/products', label: 'Справочник изделий' },
  { href: '/releases', label: 'Факты выпуска' },
  { href: '/reports/workshops', label: 'Отчет по цехам' },
  { href: '/reports/top_products', label: 'Лучшие изделия' },
]

export default function HomePage() {
  return (
    <main className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_35%)]" />

      <div className="orbit-scene relative flex h-[min(92vw,780px)] w-[min(92vw,780px)] items-center justify-center">
        <div className="absolute h-[min(76vw,600px)] w-[min(76vw,600px)] rounded-full border border-white/10" />
        <div className="absolute h-[min(58vw,450px)] w-[min(58vw,450px)] rounded-full border border-white/5" />

        {items.map((item, index) => {
          const angle = `${(360 / items.length) * index}deg`

          return (
            <div
              key={item.href}
              className="orbit-item"
              style={
                {
                  '--angle': angle,
                  '--radius': 'clamp(180px, 30vw, 290px)',
                  '--duration': '26s',
                } as React.CSSProperties
              }
            >
              <div className="orbit-item-inner">
                <Link
                  href={item.href}
                  className="orbit-link group relative flex min-h-[96px] w-64 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-zinc-950/80 px-5 text-center text-lg font-semibold text-white shadow-[0_0_20px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-cyan-300/60 hover:shadow-[0_0_40px_rgba(34,211,238,0.28)]"
                >
                  <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute inset-[1px] rounded-2xl border border-white/10 group-hover:border-cyan-300/30" />
                  <span className="relative z-10 bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-transparent transition-all duration-300 group-hover:from-white group-hover:to-cyan-200">
                    {item.label}
                  </span>
                </Link>
              </div>
            </div>
          )
        })}

        <a
          href="https://supabase.com/dashboard/project/yohmbtofdvidzlvddccj"
          target="_blank"
          rel="noreferrer"
          className="group relative z-10 flex h-52 w-52 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0.04),transparent_72%)] blur-xl transition-all duration-300 group-hover:blur-2xl group-hover:opacity-100" />
          <div className="absolute inset-2 rounded-full border border-white/10" />
          <div className="absolute inset-5 rounded-full border border-cyan-300/20 shadow-[0_0_40px_rgba(34,211,238,0.18)]" />
          <div className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full border border-white/20 bg-zinc-950/80 shadow-[0_0_55px_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_70px_rgba(34,211,238,0.28)]">
            <span className="bg-gradient-to-b from-white to-zinc-300 bg-clip-text text-5xl font-black tracking-[0.22em] text-transparent">
              БД
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-[0.35em] text-zinc-400 transition-colors duration-300 group-hover:text-cyan-200">
              Supabase
            </span>
          </div>
        </a>
      </div>

        <a
          href="https://github.com/ТВОЙ_ЮЗЕР/ТВОЙ_РЕПОЗИТОРИЙ"
          target="_blank"
          rel="noreferrer"
          className="group absolute bottom-6 right-6 z-20"
        >
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle,rgba(255,255,255,0.16),rgba(255,255,255,0.04),transparent_75%)] opacity-0 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl" />
          
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/20 bg-zinc-950/80 px-4 py-3 text-white shadow-[0_0_20px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-300/60 group-hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 text-zinc-300 transition-colors duration-300 group-hover:text-cyan-200"
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.6.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.04.77 2.11v3.12c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
            </svg>

            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-wide transition-colors duration-300 group-hover:text-cyan-200">
                Исходный код
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                GitHub
              </span>
            </div>
          </div>
        </a>

      <style jsx>{`
        @keyframes orbit-move {
          from {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--radius));
          }
          to {
            transform: translate(-50%, -50%) rotate(calc(var(--angle) + 360deg)) translateX(var(--radius));
          }
        }

        @keyframes orbit-keep-static {
          from {
            transform: rotate(calc(-1 * var(--angle)));
          }
          to {
            transform: rotate(calc(-1 * var(--angle) - 360deg));
          }
        }

        .orbit-item {
          position: absolute;
          left: 50%;
          top: 50%;
          animation: orbit-move var(--duration) linear infinite;
        }

        .orbit-item-inner {
          animation: orbit-keep-static var(--duration) linear infinite;
        }

        .orbit-scene:hover .orbit-item,
        .orbit-scene:hover .orbit-item-inner {
          animation-play-state: paused;
        }
      `}</style>
    </main>
  )
}