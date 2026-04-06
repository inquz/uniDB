'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addRelease(formData: FormData) {
  const supabase = await createClient()

  const workshopid = Number(formData.get('workshopid'))
  const productid = Number(formData.get('productid'))
  const quantity = Number(formData.get('quantity'))

  if (!workshopid) {
    throw new Error('Workshop is required')
  }

  if (!productid) {
    throw new Error('Product is required')
  }

  if (!quantity || Number.isNaN(quantity) || quantity <= 0) {
    throw new Error('Quantity must be a positive number')
  }

  const { error } = await supabase.from('releases').insert({
    workshopid,
    productid,
    quantity,
  })

  if (error) {
    if (error.message.toLowerCase().includes('duplicate key')) {
      throw new Error('This workshop-product pair already exists')
    }

    throw new Error(error.message)
  }

  revalidatePath('/releases')
}

export async function deleteRelease(formData: FormData) {
  const supabase = await createClient()

  const workshopid = Number(formData.get('workshopid'))
  const productid = Number(formData.get('productid'))

  if (!workshopid || !productid) {
    throw new Error('Release key is invalid')
  }

  const { error } = await supabase
    .from('releases')
    .delete()
    .eq('workshopid', workshopid)
    .eq('productid', productid)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/releases')
}