import { useState } from 'react';
import Layout from '../components/Layout';

const Toggle = ({ value, onChange }) => (
  <div
    onClick={() => onChange(!value)}
    style={{
      width: '44px', height: '24px', borderRadius: '12px',
      backgroundColor: value ? '#2d9e6b' : '#ccc',
      cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
    }}
  >
    <div style={{
      position: 'absolute', top: '2px',
      left: value ? '22px' : '2px',
      width: '20px', height: '20px', borderRadius: '50%',
      backgroundColor: '#ffffff', transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }} />
  </div>
);

const CANCHAS = [
  { id: 1, nombre: 'Cancha 1',       tipo: 'Principal',  estado: 'Disponible' },
  { id: 2, nombre: 'Cancha 2',       tipo: 'Auxiliar',   estado: 'Disponible' },
  { id: 3, nombre: 'Cancha 3',       tipo: 'Auxiliar',   estado: 'Disponible' },
  { id: 4, nombre: 'Cancha 4',       tipo: 'Auxiliar',   estado: 'Mantenimiento' },
  { id: 5, nombre: 'Cancha 5 (VIP)', tipo: 'VIP',        estado: 'Disponible' },
];

const ConfigurationPage = ({ menuType }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [config, setConfig] = useState({
    fechaInicio:   '2024-06-01',
    fechaFin:      '2024-08-30',
    cantidadEquipos: '20/21',
    minJugadores:  '7',
    maxJugadores:  '12',
    notifInscripciones: true,
    notifPagos:         true,
    notifCronograma:    false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!config.fechaInicio) e.fechaInicio = 'La fecha de inicio es requerida';
    if (!config.fechaFin)    e.fechaFin    = 'La fecha de fin es requerida';
    if (config.fechaInicio && config.fechaFin && config.fechaInicio >= config.fechaFin)
      e.fechaInicio = 'La fecha de inicio debe ser anterior a la fecha de fin';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGuardar = () => {
    if (validate()) alert('Configuración guardada correctamente');
  };

  return (
    <Layout userName={user.name} userRole={user.role} menuType={menuType}>
      <div style={s.container}>
        <h1 style={s.title}>CONFIGURACIÓN</h1>
        <p style={s.subtitle}>Gestión de parámetros, reglas y notificaciones del torneo</p>

        {/* ── Parámetros del torneo ── */}
        <div style={s.section}>
          <div style={s.sectionTitle}>📅 PARÁMETROS DEL TORNEO</div>
          <div style={s.grid2}>
            <div style={s.field}>
              <label style={s.label}>Fecha inicio</label>
              <input type="date" value={config.fechaInicio}
                onChange={e => handleChange('fechaInicio', e.target.value)}
                style={{ ...s.input, ...(errors.fechaInicio ? s.inputError : {}) }} />
              {errors.fechaInicio && <p style={s.errorText}>⚠ {errors.fechaInicio}</p>}
            </div>
            <div style={s.field}>
              <label style={s.label}>Fecha fin</label>
              <input type="date" value={config.fechaFin}
                onChange={e => handleChange('fechaFin', e.target.value)}
                style={{ ...s.input, ...(errors.fechaFin ? s.inputError : {}) }} />
              {errors.fechaFin && <p style={s.errorText}>⚠ {errors.fechaFin}</p>}
            </div>
            <div style={s.field}>
              <label style={s.label}>Cantidad de equipos</label>
              <input type="text" value={config.cantidadEquipos}
                onChange={e => handleChange('cantidadEquipos', e.target.value)}
                style={s.input} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Jugadores por equipo</label>
              <div style={s.rangoRow}>
                <input type="number" value={config.minJugadores} min="1"
                  onChange={e => handleChange('minJugadores', e.target.value)}
                  style={{ ...s.input, width: '80px', textAlign: 'center' }} />
                <span style={s.rangoSep}>mín — máx</span>
                <input type="number" value={config.maxJugadores} min="1"
                  onChange={e => handleChange('maxJugadores', e.target.value)}
                  style={{ ...s.input, width: '80px', textAlign: 'center' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Logística ── */}
        <div style={s.section}>
          <div style={s.sectionTitle}>📍 LOGÍSTICA</div>

          {/* Duración fija — solo informativo */}
          <div style={s.duracionBox}>
            <div style={s.duracionIcono}>⏱</div>
            <div style={s.duracionInfo}>
              <div style={s.duracionTitulo}>Duración del partido</div>
              <div style={s.duracionValor}>40 minutos <span style={s.duracionDetalle}>(2 tiempos de 20 min)</span></div>
              <div style={s.duracionNota}>La duración está fijada por el reglamento del torneo y no puede modificarse.</div>
            </div>
            <div style={s.duracionBadge}>Fijo</div>
          </div>

          {/* Canchas — solo informativas */}
          <div style={s.canchasGroup}>
            <label style={s.label}>Canchas disponibles <span style={s.labelHint}>(la asignación se hace al programar cada partido)</span></label>
            <div style={s.canchasGrid}>
              {CANCHAS.map(c => (
                <div key={c.id} style={{ ...s.canchaCard, ...(c.estado === 'Mantenimiento' ? s.canchaCardMant : {}) }}>
                  <div style={s.canchaTopRow}>
                    <span style={s.canchaNombre}>{c.nombre}</span>
                    <span style={{ ...s.canchaEstadoBadge, ...(c.estado === 'Mantenimiento' ? s.badgeMant : s.badgeDisp) }}>
                      {c.estado === 'Disponible' ? '● Disponible' : '⚠ Mantenimiento'}
                    </span>
                  </div>
                  <div style={s.canchaTipo}>{c.tipo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Notificaciones ── */}
        <div style={s.section}>
          <div style={s.sectionTitle}>🔔 NOTIFICACIONES Y ALERTAS</div>
          <div style={s.notifList}>
            {[
              { key: 'notifInscripciones', titulo: 'Nuevas Inscripciones',  desc: 'Recibir aviso cuando un equipo se registre.' },
              { key: 'notifPagos',         titulo: 'Pagos pendientes',       desc: 'Alertar sobre deudas de equipos antes de la fecha límite.' },
              { key: 'notifCronograma',    titulo: 'Cambios de cronograma',  desc: 'Notificar a los equipos automáticamente por cambios de horario.' },
            ].map(n => (
              <div key={n.key} style={s.notifRow}>
                <div style={s.notifInfo}>
                  <p style={s.notifTitle}>{n.titulo}</p>
                  <p style={s.notifDesc}>{n.desc}</p>
                </div>
                <Toggle value={config[n.key]} onChange={v => handleChange(n.key, v)} />
              </div>
            ))}
          </div>
        </div>

        <div style={s.footerBtn}>
          <button style={s.guardarBtn} onClick={handleGuardar}>💾 GUARDAR CAMBIOS</button>
        </div>
      </div>
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', height: '100%' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  subtitle: { fontSize: '0.85rem', color: '#555' },

  section: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' },
  sectionTitle: { fontSize: '0.82rem', fontWeight: '700', color: '#333', letterSpacing: '0.5px' },

  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.75rem', color: '#888', fontWeight: '600' },
  labelHint: { fontSize: '0.68rem', color: '#bbb', fontWeight: '400' },
  input: { padding: '0.6rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', color: '#333', backgroundColor: '#fff' },
  inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  errorText: { color: '#e53e3e', fontSize: '0.75rem', fontWeight: '500' },
  rangoRow: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  rangoSep: { fontSize: '0.72rem', color: '#aaa', whiteSpace: 'nowrap' },

  duracionBox: { display: 'flex', alignItems: 'flex-start', gap: '1rem', backgroundColor: '#f8fbff', borderRadius: '8px', padding: '1rem', border: '1px solid #e0e8f0' },
  duracionIcono: { fontSize: '1.5rem', flexShrink: 0 },
  duracionInfo: { flex: 1 },
  duracionTitulo: { fontSize: '0.75rem', color: '#888', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '0.2rem' },
  duracionValor: { fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a' },
  duracionDetalle: { fontSize: '0.82rem', fontWeight: '400', color: '#555' },
  duracionNota: { fontSize: '0.72rem', color: '#aaa', marginTop: '0.3rem', lineHeight: '1.4' },
  duracionBadge: { backgroundColor: '#e8f0f7', color: '#1a7a8a', fontSize: '0.68rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '20px', alignSelf: 'flex-start', whiteSpace: 'nowrap' },

  canchasGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  canchasGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' },
  canchaCard: { backgroundColor: '#f8fbff', borderRadius: '8px', padding: '0.75rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  canchaCardMant: { backgroundColor: '#fff8f0', border: '1px solid #fde8c8' },
  canchaTopRow: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  canchaNombre: { fontSize: '0.82rem', fontWeight: '700', color: '#1a1a1a' },
  canchaTipo: { fontSize: '0.65rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.3px' },
  canchaEstadoBadge: { fontSize: '0.62rem', fontWeight: '600', padding: '0.15rem 0', borderRadius: '4px' },
  badgeDisp: { color: '#2d9e6b' },
  badgeMant: { color: '#e67e22' },

  notifList: { display: 'flex', flexDirection: 'column', gap: '0' },
  notifRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid #f5f5f5' },
  notifInfo: { flex: 1 },
  notifTitle: { fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a' },
  notifDesc: { fontSize: '0.75rem', color: '#888', marginTop: '0.15rem' },

  footerBtn: { display: 'flex', justifyContent: 'flex-end', paddingBottom: '1rem' },
  guardarBtn: { backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '700', letterSpacing: '0.5px' },
};

export default ConfigurationPage;