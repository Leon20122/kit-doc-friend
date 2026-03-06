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
        <EditableTable tableId="medicion-dc" showAddRow showColumnControls showMeta />
        <DynamicTableBlock sectionId="medicion-dc-extra" />
      </div>


      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📷 Fotos de Osciloscopio</h2>
      <div className="bg-card rounded-xl border border-border p-5">
        <MultiImageGallery sectionId="mediciones-osciloscopio" columns={2} placeholder="Añadir foto de osciloscopio" defaultLabel="Fotos Osciloscopio" showDate />
      </div>
    </div>
  );
}
