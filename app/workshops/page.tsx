import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { addWorkshop, deleteWorkshop } from './actions'

export default async function WorkshopsPage() {
  const supabase = await createClient()

  const { data: workshops, error } = await supabase
    .from('workshops')
    .select('*')
    .order('workshopid')

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Справочник цехов</h1>
        <Link
          href="/"
          className="rounded-lg border px-4 py-2 transition hover:bg-gray-200 hover:border-gray-400 hover:text-black"
        >
          Назад
        </Link>
      </div>

      <form action={addWorkshop} className="mb-8 flex gap-3">
        <input
          type="text"
          name="workshopname"
          placeholder="Название цеха"
          className="w-full rounded-lg border px-3 py-2"
          required
        />
        <button
        type="submit"
        className="rounded-lg border px-4 py-2 transition hover:bg-green-200 hover:border-green-900 hover:text-green-900 cursor-pointer"
        >
        Добавить
        </button>
      </form>

      <div className="rounded-xl border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Название</th>
              <th className="p-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {workshops?.map((workshop) => (
              <tr key={workshop.workshopid} className="border-b last:border-0">
                <td className="p-3">{workshop.workshopid}</td>
                <td className="p-3">{workshop.workshopname}</td>
                <td className="p-3">
                  <form action={deleteWorkshop}>
                    <input
                      type="hidden"
                      name="workshopid"
                      value={workshop.workshopid}
                    />
                    
                    <button
                    type="submit"
                    aria-label={`Delete workshop ${workshop.workshopname}`}
                    className="inline-flex items-center justify-center rounded-lg border p-2 transition hover:bg-red-50 hover:border-red-300 hover:text-red-600 cursor-pointer"
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                        fillRule="evenodd"
                        d="M9 3.75A1.5 1.5 0 0 1 10.5 2.25h3A1.5 1.5 0 0 1 15 3.75V4.5h3.75a.75.75 0 0 1 0 1.5h-.69l-.877 12.276A2.25 2.25 0 0 1 14.94 20.25H9.06a2.25 2.25 0 0 1-2.244-1.974L5.94 6H5.25a.75.75 0 0 1 0-1.5H9v-.75ZM10.5 4.5h3v-.75h-3v.75Zm-1.56 3.22a.75.75 0 0 1 .748.702l.5 8.25a.75.75 0 1 1-1.497.091l-.5-8.25a.75.75 0 0 1 .7-.793h.049Zm6.12 0a.75.75 0 0 1 .7.793l-.5 8.25a.75.75 0 1 1-1.497-.09l.5-8.25a.75.75 0 0 1 .748-.703h.049Zm-3.06-.02a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-1.5 0V8.45a.75.75 0 0 1 .75-.75Z"
                        clipRule="evenodd"
                        />
                    </svg>
                    </button>

                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}