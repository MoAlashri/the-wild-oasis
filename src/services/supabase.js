import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = "https://cqhitxlwetsjlucgzahd.supabase.co";
const supabaseKey = "sb_publishable_8iWle3YAauV8Wx-LcfKcEw_tM_0bYjm";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;