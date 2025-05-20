import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.REACT_APP_SUPABASE_URL || "https://zradebcdrddvgantrsiq.supabase.co";
const supabaseAnonKey = import.meta.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyYWRlYmNkcmRkdmdhbnRyc2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3OTg1MTIsImV4cCI6MjA2MjM3NDUxMn0.HG7oXe_E_jio8R7SpNSr9KLP-C2WQYQIhJqJXhAZPGw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
