import { useState } from 'react';
import { EditableTable } from '@/components/EditableTable';
import { ToggleBlock } from '@/components/ToggleBlock';
import { useProject } from '@/contexts/ProjectContext';
import { Plus, X, Pencil, Check } from 'lucide-react';

export function ControlCambios() {
  const { data, addHistoryEntry, updateHistoryEntry, removeHistoryEntry } = useProject();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📝</span> Control de Cambios</h1>
        <p className="text-sm text-muted-foreground mt-1">Registro de versiones, historial detallado y convenciones.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Registro de Versiones</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="versiones" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">📜 Historial Detallado</h2>
        <button
          onClick={addHistoryEntry}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          <Plus size={16} /> Añadir versión
        </button>
      </div>

      {data.historyEntries.map((entry, idx) => (
        <HistoryEntryBlock
          key={entry.id}
          entry={entry}
          defaultOpen={idx === 0}
          onUpdate={(field, value) => updateHistoryEntry(entry.id, field as any, value)}
          onRemove={() => removeHistoryEntry(entry.id)}
        />
      ))}

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🏷️ Convenciones de Versionado</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Prefijo</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Significado</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Ejemplo</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['✨', 'Nueva sección o funcionalidad', 'Agregar sección de simulaciones'],
              ['📝', 'Modificación de contenido existente', 'Actualizar valores de resistencia'],
              ['🐛', 'Corrección de errores', 'Corregir ecuación incorrecta'],
              ['🗑️', 'Eliminación de contenido', 'Remover sección obsoleta'],
              ['📎', 'Adición de archivos/imágenes', 'Agregar capturas de simulación'],
            ].map(([p, s, e], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90 text-lg">{p}</td>
                <td className="px-3 py-2 text-foreground/90">{s}</td>
                <td className="px-3 py-2 text-foreground/90">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function HistoryEntryBlock({
  entry,
  defaultOpen,
  onUpdate,
  onRemove,
}: {
  entry: { id: string; title: string; author: string; items: string[] };
  defaultOpen?: boolean;
  onUpdate: (field: keyof typeof entry, value: string | string[]) => void;
  onRemove: () => void;
}) {
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (newItem.trim()) {
      onUpdate('items', [...entry.items, newItem.trim()]);
      setNewItem('');
    }
  };

  const updateItem = (index: number, text: string) => {
    const updated = [...entry.items];
    updated[index] = text;
    onUpdate('items', updated);
  };

  const removeItem = (index: number) => {
    onUpdate('items', entry.items.filter((_, i) => i !== index));
  };

  return (
    <ToggleBlock
      title={
        <input
          value={entry.title}
          onChange={e => onUpdate('title', e.target.value)}
          onClick={e => e.stopPropagation()}
          className="bg-transparent border-none outline-none text-sm font-medium text-foreground flex-1 w-full"
        />
      }
      defaultOpen={defaultOpen}
      badge={
        <button
          onClick={e => { e.stopPropagation(); onRemove(); }}
          className="text-destructive hover:text-destructive/80 transition-colors"
        >
          <X size={14} />
        </button>
      }
    >
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <strong>Autor:</strong>
          <input
            value={entry.author}
            onChange={e => onUpdate('author', e.target.value)}
            placeholder="Nombre del autor..."
            className="bg-transparent border-none outline-none text-sm text-foreground/80 flex-1"
          />
        </div>
        <ul className="text-sm text-foreground/80 space-y-1 ml-2">
          {entry.items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 group">
              <input
                value={item}
                onChange={e => updateItem(i, e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground/80"
              />
              <button
                onClick={() => removeItem(i)}
                className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-2 ml-2">
          <input
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
            placeholder="Añadir cambio..."
            className="flex-1 bg-secondary/30 border border-border rounded-lg px-3 py-1 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none"
            onKeyDown={e => { if (e.key === 'Enter') addItem(); }}
          />
          <button onClick={addItem} className="text-primary hover:text-primary/80">
            <Plus size={14} />
          </button>
        </div>
      </div>
    </ToggleBlock>
  );
}
