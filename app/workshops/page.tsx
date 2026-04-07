import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { addWorkshop, deleteWorkshop } from './actions'

const panelClass =
  'rounded-3xl border border-zinc-200/80 bg-white/72 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/72 dark:shadow-[0_0_30px_rgba(0,0,0,0.22)]'

const inputClass =
  'w-full rounded-2xl border px-4 py-3 text-center outline-none transition bg-white/80 text-zinc-900 border-zinc-200/80 placeholder:text-zinc-400 hover:border-sky-300/70 focus:border-sky-300/80 focus:ring-4 focus:ring-sky-100 dark:bg-zinc-900/80 dark:text-zinc-100 dark:border-zinc-700 dark:placeholder:text-zinc-500 dark:hover:border-cyan-400/50 dark:focus:border-cyan-400/60 dark:focus:ring-cyan-500/10'

const buttonClass =
  'inline-flex items-center justify-center rounded-2xl border px-4 py-3 font-medium transition cursor-pointer bg-white/80 text-zinc-900 border-zinc-200/80 hover:bg-white hover:border-sky-300/80 hover:text-sky-700 hover:shadow-[0_10px_30px_rgba(56,189,248,0.15)] dark:bg-zinc-900/80 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:border-cyan-400/50 dark:hover:text-cyan-200 dark:hover:shadow-[0_0_30px_rgba(34,211,238,0.14)]'

const addButtonClass =
  'inline-flex items-center justify-center rounded-2xl border px-5 py-3 font-medium transition cursor-pointer bg-white/80 text-zinc-900 border-zinc-200/80 hover:bg-green-50 hover:border-green-300 hover:text-green-700 hover:shadow-[0_12px_30px_rgba(34,197,94,0.14)] dark:bg-zinc-900/80 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-green-900/20 dark:hover:border-green-500/60 dark:hover:text-green-300 dark:hover:shadow-[0_0_30px_rgba(34,197,94,0.14)]'

const deleteButtonClass =
  'inline-flex items-center justify-center rounded-xl border p-2 transition cursor-pointer bg-white/70 text-zinc-500 border-zinc-200/80 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:bg-zinc-900/70 dark:text-zinc-400 dark:border-zinc-700 dark:hover:bg-red-900/20 dark:hover:border-red-500/50 dark:hover:text-red-300'

export default async function WorkshopsPage() {
  const supabase = await createClient()

  const { data: workshops, error } = await supabase
    .from('workshops')
    .select('*')
    .order('workshopid')

  if (error) {
    throw new Error(error.message)
  }

  const workshopsCount = workshops?.length ?? 0

  return (
    <main className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),rgba(255,255,255,0.04),transparent_72%)] blur-3xl dark:bg-[radial-gradient(circle,rgba(34,211,238,0.12),rgba(255,255,255,0.03),transparent_72%)]" />
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/70 px-3 py-1 text-xs font-medium tracking-wide text-zinc-600 shadow-[0_6px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/70 dark:text-zinc-300">
            <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.6)] dark:bg-cyan-300 dark:shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
            Производственные данные
          </div>

          <div>
            <h1 className="bg-gradient-to-b from-zinc-900 to-zinc-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-zinc-300">
              Справочник цехов
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Всего записей: {workshopsCount}
            </p>
          </div>
        </div>

        <Link href="/" className={`${buttonClass} hidden sm:inline-flex`}>
          Назад
        </Link>
      </div>

      <section className={`${panelClass} mb-8 p-4 sm:p-5`}>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-sky-200/70 bg-sky-50/80 text-sky-700 shadow-[0_8px_20px_rgba(56,189,248,0.12)] dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200 dark:shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M3.75 4.5A2.25 2.25 0 0 1 6 2.25h12A2.25 2.25 0 0 1 20.25 4.5v15A2.25 2.25 0 0 1 18 21.75H6A2.25 2.25 0 0 1 3.75 19.5v-15ZM7.5 6.75a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Zm0 4.5a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Zm0 4.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5H7.5Z" />
            </svg>
          </div>

          <div>
            <div className="font-medium text-zinc-800 dark:text-zinc-100">
              Добавить новый цех
            </div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Быстрое пополнение справочника
            </div>
          </div>
        </div>

        <form action={addWorkshop} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            name="workshopname"
            placeholder="Название цеха"
            className={inputClass}
            required
          />

          <button type="submit" className={`${addButtonClass} sm:shrink-0`}>
            Добавить
          </button>
        </form>
      </section>

      <div className="space-y-4 md:hidden">
        {workshops?.map((workshop) => (
          <div
            key={workshop.workshopid}
            className={`${panelClass} overflow-hidden p-4`}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500">
                  Цех
                </div>
                <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                  #{workshop.workshopid}
                </div>
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
                  className={deleteButtonClass}
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

            <div className="rounded-2xl border border-zinc-200/80 bg-white/55 p-4 dark:border-white/10 dark:bg-zinc-900/45">
              <div className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                Название
              </div>
              <div className="break-words font-medium text-zinc-900 dark:text-zinc-100">
                {workshop.workshopname}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`${panelClass} hidden overflow-x-auto md:block`}>
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-200/80 text-left dark:border-white/10">
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                ID
              </th>
              <th className="p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Название
              </th>
              <th className="w-24 p-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                Действия
              </th>
            </tr>
          </thead>

          <tbody>
            {workshops?.map((workshop) => (
              <tr
                key={workshop.workshopid}
                className="border-b border-zinc-200/70 transition hover:bg-white/55 dark:border-white/10 dark:hover:bg-zinc-900/35 last:border-0"
              >
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-xl border border-sky-200/80 bg-sky-50/70 px-3 py-1 text-sm font-medium text-sky-700 dark:border-cyan-400/20 dark:bg-cyan-500/10 dark:text-cyan-200">
                    #{workshop.workshopid}
                  </span>
                </td>

                <td className="p-4 align-middle">
                  <div className="break-words font-medium text-zinc-900 dark:text-zinc-100">
                    {workshop.workshopname}
                  </div>
                </td>

                <td className="p-4 align-middle">
                  <form action={deleteWorkshop}>
                    <input
                      type="hidden"
                      name="workshopid"
                      value={workshop.workshopid}
                    />
                    <button
                      type="submit"
                      aria-label={`Delete workshop ${workshop.workshopname}`}
                      className={deleteButtonClass}
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