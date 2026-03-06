import { useRef, useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, X, Loader2 } from 'lucide-react';

interface ImageGalleryProps {
  galleryId: string;
  columns?: number;
  placeholder?: string;
}

const BUCKET = 'project-files';

async function uploadToStorage(file: File, galleryId: string): Promise<string> {
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `images/${galleryId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '31536000',
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function removeFromStorage(url: string) {
  try {
    // Extract path from URL: ...project-files/images/xxx/yyy.jpg
    const marker = `/${BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return;
    const path = url.slice(idx + marker.length);
    await supabase.storage.from(BUCKET).remove([path]);
  } catch {
    // Best-effort cleanup
  }
}

export function ImageGallery({ galleryId, columns = 2, placeholder = 'Añadir imagen' }: ImageGalleryProps) {
  const { data, addImage, removeImage } = useProject();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const images = data.images[galleryId] || [];

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setUploading(true);
    try {
      const publicUrl = await uploadToStorage(file, galleryId);
      addImage(galleryId, publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async (index: number) => {
    const url = images[index];
    removeImage(galleryId, index);
    if (url && url.startsWith('http')) {
      await removeFromStorage(url);
    }
  };

  return (
    <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : ''} gap-4`}>
      {images.map((src, i) => (
        <div key={i} className="relative group rounded-xl overflow-hidden border border-border bg-card">
          <img src={src} alt={`${galleryId}-${i}`} className="w-full max-h-[400px] object-contain bg-secondary/30 p-2" />
          <button
            onClick={() => handleRemove(i)}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => !uploading && fileRef.current?.click()}
        disabled={uploading}
        className="bg-card rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 min-h-[120px] disabled:opacity-50"
      >
        {uploading ? (
          <>
            <Loader2 size={20} className="animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Subiendo...</p>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Plus size={20} className="text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{placeholder}</p>
          </>
        )}
      </button>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
