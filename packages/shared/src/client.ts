import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types/database";

export type SupabaseClient = ReturnType<typeof createSupabaseClient>;

/**
 * Create a typed Supabase client.
 * @param supabaseUrl - Project URL (https://xxx.supabase.co)
 * @param supabaseKey - Publishable key (sb_publishable_xxx) or legacy anon key
 */
export function createSupabaseClient(supabaseUrl: string, supabaseKey: string) {
  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

/**
 * Create a Supabase client for browser usage.
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.
 *
 * Get your publishable key from: Project Settings > API Keys
 * New format: sb_publishable_xxx (replaces legacy anon key)
 */
export function createBrowserClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing Supabase environment variables. " +
        "Please set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseKey);
}
