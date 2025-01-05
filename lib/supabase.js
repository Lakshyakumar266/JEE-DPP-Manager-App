import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const url = 'https://atcbodjvdomsayglbdyx.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Y2JvZGp2ZG9tc2F5Z2xiZHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNzUzNTMsImV4cCI6MjA1MTY1MTM1M30.HwhVIcbxNNLJQGpHvxivoQ7qD1K28cCDqVLaL2xdVuY'

export const supabase = createClient(url, key)
