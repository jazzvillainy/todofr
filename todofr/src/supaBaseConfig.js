import { createClient } from "@supabase/supabase-js";


const supaBaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supaBaseUrl, supabaseKey);

export default supabase