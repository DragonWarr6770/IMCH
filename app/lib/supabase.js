import { createClient } from '@supabase/supabase-js';

// These variables will connect to your specific database later
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// This helper generates a random "Campfire Guest" name for users
export const getRandomUsername = () => {
  const names = ['Starlight', 'Firefly', 'Wanderer', 'Trailblazer', 'Kindle', 'Embers'];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${randomName}_${randomNumber}`;
};