import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const POSICIONES = [
  { id: 'arquero',      label: 'Arquero',       icono: '🧤' },
  { id: 'defensa',      label: 'Defensa',        icono: '🛡' },
  { id: 'mediocampista',label: 'MedioCampista',  icono: '↔' },
  { id: 'delantero',    label: 'Delantero',      icono: '🎯' },
];

const PARENTESCO = ['Familiar','Amigo','Compañero','Otro'];

const PerfilPage = ({ menuType }) => {
  const user    = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  /* Determinar rol visual */
  const esJugador = menuType === 'capitan' || menuType === 'jugador';
  const rolLabel  = menuType === 'capitan' ? 'Capitán'
    : menuType === 'organizador'           ? 'Organizador'
    : menuType === 'arbitro'               ? 'Árbitro'
    : 'Jugador';

  const [form, setForm] = useState({
    nombre:      user.name  || 'Juan Perez',
    edad:        user.edad  || '21',
    cedula:      user.cedula|| '1000010184',
    email:       user.email || 'juan.perez@gmail.com',
    parentesco:  'Familiar',
    foto:        user.foto  || null,
    posiciones:  ['arquero', 'delantero'],
  });

  const [guardado, setGuardado] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const togglePosicion = (id) => {
    set('posiciones', form.posiciones.includes(id)
      ? form.posiciones.filter(p => p !== id)
      : [...form.posiciones, id]
    );
  };

  const handleFoto = (e) => {
    const f = e.target.files[0];
    if (f) set('foto', URL.createObjectURL(f));
  };

  const handleGuardar = () => {
    const updated = { ...user, name: form.nombre, email: form.email, foto: form.foto };
    localStorage.setItem('user', JSON.stringify(updated));
    setGuardado(true);
    setTimeout(() => setGuardado(false), 2500);
  };

  return (
    <Layout userName={form.nombre} userRole={rolLabel} menuType={menuType}>
      <div style={s.container}>

        {/* ── Header perfil ── */}
        <div style={s.headerCard}>
          {/* Foto */}
          <div style={s.fotoWrap} onClick={() => fileRef.current?.click()} title="Cambiar foto">
            {form.foto
              ? <img src={form.foto} alt="Perfil" style={s.fotoImg} />
              : <div style={s.fotoPlaceholder}>
                  <span style={{ fontSize: '2.5rem' }}>👤</span>
                </div>
            }
            <div style={s.fotoOverlay}>📷</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handleFoto} />
          </div>

          {/* Info básica */}
          <div style={s.headerInfo}>
            <div style={s.headerNombreRow}>
              <h2 style={s.headerNombre}>{form.nombre || 'Sin nombre'}</h2>
              <span style={s.rolBadge}>{rolLabel.toUpperCase()}</span>
            </div>
            <div style={s.invitadoLabel}>Invitado</div>
            <div style={s.parentescoBadge}>
              <span style={s.parentescoIcono}>⚽</span>
              {form.parentesco}
            </div>
          </div>
        </div>

        <div style={s.divider} />

        {/* ── Formulario ── */}
        <div style={s.formGrid}>
          <div style={s.field}>
            <label style={s.label}>Nombre Completo</label>
            <input style={s.input} value={form.nombre} onChange={e => set('nombre', e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>EDAD</label>
            <input style={s.input} type="number" value={form.edad} onChange={e => set('edad', e.target.value)} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Parentesco</label>
            <select style={s.select} value={form.parentesco} onChange={e => set('parentesco', e.target.value)}>
              {PARENTESCO.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div style={s.field}>
            <label style={s.label}>Cédula</label>
            <input style={s.input} value={form.cedula} onChange={e => set('cedula', e.target.value)} />
          </div>
          <div style={{ ...s.field, gridColumn: '1 / -1' }}>
            <label style={s.label}>Email Address</label>
            <input style={s.input} type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
        </div>

        {/* ── Posiciones — solo jugadores y capitanes ── */}
        {esJugador && (
          <>
            <div style={s.posicionesLabel}>
              <span style={s.posIcono}>⚽</span> Posiciones
            </div>
            <div style={s.posicionesGrid}>
              {POSICIONES.map(p => {
                const activo = form.posiciones.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() => togglePosicion(p.id)}
                    style={{ ...s.posCard, ...(activo ? s.posCardActive : {}) }}
                  >
                    <span style={s.posIconoGrande}>{p.icono}</span>
                    <span style={{ ...s.posLabel, color: activo ? '#2d9e6b' : '#888' }}>{p.label}</span>
                    <div style={{ ...s.posDot, backgroundColor: activo ? '#2d9e6b' : '#ddd' }} />
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div style={s.divider} />

        {/* ── Botones ── */}
        <div style={s.btnRow}>
          {guardado && <span style={s.savedMsg}>✓ Cambios guardados</span>}
          <button style={s.cancelBtn} onClick={() => navigate(-1)}>Cancelar</button>
          <button style={s.guardarBtn} onClick={handleGuardar}>Guardar Cambios</button>
        </div>
      </div>
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '720px' },

  headerCard: { display: 'flex', alignItems: 'flex-start', gap: '1.5rem', padding: '0.5rem 0' },

  fotoWrap: { position: 'relative', width: '90px', height: '90px', borderRadius: '50%', cursor: 'pointer', flexShrink: 0, overflow: 'hidden' },
  fotoImg: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' },
  fotoPlaceholder: { width: '90px', height: '90px', borderRadius: '50%', backgroundColor: '#e8f0f7', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  fotoOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '30px', backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', opacity: 0, transition: 'opacity 0.2s' },

  headerInfo: { display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingTop: '0.25rem' },
  headerNombreRow: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  headerNombre: { fontSize: '1.3rem', fontWeight: '700', color: '#1a1a1a', margin: 0 },
  rolBadge: { backgroundColor: '#e8f5ee', color: '#2d9e6b', fontSize: '0.65rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '20px', letterSpacing: '0.5px' },
  invitadoLabel: { fontSize: '0.78rem', color: '#888' },
  parentescoBadge: { display: 'inline-flex', alignItems: 'center', gap: '0.3rem', backgroundColor: '#e8f5ee', color: '#2d9e6b', fontSize: '0.75rem', fontWeight: '600', padding: '0.2rem 0.7rem', borderRadius: '20px', width: 'fit-content' },
  parentescoIcono: { fontSize: '0.8rem' },

  divider: { height: '1px', backgroundColor: '#f0f0f0' },

  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.35rem' },
  label: { fontSize: '0.72rem', color: '#888', fontWeight: '600', letterSpacing: '0.3px' },
  input: { padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.88rem', color: '#333', outline: 'none', backgroundColor: '#fff' },
  select: { padding: '0.65rem 0.9rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.88rem', color: '#333', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' },

  posicionesLabel: { display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a' },
  posIcono: { fontSize: '1rem' },
  posicionesGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' },
  posCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '0.85rem 0.5rem', border: '1.5px solid #e0e8f0', borderRadius: '10px', cursor: 'pointer', backgroundColor: '#fafafa', transition: 'all 0.15s' },
  posCardActive: { border: '1.5px solid #2d9e6b', backgroundColor: '#f0fdf7' },
  posIconoGrande: { fontSize: '1.5rem' },
  posLabel: { fontSize: '0.75rem', fontWeight: '600' },
  posDot: { width: '8px', height: '8px', borderRadius: '50%' },

  btnRow: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.75rem' },
  savedMsg: { fontSize: '0.82rem', color: '#2d9e6b', fontWeight: '600', marginRight: 'auto' },
  cancelBtn: { padding: '0.6rem 1.25rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', fontSize: '0.85rem', cursor: 'pointer' },
  guardarBtn: { padding: '0.6rem 1.5rem', backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

export default PerfilPage;