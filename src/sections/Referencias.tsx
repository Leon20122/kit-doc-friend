export function Referencias() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2"><span>📚</span> Referencias</h1>
        <p className="text-sm text-muted-foreground mt-1">Bibliografía, datasheets, recursos en línea y application notes.</p>
      </div>

      <h2 className="text-lg font-semibold text-foreground mb-3">📖 Bibliografía</h2>
      <div className="space-y-2 text-sm text-foreground/80 leading-relaxed mb-6">
        <p>[1] A. S. Sedra y K. C. Smith, <em>"Microelectronic Circuits"</em>, 8th ed. Oxford University Press, 2020.</p>
        <p>[2] B. Razavi, <em>"Design of Analog CMOS Integrated Circuits"</em>, 2nd ed. McGraw-Hill, 2017.</p>
        <p>[3] P. R. Gray et al., <em>"Analysis and Design of Analog Integrated Circuits"</em>, 5th ed. Wiley, 2009.</p>
        <p>[4] P. Horowitz y W. Hill, <em>"The Art of Electronics"</em>, 3rd ed. Cambridge University Press, 2015.</p>
        <p>[5] R. C. Jaeger y T. N. Blalock, <em>"Microelectronic Circuit Design"</em>, 5th ed. McGraw-Hill, 2015.</p>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📄 Datasheets</h2>
      <div className="overflow-x-auto rounded-lg border border-border mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Componente</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Fabricante</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Link</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['2N2222 (NPN)', 'ON Semiconductor'],
              ['2N2907 (PNP)', 'ON Semiconductor'],
              ['LM741 (Referencia)', 'Texas Instruments'],
            ].map(([c, f], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90">{c}</td>
                <td className="px-3 py-2 text-foreground/90">{f}</td>
                <td className="px-3 py-2 text-primary cursor-pointer hover:text-primary/80">📎 Datasheet</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">🌐 Recursos en Línea</h2>
      <div className="overflow-x-auto rounded-lg border border-border mb-6">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Recurso</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Descripción</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['LTSpice Community', 'Foro y tutoriales de simulación'],
              ['All About Circuits', 'Tutoriales de electrónica'],
              ['Electronics Tutorials', 'Teoría de op-amps y BJTs'],
              ['MIT OCW 6.002', 'Curso de circuitos electrónicos'],
            ].map(([r, d], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90">{r}</td>
                <td className="px-3 py-2 text-foreground/90">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full h-px bg-border my-6" />

      <h2 className="text-lg font-semibold text-foreground mb-3">📑 Application Notes</h2>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead><tr className="bg-secondary/50">
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Código</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Título</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Fabricante</th>
          </tr></thead>
          <tbody className="divide-y divide-border">
            {[
              ['AN-31', 'Op Amp Circuit Collection', 'Texas Instruments'],
              ['AN-20', 'An Applications Guide for Op Amps', 'Texas Instruments'],
              ['AN-4', 'Monolithic Op Amp — The Universal Linear Component', 'Texas Instruments'],
              ['AND9093', 'Understanding BJT Parameters', 'ON Semiconductor'],
            ].map(([c, t, f], i) => (
              <tr key={i} className="hover:bg-secondary/30">
                <td className="px-3 py-2 text-foreground/90 font-mono">{c}</td>
                <td className="px-3 py-2 text-foreground/90">{t}</td>
                <td className="px-3 py-2 text-foreground/90">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
