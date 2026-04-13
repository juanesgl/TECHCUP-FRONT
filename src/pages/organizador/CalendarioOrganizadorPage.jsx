import { useState } from 'react';
import Layout from '../../components/Layout';

const eventos = [
  { id: 1, dia: 19, mes: 'ABR', diaSem: 'VIE', hora: null, nombre: null, color: null },
  { id: 2, dia: 21, mes: 'ABR', diaSem: 'DOM', hora: '7AM a 12PM', nombre: 'Entrenamiento', color: '#2d9e6b' },
  { id: 3, dia: 26, mes: 'ABR', diaSem: 'VIE', hora: 'Todo el dia', nombre: 'Reunirse con el trainer', color: '#2d9e6b' },
  { id: 4, dia: 26, mes: 'ABR', diaSem: 'VIE', hora: '3PM a 5PM', nombre: 'Revision de videos para el partido', color: '#1a7a8a' },
  { id: 5, dia: 29, mes: 'ABR', diaSem: 'LUN', hora: '1PM a 3PM', nombre: 'Partido LOS PELICULEROS VS ABSOLUTE CINEMA', color: '#1a7a8a' },
  { id: 6, dia: 30, mes: 'ABR', diaSem: 'MAR', hora: 'Todo el dia', nombre: 'Descanso', color: '#2d9e6b' },
  { id: 7, dia: 1, mes: 'MAY', diaSem: 'MIE', hora: '2PM to 4PM', nombre: 'Partido LAS ALMOJABANAS VS LOS MOJICONES', color: '#1a7a8a' },
  { id: 8, dia: 1, mes: 'MAY', diaSem: 'MIE', hora: '9AM a 2PM', nombre: 'Entrenamiento', color: '#2d9e6b' },
  { id: 9, dia: 8, mes: 'MAY', diaSem: 'MIE', hora: '1PM A 3PM', nombre: 'Partido LOS PERICOS VS LOS PERRITOS', color: '#1a7a8a' },
];

const CalendarioOrganizadorPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [expandido, setExpandido] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nuevoPartido, setNuevoPartido] = useState({ equipo1: '', equipo2: '', fecha: '', hora: '' });

  const grupos = [];
  const vistos = new Set();
  eventos.forEach(ev => {
    const key = `${ev.dia}-${ev.mes}`;
    if (!vistos.has(key)) {
      vistos.add(key);
      grupos.push({ dia: ev.dia, mes: ev.mes, diaSem: ev.diaSem });
    }
  });

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <h1 style={s.pageTitle}>CALENDARIO 2026-1</h1>

      <div style={s.controlBar}>
        <div style={s.controlLeft}>
          <button style={s.hoyBtn}>📅 Hoy</button>
          <span style={s.mesLabel}>Abril - Sep, 2024</span>
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
        {grupos.map((grupo) => {
          const evsDia = eventos.filter(e => e.dia === grupo.dia && e.mes === grupo.mes && e.nombre);
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
              {evsDia.length === 0 && (
                <div style={s.eventoRow}>
                  <span style={{ ...s.eventoHora, color: '#bbb' }}>Sin eventos</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={s.addBtnWrapper}>
        <button style={s.addBtn} onClick={() => setShowModal(true)}>Añadir Partido</button>
      </div>

      {showModal && (
        <div style={m.overlay}>
          <div style={m.modal}>
            <div style={m.titulo}>Añadir Partido</div>
            <div style={m.field}>
              <label style={m.label}>EQUIPO 1</label>
              <input style={m.input} placeholder="Nombre del equipo"
                value={nuevoPartido.equipo1}
                onChange={e => setNuevoPartido({ ...nuevoPartido, equipo1: e.target.value })} />
            </div>
            <div style={m.field}>
              <label style={m.label}>EQUIPO 2</label>
              <input style={m.input} placeholder="Nombre del equipo"
                value={nuevoPartido.equipo2}
                onChange={e => setNuevoPartido({ ...nuevoPartido, equipo2: e.target.value })} />
            </div>
            <div style={m.row2}>
              <div style={m.field}>
                <label style={m.label}>FECHA</label>
                <input type="date" style={m.input} value={nuevoPartido.fecha}
                  onChange={e => setNuevoPartido({ ...nuevoPartido, fecha: e.target.value })} />
              </div>
              <div style={m.field}>
                <label style={m.label}>HORA</label>
                <input type="time" style={m.input} value={nuevoPartido.hora}
                  onChange={e => setNuevoPartido({ ...nuevoPartido, hora: e.target.value })} />
              </div>
            </div>
            <div style={m.btns}>
              <button style={m.btnCancelar} onClick={() => setShowModal(false)}>Cancelar</button>
              <button style={m.btnConfirmar} onClick={() => setShowModal(false)}>Guardar</button>
            </div>
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
  modal: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', width: '380px', border: '1px solid #e0e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' },
  titulo: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1.25rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.75rem', flex: 1 },
  label: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  input: { padding: '0.55rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#ffffff', color: '#333', fontSize: '0.85rem', outline: 'none', width: '100%' },
  row2: { display: 'flex', gap: '0.75rem' },
  btns: { display: 'flex', gap: '0.75rem', marginTop: '1rem' },
  btnCancelar: { flex: 1, padding: '0.65rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', fontSize: '0.85rem', cursor: 'pointer' },
  btnConfirmar: { flex: 1, padding: '0.65rem', border: 'none', borderRadius: '8px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

export default CalendarioOrganizadorPage;