// supabase.jsx
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://rnyqtspvacifgbkrkemf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJueXF0c3B2YWNpZmdia3JrZW1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNTg5MzQsImV4cCI6MjA2ODgzNDkzNH0.u4WnZC62fyj1kMa-MJsn6AFyvYh0JhDdmT8-vw8rqi0';
export const supaBase = createClient(supabaseUrl, supabaseKey);
export const uploadFileToSupabase = async (file, path = 'uploads/', bucket = 'user.uploads') => {
  if (!file) return null;

  const fileName = `${Date.now()}_${file.name}`;
  const filePath = `${path}${fileName}`;

  const { data, error } = await supaBase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type || 'image/jpeg',
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  const {
    data: { publicUrl },
  } = supaBase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return publicUrl;
};
