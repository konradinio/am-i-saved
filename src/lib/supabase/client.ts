// Supabase browser client — safe for use in Client Components only.
// TODO (Milestone 2): Wire up real Supabase credentials from env vars.
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // TODO: Replace with real env var values in .env.local
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
