import { useState } from 'react';
import Layout from '../components/Layout';

const InscripcionesPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const equipos = [
    { id: 1, nombre: 'DOSW FC', jugadores: 10, victorias: 3, estado: 'Solicitud enviada' },
    { id: 2, nombre: 'MBO', jugadores: 7, victorias: 1, estado: 'Disponible' },
    { id: 3, nombre: 'Los legendarios', jugadores: 11, victorias: 2, estado: 'Solicitud enviada' },
  ];

  const [busqueda, setBusqueda] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);

  const equiposFiltrados = equipos.filter(e =>
    e.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <Layout userName={user.name} userRole={user.role}>
      <div style={s.titleRow}>
        <div>
          <h1 style={s.pageTitle}>INSCRIPCION</h1>
          <p style={s.sub}>Completa el formulario de inscripcion para competir la proxima temporada.</p>
        </div>
      </div>

      <div style={s.card}>
        <div style={s.cardHeader}>
          <span>👥</span>
          <span style={s.cardTitle}>Equipos disponibles</span>
        </div>
        <p style={s.cardSub}>Escoge el equipo que desees</p>

        <div style={s.searchRow}>
          <div style={s.searchBar}>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>🔍</span>
            <input
              type="text"
              placeholder="Buscar equipos"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={s.searchInput}
            />
          </div>
          <button style={s.filterBtn}>Posición ▾</button>
        </div>

        <div style={s.lista}>
          {equiposFiltrados.map(eq => (
            <div
              key={eq.id}
              style={{ ...s.equipoRow, ...(seleccionado === eq.id ? s.equipoRowSelected : {}) }}
              onClick={() => setSeleccionado(eq.id)}
            >
              <div style={s.equipoIcon}>👥</div>
              <div style={s.equipoInfo}>
                <div style={s.equipoNombre}>{eq.nombre}</div>
                <div style={s.equipoMeta}>{eq.jugadores} jugadores • {eq.victorias} victorias</div>
              </div>
              <span style={{
                ...s.badge,
                backgroundColor: eq.estado === 'Disponible' ? '#e8f5ee' : '#fff9e6',
                color: eq.estado === 'Disponible' ? '#2d9e6b' : '#b8860b',
                border: `1px solid ${eq.estado === 'Disponible' ? '#b7e4cc' : '#f0d080'}`,
              }}>
                {eq.estado}
              </span>
              <span style={s.trash}>🗑</span>
            </div>
          ))}
        </div>

        <button
          style={{
            ...s.solicitarBtn,
            opacity: seleccionado ? 1 : 0.6,
            cursor: seleccionado ? 'pointer' : 'not-allowed',
          }}
          disabled={!seleccionado}
        >
          👥 Solicitar union a equipo
        </button>
      </div>
    </Layout>
  );
};

const s = {
  titleRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: '1.25rem'
  },
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  sub: { fontSize: '0.78rem', color: '#666', marginTop: '0.25rem', maxWidth: '340px' },
  userCard: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  ucName: { fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', textAlign: 'right' },
  ucRole: { fontSize: '0.75rem', color: '#888', textAlign: 'right' },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.1rem' },
  card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '1px solid #e0e8f0',
      width: '100%' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' },
  cardTitle: { fontSize: '0.95rem', fontWeight: '700', color: '#1a1a1a' },
  cardSub: { fontSize: '0.75rem', color: '#888', marginBottom: '1rem' },
  searchRow: { display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 0.85rem', backgroundColor: '#fff' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%', backgroundColor: 'transparent' },
  filterBtn: { padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', fontSize: '0.82rem', cursor: 'pointer', color: '#444', whiteSpace: 'nowrap' },
  lista: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' },
  equipoRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #f0f0f0', cursor: 'pointer', backgroundColor: '#fafafa' },
  equipoRowSelected: { border: '1.5px solid #2d9e6b', backgroundColor: '#f0faf5' },
  equipoIcon: { fontSize: '1.2rem', minWidth: '28px' },
  equipoInfo: { flex: 1 },
  equipoNombre: { fontSize: '0.88rem', fontWeight: '600', color: '#1a1a1a' },
  equipoMeta: { fontSize: '0.72rem', color: '#999', marginTop: '0.1rem' },
  badge: { fontSize: '0.72rem', fontWeight: '600', padding: '0.25rem 0.65rem', borderRadius: '12px', whiteSpace: 'nowrap' },
  trash: { fontSize: '1rem', cursor: 'pointer', color: '#bbb', marginLeft: '0.25rem' },
  solicitarBtn: { width: '100%', padding: '0.85rem', backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600' },
};

export default InscripcionesPage;