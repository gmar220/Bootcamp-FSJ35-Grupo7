import {createClient} from '@supabase/supabase-js'

const supabaseUrl = "https://ysuzcsyvpuebxywjsxdg.supabase.co";
const supabaseKey = "sb_publishable_AA_UQ8l8-nV2gH-MPDc7aQ_l9k9Dgww";

//Creamos la conexion con supabase

export const supabaseAdmin = createClient(supabaseUrl,supabaseKey,{
    auth: { persistSession: false, autoRefreshToken: false },
  });