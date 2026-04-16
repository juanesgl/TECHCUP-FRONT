import { useState } from 'react';
import Layout from '../../components/Layout';

const InvitationsPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const equipoData = JSON.parse(localStorage.getItem('equipoData') || 'null') || {
    nombre: 'Mi Equipo FC',
    colorPrimario: '#2d9e6b',
    colorSecundario: '#1a1a1a',
    escudo: null,
  };

  const [busqueda, setBusqueda] = useState('');
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: 'Carlos Martinez',  posicion: 'DELANTERO', estado: 'Confirmado' },
    { id: 2, nombre: 'Andres Rivera',    posicion: 'DEFENSA',   estado: 'Confirmado' },
    { id: 3, nombre: 'Sebastian Gomez', posicion: 'PORTERO',   estado: 'Pendiente'  },
  ]);

  const posicionColor = { DELANTERO: ['#e8f5ee','#2d9e6b'], DEFENSA: ['#e8f0f7','#1a7a8a'], PORTERO: ['#f0e8f7','#7a1a8a'], MEDIO: ['#fff8e1','#b45309'] };
  const getPosStyle = (p) => ({ backgroundColor: (posicionColor[p]||['#f5f5f5','#555'])[0], color: (posicionColor[p]||['#f5f5f5','#555'])[1], padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '600' });
  const getEstadoStyle = (e) => ({ color: e === 'Confirmado' ? '#2d9e6b' : '#f6c90e', fontSize: '0.78rem', fontWeight: '600' });

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>
        <h1 style={s.title}>INVITA JUGADORES</h1>
        <p style={s.subtitle}>Gestiona tu plantilla oficial para el torneo.</p>

        <div style={s.mainRow}>
          {/* Card equipo — datos reales */}
          <div style={s.equipoCard}>
            <div style={{ ...s.escudoCircle, backgroundColor: equipoData.colorPrimario }}>
              {equipoData.escudo
                ? <img src={equipoData.escudo} alt="Escudo" style={s.escudoImg} />
                : <span style={{ fontSize: '2rem' }}>⚽</span>
              }
            </div>
            <p style={s.equipoNombre}>{equipoData.nombre}</p>
            <div style={s.uniformeSection}>
              <p style={s.uniformeLabel}>COLOR DEL UNIFORME</p>
              <div style={s.coloresRow}>
                <div style={{ ...s.colorDot, backgroundColor: equipoData.colorPrimario }} />
                <div style={{ ...s.colorDot, backgroundColor: equipoData.colorSecundario }} />
              </div>
            </div>
            <div style={s.jugadoresCount}>
              <span style={s.countNum}>{jugadores.length}</span>
              <span style={s.countLabel}>/ 12 jugadores</span>
            </div>
          </div>

          {/* Plantilla */}
          <div style={s.plantillaCard}>
            <div style={s.plantillaHeader}>
              <div>
                <div style={s.plantillaTitle}><span>👥</span> PLANTILLA DEL EQUIPO</div>
                <p style={s.plantillaSubtitle}>Mínimo 7 jugadores, máximo 12</p>
              </div>
              <button style={s.invitarBtn}>+ INVITAR JUGADOR</button>
            </div>

            <div style={s.searchBar}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Busca jugadores por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={s.searchInput}
              />
            </div>

            <table style={s.table}>
              <thead>
                <tr style={s.tableHeader}>
                  <th style={s.th}>JUGADOR</th>
                  <th style={s.th}>POSICIÓN</th>
                  <th style={s.th}>ESTADO</th>
                  <th style={s.th}>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {jugadores.filter(j => j.nombre.toLowerCase().includes(busqueda.toLowerCase())).map(j => (
                  <tr key={j.id} style={s.tableRow}>
                    <td style={s.td}>
                      <div style={s.jugadorCell}>
                        <div style={{ ...s.jugadorAvatar, backgroundColor: equipoData.colorPrimario + '33' }}>👤</div>
                        <span>{j.nombre}</span>
                      </div>
                    </td>
                    <td style={s.td}><span style={getPosStyle(j.posicion)}>{j.posicion}</span></td>
                    <td style={s.td}><span style={getEstadoStyle(j.estado)}>• {j.estado}</span></td>
                    <td style={s.td}>
                      <button style={s.eliminarBtn} onClick={() => setJugadores(jugadores.filter(x => x.id !== j.id))}>🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
  mainRow: { display: 'flex', gap: '1.25rem', flex: 1 },
  equipoCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e0e8f0', width: '180px', minWidth: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  escudoCircle: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  escudoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  equipoNombre: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a', textAlign: 'center' },
  uniformeSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: '100%' },
  uniformeLabel: { fontSize: '0.65rem', color: '#888', letterSpacing: '0.5px', fontWeight: '600' },
  coloresRow: { display: 'flex', gap: '0.5rem' },
  colorDot: { width: '22px', height: '22px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)' },
  jugadoresCount: { display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginTop: '0.25rem' },
  countNum: { fontSize: '1.5rem', fontWeight: '700', color: '#2d9e6b' },
  countLabel: { fontSize: '0.72rem', color: '#888' },
  plantillaCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e0e8f0', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' },
  plantillaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  plantillaTitle: { fontSize: '0.82rem', fontWeight: '700', color: '#333', display: 'flex', alignItems: 'center', gap: '0.4rem' },
  plantillaSubtitle: { fontSize: '0.72rem', color: '#888', marginTop: '0.2rem' },
  invitarBtn: { backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 0.85rem', backgroundColor: '#fafafa' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%', backgroundColor: 'transparent', color: '#333' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { borderBottom: '1px solid #eee' },
  th: { padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: '#888', textAlign: 'left', fontWeight: '700', letterSpacing: '0.5px' },
  tableRow: { borderBottom: '1px solid #f5f5f5' },
  td: { padding: '0.65rem 0.75rem', fontSize: '0.82rem', color: '#1a1a1a' },
  jugadorCell: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  jugadorAvatar: { width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' },
  eliminarBtn: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.2rem' },
};

export default InvitationsPage;