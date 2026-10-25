import { createBrowserClient } from "@supabase/ssr";


const supabaseUrl = "https://ysuzcsyvpuebxywjsxdg.supabase.co";
const supabaseKey = "";

export function createClient() {
  return createBrowserClient(
    supabaseUrl!,
    supabaseKey!
  );
}