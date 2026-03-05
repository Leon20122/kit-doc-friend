import { useRef } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Plus, X, Image } from 'lucide-react';

interface ImageGalleryProps {
  galleryId: string;
  columns?: number;
  placeholder?: string;
}

export function ImageGallery({ galleryId, columns = 2, placeholder = 'Añadir imagen' }: ImageGalleryProps) {
  const { data, addImage, removeImage } = useProject();
  const fileRef = useRef<HTMLInputElement>(null);
  const images = data.images[galleryId] || [];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        addImage(galleryId, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className={`grid grid-cols-1 ${columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : ''} gap-4`}>
      {images.map((src, i) => (
        <div key={i} className="relative group rounded-xl overflow-hidden border border-border bg-card">
          <img src={src} alt={`${galleryId}-${i}`} className="w-full max-h-[400px] object-contain bg-secondary/30 p-2" />
          <button
            onClick={() => removeImage(galleryId, i)}
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => fileRef.current?.click()}
        className="bg-card rounded-xl border-2 border-dashed border-border p-6 text-center hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 min-h-[120px]"
      >
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <Plus size={20} className="text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">{placeholder}</p>
      </button>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}
