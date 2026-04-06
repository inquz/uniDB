import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function TopProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('top_products')
    .select('productid, productcode, productname, total_quantity')
    .order('total_quantity', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  const medals = ['🥇', '🥈', '🥉']

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Топ-3 изделий</h1>

        <Link
          href="/"
          className="hidden items-center justify-center rounded-lg border px-4 py-2 text-center transition hover:border-gray-400 hover:bg-gray-200 hover:text-black sm:inline-flex"
        >
          Назад
        </Link>
      </div>

      <div className="space-y-3 md:hidden">
        {products?.map((product, index) => (
          <div
            key={product.productid}
            className="rounded-xl border p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
                <span>{medals[index] ?? '🏭'}</span>
                <span>#{index + 1}</span>
              </div>

              <div className="rounded-full border px-3 py-1 text-sm font-medium">
                {product.total_quantity} шт.
              </div>
            </div>

            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">ID</div>
              <div className="break-words font-medium">{product.productid}</div>
            </div>

            <div className="mb-3 space-y-1">
              <div className="text-sm text-zinc-400">Код</div>
              <div className="break-words font-medium">{product.productcode}</div>
            </div>

            <div className="space-y-1">
              <div className="text-sm text-zinc-400">Название</div>
              <div className="break-words font-medium">{product.productname}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="w-24 p-3">Место</th>
              <th className="p-3">ID</th>
              <th className="p-3">Код</th>
              <th className="p-3">Название</th>
              <th className="p-3">Общее количество</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((product, index) => (
              <tr
                key={product.productid}
                className="border-b last:border-0"
              >
                <td className="p-3 align-middle">
                  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium">
                    <span>{medals[index] ?? '🏭'}</span>
                    <span>#{index + 1}</span>
                  </span>
                </td>

                <td className="p-3 align-middle break-words">
                  {product.productid}
                </td>

                <td className="p-3 align-middle break-words">
                  {product.productcode}
                </td>

                <td className="p-3 align-middle break-words">
                  {product.productname}
                </td>

                <td className="p-3 align-middle font-medium">
                  {product.total_quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}