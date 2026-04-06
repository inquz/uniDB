import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { addProduct, deleteProduct } from './actions'

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .order('productid')

  if (error) {
    throw new Error(error.message)
  }

  return (
    <main className="mx-auto max-w-6xl p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Справочник изделий</h1>
        <Link
          href="/"
          className="rounded-lg border px-4 py-2 transition hover:bg-gray-200 hover:border-gray-400 hover:text-black"
        >
          Назад
        </Link>
      </div>

      <form action={addProduct} className="mb-8 grid gap-3 rounded-xl border p-4 md:grid-cols-2 xl:grid-cols-5">
        <input
          type="text"
          name="productcode"
          placeholder="Код, (пример: AB12345)"
          className="rounded-lg border px-3 py-2"
          maxLength={7}
          required
        />
        <input
          type="text"
          name="productname"
          placeholder="Название изделия"
          className="rounded-lg border px-3 py-2"
          required
        />
        <input
          type="text"
          name="costprice"
          placeholder="Себестоимость"
          className="rounded-lg border px-3 py-2"
          required
        />
        <input
          type="text"
          name="wholesaleprice"
          placeholder="Оптовая цена"
          className="rounded-lg border px-3 py-2"
          required
        />
        <button
          type="submit"
          className="rounded-lg border px-4 py-2 transition hover:bg-green-200 hover:border-green-900 hover:text-green-900 cursor-pointer"
        >
          Добавить
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Код</th>
              <th className="p-3">Название</th>
              <th className="p-3">Себестоимость</th>
              <th className="p-3">Оптовая цена</th>
              <th className="p-3">Действия</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.productid} className="border-b last:border-0">
                <td className="p-3">{product.productid}</td>
                <td className="p-3">{product.productcode}</td>
                <td className="p-3">{product.productname}</td>
                <td className="p-3">{Number(product.costprice).toFixed(2)}</td>
                <td className="p-3">{Number(product.wholesaleprice).toFixed(2)}</td>
                <td className="p-3">
                  <form action={deleteProduct}>
                    <input
                      type="hidden"
                      name="productid"
                      value={product.productid}
                    />
                    <button
                      type="submit"
                      aria-label={`Delete product ${product.productname}`}
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