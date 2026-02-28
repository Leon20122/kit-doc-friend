import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { ImageGallery } from './ImageGallery';
import { Plus, X, Pencil, Check } from 'lucide-react';

interface MultiImageGalleryProps {
  sectionId: string;
  columns?: number;
  placeholder?: string;
  defaultLabel?: string;
}

export function MultiImageGallery({ sectionId, columns = 2, placeholder = 'Añadir imagen', defaultLabel = 'Nuevo bloque de fotos' }: MultiImageGalleryProps) {
  const { data, updateNote } = useProject();
  
  // Store gallery block metadata in notes as JSON
  const storageKey = `gallery-blocks-${sectionId}`;
  const raw = data.notes[storageKey];
  const blocks: { id: string; label: string }[] = raw ? JSON.parse(raw) : [{ id: `${sectionId}-default`, label: defaultLabel }];

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');

  const saveBlocks = (newBlocks: { id: string; label: string }[]) => {
    updateNote(storageKey, JSON.stringify(newBlocks));
  };

  const addBlock = () => {
    const newId = `${sectionId}-${Date.now()}`;
    saveBlocks([...blocks, { id: newId, label: defaultLabel }]);
  };

  const removeBlock = (id: string) => {
    saveBlocks(blocks.filter(b => b.id !== id));
  };

  const startEdit = (block: { id: string; label: string }) => {
    setEditingId(block.id);
    setEditLabel(block.label);
  };

  const confirmEdit = (id: string) => {
    saveBlocks(blocks.map(b => b.id === id ? { ...b, label: editLabel } : b));
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <div key={block.id} className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3 group">
            {editingId === block.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  value={editLabel}
                  onChange={e => setEditLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && confirmEdit(block.id)}
                  className="text-sm font-semibold bg-transparent border-b border-border text-foreground outline-none flex-1"
                  autoFocus
                />
                <button onClick={() => confirmEdit(block.id)} className="text-success"><Check size={14} /></button>
              </div>
            ) : (
              <h4 className="text-sm font-semibold text-foreground">{block.label}</h4>
            )}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => startEdit(block)} className="text-muted-foreground hover:text-foreground p-1"><Pencil size={12} /></button>
              {blocks.length > 1 && (
                <button onClick={() => removeBlock(block.id)} className="text-destructive p-1"><X size={14} /></button>
              )}
            </div>
          </div>
          <ImageGallery galleryId={block.id} columns={columns} placeholder={placeholder} />
        </div>
      ))}
      <button
        onClick={addBlock}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Plus size={16} /> Añadir nuevo bloque de imágenes
      </button>
    </div>
  );
}
