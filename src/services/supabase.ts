import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://lphbzyzalwcxbdijqkhc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGJ6eXphbHdjeGJkaWpxa2hjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MjE1OTIsImV4cCI6MjA0MDM5NzU5Mn0.fXUolc737dT-dCpQrHDNa0GM6m9tQW48BFvBFqu9kOQ";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
