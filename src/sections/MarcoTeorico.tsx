import { useProject } from '@/contexts/ProjectContext';
import { ToggleBlock } from '@/components/ToggleBlock';
import { Callout } from '@/components/Callout';
import { EditableNote } from '@/components/EditableNote';

export function MarcoTeorico() {
  const { data, updateNote } = useProject();

  const getNote = (id: string, fallback: string) => data.notes[id] ?? fallback;
  const setNote = (id: string, value: string) => updateNote(id, value);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📖</span> Marco Teórico</h1>
        <p className="text-sm text-muted-foreground mt-1">Fundamentos teóricos del amplificador operacional y transistores BJT.</p>
      </div>

      <input
        value={getNote('mt-titulo-opamp', '📘 El Amplificador Operacional')}
        onChange={e => setNote('mt-titulo-opamp', e.target.value)}
        className="text-lg font-semibold text-foreground mb-3 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
      />
      <EditableNote
        noteId="mt-desc-opamp"
        placeholder="Descripción del amplificador operacional..."
        className="min-h-[60px] text-sm mb-4"
      />

      <input
        value={getNote('mt-titulo-ideal-real', 'Características Ideales vs Reales')}
        onChange={e => setNote('mt-titulo-ideal-real', e.target.value)}
        className="text-sm font-semibold text-foreground mb-2 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
      />
      <div className="bg-card rounded-xl border border-border p-5 mb-6">
        <EditableNote
          noteId="opamp-ideal-real"
          placeholder="Describe aquí las características del OpAmp ideal y real..."
          className="min-h-[200px] font-mono text-sm"
        />
      </div>

      <div className="w-full h-px bg-border my-6" />

      <input
        value={getNote('mt-titulo-arquitectura', '🏗️ Arquitectura de Op-Amp Discreto')}
        onChange={e => setNote('mt-titulo-arquitectura', e.target.value)}
        className="text-lg font-semibold text-foreground mb-3 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
      />
      <EditableNote
        noteId="mt-desc-arquitectura"
        placeholder="Descripción de la arquitectura..."
        className="min-h-[40px] text-sm mb-4"
      />

      <div className="flex flex-wrap items-center justify-center gap-3 mb-6 p-4 bg-card rounded-xl border border-border">
        {['📈 Etapa de\nReferencia', '🪞Etapa \nEspejo de Corriente','🔀 Etapa\nDiferencial', '🔊 Etapa de\nEmisor común con carga activa'].map((block, i) => (
          <div key={i} className="flex items-center gap-3">
            {i > 0 && <span className="text-primary text-xl">→</span>}
            <div className="bg-secondary rounded-lg px-4 py-3 text-center text-sm text-foreground/90 whitespace-pre-line border border-border">
              {block}
            </div>
          </div>
        ))}
      </div>

      <ToggleBlock title={
        <input
          value={getNote('mt-toggle-referencia-title', '📈 Etapa de Referencia')}
          onChange={e => { e.stopPropagation(); setNote('mt-toggle-referencia-title', e.target.value); }}
          onClick={e => e.stopPropagation()}
          className="bg-transparent border-none outline-none text-sm font-medium text-foreground flex-1 w-full hover:bg-secondary/30 rounded px-1 transition-colors"
        />
      }>
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Fija el nivel de voltaje y de corriente para el resto de las etapas del OpAmp</p>
        <p className="text-sm text-foreground/80 mb-3"><strong>Componentes:</strong> El transistor NPN (Q8) como fuente de corriente (Iee).</p>
        <h4 className="text-sm font-semibold text-foreground mb-2">Ecuaciones Clave</h4>
        <div className="space-y-1">
          {['Ad = gm × Rc', 'gm = Ic / VT   (donde VT ≈ 25mV a temperatura ambiente)'].map((eq, i) => (
            <div key={i} className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">{eq}</div>
          ))}
        </div>
      </ToggleBlock>

      <ToggleBlock title={
        <input
          value={getNote('mt-toggle-espejo-title', 'Etapa Espejo de Corriente')}
          onChange={e => { e.stopPropagation(); setNote('mt-toggle-espejo-title', e.target.value); }}
          onClick={e => e.stopPropagation()}
          className="bg-transparent border-none outline-none text-sm font-medium text-foreground flex-1 w-full hover:bg-secondary/30 rounded px-1 transition-colors"
        />
      }>
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Refleja la corriente que conduce a traves del transistor de la etapa de referencia.</p>
        <ul className="text-sm text-foreground/80 space-y-1 ml-4 mb-3">
          <li>• Emisor común con carga activa</li>
        </ul>
      </ToggleBlock>

      <ToggleBlock title={
        <input
          value={getNote('mt-toggle-diferencial-title', 'Etapa Diferencial')}
          onChange={e => { e.stopPropagation(); setNote('mt-toggle-diferencial-title', e.target.value); }}
          onClick={e => e.stopPropagation()}
          className="bg-transparent border-none outline-none text-sm font-medium text-foreground flex-1 w-full hover:bg-secondary/30 rounded px-1 transition-colors"
        />
      }>
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Amplifica la diferencia entre las dos señales de entrada (V+ y V-) mientras rechaza señales comunes.</p>
        <p className="text-sm text-foreground/80 mb-3"><strong>Componentes:</strong> Par de transistores NPN (Q1, Q2) con fuente de corriente (Q5).</p>
        <h4 className="text-sm font-semibold text-foreground mb-2">Ecuaciones Clave</h4>
        <div className="space-y-1">
          {['Ad = gm × Rc', 'gm = Ic / VT   (donde VT ≈ 25mV a temperatura ambiente)'].map((eq, i) => (
            <div key={i} className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">{eq}</div>
          ))}
        </div>
      </ToggleBlock>

      <ToggleBlock title={
        <input
          value={getNote('mt-toggle-emisor-title', 'Etapa de emisor común con carga activa')}
          onChange={e => { e.stopPropagation(); setNote('mt-toggle-emisor-title', e.target.value); }}
          onClick={e => e.stopPropagation()}
          className="bg-transparent border-none outline-none text-sm font-medium text-foreground flex-1 w-full hover:bg-secondary/30 rounded px-1 transition-colors"
        />
      }>
        <p className="text-sm text-foreground/80 mb-2"><strong>Función:</strong> Proporciona alta impedancia de salida y por tanto alta ganancia de voltaje.</p>
        <h4 className="text-sm font-semibold text-foreground mb-2">Ecuaciones Clave</h4>
        <div className="space-y-1">
          {['Ad = gm × Rc', 'gm = Ic / VT   (donde VT ≈ 25mV a temperatura ambiente)'].map((eq, i) => (
            <div key={i} className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary">{eq}</div>
          ))}
        </div>
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <input
        value={getNote('mt-titulo-bjt', '🔌 Transistor BJT — Repaso')}
        onChange={e => setNote('mt-titulo-bjt', e.target.value)}
        className="text-lg font-semibold text-foreground mb-3 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
      />
      
      <input
        value={getNote('mt-titulo-modos', 'Modos de Operación')}
        onChange={e => setNote('mt-titulo-modos', e.target.value)}
        className="text-sm font-semibold text-foreground mb-2 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
      />
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

      <input
        value={getNote('mt-titulo-ecuaciones', 'Ecuaciones Fundamentales')}
        onChange={e => setNote('mt-titulo-ecuaciones', e.target.value)}
        className="text-sm font-semibold text-foreground mb-2 bg-transparent border-none outline-none w-full hover:bg-secondary/30 rounded px-1 transition-colors"
      />
      <EditableNote
        noteId="mt-ecuaciones-bjt"
        placeholder="Ecuaciones fundamentales del BJT..."
        className="min-h-[100px] font-mono text-sm"
      />
    </div>
  );
}
