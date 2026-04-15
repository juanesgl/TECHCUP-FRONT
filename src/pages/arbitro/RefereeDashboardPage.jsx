import { useNavigate, useLocation } from 'react-router-dom';

const ArbitroLayout = ({ children, userName, userRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Inicio', path: '/arbitro/dashboard', icon: '⊞' },
    { label: 'Centro de Estadísticas', path: '/estadisticas', icon: '📊' },
    { label: 'Calendario/Partidos', path: '/calendario', icon: '📅' },
    { label: 'Llaves', path: '/llaves', icon: '🏆' },
  ];

  const bottomItems = [
    { label: 'Soporte', path: '/soporte', icon: '💬' },
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
          <div style={ls.logo} onClick={() => navigate('/arbitro/dashboard')}>
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
                  <div style={ls.userRole}>{userRole || 'Árbitro'}</div>
                </div>
                <div style={ls.avatar}>
                  {userName ? userName.charAt(0).toUpperCase() : 'A'}
                </div>
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
  page: { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'Inter, sans-serif', backgroundColor: '#e8f0f7' },
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
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 2rem', backgroundColor: '#e8f0f7', borderBottom: '1px solid #d0dce8' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '20px', padding: '0.5rem 1.25rem', gap: '0.5rem', width: '340px', border: '1px solid #ddd' },
  searchIcon: { fontSize: '0.9rem', color: '#888' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.88rem', width: '100%', backgroundColor: 'transparent' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  bell: { fontSize: '1.3rem', cursor: 'pointer' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.85rem' },
  userName: { fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', textAlign: 'right' },
  userRole: { fontSize: '0.78rem', color: '#666', textAlign: 'right' },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem' },
  content: { flex: 1, overflow: 'auto', padding: '1.5rem 2rem', backgroundColor: '#e8f0f7' },
};

const ArbitroDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const kpis = [
    { label: 'Partidos Arbitrados', value: '12' },
    { label: 'Tarjetas Amarillas', value: '4' },
    { label: 'Tarjetas Rojas', value: '1' },
  ];

  const partidos = [
    { fecha: 'MAR 12', equipo1: 'DOSW FC', equipo2: 'MBDA', hora: '2:30', lugar: 'Coliseo', torneo: 'TECHCUP VS' },
    { fecha: 'MAR 15', equipo1: 'WD-40', equipo2: 'REDES', hora: '10:00', lugar: 'Cancha Infantil', torneo: 'TECHCUP VS' },
  ];

  const reportes = [
    { partido: 'WD-40 vs DOSW FC', fecha: 'Feb 20, 2026 • 5-1 Final', estado: 'Registrado' },
    { partido: 'MBDA vs WD-40', fecha: 'Feb 26, 2026 • 1-0 Final', estado: 'Registrado' },
  ];

  return (
    <ArbitroLayout userName={user.name} userRole="Árbitro">
      {/* Perfil */}
      <div style={s.perfilCard}>
        <div style={s.perfilAvatar}>
          {user.name ? user.name.charAt(0).toUpperCase() : 'J'}
        </div>
        <div style={s.perfilInfo}>
          <div style={s.perfilNombre}>{user.name || 'Javier Rodriguez'}</div>
          <div style={s.perfilRol}>Árbitro</div>
        </div>
        <button style={s.disponibilidadBtn}>Actualizar Disponibilidad</button>
      </div>

      {/* KPIs */}
      <div style={s.kpiRow}>
        {kpis.map((k, i) => (
          <div key={i} style={s.kpiCard}>
            <div style={s.kpiLabel}>{k.label}</div>
            <div style={s.kpiValue}>{k.value}</div>
          </div>
        ))}
      </div>

      {/* Próximos partidos */}
      <div style={s.card}>
        <div style={s.cardTitle}>Próximos partidos</div>
        <div style={s.partidosList}>
          {partidos.map((p, i) => (
            <div key={i} style={s.partidoRow}>
              <div style={s.partidoFecha}>{p.fecha}</div>
              <div style={s.partidoEquipo}>{p.equipo1}</div>
              <div style={s.partidoVs}>
                <div style={s.torneoLabel}>{p.torneo}</div>
                <div style={s.vsText}>VS</div>
              </div>
              <div style={s.partidoEquipo}>{p.equipo2}</div>
              <div style={s.partidoInfo}>
                <div style={s.partidoHora}>⏱ {p.hora}</div>
                <div style={s.partidoLugar}>{p.lugar}</div>
              </div>
              <button style={s.detallesBtn}>Detalles</button>
            </div>
          ))}
        </div>
      </div>

      {/* Reportes */}
      <div style={s.card}>
        <div style={s.cardTitle}>📋 Reportes partidos</div>
        {reportes.map((r, i) => (
          <div key={i} style={s.reporteRow}>
            <div style={s.reporteInfo}>
              <div style={s.reportePartido}>{r.partido}</div>
              <div style={s.reporteFecha}>{r.fecha}</div>
            </div>
            <span style={s.registradoBadge}>{r.estado}</span>
          </div>
        ))}
        <div style={s.viewAll}>View All Reports</div>
      </div>
    </ArbitroLayout>
  );
};

const s = {
  perfilCard: { display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#ffffff', borderRadius: '12px', padding: '1rem 1.5rem', marginBottom: '1rem', border: '1px solid #e0e8f0' },
  perfilAvatar: { width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.4rem', minWidth: '56px' },
  perfilInfo: { flex: 1 },
  perfilNombre: { fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a' },
  perfilRol: { fontSize: '0.8rem', color: '#888' },
  disponibilidadBtn: { padding: '0.55rem 1rem', backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
  kpiRow: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  kpiCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e0e8f0' },
  kpiLabel: { fontSize: '0.7rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' },
  kpiValue: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '1rem', border: '1px solid #e0e8f0' },
  cardTitle: { fontSize: '0.92rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem' },
  partidosList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  partidoRow: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', borderRadius: '8px', backgroundColor: '#f8fafb', border: '1px solid #f0f0f0' },
  partidoFecha: { fontSize: '0.75rem', fontWeight: '700', color: '#1a7a8a', minWidth: '45px', textAlign: 'center' },
  partidoEquipo: { fontSize: '0.88rem', fontWeight: '600', color: '#1a1a1a', minWidth: '80px' },
  partidoVs: { display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '70px' },
  torneoLabel: { fontSize: '0.6rem', color: '#999', textTransform: 'uppercase' },
  vsText: { fontSize: '0.75rem', fontWeight: '700', color: '#888' },
  partidoInfo: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  partidoHora: { fontSize: '0.78rem', color: '#555' },
  partidoLugar: { fontSize: '0.72rem', color: '#999' },
  detallesBtn: { padding: '0.4rem 0.85rem', border: '1px solid #2d9e6b', borderRadius: '6px', backgroundColor: '#ffffff', color: '#2d9e6b', fontSize: '0.78rem', fontWeight: '600', cursor: 'pointer' },
  reporteRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid #f5f5f5' },
  reporteInfo: { flex: 1 },
  reportePartido: { fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a' },
  reporteFecha: { fontSize: '0.72rem', color: '#999', marginTop: '0.1rem' },
  registradoBadge: { fontSize: '0.72rem', fontWeight: '600', color: '#2d9e6b', backgroundColor: '#e8f5ee', padding: '0.2rem 0.65rem', borderRadius: '10px', border: '1px solid #b7e4cc' },
  viewAll: { fontSize: '0.78rem', color: '#2d9e6b', textAlign: 'center', cursor: 'pointer', marginTop: '0.75rem', fontWeight: '600' },
};

export default ArbitroDashboardPage;