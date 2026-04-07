type TopRankBadgeProps = {
  rank: number
}

const rankStyles: Record<number, { shell: string; core: string; text: string; glow: string }> = {
  1: {
    shell:
      'border-amber-300/70 bg-gradient-to-br from-amber-50 to-yellow-100 dark:border-yellow-400/30 dark:bg-yellow-500/10',
    core:
      'border-white/70 dark:border-yellow-300/20',
    text:
      'from-amber-700 to-yellow-500 dark:from-yellow-100 dark:to-amber-300',
    glow:
      'bg-[radial-gradient(circle,rgba(251,191,36,0.28),rgba(255,255,255,0.02),transparent_72%)] dark:bg-[radial-gradient(circle,rgba(250,204,21,0.18),rgba(255,255,255,0.02),transparent_72%)]',
  },
  2: {
    shell:
      'border-sky-200/80 bg-gradient-to-br from-slate-50 to-sky-100 dark:border-cyan-400/20 dark:bg-cyan-500/10',
    core:
      'border-white/70 dark:border-cyan-300/15',
    text:
      'from-slate-700 to-sky-600 dark:from-cyan-100 dark:to-sky-300',
    glow:
      'bg-[radial-gradient(circle,rgba(56,189,248,0.22),rgba(255,255,255,0.02),transparent_72%)] dark:bg-[radial-gradient(circle,rgba(34,211,238,0.16),rgba(255,255,255,0.02),transparent_72%)]',
  },
  3: {
    shell:
      'border-orange-200/80 bg-gradient-to-br from-orange-50 to-amber-100 dark:border-orange-400/20 dark:bg-orange-500/10',
    core:
      'border-white/70 dark:border-orange-300/15',
    text:
      'from-orange-700 to-amber-600 dark:from-orange-100 dark:to-amber-300',
    glow:
      'bg-[radial-gradient(circle,rgba(251,146,60,0.22),rgba(255,255,255,0.02),transparent_72%)] dark:bg-[radial-gradient(circle,rgba(249,115,22,0.16),rgba(255,255,255,0.02),transparent_72%)]',
  },
}

export default function TopRankBadge({ rank }: TopRankBadgeProps) {
  const style = rankStyles[rank] ?? {
    shell:
      'border-zinc-200/80 bg-white/80 dark:border-white/10 dark:bg-zinc-900/80',
    core:
      'border-white/70 dark:border-white/10',
    text:
      'from-zinc-800 to-zinc-500 dark:from-white dark:to-zinc-300',
    glow:
      'bg-[radial-gradient(circle,rgba(161,161,170,0.18),rgba(255,255,255,0.02),transparent_72%)]',
  }

  return (
    <div className="relative flex h-16 w-16 shrink-0 items-center justify-center">
      <div className={`absolute inset-0 rounded-2xl blur-md ${style.glow}`} />
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border shadow-[0_12px_24px_rgba(15,23,42,0.10)] dark:shadow-[0_0_22px_rgba(0,0,0,0.18)] ${style.shell}`}
      >
        <div className={`absolute inset-[4px] rounded-[14px] border ${style.core}`} />
        <span
          className={`relative bg-gradient-to-b bg-clip-text text-sm font-black tracking-[0.24em] text-transparent ${style.text}`}
        >
          {String(rank).padStart(2, '0')}
        </span>
      </div>
    </div>
  )
}