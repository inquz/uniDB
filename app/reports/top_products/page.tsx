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

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Топ-3 изделий</h1>
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
              <th className="p-3">ID</th>
              <th className="p-3">Код</th>
              <th className="p-3">Название</th>
              <th className="p-3">Общее количество</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.productid} className="border-b last:border-0">
                <td className="p-3">{product.productid}</td>
                <td className="p-3">{product.productcode}</td>
                <td className="p-3">{product.productname}</td>
                <td className="p-3">{product.total_quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}