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
    <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Справочник цехов</h1>
        <Link
          href="/"
          className="hidden sm:inline-flex items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:bg-gray-200 hover:border-gray-400 hover:text-black
          bg-white text-zinc-900 border-zinc-300
          dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
        >
          Назад
        </Link>
      </div>

      <form action={addWorkshop} className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          name="workshopname"
          placeholder="Название цеха"
          className="w-full rounded-lg border px-3 py-2 text-center
          bg-white text-zinc-900 border-zinc-300
          dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700"
          required
        />
        <button
          type="submit"
          className="rounded-lg border px-4 py-2 transition hover:bg-green-100 
          hover:border-green-700 hover:text-green-900
          dark:hover:bg-green-900/20 dark:hover:border-green-500 dark:hover:text-green-300
          bg-white text-zinc-900 border-zinc-300
          dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700
          cursor-pointer sm:shrink-0"
        >
          Добавить
        </button>
      </form>

      <div className="space-y-3 md:hidden">
        {workshops?.map((workshop) => (
          <div
            key={workshop.workshopid}
            className="rounded-xl border p-4"
          >
            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">ID</div>
              <div className="font-medium">{workshop.workshopid}</div>
            </div>

            <div className="mb-4 space-y-1">
              <div className="text-sm text-zinc-400">Название</div>
              <div className="font-medium break-words">{workshop.workshopname}</div>
            </div>

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
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Название</th>
              <th className="w-24 p-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {workshops?.map((workshop) => (
              <tr key={workshop.workshopid} className="border-b last:border-0">
                <td className="p-3 align-middle">{workshop.workshopid}</td>
                <td className="p-3 align-middle break-words">{workshop.workshopname}</td>
                <td className="p-3 align-middle">
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