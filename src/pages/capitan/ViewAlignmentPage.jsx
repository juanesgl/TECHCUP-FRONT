import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const JUGADORES_CANCHA = [
  { nombre: 'Bautista',  posicion: 'Portero',   x: 6,  y: 50, color: '#f6c90e' },
  { nombre: 'La Rocka',  posicion: 'Defensa',   x: 22, y: 18, color: '#3b82f6' },
  { nombre: "Di'Caprio", posicion: 'Defensa',   x: 22, y: 38, color: '#3b82f6' },
  { nombre: 'Kevin',     posicion: 'Defensa',   x: 22, y: 62, color: '#3b82f6' },
  { nombre: 'Doakes',    posicion: 'Defensa',   x: 22, y: 82, color: '#3b82f6' },
  { nombre: 'Jakie',     posicion: 'Medio',     x: 45, y: 25, color: '#2d9e6b' },
  { nombre: 'Al Pacino', posicion: 'Medio',     x: 45, y: 50, color: '#2d9e6b' },
  { nombre: 'Disel',     posicion: 'Medio',     x: 45, y: 75, color: '#2d9e6b' },
  { nombre: 'Dextarino', posicion: 'Delantero', x: 72, y: 20, color: '#e53e3e' },
  { nombre: 'Pitbull',   posicion: 'Delantero', x: 72, y: 50, color: '#e53e3e' },
  { nombre: 'Josh',      posicion: 'Delantero', x: 72, y: 80, color: '#e53e3e' },
];

const SUPLENTES = [
  { nombre: 'Eminem', posicion: 'Medio'     },
  { nombre: 'Doakes', posicion: 'Defensa'   },
];

const POS_COLOR = { Portero: '#f6c90e', Defensa: '#3b82f6', Medio: '#2d9e6b', Delantero: '#e53e3e' };

const ViewAlignmentPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [seleccionado, setSeleccionado] = useState(null);

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>
        {/* Header */}
        <div style={s.headerRow}>
          <div>
            <button style={s.backBtn} onClick={() => navigate('/capitan/equipo')}>← Volver</button>
            <h1 style={s.title}>ALINEACIÓN — LOS PELICULEROS</h1>
            <p style={s.sub}>Formación 4-3-3 · Solo lectura</p>
          </div>
          <div style={s.badgeReadonly}>👁 Vista de observador</div>
        </div>

        <div style={s.mainRow}>
          {/* Panel izquierdo: leyenda + suplentes */}
          <div style={s.panel}>
            <div style={s.card}>
              <div style={s.panelLabel}>LEYENDA</div>
              {Object.entries(POS_COLOR).map(([pos, color]) => (
                <div key={pos} style={s.leyendaRow}>
                  <div style={{ ...s.leyendaDot, backgroundColor: color }} />
                  <span style={s.leyendaText}>{pos}</span>
                </div>
              ))}
            </div>

            <div style={{ ...s.card, marginTop: '0.75rem' }}>
              <div style={s.panelLabel}>SUPLENTES</div>
              {SUPLENTES.map((j, i) => (
                <div key={i} style={s.supRow}>
                  <div style={s.supAvatar}>👤</div>
                  <div>
                    <div style={s.supNombre}>{j.nombre}</div>
                    <div style={{ ...s.supPos, color: POS_COLOR[j.posicion] }}>{j.posicion}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ ...s.card, marginTop: '0.75rem' }}>
              <div style={s.panelLabel}>TITULARES</div>
              {JUGADORES_CANCHA.map((j, i) => (
                <div
                  key={i}
                  style={{ ...s.supRow, cursor: 'pointer' }}
                  onClick={() => setSeleccionado(j)}
                >
                  <div style={{ ...s.supAvatar, backgroundColor: POS_COLOR[j.posicion] + '22' }}>👤</div>
                  <div>
                    <div style={s.supNombre}>{j.nombre}</div>
                    <div style={{ ...s.supPos, color: POS_COLOR[j.posicion] }}>{j.posicion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campo — estático, sin interacción */}
          <div style={s.campoWrap}>
            <div style={s.campo}>
              {/* Líneas */}
              <div style={s.lineaMedia} />
              <div style={s.circulo} />
              <div style={s.arcoIzq} />
              <div style={s.arcoDer} />
              <div style={s.areaIzq} />
              <div style={s.areaDer} />

              {/* Jugadores fijos — no arrastrables */}
              {JUGADORES_CANCHA.map((j, i) => (
                <div
                  key={i}
                  style={{ ...s.dot, left: `${j.x}%`, top: `${j.y}%`, backgroundColor: j.color }}
                  onClick={() => setSeleccionado(j)}
                  title={`${j.nombre} · ${j.posicion}`}
                >
                  <span style={s.dotNombre}>{j.nombre.split(' ')[0].toUpperCase()}</span>
                </div>
              ))}
            </div>
            <p style={s.hint}>Haz clic sobre un jugador para ver su perfil</p>
          </div>
        </div>
      </div>

      {/* Modal mini-perfil */}
      {seleccionado && (
        <div style={s.overlay} onClick={() => setSeleccionado(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <button style={s.cerrar} onClick={() => setSeleccionado(null)}>✕</button>
            <div style={{ ...s.modalAvatar, backgroundColor: POS_COLOR[seleccionado.posicion] + '22' }}>👤</div>
            <div style={s.modalNombre}>{seleccionado.nombre}</div>
            <div style={{ ...s.modalBadge, backgroundColor: POS_COLOR[seleccionado.posicion] + '22', color: POS_COLOR[seleccionado.posicion] }}>
              {seleccionado.posicion}
            </div>
            <p style={s.modalInfo}>Equipo: <strong>Los Peliculeros</strong></p>
          </div>
        </div>
      )}
    </Layout>
  );
};


import { useState } from 'react';

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  headerRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
  backBtn: { background: 'none', border: 'none', color: '#2d9e6b', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '0.3rem', display: 'block' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px', margin: 0 },
  sub: { fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' },
  badgeReadonly: { backgroundColor: '#f0f4ff', color: '#5b6abf', border: '1px solid #d0d8f0', borderRadius: '8px', padding: '0.4rem 0.9rem', fontSize: '0.78rem', fontWeight: '600', whiteSpace: 'nowrap', marginTop: '0.4rem' },

  mainRow: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },

  panel: { width: '190px', minWidth: '190px', display: 'flex', flexDirection: 'column' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1rem', border: '1px solid #e0e8f0' },
  panelLabel: { fontSize: '0.68rem', fontWeight: '700', color: '#888', letterSpacing: '0.5px', marginBottom: '0.75rem', textTransform: 'uppercase' },

  leyendaRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.45rem' },
  leyendaDot: { width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0 },
  leyendaText: { fontSize: '0.78rem', color: '#555' },

  supRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' },
  supAvatar: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#e8f0f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 },
  supNombre: { fontSize: '0.78rem', fontWeight: '600', color: '#1a1a1a' },
  supPos: { fontSize: '0.68rem', fontWeight: '600' },

  campoWrap: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  campo: { backgroundColor: '#2d7a3a', borderRadius: '10px', border: '3px solid rgba(255,255,255,0.25)', width: '100%', height: '360px', position: 'relative', overflow: 'hidden' },
  lineaMedia: { position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', backgroundColor: 'rgba(255,255,255,0.35)' },
  circulo: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)' },
  arcoIzq: { position: 'absolute', top: '30%', left: 0, width: '35px', height: '40%', border: '2px solid rgba(255,255,255,0.35)', borderLeft: 'none', borderRadius: '0 8px 8px 0' },
  arcoDer: { position: 'absolute', top: '30%', right: 0, width: '35px', height: '40%', border: '2px solid rgba(255,255,255,0.35)', borderRight: 'none', borderRadius: '8px 0 0 8px' },
  areaIzq: { position: 'absolute', top: '20%', left: 0, width: '65px', height: '60%', border: '2px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderRadius: '0 4px 4px 0' },
  areaDer: { position: 'absolute', top: '20%', right: 0, width: '65px', height: '60%', border: '2px solid rgba(255,255,255,0.2)', borderRight: 'none', borderRadius: '4px 0 0 4px' },

  dot: { position: 'absolute', width: '26px', height: '26px', borderRadius: '50%', transform: 'translate(-50%,-50%)', border: '2px solid rgba(255,255,255,0.7)', cursor: 'pointer', zIndex: 10 },
  dotNombre: { position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.52rem', color: '#fff', whiteSpace: 'nowrap', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.9)' },

  hint: { fontSize: '0.7rem', color: '#aaa', textAlign: 'center', margin: 0 },

  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', width: '280px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative' },
  cerrar: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  modalAvatar: { width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 0.75rem' },
  modalNombre: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.4rem' },
  modalBadge: { display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.75rem' },
  modalInfo: { fontSize: '0.8rem', color: '#666' },
};

export default ViewAlignmentPage;