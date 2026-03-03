import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';
import { ImageGallery } from '@/components/ImageGallery';
import { MultiImageGallery } from '@/components/MultiImageGallery';
import { EditableTable } from '@/components/EditableTable';

export function DisenoCircuito() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>⚡</span> Diseño del Circuito</h1>
        <p className="text-sm text-muted-foreground mt-1">Topología, esquemáticos y cálculos de diseño.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🏗️ Topología Seleccionada</h2>
      <Callout type="info" icon="⚡">
        <strong>Arquitectura de 3 etapas con compensación Miller</strong><br/>
        Se seleccionó esta topología por su balance entre complejidad y rendimiento.
      </Callout>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
        {[
          'V+ ──┐\nV- ──┘\n🔀 Par Diferencial\n(Q1, Q2, Q3, Q4)',
          '📈 Emisor Común\n(Q5)\n+ Compensación (Cc)',
          '🔊 Push-Pull\n(Q6, Q7)\nClase AB',
        ].map((block, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <span className="text-primary text-xl">→</span>}
            <div className="bg-secondary rounded-lg px-4 py-3 text-center text-xs text-foreground/90 whitespace-pre-line border border-border font-mono">
              {block}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🔢 Cálculos de Diseño</h2>

      <ToggleBlock title="Par Diferencial (Etapa 1)" defaultOpen>
        <h4 className="text-sm font-semibold text-foreground mb-2">Parámetros de Diseño</h4>
        <EditableTable tableId="diseno-par-diferencial" showAddRow={true} />
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-3">Fuente de Corriente (Iee)</h4>
        <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">Ree = (Vee - Vbe) / Iee = (15 - 0.7) / 1mA = 14.3 kΩ → 15 kΩ</div>
      </ToggleBlock>

      <ToggleBlock title="Etapa de Ganancia (Etapa 2)">
        <EditableTable tableId="diseno-etapa-ganancia" showAddRow={true} />
      </ToggleBlock>

      <ToggleBlock title="Ganancia Total Estimada">
        <EditableTable tableId="diseno-ganancia-total" showAddRow={true} />
        <Callout type="success" icon="✅">
          La ganancia estimada de ~74,000 V/V supera ampliamente el objetivo de {'>'}1,000 V/V.
        </Callout>
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📷 Esquemático Completo</h2>
      <MultiImageGallery sectionId="diseno-esquematico" columns={1} placeholder="Añadir esquemático completo" defaultLabel="Esquemático completo" showDate />

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">Esquemáticos por Etapa</h3>
        <MultiImageGallery sectionId="diseno-etapas" columns={2} placeholder="Añadir esquemático de etapa" defaultLabel="Esquemático de etapa" showDate />
      </div>
    </div>
  );
}
