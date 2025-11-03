import { createClient } from '@supabase/supabase-js'

export function useSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      'Supabase URL or Publishable Key is not defined in environment variables.',
    )
  }

  return createClient(supabaseUrl, supabasePublishableKey)
}
