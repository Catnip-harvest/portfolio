import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

// Use window.location.origin for proxying through Vite dev server to bypass adblockers
const proxyUrl = typeof window !== 'undefined' ? `${window.location.origin}/supabase` : supabaseUrl;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(proxyUrl, supabaseAnonKey) 
  : null;
