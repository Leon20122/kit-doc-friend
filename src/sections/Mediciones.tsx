import { EditableTable } from '@/components/EditableTable';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { DynamicTableBlock } from '@/components/DynamicTableBlock';

export function Mediciones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📊</span> Mediciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Resultados experimentales y comparación con simulación.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📐 Medición de Punto DC</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="medicion-dc" showAddRow={true} />
        <DynamicTableBlock sectionId="medicion-dc-extra" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📈 Medición de Ganancia</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="ganancia-frecuencia" title="Ganancia en Lazo Abierto (por frecuencia)" showAddRow={true} />
        <DynamicTableBlock sectionId="ganancia-frecuencia-extra" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🔄 Comparación: Simulación vs Medición</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="comparacion-sim-med" showAddRow={true} />
        <DynamicTableBlock sectionId="comparacion-sim-med-extra" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📸 Capturas del Osciloscopio</h2>
      <MultiImageGallery sectionId="mediciones-fotos" columns={2} placeholder="Añadir captura del osciloscopio" defaultLabel="Capturas del osciloscopio" showDate />
    </div>
  );
}
