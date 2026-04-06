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
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Отчет по цехам</h1>
        <Link
          href="/"
          className="rounded-lg border px-4 py-2 transition hover:bg-gray-200 hover:border-gray-400 hover:text-black"
        >
          Назад
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border">
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
                <td className="p-3">{report.workshopid}</td>
                <td className="p-3">{report.workshopname}</td>
                <td className="p-3">{Number(report.total_cost).toFixed(2)}</td>
                <td className="p-3">{Number(report.total_revenue).toFixed(2)}</td>
                <td className="p-3">{Number(report.efficiency_ratio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}