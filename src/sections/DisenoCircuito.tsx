import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';
import { ImageGallery } from '@/components/ImageGallery';

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
        <div className="overflow-x-auto rounded-lg border border-border mb-3">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary/50">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Parámetro</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Valor</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Cálculo</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {[
                ['Corriente de cola (Iee)', '1 mA', 'Selección de diseño'],
                ['Ic1 = Ic2', '0.5 mA', 'Iee / 2'],
                ['Transconductancia (gm)', '19.2 mA/V', 'Ic / VT = 0.5mA / 26mV'],
                ['Resistencia colector (Rc)', '10 kΩ', 'Selección de diseño'],
                ['Ganancia diferencial (Ad)', '192 V/V', 'gm × Rc = 19.2 × 10k'],
              ].map(([p, v, c], i) => (
                <tr key={i} className="hover:bg-secondary/30"><td className="px-3 py-2 text-foreground/90">{p}</td><td className="px-3 py-2 text-foreground/90">{v}</td><td className="px-3 py-2 text-foreground/90">{c}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-2">Fuente de Corriente (Iee)</h4>
        <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">Ree = (Vee - Vbe) / Iee = (15 - 0.7) / 1mA = 14.3 kΩ → 15 kΩ</div>
      </ToggleBlock>

      <ToggleBlock title="Etapa de Ganancia (Etapa 2)">
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary/50">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Parámetro</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Valor</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Notas</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {[
                ['Configuración', 'Emisor Común', 'Con carga resistiva'],
                ['Ic (Q5)', '1 mA', 'Punto de operación'],
                ['gm (Q5)', '38.5 mA/V', 'Ic/VT'],
                ['Rc (Q5)', '10 kΩ', 'Carga de colector'],
                ['Av etapa 2', '-385 V/V', '-gm × Rc'],
              ].map(([p, v, n], i) => (
                <tr key={i} className="hover:bg-secondary/30"><td className="px-3 py-2 text-foreground/90">{p}</td><td className="px-3 py-2 text-foreground/90">{v}</td><td className="px-3 py-2 text-foreground/90">{n}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </ToggleBlock>

      <ToggleBlock title="Ganancia Total Estimada">
        <div className="space-y-1 mb-3">
          <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">Av_total = Ad × Av2 × Av3</div>
          <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">Av_total = 192 × 385 × 1 = 73,920 V/V ≈ 97.4 dB</div>
        </div>
        <Callout type="success" icon="✅">
          La ganancia estimada de ~74,000 V/V supera ampliamente el objetivo de {'>'}1,000 V/V.
        </Callout>
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📷 Esquemático Completo</h2>
      <ImageGallery galleryId="diseno-esquematico" columns={1} placeholder="Añadir esquemático completo" />

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">Esquemáticos por Etapa</h3>
        <ImageGallery galleryId="diseno-etapas" columns={2} placeholder="Añadir esquemático de etapa" />
      </div>
    </div>
  );
}
