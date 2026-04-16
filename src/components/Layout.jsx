import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SEARCH_INDEX = [
  { label: 'Mi alineación',        desc: 'Arma y gestiona tu formación',       path: '/capitan/alineacion',         role: 'capitan'     },
  { label: 'Crear equipo',         desc: 'Registra y configura tu equipo',      path: '/capitan/crear-equipo',       role: 'capitan'     },
  { label: 'Consultar equipo',     desc: 'Ver jugadores del equipo rival',      path: '/capitan/equipo',             role: 'capitan'     },
  { label: 'Invitaciones',         desc: 'Gestiona invitaciones al equipo',     path: '/capitan/invitaciones',       role: 'capitan'     },
  { label: 'Pagos',                desc: 'Comprobantes y pagos de inscripción', path: '/pagos',                      role: 'capitan'     },
  { label: 'Torneos',              desc: 'Gestiona los torneos activos',        path: '/organizador/torneos',        role: 'organizador' },
  { label: 'Crear torneo',         desc: 'Configura un nuevo torneo',           path: '/organizador/crear-torneo',   role: 'organizador' },
  { label: 'Calendario',           desc: 'Calendario de partidos organizador',  path: '/organizador/calendario',     role: 'organizador' },
  { label: 'Pagos organizador',    desc: 'Pagos y comprobantes del torneo',     path: '/organizador/pagos',          role: 'organizador' },
  { label: 'Estadísticas',         desc: 'Centro de estadísticas del torneo',   path: '/estadisticas',               role: '*'           },
  { label: 'Calendario',           desc: 'Ver calendario de partidos',          path: '/calendario',                 role: '*'           },
  { label: 'Llaves',               desc: 'Cuadro de llaves del torneo',         path: '/llaves',                     role: '*'           },
  { label: 'Soporte',              desc: 'Centro de ayuda y soporte',           path: '/soporte',                    role: '*'           },
  { label: 'Configuración',        desc: 'Ajustes de tu cuenta',                path: '/configuracion',              role: '*'           },
  { label: 'Mi perfil',            desc: 'Ver y editar tu perfil',              path: '/perfil',                     role: '*'           },
];

