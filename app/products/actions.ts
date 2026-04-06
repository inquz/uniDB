'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function normalizePrice(value: FormDataEntryValue | null) {
  return Number(String(value || '').replaceAll(' ', '').replace(',', '.'))
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  const productcode = String(formData.get('productcode') || '').trim().toUpperCase()
  const productname = String(formData.get('productname') || '').trim()
  const costprice = normalizePrice(formData.get('costprice'))
  const wholesaleprice = normalizePrice(formData.get('wholesaleprice'))

  if (!productcode || !/^[A-Z]{2}[0-9]{5}$/.test(productcode)) {
    throw new Error('Product code must be in format AB12345')
  }

  if (!productname) {
    throw new Error('Product name is required')
  }

  if (Number.isNaN(costprice) || costprice < 0) {
    throw new Error('Cost price must be a valid non-negative number')
  }

  if (Number.isNaN(wholesaleprice) || wholesaleprice < 0) {
    throw new Error('Wholesale price must be a valid non-negative number')
  }

  const { error } = await supabase.from('products').insert({
    productcode,
    productname,
    costprice,
    wholesaleprice,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/products')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient()

  const productid = Number(formData.get('productid'))

  if (!productid) {
    throw new Error('Product id is required')
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('productid', productid)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/products')
}