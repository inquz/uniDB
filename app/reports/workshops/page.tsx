import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function WorkshopReportPage() {
  const supabase = await createClient()

  const { data: reports, error } = await supabase
    .from('workshop_report')
    .select('*')
    .order('workshopid')

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Отчет по цехам</h1>

        <Link
          href="/"
          className="hidden items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:border-gray-400 hover:bg-gray-200 hover:text-black sm:inline-flex"
        >
          Назад
        </Link>
      </div>

      <div className="space-y-3 md:hidden">
        {reports?.map((report) => (
          <div
            key={report.workshopid}
            className="rounded-xl border p-4"
          >
            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">ID цеха</div>
              <div className="font-medium break-words">{report.workshopid}</div>
            </div>

            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">Название цеха</div>
              <div className="font-medium break-words">{report.workshopname}</div>
            </div>

            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">Общая себестоимость</div>
              <div className="font-medium">
                {Number(report.total_cost).toFixed(2)}
              </div>
            </div>

            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">Общая выручка</div>
              <div className="font-medium">
                {Number(report.total_revenue).toFixed(2)}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-zinc-400">
                Коэффициент эффективности
              </div>
              <div className="font-medium">
                {Number(report.efficiency_ratio).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">ID цеха</th>
              <th className="p-3">Название цеха</th>
              <th className="p-3">Общая себестоимость</th>
              <th className="p-3">Общая выручка</th>
              <th className="p-3">Коэффициент эффективности</th>
            </tr>
          </thead>
          <tbody>
            {reports?.map((report) => (
              <tr key={report.workshopid} className="border-b last:border-0">
                <td className="p-3 align-middle break-words">
                  {report.workshopid}
                </td>
                <td className="p-3 align-middle break-words">
                  {report.workshopname}
                </td>
                <td className="p-3 align-middle">
                  {Number(report.total_cost).toFixed(2)}
                </td>
                <td className="p-3 align-middle">
                  {Number(report.total_revenue).toFixed(2)}
                </td>
                <td className="p-3 align-middle">
                  {Number(report.efficiency_ratio).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}