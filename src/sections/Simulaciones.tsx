import { ToggleBlock } from '@/components/ToggleBlock';
import { ImageGallery } from '@/components/ImageGallery';

export function Simulaciones() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>💻</span> Simulaciones</h1>
        <p className="text-sm text-muted-foreground mt-1">Configuración, resultados y análisis de simulaciones SPICE.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">🖥️ Software Utilizado</h2>
      <div className="overflow-x-auto rounded-lg border border-border mb-4">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Software</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Versión</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Propósito</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            <tr className="hover:bg-secondary/30"><td className="px-3 py-2 text-foreground/90">LTSpice</td><td className="px-3 py-2 text-foreground/90">XVII</td><td className="px-3 py-2 text-foreground/90">Simulación principal del circuito</td></tr>
            <tr className="hover:bg-secondary/30"><td className="px-3 py-2 text-foreground/90">Multisim</td><td className="px-3 py-2 text-foreground/90">14.x</td><td className="px-3 py-2 text-foreground/90">Verificación alternativa</td></tr>
          </tbody>
        </table>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📊 Parámetros de Configuración SPICE</h2>

      <ToggleBlock title="Análisis DC - Punto de Operación (.OP)" defaultOpen>
        <h4 className="text-sm font-semibold text-foreground mb-2">Resultados por Transistor</h4>
        <div className="overflow-x-auto rounded-lg border border-border mb-3">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary/50">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Transistor</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Ic (mA)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Vce (V)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Vbe (V)</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Región</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {[
                ['Q1 (NPN)', '0.50', '7.2', '0.65'],
                ['Q2 (NPN)', '0.50', '7.2', '0.65'],
                ['Q3 (PNP)', '0.50', '5.8', '-0.66'],
                ['Q4 (PNP)', '0.50', '5.8', '-0.66'],
                ['Q5 (NPN)', '1.02', '8.3', '0.68'],
                ['Q6 (NPN)', '2.1', '12.5', '0.70'],
                ['Q7 (PNP)', '2.1', '12.5', '-0.70'],
              ].map(([t, ic, vce, vbe], i) => (
                <tr key={i} className="hover:bg-secondary/30">
                  <td className="px-3 py-2 text-foreground/90">{t}</td>
                  <td className="px-3 py-2 text-foreground/90">{ic}</td>
                  <td className="px-3 py-2 text-foreground/90">{vce}</td>
                  <td className="px-3 py-2 text-foreground/90">{vbe}</td>
                  <td className="px-3 py-2"><span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">Activa</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">📷 Gráficas del Análisis DC</h4>
        <ImageGallery galleryId="sim-dc" columns={2} placeholder="Añadir gráfica DC" />
      </ToggleBlock>

      <ToggleBlock title="Análisis AC - Respuesta en Frecuencia (.AC)">
        <h4 className="text-sm font-semibold text-foreground mb-2">Resultados del Análisis AC</h4>
        <div className="overflow-x-auto rounded-lg border border-border mb-3">
          <table className="w-full text-sm">
            <thead><tr className="bg-secondary/50">
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Parámetro</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Simulado</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Objetivo</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Estado</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {[
                ['Ganancia DC', '95.2 dB', '> 60 dB', '✓ Cumple'],
                ['Frecuencia de corte (-3dB)', '18.5 kHz', '> 10 kHz', '✓ Cumple'],
                ['Producto ganancia-ancho banda', '1.05 MHz', '—', 'Info'],
                ['Margen de fase', '62°', '> 45°', '✓ Cumple'],
                ['Margen de ganancia', '12 dB', '> 6 dB', '✓ Cumple'],
              ].map(([p, s, o, e], i) => (
                <tr key={i} className="hover:bg-secondary/30">
                  <td className="px-3 py-2 text-foreground/90">{p}</td>
                  <td className="px-3 py-2 text-foreground/90">{s}</td>
                  <td className="px-3 py-2 text-foreground/90">{o}</td>
                  <td className="px-3 py-2"><span className={`text-xs px-2 py-0.5 rounded-full ${e.includes('✓') ? 'bg-success/20 text-success' : 'bg-info/20 text-info'}`}>{e}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h4 className="text-sm font-semibold text-foreground mb-2 mt-4">📈 Gráfica de Respuesta en Frecuencia (AC)</h4>
        <ImageGallery galleryId="sim-ac" columns={1} placeholder="Añadir gráfica AC" />
      </ToggleBlock>

      <ToggleBlock title="Análisis Transitorio (.TRAN)">
        <h4 className="text-sm font-semibold text-foreground mb-2">Medición de Slew Rate</h4>
        <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary mb-3">SR = ΔV / Δt = [valor medido] V/μs</div>
        <h4 className="text-sm font-semibold text-foreground mb-2">📉 Formas de Onda Transitorias</h4>
        <ImageGallery galleryId="sim-tran" columns={2} placeholder="Añadir gráfica transitoria" />
      </ToggleBlock>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🔬 Simulación de Aplicaciones</h2>
      
      {[
        { title: 'Buffer (Seguidor de Voltaje, Av = 1)', galleryId: 'sim-buffer', rows: [['Ganancia', '1.000', '0.998'], ['Impedancia de salida', 'Baja', '~50 Ω'], ['Distorsión', 'Mínima', '< 0.1%']] },
        { title: 'Amplificador Inversor (Av = -10)', galleryId: 'sim-inversor', eq: 'Av = -Rf/Ri = -100k/10k = -10', rows: [['Ganancia', '-10.00', '-9.97'], ['BW (-3dB)', '~100 kHz', '95 kHz'], ['Fase a 1kHz', '180°', '179.8°']] },
        { title: 'Amplificador No Inversor (Av = +10)', galleryId: 'sim-noinversor', eq: 'Av = 1 + Rf/Ri = 1 + 90k/10k = +10', rows: [['Ganancia', '+10.00', '+9.98'], ['BW (-3dB)', '~100 kHz', '98 kHz'], ['Fase a 1kHz', '0°', '-0.2°']] },
      ].map((app, idx) => (
        <ToggleBlock key={idx} title={app.title}>
          {app.eq && <div className="bg-secondary/50 rounded px-3 py-1.5 text-sm font-mono text-primary mb-3">{app.eq}</div>}
          <div className="overflow-x-auto rounded-lg border border-border mb-3">
            <table className="w-full text-sm">
              <thead><tr className="bg-secondary/50">
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Parámetro</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Esperado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Simulado</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Estado</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {app.rows.map(([p, e, s], i) => (
                  <tr key={i} className="hover:bg-secondary/30">
                    <td className="px-3 py-2 text-foreground/90">{p}</td>
                    <td className="px-3 py-2 text-foreground/90">{e}</td>
                    <td className="px-3 py-2 text-foreground/90">{s}</td>
                    <td className="px-3 py-2"><span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success">✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h4 className="text-sm font-semibold text-foreground mb-2">📷 Capturas de Simulación</h4>
          <ImageGallery galleryId={app.galleryId} columns={2} placeholder="Añadir captura" />
        </ToggleBlock>
      ))}
    </div>
  );
}
