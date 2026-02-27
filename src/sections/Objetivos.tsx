import { useState } from 'react';
import { Checklist } from '@/components/Checklist';
import { Callout } from '@/components/Callout';
import { EditableNote } from '@/components/EditableNote';
import { useProject } from '@/contexts/ProjectContext';
import { Plus, X, Pencil, Check } from 'lucide-react';

export function Objetivos() {
  const { data, updateNote } = useProject();
  const [editingTitle, setEditingTitle] = useState<string | null>(null);

  // Editable sections stored in notes
  const generalObj = data.notes['obj-general'] || 'Diseñar, simular e implementar un amplificador operacional funcional utilizando transistores BJT discretos, demostrando comprensión de los principios de electrónica analógica.';
  
  const includesItems = (data.notes['obj-includes'] || 'Diseño con transistores BJT discretos\nSimulación SPICE completa\nPrototipo funcional en protoboard\nMediciones y caracterización\nDocumentación técnica completa').split('\n').filter(Boolean);
  const excludesItems = (data.notes['obj-excludes'] || 'Requisitos estrictos de ganancia industrial\nFabricación PCB profesional\nEncapsulado final del circuito\nPruebas ambientales (temperatura, humedad)\nCertificación de componentes').split('\n').filter(Boolean);
  const criteriaText = data.notes['obj-criteria'] || 'El circuito amplifica señales correctamente\nFunciona como seguidor de voltaje (Buffer, Av ≈ 1)\nOpera como amplificador inversor y no inversor\nLos resultados de simulación y medición son consistentes (< 20% diferencia)\nLa documentación está completa y con trazabilidad';

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span>🎯</span> Objetivos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Definición de metas, alcance y criterios de éxito del proyecto.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🎯 Objetivo General</h2>
      <Callout type="info" icon="🎯">
        <textarea
          value={generalObj}
          onChange={e => updateNote('obj-general', e.target.value)}
          className="w-full bg-transparent border-none outline-none text-sm text-foreground/90 resize-y min-h-[60px]"
        />
      </Callout>

      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Objetivos Específicos</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <Checklist groupId="objetivos-especificos" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📐 Alcance del Proyecto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-success mb-3">✅ Incluye</h3>
          <EditableList
            items={includesItems}
            onChange={items => updateNote('obj-includes', items.join('\n'))}
            icon="✓"
            iconClass="text-success"
          />
        </div>
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-destructive mb-3">❌ No Incluye</h3>
          <EditableList
            items={excludesItems}
            onChange={items => updateNote('obj-excludes', items.join('\n'))}
            icon="✗"
            iconClass="text-destructive"
          />
        </div>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🏆 Criterios de Éxito</h2>
      <Callout type="success" icon="✅">
        <strong className="block mb-2">El proyecto se considerará exitoso cuando:</strong>
        <EditableList
          items={criteriaText.split('\n').filter(Boolean)}
          onChange={items => updateNote('obj-criteria', items.join('\n'))}
          icon="✅"
          iconClass=""
        />
      </Callout>
    </div>
  );
}

// Reusable editable list sub-component
function EditableList({
  items,
  onChange,
  icon,
  iconClass,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  icon: string;
  iconClass: string;
}) {
  const [newItem, setNewItem] = useState('');

  const updateItem = (index: number, text: string) => {
    const updated = [...items];
    updated[index] = text;
    onChange(updated);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (newItem.trim()) {
      onChange([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  return (
    <div>
      <ul className="space-y-2 text-sm text-foreground/80 mb-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2 group">
            <span className={iconClass}>{icon}</span>
            <input
              value={item}
              onChange={e => updateItem(i, e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground/80"
            />
            <button
              onClick={() => removeItem(i)}
              className="opacity-0 group-hover:opacity-100 text-destructive transition-opacity"
            >
              <X size={14} />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
          placeholder="Añadir elemento..."
          className="flex-1 bg-secondary/30 border border-border rounded-lg px-3 py-1 text-xs text-foreground placeholder:text-muted-foreground/50 outline-none"
          onKeyDown={e => { if (e.key === 'Enter') addItem(); }}
        />
        <button onClick={addItem} className="text-primary hover:text-primary/80">
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
