import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const ConsultarEquipoPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const jugadores = [
    { nombre: 'Dextarino', posicion: 'Delantero' },
    { nombre: 'La Rocka', posicion: 'Defensa' },
    { nombre: 'Al Pacino', posicion: 'Medio' },
    { nombre: 'Pitbull', posicion: 'Delantero' },
    { nombre: 'Jakie', posicion: 'Medio' },
    { nombre: 'Bautista', posicion: 'Portero' },
    { nombre: "Di'Caprio", posicion: 'Defensa' },
    { nombre: 'Kevin', posicion: 'Defensa' },
    { nombre: 'Doakes', posicion: 'Defensa' },
    { nombre: 'Josh', posicion: 'Delantero' },
    { nombre: 'Disel', posicion: 'Medio' },
    { nombre: 'Eminem', posicion: 'Medio' },
  ];

  const filtrados = jugadores.filter((j) =>
    j.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={styles.container}>
        <h1 style={styles.title}>EQUIPO LOS PELICULEROS</h1>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}>Equipo</h3>
            <span style={styles.contador}>
              Contador de jugadores: <strong>{jugadores.length}/18</strong>
            </span>
          </div>

          {/* Buscador */}
          <div style={styles.searchRow}>
            <div style={styles.searchBar}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Buscar jugadores"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <button style={styles.posicionBtn}>Posición ▾</button>
          </div>

          {/* Grid jugadores */}
          <div style={styles.jugadoresGrid}>
            {filtrados.map((j, i) => (
              <div key={i} style={styles.jugadorCard}>
                <div style={styles.jugadorAvatar}>👤</div>
                <div style={styles.jugadorNombre}>{j.nombre}</div>
                <div style={styles.jugadorPosicion}>{j.posicion}</div>
              </div>
            ))}
          </div>

          {/* Botón */}
          <div style={styles.btnRow}>
            <button
              style={styles.alineacionBtn}
              onClick={() => navigate('/capitan/alineacion')}
            >
              Ver alineación
            </button>
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e0e8f0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  contador: {
    fontSize: '0.78rem',
    color: '#888',
  },
  searchRow: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '0.5rem 0.85rem',
    backgroundColor: '#fafafa',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    fontSize: '0.85rem',
    width: '100%',
    backgroundColor: 'transparent',
  },
  posicionBtn: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.82rem',
    color: '#333',
  },
  jugadoresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
    flex: 1,
  },
  jugadorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.85rem',
    backgroundColor: '#fafafa',
    borderRadius: '10px',
    border: '1px solid #eee',
  },
  jugadorAvatar: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#e8f0f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
  },
  jugadorNombre: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  jugadorPosicion: {
    fontSize: '0.72rem',
    color: '#888',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  alineacionBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.7rem 1.5rem',
    fontSize: '0.88rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default ConsultarEquipoPage;
