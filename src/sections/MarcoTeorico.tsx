import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';

export function MarcoTeorico() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📖</span> Marco Teórico</h1>
        <p className="text-sm text-muted-foreground mt-1">Fundamentos teóricos del amplificador operacional y transistores BJT.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📘 El Amplificador Operacional</h2>
      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
        Un amplificador operacional (op-amp) es un amplificador electrónico de alta ganancia con entrada diferencial y, normalmente, una salida única. Es uno de los bloques fundamentales de la electrónica analógica y se utiliza ampliamente en aplicaciones de procesamiento de señales.
      </p>

      <h3 className="text-sm font-semibold text-foreground mb-2">Características Ideales vs Reales</h3>
      <div className="overflow-x-auto rounded-lg border border-border mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Parámetro</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Ideal</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Real (Típico)</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Unidad</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['Ganancia en lazo abierto (Aol)', '∞', '10⁵ – 10⁶', 'V/V'],
              ['Impedancia de entrada (Zin)', '∞', '10⁶ – 10¹²', 'Ω'],
              ['Impedancia de salida (Zout)', '0', '10 – 100', 'Ω'],
              ['CMRR', '∞', '80 – 120', 'dB'],
              ['Ancho de banda', '∞', '1 – 10', 'MHz'],
              ['Slew Rate', '∞', '0.5 – 13', 'V/μs'],
              ['Voltaje de offset', '0', '1 – 5', 'mV'],
            ].map(([p, i, r, u], idx) => (
              <tr key={idx} className="hover:bg-secondary/30"><td className="px-3 py-2 text-foreground/90">{p}</td><td className="px-3 py-2 text-foreground/90">{i}</td><td className="px-3 py-2 text-foreground/90">{r}</td><td className="px-3 py-2 text-foreground/90">{u}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🏗️ Arquitectura de Op-Amp Discreto</h2>
      <p className="text-sm text-foreground/80 mb-4">Un amplificador operacional discreto típico se compone de tres etapas principales conectadas en cascada:</p>
      
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
        {['🔀 Etapa\nDiferencial', '📈 Etapa de\nGanancia', '🔊 Etapa de\nSalida'].map((block, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <span className="text-primary text-xl">→</span>}
            <div className="bg-secondary rounded-lg px-4 py-3 text-center text-sm text-foreground/90 whitespace-pre-line border border-border">
              {block}
            </div>
          </div>
        ))}
      </div>

      <ToggleBlock title="Etapa Diferencial (Entrada)">
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Amplifica la diferencia entre las dos señales de entrada (V+ y V-) mientras rechaza señales comunes.</p>
        <p className="text-sm text-foreground/80 mb-3"><strong>Componentes:</strong> Par de transistores NPN (Q1, Q2) con fuente de corriente (Iee).</p>
        <h4 className="text-sm font-semibold text-foreground mb-2">Ecuaciones Clave</h4>
        <div className="space-y-1">
          {['Ad = gm × Rc', 'gm = Ic / VT   (donde VT ≈ 26mV a 27°C)', 'CMRR = Ad / Acm = 2 × gm × Ree'].map((eq, i) => (
            <div key={i} className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">{eq}</div>
          ))}
        </div>
      </ToggleBlock>

      <ToggleBlock title="Etapa de Ganancia (Intermedia)">
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Proporciona ganancia de voltaje adicional. Convierte la salida diferencial en single-ended.</p>
        <ul className="text-sm text-foreground/80 space-y-1 ml-4 mb-3">
          <li>• Emisor común con carga activa</li>
          <li>• Darlington para alta ganancia</li>
          <li>• Cascode para mejor respuesta en frecuencia</li>
        </ul>
        <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">Av_etapa2 = -gm × (Ro ∥ ro)</div>
      </ToggleBlock>

      <ToggleBlock title="Etapa de Salida Push-Pull">
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Proporciona baja impedancia de salida y capacidad de entregar corriente a la carga.</p>
        <ul className="text-sm text-foreground/80 space-y-1 ml-4">
          <li>• Configuración complementaria (NPN + PNP)</li>
          <li>• Ganancia de voltaje ≈ 1 (seguidor)</li>
          <li>• Alta ganancia de corriente</li>
          <li>• Polarización clase AB para minimizar distorsión de cruce</li>
        </ul>
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🔌 Transistor BJT — Repaso</h2>
      <h3 className="text-sm font-semibold text-foreground mb-2">Modos de Operación</h3>
      <div className="overflow-x-auto rounded-lg border border-border mb-4">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Modo</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Juntura B-E</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Juntura B-C</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Uso</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['Activa Directa', 'Directa', 'Inversa', 'Amplificación'],
              ['Saturación', 'Directa', 'Directa', 'Conmutación (ON)'],
              ['Corte', 'Inversa', 'Inversa', 'Conmutación (OFF)'],
              ['Activa Inversa', 'Inversa', 'Directa', 'Raro uso'],
            ].map(([m, be, bc, u], i) => (
              <tr key={i} className="hover:bg-secondary/30"><td className="px-3 py-2 text-foreground/90">{m}</td><td className="px-3 py-2 text-foreground/90">{be}</td><td className="px-3 py-2 text-foreground/90">{bc}</td><td className="px-3 py-2 text-foreground/90">{u}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="text-sm font-semibold text-foreground mb-2">Ecuaciones Fundamentales</h3>
      <div className="space-y-1">
        {['Ic = β × Ib', 'Ie = Ic + Ib = (β + 1) × Ib', 'Ic = Is × exp(Vbe / VT)', 'gm = Ic / VT ≈ 38.5 × Ic  [A/V]  (a 27°C)', 'rπ = β / gm = VT / Ib'].map((eq, i) => (
          <div key={i} className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">{eq}</div>
        ))}
      </div>
    </div>
  );
}
