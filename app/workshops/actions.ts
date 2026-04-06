'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addWorkshop(formData: FormData) {
  const supabase = await createClient()

  const workshopname = String(formData.get('workshopname') || '').trim()

  if (!workshopname) {
    throw new Error('Workshop name is required')
  }

  const { error } = await supabase.from('workshops').insert({
    workshopname,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/workshops')
}

export async function deleteWorkshop(formData: FormData) {
  const supabase = await createClient()

  const workshopid = Number(formData.get('workshopid'))

  if (!workshopid) {
    throw new Error('Workshop id is required')
  }

  const { error } = await supabase
    .from('workshops')
    .delete()
    .eq('workshopid', workshopid)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/workshops')
}