import { useState } from 'react';
import Layout from '../../components/Layout';

const InvitacionesCapitanPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [busqueda, setBusqueda] = useState('');
  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: 'Carlos Martinez', posicion: 'DELANTERO', estado: 'Confirmado' },
    { id: 2, nombre: 'Andres Rivera', posicion: 'DEFENSA', estado: 'Confirmado' },
    { id: 3, nombre: 'Sebastian Gomez', posicion: 'PORTERO', estado: 'Pendiente' },
  ]);

  const getEstadoStyle = (estado) => {
    if (estado === 'Confirmado') return styles.estadoConfirmado;
    if (estado === 'Pendiente') return styles.estadoPendiente;
    return styles.estadoDefault;
  };

  const getPosicionStyle = (posicion) => {
    if (posicion === 'DELANTERO') return styles.posicionDelantero;
    if (posicion === 'DEFENSA') return styles.posicionDefensa;
    if (posicion === 'PORTERO') return styles.posicionPortero;
    return styles.posicionDefault;
  };

  const handleEliminar = (id) => {
    setJugadores(jugadores.filter((j) => j.id !== id));
  };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={styles.container}>
        <h1 style={styles.title}>INVITA JUGADORES</h1>
        <p style={styles.subtitle}>Gestiona tu plantilla oficial para el torneo.</p>

        <div style={styles.mainRow}>
          {/* Card equipo */}
          <div style={styles.equipoCard}>
            <div style={styles.escudoCircle}>
              <img
                src="/escudo.png"
                alt="Escudo"
                style={styles.escudoImg}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '⚽';
                }}
              />
            </div>
            <p style={styles.equipoNombre}>Galacticos Fc</p>
            <div style={styles.uniformeSection}>
              <p style={styles.uniformeLabel}>COLOR DEL UNIFORME</p>
              <div style={styles.coloresRow}>
                <div style={{ ...styles.colorDot, backgroundColor: '#1a1a1a' }} />
                <div style={{ ...styles.colorDot, backgroundColor: '#1a7a8a' }} />
              </div>
            </div>
          </div>

          {/* Plantilla */}
          <div style={styles.plantillaCard}>
            <div style={styles.plantillaHeader}>
              <div>
                <div style={styles.plantillaTitle}>
                  <span style={styles.plantillaIcon}>👥</span>
                  PLANTILLA DEL EQUIPO
                </div>
                <p style={styles.plantillaSubtitle}>Mínimo 7 jugadores, máximo 12</p>
              </div>
              <button style={styles.invitarBtn}>+ INVITAR JUGADOR</button>
            </div>

            {/* Buscador */}
            <div style={styles.searchBar}>
              <span style={styles.searchIcon}>🔍</span>
              <input
                type="text"
                placeholder="Busca jugadores por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={styles.searchInput}
              />
            </div>

            {/* Tabla */}
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>JUGADOR</th>
                  <th style={styles.th}>POSICIÓN</th>
                  <th style={styles.th}>ESTADO</th>
                  <th style={styles.th}>ACCIÓN</th>
                </tr>
              </thead>
              <tbody>
                {jugadores
                  .filter((j) =>
                    j.nombre.toLowerCase().includes(busqueda.toLowerCase())
                  )
                  .map((j) => (
                    <tr key={j.id} style={styles.tableRow}>
                      <td style={styles.td}>
                        <div style={styles.jugadorCell}>
                          <div style={styles.jugadorAvatar}>👤</div>
                          <span>{j.nombre}</span>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span style={getPosicionStyle(j.posicion)}>
                          {j.posicion}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span style={getEstadoStyle(j.estado)}>
                          • {j.estado}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <button
                          style={styles.eliminarBtn}
                          onClick={() => handleEliminar(j.id)}
                        >
                          🗑
                        </button>
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

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
  },
  title: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#555',
  },
  mainRow: {
    display: 'flex',
    gap: '1.25rem',
    flex: 1,
  },
  equipoCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e0e8f0',
    width: '180px',
    minWidth: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  escudoCircle: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontSize: '2rem',
  },
  escudoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  equipoNombre: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  uniformeSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    width: '100%',
  },
  uniformeLabel: {
    fontSize: '0.65rem',
    color: '#888',
    letterSpacing: '0.5px',
    fontWeight: '600',
  },
  coloresRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  colorDot: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '2px solid rgba(0,0,0,0.1)',
  },
  plantillaCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e0e8f0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  plantillaHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  plantillaTitle: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
  },
  plantillaIcon: {
    fontSize: '0.9rem',
  },
  plantillaSubtitle: {
    fontSize: '0.72rem',
    color: '#888',
    marginTop: '0.2rem',
  },
  invitarBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.5rem 1rem',
    fontSize: '0.78rem',
    fontWeight: '700',
    cursor: 'pointer',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '0.5rem 0.85rem',
    backgroundColor: '#fafafa',
  },
  searchIcon: {
    fontSize: '0.85rem',
    color: '#888',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '0.85rem',
    width: '100%',
    backgroundColor: 'transparent',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '1px solid #eee',
  },
  th: {
    padding: '0.5rem 0.75rem',
    fontSize: '0.72rem',
    color: '#888',
    textAlign: 'left',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  tableRow: {
    borderBottom: '1px solid #f5f5f5',
  },
  td: {
    padding: '0.65rem 0.75rem',
    fontSize: '0.82rem',
    color: '#1a1a1a',
  },
  jugadorCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  jugadorAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#e8f0f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.9rem',
  },
  posicionDelantero: {
    backgroundColor: '#e8f5ee',
    color: '#2d9e6b',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.72rem',
    fontWeight: '600',
  },
  posicionDefensa: {
    backgroundColor: '#e8f0f7',
    color: '#1a7a8a',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.72rem',
    fontWeight: '600',
  },
  posicionPortero: {
    backgroundColor: '#f0e8f7',
    color: '#7a1a8a',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.72rem',
    fontWeight: '600',
  },
  posicionDefault: {
    backgroundColor: '#f5f5f5',
    color: '#555',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.72rem',
  },
  estadoConfirmado: {
    color: '#2d9e6b',
    fontSize: '0.78rem',
    fontWeight: '600',
  },
  estadoPendiente: {
    color: '#f6c90e',
    fontSize: '0.78rem',
    fontWeight: '600',
  },
  estadoDefault: {
    color: '#888',
    fontSize: '0.78rem',
  },
  eliminarBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    padding: '0.2rem',
  },
};

export default InvitacionesCapitanPage;