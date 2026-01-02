import { useMemo } from "react";
import { createBrowserClient, type SupabaseClient } from "@repo/shared";

interface UseSupabaseResult {
  supabase: SupabaseClient | null;
  isConfigured: boolean;
}

/**
 * React hook for accessing the Supabase client.
 * Requires VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.
 */
export function useSupabase(): UseSupabaseResult {
  return useMemo(() => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

    const isConfigured = Boolean(supabaseUrl && supabaseKey);

    if (!isConfigured) {
      return { supabase: null, isConfigured: false };
    }

    try {
      const supabase = createBrowserClient();
      return { supabase, isConfigured: true };
    } catch {
      return { supabase: null, isConfigured: false };
    }
  }, []);
}
