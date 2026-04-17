import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const ConsultTeamPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');
  const [posicionFiltro, setPosicionFiltro] = useState('Todos');
  const [showFiltro, setShowFiltro] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);

  const jugadores = [
    { nombre: 'Bautista',  posicion: 'Portero',   numero: 1,  edad: 24, goles: 0,  partidos: 7 },
    { nombre: 'La Rocka',  posicion: 'Defensa',   numero: 4,  edad: 26, goles: 1,  partidos: 6 },
    { nombre: "Di'Caprio", posicion: 'Defensa',   numero: 5,  edad: 25, goles: 0,  partidos: 7 },
    { nombre: 'Al Pacino', posicion: 'Medio',     numero: 8,  edad: 27, goles: 3,  partidos: 7 },
    { nombre: 'Disel',     posicion: 'Medio',     numero: 7,  edad: 23, goles: 2,  partidos: 5 },
    { nombre: 'Dextarino', posicion: 'Delantero', numero: 9,  edad: 22, goles: 8,  partidos: 7 },
    { nombre: 'Pitbull',   posicion: 'Delantero', numero: 10, edad: 21, goles: 5,  partidos: 6 },
  ];

  const posiciones = ['Todos', 'Portero', 'Defensa', 'Medio', 'Delantero'];

  const filtrados = jugadores.filter((j) => {
    const matchNombre = j.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const matchPos = posicionFiltro === 'Todos' || j.posicion === posicionFiltro;
    return matchNombre && matchPos;
  });

  const POS_COLOR = { Portero: '#f6c90e', Defensa: '#3b82f6', Medio: '#2d9e6b', Delantero: '#e53e3e' };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>
        <h1 style={s.title}>EQUIPO LOS PELICULEROS</h1>

        <div style={s.card}>
          <div style={s.cardHeader}>
            <h3 style={s.cardTitle}>Equipo rival</h3>
            <span style={s.contador}>Jugadores: <strong>{jugadores.length}/10</strong></span>
          </div>

          {/* Buscador */}
          <div style={s.searchRow}>
            <div style={s.searchBar}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Buscar jugadores"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={s.searchInput}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <button style={s.posicionBtn} onClick={() => setShowFiltro(v => !v)}>
                {posicionFiltro} ▾
              </button>
              {showFiltro && (
                <div style={s.dropdown}>
                  {posiciones.map(p => (
                    <div
                      key={p}
                      style={{ ...s.dropItem, ...(posicionFiltro === p ? s.dropItemActive : {}) }}
                      onClick={() => { setPosicionFiltro(p); setShowFiltro(false); }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid jugadores */}
          <div style={s.jugadoresGrid}>
            {filtrados.map((j, i) => (
              <div
                key={i}
                style={s.jugadorCard}
                onClick={() => setJugadorSeleccionado(j)}
                title="Ver perfil"
              >
                <div style={s.jugadorAvatar}>👤</div>
                <div style={s.jugadorNombre}>{j.nombre}</div>
                <div style={{ ...s.jugadorPosicion, color: POS_COLOR[j.posicion] || '#888' }}>
                  {j.posicion}
                </div>
                <div style={s.numero}>#{j.numero}</div>
              </div>
            ))}
          </div>

          <div style={s.btnRow}>
            <button
              style={s.alineacionBtn}
              onClick={() => navigate('/capitan/ver-alineacion')}
            >
              👁 Ver alineación
            </button>
          </div>
        </div>
      </div>

      {/* Modal perfil jugador */}
      {jugadorSeleccionado && (
        <div style={s.overlay} onClick={() => setJugadorSeleccionado(null)}>
          <div style={s.perfilModal} onClick={e => e.stopPropagation()}>
            <button style={s.cerrarBtn} onClick={() => setJugadorSeleccionado(null)}>✕</button>
            <div style={s.perfilAvatar}>👤</div>
            <div style={s.perfilNombre}>{jugadorSeleccionado.nombre}</div>
            <div style={{ ...s.perfilBadge, backgroundColor: POS_COLOR[jugadorSeleccionado.posicion] + '22', color: POS_COLOR[jugadorSeleccionado.posicion] }}>
              {jugadorSeleccionado.posicion}
            </div>
            <div style={s.perfilStats}>
              <div style={s.statBox}>
                <div style={s.statVal}>#{jugadorSeleccionado.numero}</div>
                <div style={s.statLabel}>Número</div>
              </div>
              <div style={s.statBox}>
                <div style={s.statVal}>{jugadorSeleccionado.edad}</div>
                <div style={s.statLabel}>Edad</div>
              </div>
              <div style={s.statBox}>
                <div style={s.statVal}>{jugadorSeleccionado.partidos}</div>
                <div style={s.statLabel}>Partidos</div>
              </div>
              <div style={s.statBox}>
                <div style={s.statVal}>{jugadorSeleccionado.goles}</div>
                <div style={s.statLabel}>Goles</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '1rem' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a' },
  contador: { fontSize: '0.78rem', color: '#888' },
  searchRow: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
  searchBar: { flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 0.85rem', backgroundColor: '#fafafa' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%', backgroundColor: 'transparent' },
  posicionBtn: { padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', color: '#333' },
  dropdown: { position: 'absolute', top: '110%', right: 0, backgroundColor: '#fff', border: '1px solid #e0e8f0', borderRadius: '8px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', zIndex: 100, minWidth: '130px', overflow: 'hidden' },
  dropItem: { padding: '0.55rem 1rem', fontSize: '0.82rem', color: '#444', cursor: 'pointer' },
  dropItemActive: { backgroundColor: '#e8f5ee', color: '#2d9e6b', fontWeight: '600' },
  jugadoresGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  jugadorCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', padding: '0.85rem', backgroundColor: '#fafafa', borderRadius: '10px', border: '1px solid #eee', cursor: 'pointer', transition: 'border 0.15s' },
  jugadorAvatar: { width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#e8f0f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' },
  jugadorNombre: { fontSize: '0.82rem', fontWeight: '600', color: '#1a1a1a', textAlign: 'center' },
  jugadorPosicion: { fontSize: '0.7rem', fontWeight: '600' },
  numero: { fontSize: '0.68rem', color: '#aaa' },
  btnRow: { display: 'flex', justifyContent: 'flex-start' },
  alineacionBtn: { backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.5rem', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' },
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  perfilModal: { backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', width: '320px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative' },
  cerrarBtn: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  perfilAvatar: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e8f0f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 0.75rem' },
  perfilNombre: { fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.4rem' },
  perfilBadge: { display: 'inline-block', padding: '0.2rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '1.25rem' },
  perfilStats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  statBox: { backgroundColor: '#fafafa', borderRadius: '8px', padding: '0.75rem', border: '1px solid #eee' },
  statVal: { fontSize: '1.3rem', fontWeight: '700', color: '#1a1a1a' },
  statLabel: { fontSize: '0.68rem', color: '#888', marginTop: '0.2rem' },
};

export default ConsultTeamPage;