import { useRef } from 'react';
import { useProject } from '@/contexts/ProjectContext';
import { Pencil, ImageIcon } from 'lucide-react';

export function HeaderBanner() {
  const { data, updateBanner } = useProject();
  const { banner, teamMembers } = data;
  const fileRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateBanner('bgImage', reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <header
      className="relative overflow-hidden rounded-xl mb-6 gold-gradient group"
      style={banner.bgImage ? { backgroundImage: `url(${banner.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      {/* Overlay if custom bg */}
      {banner.bgImage && <div className="absolute inset-0 bg-black/30" />}

      {/* Circuit pattern SVG - only show if no custom bg */}
      {!banner.bgImage && (
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
          <g transform="translate(280,100)" opacity="0.3">
            <polygon points="0,-30 50,0 0,30" fill="none" stroke="#000" strokeWidth="2"/>
            <line x1="-20" y1="-15" x2="0" y2="-15" stroke="#000" strokeWidth="1.5"/>
            <line x1="-20" y1="15" x2="0" y2="15" stroke="#000" strokeWidth="1.5"/>
            <line x1="50" y1="0" x2="70" y2="0" stroke="#000" strokeWidth="1.5"/>
            <text x="12" y="-8" fill="#000" fontSize="12" fontWeight="bold">+</text>
            <text x="12" y="18" fill="#000" fontSize="12" fontWeight="bold">−</text>
          </g>
          <g transform="translate(420,130)" opacity="0.25">
            <line x1="0" y1="-15" x2="0" y2="15" stroke="#000" strokeWidth="2"/>
            <line x1="0" y1="-8" x2="15" y2="-18" stroke="#000" strokeWidth="1.5"/>
            <line x1="0" y1="8" x2="15" y2="18" stroke="#000" strokeWidth="1.5"/>
            <line x1="-15" y1="0" x2="0" y2="0" stroke="#000" strokeWidth="1.5"/>
            <circle cx="0" cy="0" r="18" fill="none" stroke="#000" strokeWidth="1" opacity="0.5"/>
          </g>
          <polyline points="100,40 105,35 115,45 125,35 135,45 145,35 150,40" fill="none" stroke="#000" strokeWidth="1" opacity="0.2"/>
        </svg>
      )}

      {/* Change bg button */}
      <button
        onClick={() => fileRef.current?.click()}
        className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 bg-black/50 text-white rounded-lg p-2 transition-opacity"
        title="Cambiar fondo"
      >
        <ImageIcon size={16} />
      </button>
      {banner.bgImage && (
        <button
          onClick={() => updateBanner('bgImage', '')}
          className="absolute top-2 right-12 z-20 opacity-0 group-hover:opacity-100 bg-black/50 text-white rounded-lg px-2 py-1 text-xs transition-opacity"
        >
          Quitar fondo
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleBgUpload} />

      <div className="relative px-6 py-8 md:py-10 text-center z-10">
        <input
          value={banner.emoji}
          onChange={e => updateBanner('emoji', e.target.value)}
          className="text-4xl mb-2 bg-transparent border-none outline-none text-center w-16 mx-auto block"
        />
        <input
          value={banner.title}
          onChange={e => updateBanner('title', e.target.value)}
          className="text-2xl md:text-3xl font-bold text-primary-foreground mb-1 bg-transparent border-none outline-none text-center w-full"
        />
        <input
          value={banner.subtitle}
          onChange={e => updateBanner('subtitle', e.target.value)}
          className="text-primary-foreground/80 text-sm mb-4 bg-transparent border-none outline-none text-center w-full"
        />
        <div className="flex flex-wrap justify-center gap-2">
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
            📋
            <input
              value={banner.version}
              onChange={e => updateBanner('version', e.target.value)}
              className="bg-transparent border-none outline-none text-primary-foreground w-12 text-xs"
            />
          </span>
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
            🔄
            <input
              value={banner.statusText}
              onChange={e => updateBanner('statusText', e.target.value)}
              className="bg-transparent border-none outline-none text-primary-foreground w-40 text-xs"
            />
          </span>
          <span className="bg-primary-foreground/20 text-primary-foreground text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            👥 {teamMembers.length} Integrantes
          </span>
        </div>
      </div>
    </header>
  );
}