const Layout = ({ children, userName, userRole, menuType }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const fotoUsuario = JSON.parse(localStorage.getItem('user') || '{}').foto || null;

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const sugerencias = query.trim().length === 0 ? [] : SEARCH_INDEX.filter(item => {
    const matchRol = item.role === '*' || item.role === menuType;
    const matchTexto = item.label.toLowerCase().includes(query.toLowerCase()) ||
                       item.desc.toLowerCase().includes(query.toLowerCase());
    return matchRol && matchTexto;
  }).slice(0, 6);

  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const menuItems = menuType === 'capitan' ? [
    { label: 'Inicio',                path: '/capitan/dashboard',    icon: '⊞' },
    { label: 'Crea tu equipo',        path: '/capitan/crear-equipo', icon: '📋' },
    { label: 'Consultar Equipo',      path: '/capitan/equipo',       icon: '👥' },
    { label: 'Centro de Estadísticas',path: '/estadisticas',         icon: '📊' },
    { label: 'Calendario/Partidos',   path: '/calendario',           icon: '📅' },
    { label: 'Llaves',                path: '/llaves',               icon: '🏆' },
  ] : menuType === 'organizador' ? [
    { label: 'Inicio',                path: '/organizador/dashboard',  icon: '⊞' },
    { label: 'Torneo',                path: '/organizador/torneos',    icon: '📋' },
    { label: 'Centro de Estadísticas',path: '/estadisticas',           icon: '📊' },
    { label: 'Calendario/Partidos',   path: '/organizador/calendario', icon: '📅' },
    { label: 'Llaves',                path: '/llaves',                 icon: '🏆' },
  ] : [
    { label: 'Inicio',                path: '/dashboard',    icon: '⊞' },
    { label: 'Inscripciones',         path: '/inscripciones',icon: '📋' },
    { label: 'Centro de Estadísticas',path: '/estadisticas', icon: '📊' },
    { label: 'Calendario/Partidos',   path: '/calendario',   icon: '📅' },
    { label: 'Llaves',                path: '/llaves',       icon: '🏆' },
  ];

  const bottomItems = menuType === 'capitan' ? [
    { label: 'Soporte',            path: '/soporte',       icon: '💬' },
    { label: 'Pagos/Comprobantes', path: '/pagos',         icon: '💳' },
    { label: 'Configuración',      path: '/configuracion', icon: '⚙'  },
  ] : menuType === 'organizador' ? [
    { label: 'Soporte',            path: '/soporte',             icon: '💬' },
    { label: 'Pagos/Comprobantes', path: '/organizador/pagos',   icon: '💳' },
    { label: 'Configuración',      path: '/configuracion',       icon: '⚙'  },
  ] : [
    { label: 'Soporte',       path: '/soporte',       icon: '💬' },
    { label: 'Configuración', path: '/configuracion', icon: '⚙'  },
  ];

  const logoPath = menuType === 'capitan' ? '/capitan/dashboard'
    : menuType === 'organizador' ? '/organizador/dashboard'
    : '/dashboard';

  const handleLogout = () => setShowLogoutModal(true);

  const confirmarLogout = () => {
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
        .suggest-item:hover { background-color: #f0f7ff !important; }
      `}</style>

      <div style={st.page}>
        {/* ── Sidebar ── */}
        <div style={st.sidebar}>
          <div style={st.logo} onClick={() => navigate(logoPath)}>
            <img src="/logotipo.png" alt="TechCup"
              style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
            <div style={st.logoTexts}>
              <div style={st.logoTitle}>TECHCUP</div>
              <div style={st.logoSub}>TORNEO UNIVERSITARIO</div>
            </div>
          </div>

          <nav style={st.nav}>
            {menuItems.map((item) => (
              <div key={item.path} className="menu-item"
                style={{ ...st.menuItem, ...(location.pathname === item.path ? st.menuItemActive : {}) }}
                onClick={() => navigate(item.path)}>
                <span style={st.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div style={st.divider} />

          <nav style={st.nav}>
            {bottomItems.map((item) => (
              <div key={item.path} className="menu-item"
                style={{ ...st.menuItem, ...(location.pathname === item.path ? st.menuItemActive : {}) }}
                onClick={() => navigate(item.path)}>
                <span style={st.menuIcon}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>

          <div style={st.logoutContainer}>
            <button style={st.logoutBtn} onClick={handleLogout}>
              <span>→</span> Log out
            </button>
          </div>
        </div>

        {/* ── Main ── */}
        <div style={st.main}>
          <div style={st.header}>

            {/* Búsqueda */}
            <div style={st.searchWrap} ref={searchRef}>
              <div style={{ ...st.searchBar, ...(showSuggestions && query ? st.searchBarOpen : {}) }}>
                <span style={st.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Buscar pantallas, funciones..."
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && sugerencias.length > 0) {
                      setQuery(''); setShowSuggestions(false); navigate(sugerencias[0].path);
                    }
                    if (e.key === 'Escape') { setShowSuggestions(false); setQuery(''); }
                  }}
                  style={st.searchInput}
                />
                {query && (
                  <button style={st.clearBtn} onClick={() => { setQuery(''); setShowSuggestions(false); }}>✕</button>
                )}
              </div>
              {showSuggestions && sugerencias.length > 0 && (
                <div style={st.dropdown}>
                  {sugerencias.map((item, i) => (
                    <div key={i} className="suggest-item" style={st.suggestItem}
                      onMouseDown={() => { setQuery(''); setShowSuggestions(false); navigate(item.path); }}>
                      <div style={st.suggestLabel}>{item.label}</div>
                      <div style={st.suggestDesc}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              )}
              {showSuggestions && query.trim().length > 0 && sugerencias.length === 0 && (
                <div style={st.dropdown}>
                  <div style={st.noResults}>Sin resultados para "{query}"</div>
                </div>
              )}
            </div>

            {/* Usuario */}
            <div style={st.headerRight}>
              <span style={st.bell}>🔔</span>
              <div
                style={{ ...st.userInfo, cursor: 'pointer' }}
                onClick={() => navigate('/perfil')}
                title="Ver mi perfil"
              >
                <div>
                  <div style={st.userName}>{userName || 'Usuario'}</div>
                  <div style={st.userRole}>{userRole || 'Jugador'}</div>
                </div>
                <div style={st.avatar}>
                  {fotoUsuario
                    ? <img src={fotoUsuario} alt="Perfil" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    : userName ? userName.charAt(0).toUpperCase() : 'U'
                  }
                </div>
              </div>
            </div>
          </div>

          <div style={st.content}>{children}</div>
        </div>
      </div>

      {/* ── Modal Log out ── */}
      {showLogoutModal && (
        <div style={st.overlay}>
          <div style={st.logoutModal}>
            <div style={st.logoutIcono}>👋</div>
            <h3 style={st.logoutTitulo}>¿Cerrar sesión?</h3>
            <p style={st.logoutDesc}>
              Tu sesión actual se cerrará y tendrás que volver a iniciar sesión para acceder.
            </p>
            <div style={st.logoutBtns}>
              <button style={st.btnCancelar} onClick={() => setShowLogoutModal(false)}>
                Cancelar
              </button>
              <button style={st.btnConfirmar} onClick={confirmarLogout}>
                Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const st = {
  page: { display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', fontFamily: 'Inter, sans-serif', backgroundColor: '#e8f0f7' },

  sidebar: { width: '200px', minWidth: '200px', background: 'linear-gradient(180deg, #1a7a8a 0%, #2d9e6b 100%)', display: 'flex', flexDirection: 'column', padding: '1.25rem 0 1rem', height: '100vh', overflow: 'hidden' },
  logo: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0 1rem 1rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: '0.75rem' },
  logoTexts: { display: 'flex', flexDirection: 'column' },
  logoTitle: { color: '#ffffff', fontSize: '0.9rem', fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '2px', lineHeight: '1.2' },
  logoSub: { color: 'rgba(255,255,255,0.75)', fontSize: '0.5rem', letterSpacing: '1px', lineHeight: '1.2' },
  nav: { display: 'flex', flexDirection: 'column', gap: '0.15rem', padding: '0 0.6rem' },
  menuItem: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.85rem', borderRadius: '8px', cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  menuItemActive: { backgroundColor: 'rgba(255,255,255,0.25)', color: '#ffffff', fontWeight: '600' },
  menuIcon: { fontSize: '0.9rem', minWidth: '18px', flexShrink: 0 },
  divider: { height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '1rem 1.25rem' },
  logoutContainer: { marginTop: 'auto', padding: '0 1.25rem 0.5rem' },
  logoutBtn: { width: '100%', padding: '0.7rem', backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' },

  main: { flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 2rem', backgroundColor: '#e8f0f7', borderBottom: '1px solid #d0dce8' },

  searchWrap: { position: 'relative', flex: 1, maxWidth: '540px' },
  searchBar: { display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '20px', padding: '0.5rem 1.25rem', gap: '0.5rem', border: '1px solid #ddd', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'border 0.2s' },
  searchBarOpen: { borderColor: '#2d9e6b', boxShadow: '0 0 0 3px rgba(45,158,107,0.1)', borderRadius: '20px 20px 0 0', borderBottom: '1px solid transparent' },
  searchIcon: { fontSize: '0.9rem', color: '#888', flexShrink: 0 },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.88rem', width: '100%', backgroundColor: 'transparent', color: '#333' },
  clearBtn: { background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '0.8rem', padding: '0 2px', flexShrink: 0 },
  dropdown: { position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #2d9e6b', borderTop: 'none', borderRadius: '0 0 16px 16px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 999, overflow: 'hidden' },
  suggestItem: { padding: '0.7rem 1.25rem', cursor: 'pointer', borderBottom: '1px solid #f0f4f8' },
  suggestLabel: { fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a' },
  suggestDesc: { fontSize: '0.72rem', color: '#888', marginTop: '0.15rem' },
  noResults: { padding: '0.9rem 1.25rem', fontSize: '0.82rem', color: '#aaa', textAlign: 'center' },

  headerRight: { display: 'flex', alignItems: 'center', gap: '1.25rem' },
  bell: { fontSize: '1.3rem', cursor: 'pointer' },
  userInfo: { display: 'flex', alignItems: 'center', gap: '0.85rem' },
  userName: { fontSize: '0.95rem', fontWeight: '600', color: '#1a1a1a', textAlign: 'right' },
  userRole: { fontSize: '0.78rem', color: '#666', textAlign: 'right' },
  avatar: { width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 'bold', fontSize: '1.1rem', overflow: 'hidden' },
  content: { flex: 1, overflow: 'auto', padding: '1.5rem 2rem' },

  // Modal logout
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 },
  logoutModal: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', width: '340px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.18)', fontFamily: 'Inter, sans-serif' },
  logoutIcono: { width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#fff0f0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' },
  logoutTitulo: { fontSize: '1rem', fontWeight: '400', color: '#1a1a1a', marginBottom: '0.6rem', fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', letterSpacing: '1px' },
  logoutDesc: { fontSize: '0.82rem', color: '#666', marginBottom: '1.5rem', lineHeight: '1.6' },
  logoutBtns: { display: 'flex', gap: '0.75rem' },
  btnCancelar: { flex: 1, padding: '0.65rem', border: '1.5px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#555', fontSize: '0.88rem', fontWeight: '500', cursor: 'pointer' },
  btnConfirmar: { flex: 1, padding: '0.65rem', border: 'none', borderRadius: '8px', backgroundColor: '#e53e3e', color: '#ffffff', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer' },
};

export default Layout;