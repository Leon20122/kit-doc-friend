import { EditableTable } from '@/components/EditableTable';
import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';

export function ProblemasSoluciones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>🔧</span> Problemas y Soluciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Registro de troubleshooting y lecciones aprendidas.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📋 Registro de Troubleshooting</h2>
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableTable tableId="troubleshooting" />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📝 Detalle de Problemas</h2>

      <ToggleBlock title="Problema #001: Salida Saturada" defaultOpen>
        <p className="text-sm text-foreground/80 mb-2">📅 <strong>Fecha:</strong> 2023-10-18</p>
        <Callout type="error" icon="🔴">
          <strong>Síntoma:</strong> La salida del op-amp estaba permanentemente saturada a Vcc+ (~14.3V) sin señal de entrada aplicada.
        </Callout>
        <p className="text-sm text-foreground/80 mb-2">🔍 <strong>Diagnóstico:</strong> Se midió la tensión en los colectores de Q1 y Q2. Se encontró una diferencia de 1.2V.</p>
        <p className="text-sm text-foreground/80 mb-2">💡 <strong>Causa raíz:</strong> Los transistores Q1 y Q2 tenían β significativamente diferentes (Q1: β=180, Q2: β=240).</p>
        <Callout type="success" icon="✅">
          <strong>Solución:</strong> Se reemplazaron Q1 y Q2 por un par con β más cercano (Q1: β=210, Q2: β=215). El offset se redujo a {'<'}5mV.
        </Callout>
        <p className="text-sm text-foreground/80">📝 <strong>Lección:</strong> Siempre emparejar los transistores del par diferencial midiendo β antes del montaje.</p>
      </ToggleBlock>

      <ToggleBlock title="Problema #002: Oscilaciones a Alta Frecuencia">
        <p className="text-sm text-foreground/80 mb-2">📅 <strong>Fecha:</strong> 2023-10-20</p>
        <Callout type="error" icon="🔴">
          <strong>Síntoma:</strong> Se observaban oscilaciones de ~5MHz superpuestas a la señal de salida.
        </Callout>
        <p className="text-sm text-foreground/80 mb-2">💡 <strong>Causa raíz:</strong> Sin compensación de frecuencia, margen de fase insuficiente.</p>
        <Callout type="success" icon="✅">
          <strong>Solución:</strong> Se agregó capacitor de compensación Miller (Cc = 33pF), logrando margen de fase de 62°.
        </Callout>
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📖 Problemas Comunes en Op-Amps (Referencia)</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Síntoma</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Posibles Causas</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Verificación</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['Salida saturada', 'Offset de entrada, error de cableado, BJT dañado', 'Medir Vout sin entrada, verificar conexiones'],
              ['Oscilaciones', 'Sin compensación, cables largos, falta de desacoplo', 'Agregar Cc, acortar cables, agregar 100nF'],
              ['Ganancia baja', 'BJT en saturación, valores incorrectos', 'Verificar punto de operación, medir Vce'],
              ['Distorsión alta', 'Saturación de etapa, clase B crossover', 'Reducir amplitud, verificar polarización'],
              ['Ruido excesivo', 'Fuente ruidosa, GND loops, acoplamiento', 'Mejorar desacoplo, verificar ruteo GND'],
            ].map(([s, c, v], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90">{s}</td>
                <td className="px-3 py-2 text-foreground/90">{c}</td>
                <td className="px-3 py-2 text-foreground/90">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
