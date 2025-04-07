import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bnnifnzjnmqkdbrfkyxi.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubmlmbnpqbm1xa2RicmZreXhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1Njk2MjIsImV4cCI6MjA1OTE0NTYyMn0.Yd_6-d_qlQXKOkGQrJRLHDYqqQXrELBJPGhzuH5r-Oc';

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
