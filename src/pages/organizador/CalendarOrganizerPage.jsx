import { useState } from 'react';
import Layout from '../../components/Layout';

const EVENTOS_INICIALES = [
  { id: 2, dia: 21, mes: 'ABR', diaSem: 'DOM', hora: '7AM a 12PM',  nombre: 'Entrenamiento',                              color: '#2d9e6b' },
  { id: 3, dia: 26, mes: 'ABR', diaSem: 'VIE', hora: 'Todo el día', nombre: 'Reunirse con el trainer',                    color: '#2d9e6b' },
  { id: 4, dia: 26, mes: 'ABR', diaSem: 'VIE', hora: '3PM a 5PM',   nombre: 'Revisión de videos para el partido',         color: '#1a7a8a' },
  { id: 5, dia: 29, mes: 'ABR', diaSem: 'LUN', hora: '1PM a 3PM',   nombre: 'Partido LOS PELICULEROS VS ABSOLUTE CINEMA', color: '#1a7a8a' },
  { id: 6, dia: 30, mes: 'ABR', diaSem: 'MAR', hora: 'Todo el día', nombre: 'Descanso',                                   color: '#2d9e6b' },
  { id: 7, dia: 1,  mes: 'MAY', diaSem: 'MIE', hora: '2PM a 4PM',   nombre: 'Partido LAS ALMOJABANAS VS LOS MOJICONES',   color: '#1a7a8a' },
  { id: 8, dia: 1,  mes: 'MAY', diaSem: 'MIE', hora: '9AM a 2PM',   nombre: 'Entrenamiento',                              color: '#2d9e6b' },
  { id: 9, dia: 8,  mes: 'MAY', diaSem: 'MIE', hora: '1PM a 3PM',   nombre: 'Partido LOS PERICOS VS LOS PERRITOS',        color: '#1a7a8a' },
];

const CalendarOrganizerPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [eventos, setEventos]     = useState(EVENTOS_INICIALES);
  const [expandido, setExpandido] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevo, setNuevo]         = useState({ equipo1: '', equipo2: '', fecha: '', hora: '', cancha: '' });
  const [errors, setErrors]       = useState({});
  const [exito, setExito]         = useState(false);

  const grupos = [];
  const vistos = new Set();
  eventos.forEach(ev => {
    const key = `${ev.dia}-${ev.mes}`;
    if (!vistos.has(key)) { vistos.add(key); grupos.push({ dia: ev.dia, mes: ev.mes, diaSem: ev.diaSem }); }
  });

  const validate = () => {
    const e = {};
    if (!nuevo.equipo1.trim())  e.equipo1 = 'El nombre del equipo 1 es obligatorio';
    if (!nuevo.equipo2.trim())  e.equipo2 = 'El nombre del equipo 2 es obligatorio';
    if (nuevo.equipo1.trim() && nuevo.equipo2.trim() &&
        nuevo.equipo1.trim().toLowerCase() === nuevo.equipo2.trim().toLowerCase())
      e.equipo2 = 'Los equipos no pueden ser el mismo';
    if (!nuevo.fecha)           e.fecha   = 'La fecha es obligatoria';
    if (!nuevo.hora)            e.hora    = 'La hora es obligatoria';
    if (!nuevo.cancha.trim())   e.cancha  = 'La cancha es obligatoria';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGuardar = () => {
    if (!validate()) return;
    const [year, month, day] = nuevo.fecha.split('-');
    const meses = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
    const dias  = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
    const fecha = new Date(nuevo.fecha);
    setEventos(prev => [...prev, {
      id: Date.now(),
      dia: parseInt(day),
      mes: meses[parseInt(month) - 1],
      diaSem: dias[fecha.getDay()],
      hora: nuevo.hora,
      nombre: `Partido ${nuevo.equipo1.toUpperCase()} VS ${nuevo.equipo2.toUpperCase()} · ${nuevo.cancha}`,
      color: '#1a7a8a',
    }]);
    setExito(true);
    setTimeout(() => {
      setExito(false);
      setShowModal(false);
      setNuevo({ equipo1: '', equipo2: '', fecha: '', hora: '', cancha: '' });
      setErrors({});
    }, 1500);
  };

  const set = (k, v) => {
    setNuevo(p => ({ ...p, [k]: v }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: '' }));
  };

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <h1 style={s.pageTitle}>CALENDARIO 2026-1</h1>

      <div style={s.controlBar}>
        <div style={s.controlLeft}>
          <button style={s.hoyBtn}>📅 Hoy</button>
          <span style={s.mesLabel}>Abril – Sep, 2026</span>
          <button style={s.arrowBtn}>‹</button>
          <button style={s.arrowBtn}>›</button>
        </div>
        <div style={s.controlRight}>
          <button style={s.viewBtn}>Horario ▾</button>
          <button style={s.iconBtn}>✓</button>
          <button style={s.iconBtn}>📅</button>
          <button style={s.iconBtn}>✏</button>
        </div>
      </div>

      <div style={s.lista}>
        {grupos.map(grupo => {
          const evsDia = eventos.filter(e => e.dia === grupo.dia && e.mes === grupo.mes);
          return (
            <div key={`${grupo.dia}-${grupo.mes}`}>
              <div style={s.diaHeader}>
                <span style={s.diaNum}>{grupo.dia}</span>
                <span style={s.diaMeta}>{grupo.mes}, {grupo.diaSem}</span>
              </div>
              {evsDia.map(ev => (
                <div key={ev.id} style={s.eventoRow}
                  onClick={() => setExpandido(expandido === ev.id ? null : ev.id)}>
                  <span style={s.eventoHora}>{ev.hora}</span>
                  <div style={{ ...s.colorDot, backgroundColor: ev.color }} />
                  <span style={s.eventoNombre}>{ev.nombre}</span>
                  <span style={s.chevron}>{expandido === ev.id ? '▲' : '▾'}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <div style={s.addBtnWrapper}>
        <button style={s.addBtn} onClick={() => { setShowModal(true); setExito(false); }}>
          + Añadir Partido
        </button>
      </div>

      {showModal && (
        <div style={m.overlay} onClick={() => setShowModal(false)}>
          <div style={m.modal} onClick={e => e.stopPropagation()}>
            <button style={m.cerrar} onClick={() => setShowModal(false)}>✕</button>
            <h3 style={m.titulo}>Añadir Partido</h3>

            {exito ? (
              <div style={m.exito}>✓ Partido añadido al calendario</div>
            ) : (
              <>
                <div style={m.field}>
                  <label style={m.label}>EQUIPO 1</label>
                  <input style={{ ...m.input, ...(errors.equipo1 ? m.inputError : {}) }}
                    placeholder="Nombre del equipo" value={nuevo.equipo1}
                    onChange={e => set('equipo1', e.target.value)} />
                  {errors.equipo1 && <span style={m.errorMsg}>⚠ {errors.equipo1}</span>}
                </div>
                <div style={m.field}>
                  <label style={m.label}>EQUIPO 2</label>
                  <input style={{ ...m.input, ...(errors.equipo2 ? m.inputError : {}) }}
                    placeholder="Nombre del equipo" value={nuevo.equipo2}
                    onChange={e => set('equipo2', e.target.value)} />
                  {errors.equipo2 && <span style={m.errorMsg}>⚠ {errors.equipo2}</span>}
                </div>
                <div style={m.row2}>
                  <div style={m.field}>
                    <label style={m.label}>FECHA</label>
                    <input type="date" style={{ ...m.input, ...(errors.fecha ? m.inputError : {}) }}
                      value={nuevo.fecha} onChange={e => set('fecha', e.target.value)} />
                    {errors.fecha && <span style={m.errorMsg}>⚠ {errors.fecha}</span>}
                  </div>
                  <div style={m.field}>
                    <label style={m.label}>HORA</label>
                    <input type="time" style={{ ...m.input, ...(errors.hora ? m.inputError : {}) }}
                      value={nuevo.hora} onChange={e => set('hora', e.target.value)} />
                    {errors.hora && <span style={m.errorMsg}>⚠ {errors.hora}</span>}
                  </div>
                </div>
                <div style={m.field}>
                  <label style={m.label}>CANCHA</label>
                  <select style={{ ...m.input, ...(errors.cancha ? m.inputError : {}), color: nuevo.cancha ? '#333' : '#999' }}
                    value={nuevo.cancha} onChange={e => set('cancha', e.target.value)}>
                    <option value="">Selecciona una cancha...</option>
                    <option>Cancha 1</option>
                    <option>Cancha 2</option>
                    <option>Cancha 3</option>
                    <option>Cancha 4</option>
                    <option>Cancha 5 (VIP)</option>
                  </select>
                  {errors.cancha && <span style={m.errorMsg}>⚠ {errors.cancha}</span>}
                </div>
                <div style={m.btns}>
                  <button style={m.btnCancelar} onClick={() => setShowModal(false)}>Cancelar</button>
                  <button style={m.btnConfirmar} onClick={handleGuardar}>Guardar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

const s = {
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px', marginBottom: '1rem' },
  controlBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', borderRadius: '8px', padding: '0.6rem 1rem', border: '1px solid #e0e8f0', marginBottom: '0.75rem' },
  controlLeft: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  controlRight: { display: 'flex', alignItems: 'center', gap: '0.4rem' },
  hoyBtn: { padding: '0.3rem 0.75rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#f5f5f5', fontSize: '0.8rem', cursor: 'pointer', color: '#555' },
  mesLabel: { fontSize: '0.88rem', fontWeight: '600', color: '#1a1a1a' },
  arrowBtn: { padding: '0.2rem 0.5rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#f5f5f5', fontSize: '1rem', cursor: 'pointer', color: '#555' },
  viewBtn: { padding: '0.3rem 0.75rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#f5f5f5', fontSize: '0.8rem', cursor: 'pointer', color: '#555' },
  iconBtn: { padding: '0.3rem 0.5rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#f5f5f5', fontSize: '0.8rem', cursor: 'pointer', color: '#555' },
  lista: { backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e0e8f0', overflow: 'hidden', marginBottom: '0.75rem' },
  diaHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e0e8f0' },
  diaNum: { fontSize: '0.95rem', fontWeight: '700', color: '#1a1a1a' },
  diaMeta: { fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' },
  eventoRow: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.7rem 1.25rem', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' },
  eventoHora: { fontSize: '0.78rem', color: '#888', minWidth: '110px' },
  colorDot: { width: '10px', height: '10px', borderRadius: '50%', minWidth: '10px' },
  eventoNombre: { fontSize: '0.85rem', color: '#333', flex: 1 },
  chevron: { fontSize: '0.8rem', color: '#aaa' },
  addBtnWrapper: { display: 'flex', justifyContent: 'flex-end' },
  addBtn: { padding: '0.6rem 1.25rem', backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

const m = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', width: '400px', border: '1px solid #e0e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.15)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  cerrar: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  titulo: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', margin: 0 },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 },
  label: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  input: { padding: '0.55rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#ffffff', color: '#333', fontSize: '0.85rem', outline: 'none', width: '100%' },
  inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  errorMsg: { fontSize: '0.68rem', color: '#e53e3e', fontWeight: '500' },
  row2: { display: 'flex', gap: '0.75rem' },
  btns: { display: 'flex', gap: '0.75rem', marginTop: '0.25rem' },
  btnCancelar: { flex: 1, padding: '0.65rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', fontSize: '0.85rem', cursor: 'pointer' },
  btnConfirmar: { flex: 1, padding: '0.65rem', border: 'none', borderRadius: '8px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  exito: { backgroundColor: '#e8f5ee', color: '#2d9e6b', borderRadius: '8px', padding: '1rem', textAlign: 'center', fontSize: '0.88rem', fontWeight: '600' },
};

export default CalendarOrganizerPage;