import { useState } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Trash2, Plus } from 'lucide-react';

interface ChecklistProps {
  groupId: string;
  showTitle?: boolean;
  showAdd?: boolean;
  showDelete?: boolean;
}

export function Checklist({ groupId, showTitle = false, showAdd = true, showDelete = true }: ChecklistProps) {
  const { data, toggleCheckItem, addCheckItem, removeCheckItem } = useProject();
  const group = data.checklists[groupId];
  const [newItemText, setNewItemText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  if (!group) return null;

  const handleAdd = () => {
    if (newItemText.trim()) {
      addCheckItem(groupId, newItemText.trim());
      setNewItemText('');
      setIsAdding(false);
    }
  };

  return (
    <div>
      {showTitle && <h3 className="text-sm font-semibold text-foreground mb-2">{group.title}</h3>}
      <ul className="space-y-1">
        {group.items.map(item => (
          <li key={item.id} className="flex items-center gap-2 group py-1 px-1 rounded hover:bg-secondary/30 transition-colors">
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheckItem(groupId, item.id)}
              className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
            />
            <span className={`text-sm flex-1 ${item.checked ? 'line-through text-muted-foreground' : 'text-foreground/90'}`}>
              {item.text}
            </span>
            {showDelete && (
              <button
                onClick={() => removeCheckItem(groupId, item.id)}
                className="opacity-0 group-hover:opacity-100 text-destructive/60 hover:text-destructive transition-opacity p-1"
              >
                <Trash2 size={12} />
              </button>
            )}
          </li>
        ))}
      </ul>
      {showAdd && (
        <div className="mt-2">
          {isAdding ? (
            <div className="flex gap-2">
              <input
                className="flex-1 bg-input border border-border rounded px-2 py-1 text-sm text-foreground outline-none focus:border-primary"
                value={newItemText}
                onChange={e => setNewItemText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdd()}
                placeholder="Nuevo item..."
                autoFocus
              />
              <button onClick={handleAdd} className="text-xs text-primary hover:text-primary/80 px-2">Agregar</button>
              <button onClick={() => setIsAdding(false)} className="text-xs text-muted-foreground px-2">Cancelar</button>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              <Plus size={14} /> Agregar item
            </button>
          )}
        </div>
      )}
    </div>
  );
}
