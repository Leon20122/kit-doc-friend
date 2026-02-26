import { useProject } from '@/contexts/ProjectContext';

interface EditableNoteProps {
  noteId: string;
  placeholder?: string;
  className?: string;
}

export function EditableNote({ noteId, placeholder = 'Escribe aquí...', className = '' }: EditableNoteProps) {
  const { data, updateNote } = useProject();
  const value = data.notes[noteId] || '';

  return (
    <textarea
      value={value}
      onChange={e => updateNote(noteId, e.target.value)}
      placeholder={placeholder}
      className={`w-full bg-secondary/30 border border-border rounded-lg px-4 py-3 text-sm text-foreground/90 placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 resize-y min-h-[80px] transition-colors ${className}`}
    />
  );
}
