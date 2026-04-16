import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const COLORES = [
  '#2d9e6b','#1a7a8a','#e53e3e','#f6c90e','#1a1a1a',
  '#3b82f6','#9333ea','#f97316','#ec4899','#06b6d4',
  '#84cc16','#ef4444','#6366f1','#14b8a6','#f59e0b',
  '#ffffff','#64748b','#7c3aed','#be123c','#047857',
];

const CreateTeamPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreEquipo: '',
    colorPrimario: '#2d9e6b',
    colorSecundario: '#1a1a1a',
    escudo: null,
    escudoSvg: null,
  });
  const [errors, setErrors] = useState({});
  const [eligiendoSecundario, setEligiendoSecundario] = useState(false);

  const escudoGuardado = JSON.parse(localStorage.getItem('escudoEditor') || 'null');

  const escudoMostrado = escudoGuardado?.dataUrl || form.escudo;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombreEquipo.trim()) e.nombreEquipo = 'El nombre del equipo es requerido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinuar = () => {
    if (!validate()) return;
    localStorage.setItem('equipoData', JSON.stringify({
      nombre: form.nombreEquipo,
      colorPrimario: form.colorPrimario,
      colorSecundario: form.colorSecundario,
      escudo: escudoMostrado || null,
    }));
    navigate('/capitan/invitaciones');
  };

  const irAlEditor = () => {
    localStorage.setItem('equipoDataTemp', JSON.stringify(form));
    navigate('/capitan/editor-escudo');
  };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>
        <h1 style={s.title}>CREA TU EQUIPO</h1>
        <p style={s.subtitle}>Configura la identidad de tu escuadra y gestiona tu plantilla oficial para el torneo.</p>

        <div style={s.card}>
          <div style={s.cardHeader}>
            <span>📋</span>
            <h3 style={s.cardTitle}>IDENTIDAD DEL EQUIPO</h3>
            {/* Preview del escudo */}
            <div style={s.escudoWrap}>
              <div style={{ ...s.escudo, backgroundColor: form.colorPrimario }}>
                {escudoMostrado
                  ? <img src={escudoMostrado} alt="Escudo" style={s.escudoImg} />
                  : <span style={s.escudoPlaceholder}>⚽</span>
                }
              </div>
              <div style={s.escudoBadge}>✓</div>
            </div>
          </div>

          {/* Escudo */}
          <div style={s.field}>
            <label style={s.label}>ESCUDO DEL EQUIPO</label>
            <div style={s.escudoOpciones}>
              <button style={s.btnEditorEscudo} onClick={irAlEditor}>
                🎨 Crear escudo en el editor
              </button>
              <span style={s.oSeparador}>o</span>
              <label style={s.btnSubirArchivo}>
                📁 Subir imagen
                <input type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) handleChange('escudo', URL.createObjectURL(file));
                  }}
                />
              </label>
            </div>
            {escudoGuardado && (
              <div style={s.escudoGuardadoMsg}>✅ Escudo creado en el editor cargado</div>
            )}
          </div>

          {/* Nombre */}
          <div style={s.field}>
            <label style={s.label}>NOMBRE DEL EQUIPO</label>
            <input
              type="text"
              value={form.nombreEquipo}
              onChange={(e) => handleChange('nombreEquipo', e.target.value)}
              placeholder="Tu nombre FC"
              style={{ ...s.input, ...(errors.nombreEquipo ? s.inputError : {}) }}
            />
            {errors.nombreEquipo && <p style={s.errorText}>⚠ {errors.nombreEquipo}</p>}
          </div>

          {/* Colores */}
          <div style={s.field}>
            <label style={s.label}>COLORES DEL UNIFORME</label>
            <div style={s.coloresTabs}>
              <button
                style={{ ...s.tabBtn, ...(!eligiendoSecundario ? s.tabBtnActive : {}) }}
                onClick={() => setEligiendoSecundario(false)}
              >
                <div style={{ ...s.tabDot, backgroundColor: form.colorPrimario }} />
                Color primario
              </button>
              <button
                style={{ ...s.tabBtn, ...(eligiendoSecundario ? s.tabBtnActive : {}) }}
                onClick={() => setEligiendoSecundario(true)}
              >
                <div style={{ ...s.tabDot, backgroundColor: form.colorSecundario }} />
                Color secundario
              </button>
            </div>
            <div style={s.coloresGrid}>
              {COLORES.map(color => (
                <div
                  key={color}
                  onClick={() => handleChange(eligiendoSecundario ? 'colorSecundario' : 'colorPrimario', color)}
                  style={{
                    ...s.colorCircle,
                    backgroundColor: color,
                    border: color === '#ffffff' ? '2px solid #ddd' : '2px solid transparent',
                    ...((!eligiendoSecundario && form.colorPrimario === color) ||
                        (eligiendoSecundario && form.colorSecundario === color)
                      ? s.colorSelected : {}),
                  }}
                />
              ))}
            </div>
            {/* Preview uniforme */}
            <div style={s.uniformePreview}>
              <div style={{ ...s.uniformeCircle, backgroundColor: form.colorPrimario }} />
              <div style={{ ...s.uniformeCircle, backgroundColor: form.colorSecundario }} />
              <span style={s.uniformeLabel}>Vista previa del uniforme</span>
            </div>
          </div>

          <div style={s.btnRow}>
            <button style={s.continuarBtn} onClick={handleContinuar}>Continuar</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  subtitle: { fontSize: '0.85rem', color: '#555' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '2rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  cardTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '1px', flex: 1 },
  escudoWrap: { position: 'relative', marginLeft: 'auto' },
  escudo: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  escudoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  escudoPlaceholder: { fontSize: '2rem' },
  escudoBadge: { position: 'absolute', bottom: '2px', right: '2px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#2d9e6b', color: '#fff', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.72rem', color: '#888', fontWeight: '700', letterSpacing: '0.5px' },
  escudoOpciones: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  btnEditorEscudo: { padding: '0.55rem 1.1rem', backgroundColor: '#1a7a8a', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer' },
  oSeparador: { fontSize: '0.78rem', color: '#aaa' },
  btnSubirArchivo: { padding: '0.55rem 1.1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.82rem', color: '#555', cursor: 'pointer', backgroundColor: '#fafafa' },
  escudoGuardadoMsg: { fontSize: '0.75rem', color: '#2d9e6b', fontWeight: '600' },
  input: { padding: '0.75rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', color: '#333' },
  inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  errorText: { color: '#e53e3e', fontSize: '0.82rem' },
  coloresTabs: { display: 'flex', gap: '0.5rem', marginBottom: '0.25rem' },
  tabBtn: { display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#fafafa', fontSize: '0.78rem', color: '#555', cursor: 'pointer' },
  tabBtnActive: { border: '1px solid #2d9e6b', backgroundColor: '#e8f5ee', color: '#2d9e6b', fontWeight: '600' },
  tabDot: { width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, border: '1px solid rgba(0,0,0,0.1)' },
  coloresGrid: { display: 'grid', gridTemplateColumns: 'repeat(10, 32px)', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #eee' },
  colorCircle: { width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.1s' },
  colorSelected: { border: '3px solid #1a1a1a !important', transform: 'scale(1.2)', boxShadow: '0 0 0 2px white, 0 0 0 4px #1a1a1a' },
  uniformePreview: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' },
  uniformeCircle: { width: '28px', height: '28px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)' },
  uniformeLabel: { fontSize: '0.72rem', color: '#888' },
  btnRow: { display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' },
  continuarBtn: { backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.85rem 2.5rem', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer' },
};

export default CreateTeamPage;