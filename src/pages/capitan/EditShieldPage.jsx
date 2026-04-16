import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const FORMAS_ESCUDO = [
  { id: 'circulo',   label: '○', path: null },
  { id: 'escudo1',  label: '⬡', path: null },
  { id: 'escudo2',  label: '🛡', path: null },
  { id: 'escudo3',  label: '◈', path: null },
];

const SIMBOLOS = {
  geometrico: ['△','★','○','◆','⬡','✦'],
  animales:   ['🦁','🦅','🐆','🐺','🦊','🐉'],
  simbolos:   ['⚽','🏆','⚡','🔥','💎','👑'],
};

const GRADIENTES = [
  { id: 'g1', label: '', from: '#1a1a1a', to: '#444'     },
  { id: 'g2', label: '', from: '#f6c90e', to: '#f97316'  },
  { id: 'g3', label: '', from: '#2d9e6b', to: '#1a7a8a'  },
  { id: 'g4', label: '', from: '#e53e3e', to: '#9333ea'  },
];

const PALETA = ['#1a1a1a','#f6c90e','#e53e3e','#2d9e6b','#3b82f6','#9333ea','#f97316','#ffffff'];

const EditShieldPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [config, setConfig] = useState({
    formaEscudo: 'circulo',
    categoriaSimbolos: 'animales',
    simbolo: '🦁',
    nombre: '',
    font: 'Bebas Neue',
    colorFondo1: '#1a1a1a',
    colorFondo2: '#f6c90e',
    colorSimboloTexto: '#f6c90e',
    usarGradiente: false,
    gradiente: 'g1',
  });

  /* Redibuja el canvas cada vez que cambia config */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Fondo
    const bg = config.usarGradiente
      ? (() => { const g = ctx.createLinearGradient(0,0,W,H); g.addColorStop(0, config.colorFondo1); g.addColorStop(1, config.colorFondo2); return g; })()
      : config.colorFondo1;

    ctx.save();
    ctx.beginPath();
    ctx.arc(W/2, H/2, W/2 - 4, 0, Math.PI*2);
    ctx.fillStyle = bg;
    ctx.fill();
    ctx.strokeStyle = config.colorSimboloTexto;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    // Símbolo
    ctx.font = `${W * 0.38}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(config.simbolo, W/2, H/2 - (config.nombre ? 16 : 0));

    // Nombre
    if (config.nombre) {
      ctx.font = `bold ${W * 0.12}px ${config.font}, sans-serif`;
      ctx.fillStyle = config.colorSimboloTexto;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(config.nombre.toUpperCase(), W/2, H - W*0.18);
    }
  }, [config]);

  const guardarYVolver = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    localStorage.setItem('escudoEditor', JSON.stringify({ dataUrl, config }));
    navigate('/capitan/crear-equipo');
  };

  const set = (key, val) => setConfig(prev => ({ ...prev, [key]: val }));

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>
        <div style={s.headerRow}>
          <div>
            <button style={s.backBtn} onClick={() => navigate('/capitan/crear-equipo')}>← Volver</button>
            <h1 style={s.title}>EDITOR DE ESCUDO</h1>
            <p style={s.sub}>Diseña el escudo de tu equipo con los recursos disponibles</p>
          </div>
          <button style={s.guardarBtn} onClick={guardarYVolver}>✓ Guardar escudo</button>
        </div>

        <div style={s.mainRow}>
          {/* ── Panel izquierdo ── */}
          <div style={s.panel}>

            {/* 1. Forma escudo */}
            <div style={s.seccion}>
              <div style={s.seccionLabel}>1. ESCUDO</div>
              <div style={s.formasRow}>
                {FORMAS_ESCUDO.map(f => (
                  <button
                    key={f.id}
                    style={{ ...s.formaBtn, ...(config.formaEscudo === f.id ? s.formaBtnActive : {}) }}
                    onClick={() => set('formaEscudo', f.id)}
                  >{f.label}</button>
                ))}
              </div>
            </div>

            {/* 2. Símbolo */}
            <div style={s.seccion}>
              <div style={s.seccionLabel}>2. SÍMBOLO</div>
              <div style={s.categoriasRow}>
                {Object.keys(SIMBOLOS).map(cat => (
                  <button
                    key={cat}
                    style={{ ...s.catBtn, ...(config.categoriaSimbolos === cat ? s.catBtnActive : {}) }}
                    onClick={() => set('categoriaSimbolos', cat)}
                  >{cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
                ))}
              </div>
              <div style={s.simbolosGrid}>
                {SIMBOLOS[config.categoriaSimbolos].map(sim => (
                  <button
                    key={sim}
                    style={{ ...s.simBtn, ...(config.simbolo === sim ? s.simBtnActive : {}) }}
                    onClick={() => set('simbolo', sim)}
                  >{sim}</button>
                ))}
              </div>
            </div>

            {/* 3. Texto */}
            <div style={s.seccion}>
              <div style={s.seccionLabel}>3. TEXTO</div>
              <input
                type="text"
                placeholder="Nombre del equipo"
                value={config.nombre}
                onChange={e => set('nombre', e.target.value)}
                maxLength={12}
                style={s.textoInput}
              />
              <div style={s.fontRow}>
                {['Bebas Neue','Arial Black','Impact'].map(f => (
                  <button
                    key={f}
                    style={{ ...s.fontBtn, ...(config.font === f ? s.fontBtnActive : {}), fontFamily: f }}
                    onClick={() => set('font', f)}
                  >{f.split(' ')[0]}</button>
                ))}
              </div>
            </div>

            {/* 4. Colores */}
            <div style={s.seccion}>
              <div style={s.seccionLabel}>4. COLORES</div>
              <div style={s.coloresSubLabel}>Fondo</div>
              <div style={s.paletaRow}>
                {PALETA.map(c => (
                  <div
                    key={c}
                    style={{ ...s.colorDot, backgroundColor: c, ...(config.colorFondo1 === c ? s.colorDotSel : {}) }}
                    onClick={() => set('colorFondo1', c)}
                  />
                ))}
              </div>
              <div style={s.gradienteRow}>
                <label style={s.checkLabel}>
                  <input type="checkbox" checked={config.usarGradiente} onChange={e => set('usarGradiente', e.target.checked)} />
                  &nbsp;Gradiente
                </label>
                {config.usarGradiente && GRADIENTES.map(g => (
                  <div
                    key={g.id}
                    style={{ ...s.gradienteChip, background: `linear-gradient(135deg, ${g.from}, ${g.to})`, ...(config.gradiente === g.id ? s.gradienteChipSel : {}) }}
                    onClick={() => { set('gradiente', g.id); set('colorFondo1', g.from); set('colorFondo2', g.to); }}
                  />
                ))}
              </div>
              <div style={s.coloresSubLabel}>Símbolo / texto</div>
              <div style={s.paletaRow}>
                {PALETA.map(c => (
                  <div
                    key={c}
                    style={{ ...s.colorDot, backgroundColor: c, ...(config.colorSimboloTexto === c ? s.colorDotSel : {}) }}
                    onClick={() => set('colorSimboloTexto', c)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── Visualizador ── */}
          <div style={s.visualizador}>
            <div style={s.visualizadorLabel}>VISUALIZADOR DEL LOGO</div>
            <div style={s.canvasWrap}>
              <canvas ref={canvasRef} width={260} height={260} style={s.canvas} />
            </div>
            <button style={s.descargarBtn} onClick={() => {
              const a = document.createElement('a');
              a.href = canvasRef.current.toDataURL();
              a.download = 'escudo.png';
              a.click();
            }}>⬇ Descargar</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  backBtn: { background: 'none', border: 'none', color: '#2d9e6b', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '0.3rem', display: 'block' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px', margin: 0 },
  sub: { fontSize: '0.78rem', color: '#888', marginTop: '0.2rem' },
  guardarBtn: { padding: '0.65rem 1.5rem', backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', marginTop: '0.4rem' },

  mainRow: { display: 'flex', gap: '1.5rem', alignItems: 'flex-start' },

  panel: { width: '260px', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  seccion: { backgroundColor: '#fff', borderRadius: '10px', padding: '1rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  seccionLabel: { fontSize: '0.68rem', fontWeight: '700', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' },

  formasRow: { display: 'flex', gap: '0.5rem' },
  formaBtn: { flex: 1, padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fafafa', fontSize: '1rem', cursor: 'pointer' },
  formaBtnActive: { border: '1.5px solid #2d9e6b', backgroundColor: '#e8f5ee' },

  categoriasRow: { display: 'flex', gap: '0.4rem' },
  catBtn: { flex: 1, padding: '0.35rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fafafa', fontSize: '0.68rem', fontWeight: '600', cursor: 'pointer', color: '#555' },
  catBtnActive: { backgroundColor: '#1a7a8a', color: '#fff', border: '1px solid #1a7a8a' },
  simbolosGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem' },
  simBtn: { padding: '0.5rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fafafa', fontSize: '1.3rem', cursor: 'pointer', textAlign: 'center' },
  simBtnActive: { border: '2px solid #2d9e6b', backgroundColor: '#e8f5ee' },

  textoInput: { padding: '0.5rem 0.75rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.85rem', outline: 'none', color: '#333' },
  fontRow: { display: 'flex', gap: '0.4rem' },
  fontBtn: { flex: 1, padding: '0.35rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer', backgroundColor: '#fafafa', color: '#555' },
  fontBtnActive: { border: '1.5px solid #2d9e6b', backgroundColor: '#e8f5ee', color: '#2d9e6b', fontWeight: '600' },

  coloresSubLabel: { fontSize: '0.65rem', color: '#aaa', fontWeight: '600' },
  paletaRow: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' },
  colorDot: { width: '26px', height: '26px', borderRadius: '50%', cursor: 'pointer', border: '2px solid transparent', flexShrink: 0 },
  colorDotSel: { border: '3px solid #2d9e6b', boxShadow: '0 0 0 2px white, 0 0 0 4px #2d9e6b' },
  gradienteRow: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  checkLabel: { fontSize: '0.75rem', color: '#555', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' },
  gradienteChip: { width: '32px', height: '32px', borderRadius: '6px', cursor: 'pointer', border: '2px solid transparent' },
  gradienteChipSel: { border: '2px solid #2d9e6b' },

  visualizador: { flex: 1, backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem 2rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' },
  visualizadorLabel: { fontSize: '0.78rem', fontWeight: '700', color: '#1a1a1a', letterSpacing: '1px', alignSelf: 'flex-start' },
  canvasWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f7fa', borderRadius: '12px', padding: '2rem', width: '100%' },
  canvas: { borderRadius: '50%', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
  descargarBtn: { padding: '0.6rem 1.5rem', backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

export default EditShieldPage;