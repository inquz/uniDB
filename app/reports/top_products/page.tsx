import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import TopRankBadge from '@/components/ui/top-rank-badge'

const panelClass =
  'rounded-3xl border border-zinc-200/80 bg-white/72 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72 dark:shadow-[0_0_30px_rgba(0,0,0,0.22)]'

const buttonClass =
  'inline-flex items-center justify-center rounded-2xl border px-4 py-3 font-medium transition cursor-pointer bg-white/80 text-zinc-900 border-zinc-200/80 hover:bg-white hover:border-sky-300/80 hover:text-sky-700 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] dark:bg-zinc-900/80 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-cyan-400/50 dark:hover:text-cyan-200 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.14)]'

function getCardAccent(rank: number) {
  if (rank === 1) {
    return {
      border:
        'border-amber-200/80 dark:border-yellow-400/20',
      glow:
        'bg-[radial-gradient(circle,rgba(251,191,36,0.16),rgba(255,255,255,0.02),transparent_72%)] dark:bg-[radial-gradient(circle,rgba(250,204,21,0.12),rgba(255,255,255,0.02),transparent_72%)]',
      chip:
        'border-amber-200/80 bg-amber-50/80 text-amber-700 dark:border-yellow-400/20 dark:bg-yellow-500/10 dark:text-yellow-200',
    }
  }

  if (rank === 2) {
    return {
      border:
        'border-sky-200/80 dark:border-cyan-400/20',
      glow:
        'bg-[radial-gradient(circle,rgba(56,189,248,0.14),rgba(255,255,255,0.02),transparent_72%)] dark:bg-[radial-gradient(circle,rgba(34,211,238,0.10),rgba(255,255,255,0.02),transparent_72%)]',
      chip:
        'border-sky-200/80 bg-sky-50/80 text-sky-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200',
    }
  }

  return {
    border:
      'border-orange-200/80 dark:border-orange-400/20',
    glow:
      'bg-[radial-gradient(circle,rgba(251,146,60,0.14),rgba(255,255,255,0.02),transparent_72%)] dark:bg-[radial-gradient(circle,rgba(249,115,22,0.10),rgba(255,255,255,0.02),transparent_72%)]',
    chip:
      'border-orange-200/80 bg-orange-50/80 text-orange-700 dark:border-orange-400/20 dark:bg-orange-500/10 dark:text-orange-200',
  }
}

export default async function TopProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('top_products')
    .select('productid, productcode, productname, total_quantity')
    .order('total_quantity', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  const leader = products?.[0]

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(255,255,255,0.04),transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(34,211,238,0.12),rgba(255,255,255,0.03),transparent_72%)]" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] dark:bg-cyan-300 dark:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            Аналитика выпуска
          </div>

          <div>
            <h1 className="bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-zinc-300">
              Топ-3 изделий
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Лидеры по общему объему выпуска
            </p>
          </div>
        </div>

        <Link href="/" className={`${buttonClass} hidden sm:inline-flex`}>
          Назад
        </Link>
      </div>

      {leader && (
        <section className={`${panelClass} mb-6 overflow-hidden p-5 sm:p-6`}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <TopRankBadge rank={1} />

              <div>
                <div className="mb-2 inline-flex items-center rounded-full border border-amber-200/80 bg-amber-50/80 px-3 py-1 text-xs font-medium tracking-wide text-amber-700 dark:border-yellow-400/20 dark:bg-yellow-500/10 dark:text-yellow-200">
                  Абсолютный лидер
                </div>

                <div className="break-words text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {leader.productname}
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-xl border border-zinc-200/80 bg-white/75 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-200">
                    #{leader.productid}
                  </span>

                  <span className="inline-flex items-center rounded-xl border border-sky-200/80 bg-sky-50/75 px-3 py-1 text-sm font-medium text-sky-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                    {leader.productcode}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-200/80 bg-white/70 px-5 py-4 text-center shadow-[0_10px_30px_rgba(251,191,36,0.14)] dark:border-yellow-400/20 dark:bg-zinc-900/65 dark:shadow-[0_0_24px_rgba(250,204,21,0.08)]">
              <div className="text-xs uppercase tracking-[0.28em] text-zinc-400 dark:text-zinc-500">
                Выпущено
              </div>
              <div className="mt-1 text-2xl font-black text-zinc-900 dark:text-zinc-100">
                {leader.total_quantity}
              </div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">шт.</div>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        {products?.map((product, index) => {
          const rank = index + 1
          const accent = getCardAccent(rank)

          return (
            <article
              key={product.productid}
              className={`${panelClass} relative overflow-hidden p-5 ${accent.border} ${
                rank === 1 ? 'md:-translate-y-1' : ''
              }`}
            >
              <div className={`absolute inset-0 opacity-70 ${accent.glow}`} />

              <div className="relative">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <TopRankBadge rank={rank} />

                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
                        Место {rank}
                      </div>
                      <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                        {rank === 1
                          ? 'Главный лидер'
                          : rank === 2
                          ? 'Сильный результат'
                          : 'Уверенный топ'}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`inline-flex shrink-0 items-center rounded-2xl border px-3 py-2 text-sm font-semibold ${accent.chip}`}
                  >
                    {product.total_quantity}
                    <span className="ml-1 text-xs font-medium opacity-80">шт.</span>
                  </div>
                </div>

                <div className="mb-3 inline-flex items-center rounded-xl border border-zinc-200/80 bg-white/75 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-200">
                  {product.productcode}
                </div>

                <div className="mb-4 rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
                  <div className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                    Название
                  </div>
                  <div className="break-words font-medium text-zinc-900 dark:text-zinc-100">
                    {product.productname}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 md:grid-cols-1 xl:grid-cols-2">
                  <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
                    <div className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      ID
                    </div>
                    <div className="break-words font-semibold text-zinc-900 dark:text-zinc-100">
                      #{product.productid}
                    </div>
                  </div>

                  <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
                    <div className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      Объем
                    </div>
                    <div className="break-words font-semibold text-zinc-900 dark:text-zinc-100">
                      {product.total_quantity} шт.
                    </div>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </section>
    </main>
  )
}