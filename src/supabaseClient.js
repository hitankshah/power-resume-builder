import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.REACT_APP_SUPABASE_URL || "https://dcxrgcvimvkdmsocnczx.supabase.co";
const supabaseAnonKey = import.meta.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjeHJnY3ZpbXZrZG1zb2NuY3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2MjY5NzEsImV4cCI6MjA1NzIwMjk3MX0.Ix9QSaVizWiYVkEtn9aFSdxE-izDWkY9pyCkkWJSu2o";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
