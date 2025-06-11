import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://gtorxvsyqxxpnwehecyd.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0b3J4dnN5cXh4cG53ZWhlY3lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NDgyNDksImV4cCI6MjA1ODUyNDI0OX0.vnoMAVh7ChbffRYferdiMzvqS0Yb0SS9jYcAhC_WM-E";

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);
