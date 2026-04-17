import { useNavigate, useLocation } from 'react-router-dom';

const OrganizadorLayout = ({ children, userName, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Inicio', path: '/organizador/dashboard', icon: '⊞' },
    { label: 'Torneo', path: '/organizador/torneos', icon: '📋' },
    { label: 'Centro de Estadísticas', path: '/estadisticas', icon: '📊' },
    { label: 'Calendario/Partidos', path: '/organizador/calendario', icon: '📅' },
    { label: 'Llaves', path: '/llaves', icon: '🏆' },
  ];

  const bottomItems = [
    { label: 'Soporte', path: '/soporte', icon: '💬' },
    { label: 'Pagos/Comprobantes.', path: '/organizador/pagos', icon: '💳' },
    { label: 'Configuración', path: '/configuracion', icon: '⚙' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { height: 100%; overflow: hidden; }
        .menu-item:hover { background-color: rgba(255,255,255,0.15) !important; }
      `}</style>
      <div style={ls.page}>
        <div style={ls.sidebar}>
          <div style={ls.logo} onClick={() => navigate('/organizador/dashboard')}>
            <img src="/logotipo.png" alt="TechCup" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
            <div style={ls.logoTexts}>
              <div style={ls.logoTitle}>TECHCUP</div>
              <div style={ls.logoSub}>TORNEO UNIVERSITARIO</div>
            </div>
          </div>
          <nav style={ls.nav}>
            {menuItems.map((item) => (
              <div key={item.path} className="menu-item"
                style={{ ...ls.menuItem, ...(location.pathname === item.path ? ls.menuItemActive : {}) }}
                onClick={() => navigate(item.path)}>
                <span style={ls.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          <div style={ls.divider} />
          <nav style={ls.nav}>
            {bottomItems.map((item) => (
              <div key={item.path} className="menu-item"
                style={{ ...ls.menuItem, ...(location.pathname === item.path ? ls.menuItemActive : {}) }}
                onClick={() => navigate(item.path)}>
                <span style={ls.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          <div style={ls.logoutContainer}>
            <button style={ls.logoutBtn} onClick={handleLogout}><span>→</span> Log out</button>
          </div>
        </div>
        <div style={ls.main}>
          <div style={ls.header}>
            <div style={ls.searchBar}>
              <span style={ls.searchIcon}>🔍</span>
              <input type="text" placeholder="Búsqueda" style={ls.searchInput} />
            </div>
            <div style={ls.headerRight}>
              <span style={ls.bell}>🔔</span>
              <div style={ls.userInfo}>
                <div>
                  <div style={ls.userName}>{userName || 'Usuario'}</div>
                  <div style={ls.userRole}>{userRole || 'Organizador'}</div>
                </div>
                <div style={ls.avatar}>{userName ? userName.charAt(0).toUpperCase() : 'O'}</div>
              </div>
            </div>
          </div>
          <div style={ls.content}>{children}</div>
        </div>
      </div>
    </>
  );
};

const ls = {
  page: { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'Inter, sans-serif', backgroundColor: '#0f1117' },
  sidebar: { width: '200px', minWidth: '200px', background: 'linear-gradient(180deg, #1a7a8a 0%, #2d9e6b 100%)', display: 'flex', flexDirection: 'column', padding: '1.25rem 0 1rem', height: '100vh', overflow: 'hidden' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 1rem 1rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '0.75rem' },
  logoTexts: { display: 'flex', flexDirection: 'column' },
  logoTitle: { color: '#ffffff', fontSize: '0.9rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px', lineHeight: '1.2' },
  logoSub: { color: 'rgba(255,255,255,0.75)', fontSize: '0.5rem', letterSpacing: '1px', lineHeight: '1.2' },
  nav: { display: 'flex', flexDirection: 'column', gap: '0.15rem', padding: '0 0.6rem' },
  menuItem: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.85rem', borderRadius: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' },
  menuItemActive: { backgroundColor: 'rgba(255,255,255,0.25)', color: '#ffffff', fontWeight: '600' },
  menuIcon: { fontSize: '0.9rem', minWidth: '18px' },
  divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1rem 1.25rem' },
  logoutContainer: { marginTop: 'auto', padding: '0 1.25rem 0.5rem' },
  logoutBtn: { width: '100%', padding: '0.7rem', backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 2rem', backgroundColor: '#1a1d27', borderBottom: '1px solid #2a2d3a' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#2a2d3a', borderRadius: '20px', padding: '0.5rem 1.25rem', gap: '0.5rem', width: '340px', border: '1px solid #3a3d4a' },
  searchIcon: { fontSize: '0.9rem', color: '#888' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.88rem', width: '100%', backgroundColor: 'transparent', color: '#ccc' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  bell: { fontSize: '1.3rem', cursor: 'pointer' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.85rem' },
  userName: { fontSize: '0.95rem', fontWeight: '600', color: '#ffffff', textAlign: 'right' },
  userRole: { fontSize: '0.78rem', color: '#aaa', textAlign: 'right' },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem' },
  content: { flex: 1, overflow: 'auto', padding: '1.5rem 2rem', backgroundColor: '#0f1117' },
};

const ConsultTournamentPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const fechas = [
    { label: 'CIERRE INSCRIPCIONES', valor: '25 Abr 2026' },
    { label: 'INICIO FASE GRUPOS', valor: '02 May 2026' },
    { label: 'CUARTOS DE FINAL', valor: '21 Jun 2026' },
    { label: 'SEMIFINAL', valor: '05 Jul 2026' },
    { label: 'FINAL', valor: '19 Jul 2026' },
  ];

  const sanciones = [
    { color: '#f5c542', texto: '2 Amarillas = 1 partido de suspensión' },
    { color: '#e05c5c', texto: 'Roja Directa = 2 partidos de suspensión' },
  ];

  const estadisticas = [
    { label: 'TOTAL GOLES', valor: '87' },
    { label: 'AMARILLAS', valor: '34' },
    { label: 'ROJAS', valor: '4' },
    { label: 'FAIR PLAY', valor: '92%' },
  ];

  return (
    <OrganizadorLayout userName={user.name} userRole="Organizador">
      {/* Título */}
      <div style={s.titleBlock}>
        <h1 style={s.pageTitle}>TEMPORADA 2026 - I</h1>
        <h1 style={s.pageTitle}>SEMESTRE</h1>
        <p style={s.sub}>Gestiona todos los aspectos de la competición activa desde este panel.</p>
      </div>

      {/* Grid principal */}
      <div style={s.grid}>
        {/* Fechas importantes */}
        <div style={s.card}>
          <div style={s.cardTitle}>⏰ Fechas importantes</div>
          <div style={s.fechasList}>
            {fechas.map((f, i) => (
              <div key={i} style={s.fechaRow}>
                <div style={s.fechaLabel}>{f.label}</div>
                <div style={s.fechaValor}>{f.valor}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Horarios y canchas */}
        <div style={s.card}>
          <div style={s.cardTitle}>🏟 Horarios y canchas</div>
          <div style={s.horariosGrid}>
            <div style={s.horarioRow}>
              <span style={s.horarioLabel}>Días de juego</span>
              <span style={s.horarioValor}>Miérc. y Viernes</span>
            </div>
            <div style={s.horarioRow}>
              <span style={s.horarioLabel}>Horario</span>
              <span style={s.horarioValor}>12:00 - 16:00</span>
            </div>
          </div>
          <div style={s.canchaCard}>
            <div style={s.canchaLabel}>● CANCHA A</div>
            <div style={s.canchaValor}>Bloque F - Principal</div>
          </div>
          <div style={s.canchaCard}>
            <div style={s.canchaLabel}>● CANCHA B</div>
            <div style={s.canchaValor}>Bloque F - Auxiliar</div>
          </div>
          <div style={s.horarioRow}>
            <span style={s.horarioLabel}>Jugadores / equipo</span>
            <span style={s.horarioValor}>7</span>
          </div>
        </div>

        {/* Sanciones */}
        <div style={s.card}>
          <div style={s.cardTitle}>⚠ Sanciones</div>
          <div style={s.sancionesList}>
            {sanciones.map((san, i) => (
              <div key={i} style={s.sancionRow}>
                <div style={{ ...s.sancionDot, backgroundColor: san.color }} />
                <span style={s.sancionTexto}>{san.texto}</span>
              </div>
            ))}
            <div style={s.sancionAlerta}>
              2 Rojas acumuladas = Eliminación del torneo
            </div>
            <div style={s.sancionInfo}>
              <div style={s.sancionInfoLabel}>INCOMPARECENCIA (W.O.)</div>
              <div style={s.sancionInfoValor}>Derrota automática 3-0</div>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div style={s.card}>
          <div style={s.cardTitle}>📊 Estadísticas</div>
          <div style={s.statsGrid}>
            {estadisticas.map((e, i) => (
              <div key={i} style={s.statCard}>
                <div style={s.statLabel}>{e.label}</div>
                <div style={s.statValor}>{e.valor}</div>
              </div>
            ))}
          </div>
          <div style={s.maxGoleador}>
            <div style={s.goleadorAvatar}>JR</div>
            <div style={s.goleadorInfo}>
              <div style={s.goleadorNombre}>J. Ramírez</div>
              <div style={s.goleadorSub}>12 Goles Marcados</div>
            </div>
          </div>
        </div>
      </div>
    </OrganizadorLayout>
  );
};

const s = {
  titleBlock: { marginBottom: '1.25rem' },
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#ffffff', letterSpacing: '2px', lineHeight: '1.1' },
  sub: { fontSize: '0.78rem', color: '#888', marginTop: '0.4rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  card: { backgroundColor: '#1a1d27', borderRadius: '12px', padding: '1.25rem', border: '1px solid #2a2d3a' },
  cardTitle: { fontSize: '0.88rem', fontWeight: '700', color: '#ffffff', marginBottom: '1rem' },
  fechasList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  fechaRow: { display: 'flex', flexDirection: 'column', gap: '0.1rem' },
  fechaLabel: { fontSize: '0.65rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  fechaValor: { fontSize: '0.9rem', fontWeight: '600', color: '#ffffff' },
  horariosGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' },
  horarioRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  horarioLabel: { fontSize: '0.78rem', color: '#888' },
  horarioValor: { fontSize: '0.82rem', fontWeight: '600', color: '#ffffff' },
  canchaCard: { backgroundColor: '#0f1117', borderRadius: '8px', padding: '0.6rem 0.85rem', marginBottom: '0.5rem' },
  canchaLabel: { fontSize: '0.65rem', color: '#2d9e6b', fontWeight: '700', marginBottom: '0.2rem' },
  canchaValor: { fontSize: '0.82rem', color: '#ccc' },
  sancionesList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  sancionRow: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  sancionDot: { width: '12px', height: '12px', borderRadius: '2px', minWidth: '12px' },
  sancionTexto: { fontSize: '0.82rem', color: '#ccc' },
  sancionAlerta: { backgroundColor: '#3a1a1a', border: '1px solid #e05c5c44', borderRadius: '6px', padding: '0.5rem 0.75rem', fontSize: '0.78rem', color: '#e05c5c', fontWeight: '600' },
  sancionInfo: { backgroundColor: '#0f1117', borderRadius: '6px', padding: '0.5rem 0.75rem' },
  sancionInfoLabel: { fontSize: '0.62rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' },
  sancionInfoValor: { fontSize: '0.82rem', color: '#ccc', marginTop: '0.2rem' },
  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' },
  statCard: { backgroundColor: '#0f1117', borderRadius: '8px', padding: '0.75rem' },
  statLabel: { fontSize: '0.62rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' },
  statValor: { fontSize: '1.4rem', fontWeight: '700', color: '#ffffff' },
  maxGoleador: { display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#e8f5ee', borderRadius: '8px', padding: '0.65rem 0.85rem' },
  goleadorAvatar: { width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2d9e6b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: '700', minWidth: '32px' },
  goleadorInfo: {},
  goleadorNombre: { fontSize: '0.82rem', fontWeight: '700', color: '#1a1a1a' },
  goleadorSub: { fontSize: '0.7rem', color: '#666' },
};

export default ConsultTournamentPage;