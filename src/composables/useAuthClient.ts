import { AuthClient } from '@supabase/supabase-js'

export function useAuthClient() {
  const auth = new AuthClient({
    url: import.meta.env.VITE_SUPABASE_URL,
    headers: {
      accept: 'json',
      apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
  })

  return auth
}
