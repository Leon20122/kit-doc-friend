export function HeaderBanner() {
  return (
    <header className="relative overflow-hidden rounded-xl mb-6 gold-gradient">
      {/* Circuit pattern SVG */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <line x1="20" y1="40" x2="200" y2="40" stroke="#000" strokeWidth="1.5" opacity="0.3"/>
        <line x1="150" y1="80" x2="400" y2="80" stroke="#000" strokeWidth="1" opacity="0.2"/>
        <line x1="80" y1="120" x2="350" y2="120" stroke="#000" strokeWidth="1.5" opacity="0.25"/>
        <line x1="200" y1="160" x2="480" y2="160" stroke="#000" strokeWidth="1" opacity="0.15"/>
        <line x1="200" y1="40" x2="200" y2="120" stroke="#000" strokeWidth="1.5" opacity="0.3"/>
        <line x1="350" y1="80" x2="350" y2="160" stroke="#000" strokeWidth="1" opacity="0.2"/>
        <circle cx="200" cy="40" r="4" fill="#000" opacity="0.3"/>
        <circle cx="200" cy="120" r="4" fill="#000" opacity="0.3"/>
        <circle cx="350" cy="80" r="4" fill="#000" opacity="0.25"/>
        {/* Op-Amp Symbol */}
        <g transform="translate(280,100)" opacity="0.3">
          <polygon points="0,-30 50,0 0,30" fill="none" stroke="#000" strokeWidth="2"/>
          <line x1="-20" y1="-15" x2="0" y2="-15" stroke="#000" strokeWidth="1.5"/>
          <line x1="-20" y1="15" x2="0" y2="15" stroke="#000" strokeWidth="1.5"/>
          <line x1="50" y1="0" x2="70" y2="0" stroke="#000" strokeWidth="1.5"/>
          <text x="12" y="-8" fill="#000" fontSize="12" fontWeight="bold">+</text>
          <text x="12" y="18" fill="#000" fontSize="12" fontWeight="bold">−</text>
        </g>
        {/* Transistor Symbol */}
        <g transform="translate(420,130)" opacity="0.25">
          <line x1="0" y1="-15" x2="0" y2="15" stroke="#000" strokeWidth="2"/>
          <line x1="0" y1="-8" x2="15" y2="-18" stroke="#000" strokeWidth="1.5"/>
          <line x1="0" y1="8" x2="15" y2="18" stroke="#000" strokeWidth="1.5"/>
          <line x1="-15" y1="0" x2="0" y2="0" stroke="#000" strokeWidth="1.5"/>
          <circle cx="0" cy="0" r="18" fill="none" stroke="#000" strokeWidth="1" opacity="0.5"/>
        </g>
        <polyline points="100,40 105,35 115,45 125,35 135,45 145,35 150,40" fill="none" stroke="#000" strokeWidth="1" opacity="0.2"/>
      </svg>

      <div className="relative px-6 py-8 md:py-10 text-center">
        <div className="text-4xl mb-2">⚡</div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1">
          Op-Amp Discreto con BJTs
        </h1>
        <p className="text-primary-foreground/80 text-sm mb-4">Documentación del Proyecto</p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            📋 v2.1
          </span>
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            🔄 Implementación en Curso
          </span>
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            👥 3 Integrantes
          </span>
        </div>
      </div>
    </header>
  );
}
