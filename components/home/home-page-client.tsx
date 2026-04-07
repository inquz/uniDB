'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'
import styles from './home-page.module.css'

const items = [
  { href: '/workshops', label: 'Справочник цехов' },
  { href: '/products', label: 'Справочник изделий' },
  { href: '/releases', label: 'Факты выпуска' },
  { href: '/reports/workshops', label: 'Отчет по цехам' },
  { href: '/reports/top_products', label: 'Лучшие изделия' },
]

const orbitCardClass =
  'group relative flex min-h-[88px] w-52 items-center justify-center overflow-hidden rounded-2xl border px-4 text-center text-base font-semibold backdrop-blur-xl transition-all duration-300 border-zinc-200/80 bg-white/72 text-zinc-800 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:scale-110 hover:border-sky-300/80 hover:bg-white/88 hover:shadow-[0_20px_50px_rgba(56,189,248,0.20)] dark:border-white/20 dark:bg-zinc-950/80 dark:text-white dark:shadow-[0_0_20px_rgba(0,0,0,0.35)] dark:hover:scale-110 dark:hover:border-cyan-300/60 dark:hover:bg-zinc-950/80 dark:hover:shadow-[0_0_40px_rgba(34,211,238,0.28)] lg:min-h-[96px] lg:w-60 lg:text-lg xl:w-64'

const orbitCardGlowClass =
  'absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)]'

const orbitCardBorderClass =
  'absolute inset-[1px] rounded-2xl border border-white/50 group-hover:border-sky-200/80 dark:border-white/10 dark:group-hover:border-cyan-300/30'

const orbitCardTextClass =
  'relative z-10 bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-sky-700 group-hover:to-cyan-500 dark:from-white dark:to-zinc-300 dark:group-hover:from-white dark:group-hover:to-cyan-200'

