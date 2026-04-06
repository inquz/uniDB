import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { addRelease, deleteRelease } from './actions'

export default async function ReleasesPage() {
  const supabase = await createClient()

  const [
    { data: workshops, error: workshopsError },
    { data: products, error: productsError },
    { data: releases, error: releasesError },
  ] = await Promise.all([
    supabase.from('workshops').select('*').order('workshopid'),
    supabase.from('products').select('*').order('productid'),
    supabase
      .from('releases')
      .select(`
        quantity,
        workshopid,
        productid,
        workshops (
          workshopid,
          workshopname
        ),
        products (
          productid,
          productcode,
          productname
        )
      `)
      .order('workshopid')
      .order('productid'),
  ])

  if (workshopsError) throw new Error(workshopsError.message)
  if (productsError) throw new Error(productsError.message)
  if (releasesError) throw new Error(releasesError.message)

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Факты выпуска</h1>

        <Link
          href="/"
          className="hidden sm:inline-flex items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:bg-gray-200 hover:border-gray-400 hover:text-black"
        >
          Назад
        </Link>
      </div>

      {/* ФОРМА */}
      <form
        action={addRelease}
        className="mb-8 grid gap-3 rounded-xl border p-4 md:grid-cols-2 xl:grid-cols-4"
      >
        <select
          name="workshopid"
          className="w-full min-w-0 rounded-lg border px-3 py-2 text-center"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Выберите цех
          </option>
          {workshops?.map((workshop) => (
            <option key={workshop.workshopid} value={workshop.workshopid}>
              {workshop.workshopid} — {workshop.workshopname}
            </option>
          ))}
        </select>

        <select
          name="productid"
          className="w-full min-w-0 rounded-lg border px-3 py-2 text-center"
          required
          defaultValue=""
        >
          <option value="" disabled>
            Выберите изделие
          </option>
          {products?.map((product) => (
            <option key={product.productid} value={product.productid}>
              {product.productcode} — {product.productname}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Количество"
          min={1}
          className="w-full min-w-0 rounded-lg border px-3 py-2 text-center"
          required
        />

        <button
          type="submit"
          className="w-full min-w-0 cursor-pointer rounded-lg border px-4 py-2 transition hover:bg-green-200 hover:border-green-900 hover:text-green-900"
        >
          Добавить
        </button>
      </form>

      {/* МОБИЛЬНЫЙ ВИД */}
      <div className="space-y-3 md:hidden">
        {releases?.map((release) => {
          const workshop = Array.isArray(release.workshops)
            ? release.workshops[0]
            : release.workshops

          const product = Array.isArray(release.products)
            ? release.products[0]
            : release.products

          return (
            <div
              key={`${release.workshopid}-${release.productid}`}
              className="rounded-xl border p-4"
            >
              <div className="mb-3 space-y-1">
                <div className="text-sm text-zinc-400">Цех</div>
                <div className="font-medium break-words">
                  {workshop?.workshopname ??
                    `Workshop #${release.workshopid}`}
                </div>
              </div>

              <div className="mb-3 space-y-1">
                <div className="text-sm text-zinc-400">Изделие</div>
                <div className="font-medium break-words">
                  {product?.productcode ??
                    `Product #${release.productid}`}
                </div>
              </div>

              <div className="mb-4 space-y-1">
                <div className="text-sm text-zinc-400">Количество</div>
                <div className="font-medium">{release.quantity}</div>
              </div>

              <form action={deleteRelease}>
                <input
                  type="hidden"
                  name="workshopid"
                  value={release.workshopid}
                />
                <input
                  type="hidden"
                  name="productid"
                  value={release.productid}
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
          )
        })}
      </div>

      {/* ДЕСКТОП */}
      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">Цех</th>
              <th className="p-3">Изделие</th>
              <th className="p-3">Количество</th>
              <th className="w-24 p-3">Действия</th>
            </tr>
          </thead>

          <tbody>
            {releases?.map((release) => {
              const workshop = Array.isArray(release.workshops)
                ? release.workshops[0]
                : release.workshops

              const product = Array.isArray(release.products)
                ? release.products[0]
                : release.products

              return (
                <tr
                  key={`${release.workshopid}-${release.productid}`}
                  className="border-b last:border-0"
                >
                  <td className="p-3 align-middle break-words">
                    {workshop?.workshopname ??
                      `Workshop #${release.workshopid}`}
                  </td>

                  <td className="p-3 align-middle break-words">
                    {product?.productcode ??
                      `Product #${release.productid}`}
                  </td>

                  <td className="p-3 align-middle">
                    {release.quantity}
                  </td>

                  <td className="p-3 align-middle">
                    <form action={deleteRelease}>
                      <input
                        type="hidden"
                        name="workshopid"
                        value={release.workshopid}
                      />
                      <input
                        type="hidden"
                        name="productid"
                        value={release.productid}
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
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}