import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children, userName, userRole, menuType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = menuType === 'capitan' ? [
    { label: 'Inicio', path: '/capitan/dashboard', icon: '⊞' },
    { label: 'Crea tu equipo', path: '/capitan/crear-equipo', icon: '📋' },
    { label: 'Consultar Equipo', path: '/capitan/equipo', icon: '👥' },
    { label: 'Centro de Estadísticas', path: '/estadisticas', icon: '📊' },
    { label: 'Calendario/Partidos', path: '/calendario', icon: '📅' },
    { label: 'Llaves', path: '/llaves', icon: '🏆' },
  ] : menuType === 'organizador' ? [
    { label: 'Inicio', path: '/organizador/dashboard', icon: '⊞' },
    { label: 'Torneo', path: '/organizador/torneos', icon: '📋' },
    { label: 'Centro de Estadísticas', path: '/estadisticas', icon: '📊' },
    { label: 'Calendario/Partidos', path: '/organizador/calendario', icon: '📅' },
    { label: 'Llaves', path: '/llaves', icon: '🏆' },
  ] : [
    { label: 'Inicio', path: '/dashboard', icon: '⊞' },
    { label: 'Inscripciones', path: '/inscripciones', icon: '📋' },
    { label: 'Centro de Estadísticas', path: '/estadisticas', icon: '📊' },
    { label: 'Calendario/Partidos', path: '/calendario', icon: '📅' },
    { label: 'Llaves', path: '/llaves', icon: '🏆' },
  ];

  const bottomItems = menuType === 'capitan' ? [
    { label: 'Soporte', path: '/soporte', icon: '💬' },
    { label: 'Pagos/Comprobantes.', path: '/pagos', icon: '💳' },
    { label: 'Configuración', path: '/configuracion', icon: '⚙' },
  ] : menuType === 'organizador' ? [
    { label: 'Soporte', path: '/soporte', icon: '💬' },
    { label: 'Pagos/Comprobantes.', path: '/organizador/pagos', icon: '💳' },
    { label: 'Configuración', path: '/configuracion', icon: '⚙' },
  ] : [
    { label: 'Soporte', path: '/soporte', icon: '💬' },
    { label: 'Configuración', path: '/configuracion', icon: '⚙' },
  ];

  const logoPath = menuType === 'capitan' ? '/capitan/dashboard'
    : menuType === 'organizador' ? '/organizador/dashboard'
    : '/dashboard';

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

      <div style={styles.page}>
        <div style={styles.sidebar}>
          <div style={styles.logo} onClick={() => navigate(logoPath)}>
            <img src="/logotipo.png" alt="TechCup"
              style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
            <div style={styles.logoTexts}>
              <div style={styles.logoTitle}>TECHCUP</div>
              <div style={styles.logoSub}>TORNEO UNIVERSITARIO</div>
            </div>
          </div>

          <nav style={styles.nav}>
            {menuItems.map((item) => (
              <div key={item.path} className="menu-item"
                style={{ ...styles.menuItem, ...(location.pathname === item.path ? styles.menuItemActive : {}) }}
                onClick={() => navigate(item.path)}>
                <span style={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div style={styles.divider} />

          <nav style={styles.nav}>
            {bottomItems.map((item) => (
              <div key={item.path} className="menu-item"
                style={{ ...styles.menuItem, ...(location.pathname === item.path ? styles.menuItemActive : {}) }}
                onClick={() => navigate(item.path)}>
                <span style={styles.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div style={styles.logoutContainer}>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              <span>→</span> Log out
            </button>
          </div>
        </div>

        <div style={styles.main}>
          <div style={styles.header}>
            <div style={styles.searchBar}>
              <span style={styles.searchIcon}>🔍</span>
              <input type="text" placeholder="Búsqueda" style={styles.searchInput} />
            </div>
            <div style={styles.headerRight}>
              <span style={styles.bell}>🔔</span>
              <div style={styles.userInfo}>
                <div>
                  <div style={styles.userName}>{userName || 'Usuario'}</div>
                  <div style={styles.userRole}>{userRole || 'Jugador'}</div>
                </div>
                <div style={styles.avatar}>
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    display: 'flex', height: '100vh', width: '100vw',
    overflow: 'hidden', fontFamily: 'Inter, sans-serif', backgroundColor: '#e8f0f7',
  },
  sidebar: {
    width: '200px', minWidth: '200px',
    background: 'linear-gradient(180deg, #1a7a8a 0%, #2d9e6b 100%)',
    display: 'flex', flexDirection: 'column',
    padding: '1.25rem 0 1rem', height: '100vh', overflow: 'hidden',
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    padding: '0 1rem 1rem', cursor: 'pointer',
    borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '0.75rem',
  },
  logoTexts: { display: 'flex', flexDirection: 'column' },
  logoTitle: { color: '#ffffff', fontSize: '0.9rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px', lineHeight: '1.2' },
  logoSub: { color: 'rgba(255,255,255,0.75)', fontSize: '0.5rem', letterSpacing: '1px', lineHeight: '1.2' },
  nav: { display: 'flex', flexDirection: 'column', gap: '0.15rem', padding: '0 0.6rem' },
  menuItem: {
    display: 'flex', alignItems: 'center', gap: '0.6rem',
    padding: '0.55rem 0.85rem', borderRadius: '8px', cursor: 'pointer',
    color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  menuItemActive: { backgroundColor: 'rgba(255,255,255,0.25)', color: '#ffffff', fontWeight: '600' },
  menuIcon: { fontSize: '0.9rem', minWidth: '18px', flexShrink: 0 },
  divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1rem 1.25rem' },
  logoutContainer: { marginTop: 'auto', padding: '0 1.25rem 0.5rem' },
  logoutBtn: {
    width: '100%', padding: '0.7rem',
    backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff',
    border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px',
    cursor: 'pointer', fontSize: '0.85rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0.85rem 2rem', backgroundColor: '#e8f0f7', borderBottom: '1px solid #d0dce8',
  },
  searchBar: {
    display: 'flex', alignItems: 'center', backgroundColor: '#ffffff',
    borderRadius: '20px', padding: '0.5rem 1.25rem', gap: '0.5rem',
    width: '340px', border: '1px solid #ddd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  searchIcon: { fontSize: '0.9rem', color: '#888' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.88rem', width: '100%', backgroundColor: 'transparent', color: '#333' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  bell: { fontSize: '1.3rem', cursor: 'pointer' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.85rem' },
  userName: { fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', textAlign: 'right' },
  userRole: { fontSize: '0.78rem', color: '#666', textAlign: 'right' },
  avatar: {
    width: '42px', height: '42px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem',
  },
  content: { flex: 1, overflow: 'auto', padding: '1.5rem 2rem' },
};

export default Layout;