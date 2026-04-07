import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const panelClass =
  'rounded-3xl border border-zinc-200/80 bg-white/72 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72 dark:shadow-[0_0_30px_rgba(0,0,0,0.22)]'

const buttonClass =
  'inline-flex items-center justify-center rounded-2xl border px-4 py-3 font-medium transition cursor-pointer bg-white/80 text-zinc-900 border-zinc-200/80 hover:bg-white hover:border-sky-300/80 hover:text-sky-700 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] dark:bg-zinc-900/80 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-cyan-400/50 dark:hover:text-cyan-200 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.14)]'

function formatMoney(value: number | string) {
  return Number(value).toFixed(2)
}

function formatRatio(value: number | string) {
  return Number(value).toFixed(2)
}

function getEfficiencyTone(value: number | string) {
  const ratio = Number(value)

  if (ratio >= 1) {
    return 'border-green-200/80 bg-green-50/80 text-green-700 dark:border-green-400/20 dark:bg-green-500/10 dark:text-green-200'
  }

  if (ratio >= 0.85) {
    return 'border-amber-200/80 bg-amber-50/80 text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-200'
  }

  return 'border-rose-200/80 bg-rose-50/80 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-200'
}

export default async function WorkshopReportPage() {
  const supabase = await createClient()

  const { data: reports, error } = await supabase
    .from('workshop_report')
    .select('*')
    .order('workshopid')

  if (error) {
    throw new Error(error.message)
  }

  const reportsCount = reports?.length ?? 0
  const bestReport =
    reports && reports.length > 0
      ? [...reports].sort(
          (a, b) => Number(b.efficiency_ratio) - Number(a.efficiency_ratio)
        )[0]
      : null

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(255,255,255,0.04),transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(34,211,238,0.12),rgba(255,255,255,0.03),transparent_72%)]" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] dark:bg-cyan-300 dark:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            Аналитика производства
          </div>

          <div>
            <h1 className="bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-zinc-300">
              Отчет по цехам
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Себестоимость, выручка и эффективность по каждому цеху
            </p>
          </div>
        </div>

        <Link href="/" className={`${buttonClass} hidden sm:inline-flex`}>
          Назад
        </Link>
      </div>

      <section className="mb-8 grid gap-4 md:grid-cols-3">
        <div className={`${panelClass} p-5`}>
          <div className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
            Всего цехов
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            {reportsCount}
          </div>
          <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            записей в отчете
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
            Лучший коэффициент
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">
            {bestReport ? formatRatio(bestReport.efficiency_ratio) : '—'}
          </div>
          <div className="mt-1 break-words text-sm text-zinc-500 dark:text-zinc-400">
            {bestReport ? bestReport.workshopname : 'Нет данных'}
          </div>
        </div>

        <div className={`${panelClass} p-5`}>
          <div className="mb-2 text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
            Фокус отчета
          </div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Производственная эффективность
          </div>
          <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            сравнение затрат и выручки
          </div>
        </div>
      </section>

      <div className="space-y-4 md:hidden">
        {reports?.map((report) => (
          <article
            key={report.workshopid}
            className={`${panelClass} overflow-hidden p-4`}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
                  Цех
                </div>
                <div className="mt-1 inline-flex items-center rounded-xl border border-sky-200/80 bg-sky-50/70 px-3 py-1 text-sm font-medium text-sky-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                  #{report.workshopid}
                </div>
              </div>

              <div
                className={`inline-flex items-center rounded-2xl border px-3 py-2 text-sm font-semibold ${getEfficiencyTone(
                  report.efficiency_ratio
                )}`}
              >
                {formatRatio(report.efficiency_ratio)}
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
              <div className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                Название цеха
              </div>
              <div className="break-words font-medium text-zinc-900 dark:text-zinc-100">
                {report.workshopname}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  Себестоимость
                </div>
                <div className="break-words font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatMoney(report.total_cost)}
                </div>
              </div>

              <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
                <div className="mb-1 text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                  Выручка
                </div>
                <div className="break-words font-semibold text-zinc-900 dark:text-zinc-100">
                  {formatMoney(report.total_revenue)}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className={`${panelClass} hidden overflow-x-auto md:block`}>
        <table className="w-full min-w-[920px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-200/80 text-left dark:border-white/10">
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                ID цеха
              </th>
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Название цеха
              </th>
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Общая себестоимость
              </th>
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Общая выручка
              </th>
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Коэффициент эффективности
              </th>
            </tr>
          </thead>

          <tbody>
            {reports?.map((report) => (
              <tr
                key={report.workshopid}
                className="border-b border-zinc-200/70 transition hover:bg-white/55 dark:border-white/10 dark:hover:bg-zinc-900/35 last:border-0"
              >
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-xl border border-sky-200/80 bg-sky-50/70 px-3 py-1 text-sm font-medium text-sky-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                    #{report.workshopid}
                  </span>
                </td>

                <td className="p-4 align-middle">
                  <div className="max-w-[240px] break-words font-medium text-zinc-900 dark:text-zinc-100">
                    {report.workshopname}
                  </div>
                </td>

                <td className="p-4 align-middle">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatMoney(report.total_cost)}
                  </span>
                </td>

                <td className="p-4 align-middle">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {formatMoney(report.total_revenue)}
                  </span>
                </td>

                <td className="p-4 align-middle">
                  <span
                    className={`inline-flex items-center rounded-2xl border px-3 py-1.5 text-sm font-semibold ${getEfficiencyTone(
                      report.efficiency_ratio
                    )}`}
                  >
                    {formatRatio(report.efficiency_ratio)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}