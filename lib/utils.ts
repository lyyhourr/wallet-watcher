import { createClient } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eHd3YnN6bWhpZnlmcnFzbHlmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNTM5MDgzOSwiZXhwIjoyMDIwOTY2ODM5fQ.NpI121IRjZYY9zVspbj1JtsPn35P8_Taz7HpnCpfDB0",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