export default function HomePageClient() {
  return (
    <main className="relative h-screen overflow-hidden bg-white dark:bg-zinc-950">
      {/* LIGHT BACKGROUND */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_45%,#f8fafc_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.14),transparent_30%)]" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.12),rgba(125,211,252,0.06),transparent_72%)] blur-3xl" />
      </div>

      {/* DARK BACKGROUND */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_35%)]" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_72%)] blur-3xl" />
      </div>

      <div className="relative mx-auto h-full max-w-7xl px-4 py-4 sm:px-6 md:px-8">
        <section className="flex h-full flex-col items-center justify-center gap-4 md:hidden">
          <a
            href="https://supabase.com/dashboard/project/yohmbtofdvidzlvddccj"
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-40 w-40 items-center justify-center rounded-full transition-transform duration-300 active:scale-95"
          >
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(255,255,255,0.05),transparent_72%)] blur-xl transition-all duration-300 group-active:blur-2xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0.04),transparent_72%)]" />
            <div className="absolute inset-2 rounded-full border border-sky-200/70 dark:border-white/10" />
            <div className="absolute inset-4 rounded-full border border-cyan-300/35 shadow-[0_0_40px_rgba(14,165,233,0.14)] dark:border-cyan-300/20 dark:shadow-[0_0_40px_rgba(34,211,238,0.18)]" />
            <div className="relative flex h-28 w-28 flex-col items-center justify-center rounded-full border border-white/70 bg-white/72 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-300 group-active:border-sky-300/70 group-active:shadow-[0_0_70px_rgba(56,189,248,0.25)] dark:border-white/20 dark:bg-zinc-950/80 dark:shadow-[0_0_55px_rgba(255,255,255,0.08)] dark:group-active:border-cyan-300/50 dark:group-active:shadow-[0_0_70px_rgba(34,211,238,0.28)]">
              <span className="bg-gradient-to-b from-sky-700 to-cyan-500 bg-clip-text text-4xl font-black tracking-[0.18em] text-transparent dark:from-white dark:to-zinc-300">
                БД
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-sky-700/70 transition-colors duration-300 group-active:text-cyan-600 dark:text-zinc-400 dark:group-active:text-cyan-200">
                Supabase
              </span>
            </div>
          </a>

          <div className="w-full max-w-sm space-y-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex min-h-[72px] items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/72 px-4 text-center text-base font-semibold text-zinc-800 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 active:scale-[0.98] active:border-sky-300/70 active:shadow-[0_0_40px_rgba(56,189,248,0.18)] dark:border-white/20 dark:bg-zinc-950/80 dark:text-white dark:shadow-[0_0_20px_rgba(0,0,0,0.35)] dark:active:border-cyan-300/60 dark:active:shadow-[0_0_40px_rgba(34,211,238,0.28)]"
              >
                <span className="absolute inset-0 bg-[radial-gradient(circle,rgba(56,189,248,0.14),transparent_70%)] opacity-0 transition-opacity duration-300 group-active:opacity-100 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_70%)]" />
                <span className="absolute inset-[1px] rounded-2xl border border-white/50 group-active:border-sky-200/80 dark:border-white/10 dark:group-active:border-cyan-300/30" />
                <span className="relative z-10 bg-gradient-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent transition-all duration-300 group-active:from-sky-700 group-active:to-cyan-500 dark:from-white dark:to-zinc-300 dark:group-active:from-white dark:group-active:to-cyan-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <a
            href="https://github.com/inquz/uniDB"
            target="_blank"
            rel="noreferrer"
            className="group relative mt-2 w-full max-w-sm"
          >
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(255,255,255,0.04),transparent_75%)] opacity-0 blur-lg transition-all duration-300 group-active:opacity-100 group-active:blur-xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.16),rgba(255,255,255,0.04),transparent_75%)]" />
            <div className="relative flex items-center justify-center gap-3 rounded-2xl border border-zinc-200/80 bg-white/72 px-4 py-4 text-zinc-800 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 active:scale-[0.98] group-active:border-sky-300/70 group-active:shadow-[0_0_35px_rgba(56,189,248,0.18)] dark:border-white/20 dark:bg-zinc-950/80 dark:text-white dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:group-active:border-cyan-300/60 dark:group-active:shadow-[0_0_35px_rgba(34,211,238,0.25)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-zinc-500 transition-colors duration-300 group-active:text-sky-600 dark:text-zinc-300 dark:group-active:text-cyan-200"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.6.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.04.77 2.11v3.12c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-wide transition-colors duration-300 group-active:text-sky-600 dark:group-active:text-cyan-200">
                  Исходный код
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  GitHub
                </span>
              </div>
            </div>
          </a>
        </section>

        <section className="hidden h-full items-center justify-center md:flex">
          <div
            className={`relative flex h-[min(78vw,720px)] w-[min(78vw,720px)] items-center justify-center ${styles.pauseZone}`}
          >
            <div className="absolute h-[min(74vw,600px)] w-[min(74vw,600px)] rounded-full border border-sky-200/70 shadow-[0_0_80px_rgba(56,189,248,0.08)] dark:border-white/10 dark:shadow-none" />
            <div className="absolute h-[min(58vw,450px)] w-[min(58vw,450px)] rounded-full border border-cyan-100/90 shadow-[0_0_50px_rgba(125,211,252,0.12)] dark:border-white/5 dark:shadow-none" />
            <div className="absolute h-[min(42vw,320px)] w-[min(42vw,320px)] rounded-full border border-sky-100/80 dark:border-transparent" />

            {items.map((item, index) => {
              const angle = `${(360 / items.length) * index}deg`

              return (
                <div
                  key={item.href}
                  className={styles.orbitItem}
                  style={
                    {
                      '--angle': angle,
                      '--radius': 'clamp(180px, 28vw, 300px)',
                      '--duration': '26s',
                    } as CSSProperties
                  }
                >
                  <div className={styles.orbitItemInner}>
                    <Link href={item.href} className={orbitCardClass}>
                      <span className={orbitCardGlowClass} />
                      <span className={orbitCardBorderClass} />
                      <span className={orbitCardTextClass}>{item.label}</span>
                    </Link>
                  </div>
                </div>
              )
            })}

            <a
              href="https://supabase.com/dashboard/project/yohmbtofdvidzlvddccj"
              target="_blank"
              rel="noreferrer"
              className="group relative z-10 flex h-48 w-48 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105 lg:h-52 lg:w-52"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(255,255,255,0.06),transparent_72%)] blur-xl transition-all duration-300 group-hover:blur-2xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0.04),transparent_72%)]" />
              <div className="absolute inset-2 rounded-full border border-sky-200/70 dark:border-white/10" />
              <div className="absolute inset-5 rounded-full border border-cyan-300/40 shadow-[0_0_50px_rgba(14,165,233,0.16)] dark:border-cyan-300/20 dark:shadow-[0_0_40px_rgba(34,211,238,0.18)]" />

              <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full border border-white/70 bg-white/72 shadow-[0_12px_40px_rgba(15,23,42,0.10)] backdrop-blur-xl transition-all duration-300 group-hover:border-sky-300/70 group-hover:shadow-[0_0_70px_rgba(56,189,248,0.25)] dark:border-white/20 dark:bg-zinc-950/80 dark:shadow-[0_0_55px_rgba(255,255,255,0.08)] dark:group-hover:border-cyan-300/50 dark:group-hover:shadow-[0_0_70px_rgba(34,211,238,0.28)] lg:h-40 lg:w-40">
                <span className="bg-gradient-to-b from-sky-700 to-cyan-500 bg-clip-text text-4xl font-black tracking-[0.18em] text-transparent dark:from-white dark:to-zinc-300 lg:text-5xl">
                  БД
                </span>
                <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-sky-700/70 transition-colors duration-300 group-hover:text-cyan-600 dark:text-zinc-400 dark:group-hover:text-cyan-200 lg:text-[11px]">
                  Supabase
                </span>
              </div>
            </a>
          </div>

          <a
            href="https://github.com/inquz/uniDB"
            target="_blank"
            rel="noreferrer"
            className="group fixed bottom-6 right-6 z-20 lg:bottom-8 lg:right-8"
          >
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(255,255,255,0.04),transparent_75%)] opacity-0 blur-lg transition-all duration-300 group-hover:opacity-100 group-hover:blur-xl dark:bg-[radial-gradient(circle,rgba(255,255,255,0.16),rgba(255,255,255,0.04),transparent_75%)]" />
            <div className="relative flex items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white/72 px-4 py-3 text-zinc-800 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 group-hover:scale-105 group-hover:border-sky-300/80 group-hover:shadow-[0_20px_40px_rgba(56,189,248,0.18)] dark:border-white/20 dark:bg-zinc-950/80 dark:text-white dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] dark:group-hover:border-cyan-300/60 dark:group-hover:shadow-[0_0_35px_rgba(34,211,238,0.25)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-zinc-500 transition-colors duration-300 group-hover:text-sky-600 dark:text-zinc-300 dark:group-hover:text-cyan-200"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.95.1-.75.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.6.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.04.77 2.11v3.12c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>

              <div className="flex flex-col leading-none">
                <span className="text-sm font-semibold tracking-wide transition-colors duration-300 group-hover:text-sky-600 dark:group-hover:text-cyan-200">
                  Исходный код
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
                  GitHub
                </span>
              </div>
            </div>
          </a>
        </section>
      </div>
    </main>
  )
}