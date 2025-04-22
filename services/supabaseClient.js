import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);
