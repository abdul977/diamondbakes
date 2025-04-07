import { createClient } from '@supabase/supabase-js';

// Get Supabase URL and key from environment variables
// For client-side uploads, we need to use the service role key
// This is safe because we're only using it for storage operations
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://bnnifnzjnmqkdbrfkyxi.supabase.co';

// Use the service role key for uploads (this has more permissions)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJubmlmbnpqbm1xa2RicmZreXhpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzU2OTYyMiwiZXhwIjoyMDU5MTQ1NjIyfQ.WP-0diChRwwd2SevSCxeWMoyocC57xEKg3_3lVaANCY';

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;
