import { Checklist } from '@/components/Checklist';
import { ToggleBlock } from '@/components/ToggleBlock';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { useProject } from '@/contexts/ProjectContext';

export function Implementacion() {
  const { getChecklistProgress } = useProject();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>🔨</span> Implementación</h1>
        <p className="text-sm text-muted-foreground mt-1">Proceso de construcción física del circuito en protoboard.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🧰 Materiales Utilizados</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <Checklist groupId="materiales" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🔧 Proceso de Construcción</h2>

      <ToggleBlock title="Paso 1: Verificación de Componentes" defaultOpen
        badge={<span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">{getChecklistProgress('paso1').checked}/{getChecklistProgress('paso1').total}</span>}
      >
        <Checklist groupId="paso1" />
      </ToggleBlock>

      <ToggleBlock title="Paso 2: Montaje por Etapas"
        badge={<span className="text-xs px-2 py-0.5 rounded-full bg-warning/20 text-warning">{getChecklistProgress('paso2').checked}/{getChecklistProgress('paso2').total}</span>}
      >
        <Checklist groupId="paso2" />
      </ToggleBlock>

      <ToggleBlock title="Paso 3: Integración y Verificación"
        badge={<span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{getChecklistProgress('paso3').checked}/{getChecklistProgress('paso3').total}</span>}
      >
        <Checklist groupId="paso3" />
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📷 Fotografías del Montaje</h2>
      <MultiImageGallery sectionId="impl-fotos" columns={2} placeholder="Añadir fotografía del montaje" defaultLabel="Fotografías del montaje" />

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">⚠️ Consideraciones Prácticas</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Aspecto</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Recomendación</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Aplicado</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['Cables cortos', 'Minimizar inductancias parásitas', '✓ Sí'],
              ['Desacoplo', '100nF en cada rail de alimentación', 'Pendiente'],
              ['GND común', 'Tierra estrella / punto único', '✓ Sí'],
              ['Separación de etapas', 'Mantener espacio entre etapas', '✓ Sí'],
              ['Par diferencial', 'Q1/Q2 cercanos para matching térmico', '✓ Sí'],
            ].map(([a, r, ap], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90">{a}</td>
                <td className="px-3 py-2 text-foreground/90">{r}</td>
                <td className="px-3 py-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${ap.includes('✓') ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>{ap}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
