import Layout from '../../components/Layout';

const OrganizadorDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const torneos = [
    { nombre: 'TechCup 2026-1', estado: 'INICIADO', equipos: '32/32', icon: '🏆' },
    { nombre: 'Taquito y gol', estado: 'FINALIZADO', equipos: '14/16', icon: '⚽' },
    { nombre: 'Micreros', estado: 'CREADO', equipos: '8/16', icon: '⭐' },
  ];

  const pagos = [
    { siglas: 'DW', nombre: 'DOSW FC', monto: '$130.000' },
    { siglas: 'MB', nombre: 'MBDA', monto: '$130.000' },
    { siglas: 'WD', nombre: 'WD-40', monto: '$130.000' },
  ];

  const estadoBadge = (estado) => {
    const colores = {
      INICIADO: { bg: '#e8f5ee', color: '#2d9e6b' },
      FINALIZADO: { bg: '#fff0f0', color: '#e05c5c' },
      CREADO: { bg: '#f0f4ff', color: '#5c7ee0' },
    };
    return colores[estado] || { bg: '#f0f0f0', color: '#888' };
  };

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <div style={s.perfilCard}>
        <div style={s.perfilAvatar}>
          {user.name ? user.name.charAt(0).toUpperCase() : 'O'}
        </div>
        <div style={s.perfilInfo}>
          <div style={s.perfilNombre}>{user.name || 'Felipe Rodriguez'}</div>
          <div style={s.perfilRol}>Organizador</div>
          <div style={s.perfilFacultad}>🏫 Decanatura de sistemas</div>
        </div>
      </div>

      <div style={s.kpiRow}>
        <div style={s.kpiCard}>
          <div style={s.kpiLabel}>Total Equipos</div>
          <div style={s.kpiIcon}>👥</div>
          <div style={s.kpiValue}>10</div>
        </div>
        <div style={s.kpiCard}>
          <div style={s.kpiLabel}>Total Recaudado</div>
          <div style={s.kpiIcon}>💰</div>
          <div style={s.kpiValue}>$390.000</div>
        </div>
        <div style={s.kpiCard}>
          <div style={s.kpiLabel}>Partidos programados</div>
          <div style={s.kpiIcon}>📅</div>
          <div style={s.kpiValue}>5</div>
        </div>
      </div>

      <div style={s.bottomRow}>
        <div style={s.torneosCard}>
          <div style={s.torneosHeader}>
            <span style={s.torneosTitle}>Torneos Activos</span>
            <span style={s.viewAll}>View All</span>
          </div>
          <table style={s.table}>
            <thead>
              <tr>
                <th style={s.th}>Nombre</th>
                <th style={s.th}>Estado</th>
                <th style={s.th}>Equipos</th>
                <th style={s.th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {torneos.map((t, i) => {
                const badge = estadoBadge(t.estado);
                return (
                  <tr key={i} style={s.tr}>
                    <td style={s.td}>
                      <div style={s.torneoNombre}>
                        <span>{t.icon}</span><span>{t.nombre}</span>
                      </div>
                    </td>
                    <td style={s.td}>
                      <span style={{ ...s.estadoBadge, backgroundColor: badge.bg, color: badge.color }}>
                        {t.estado}
                      </span>
                    </td>
                    <td style={{ ...s.td, textAlign: 'center' }}>{t.equipos}</td>
                    <td style={{ ...s.td, textAlign: 'center' }}>
                      <span style={s.accionIcon}>⚙</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={s.pagosCard}>
          <div style={s.pagosTitle}>Pagos</div>
          {pagos.map((p, i) => (
            <div key={i} style={s.pagoRow}>
              <div style={s.pagoAvatar}>{p.siglas}</div>
              <div style={s.pagoInfo}>
                <div style={s.pagoNombre}>{p.nombre}</div>
                <div style={s.pagoMonto}>{p.monto}</div>
              </div>
              <div style={s.pagoBtns}>
                <button style={s.btnRevisar}>Revisar</button>
                <button style={s.btnAprobar}>Aprobar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const s = {
  perfilCard: { display: 'flex', alignItems: 'center', gap: '1.25rem', backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem', border: '1px solid #e0e8f0' },
  perfilAvatar: { width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '1.5rem', minWidth: '64px' },
  perfilInfo: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  perfilNombre: { fontSize: '1.2rem', fontWeight: '700', color: '#1a1a1a' },
  perfilRol: { fontSize: '0.82rem', color: '#666' },
  perfilFacultad: { fontSize: '0.78rem', color: '#2d9e6b', marginTop: '0.2rem' },
  kpiRow: { display: 'flex', gap: '1rem', marginBottom: '1.25rem' },
  kpiCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', padding: '1rem 1.25rem', border: '1px solid #e0e8f0', position: 'relative' },
  kpiLabel: { fontSize: '0.72rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' },
  kpiIcon: { position: 'absolute', top: '1rem', right: '1rem', fontSize: '1.2rem' },
  kpiValue: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  bottomRow: { display: 'flex', gap: '1rem' },
  torneosCard: { flex: 2, backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e0e8f0' },
  torneosHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' },
  torneosTitle: { fontSize: '0.92rem', fontWeight: '700', color: '#1a1a1a' },
  viewAll: { fontSize: '0.75rem', color: '#2d9e6b', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { fontSize: '0.72rem', color: '#888', textAlign: 'left', padding: '0.4rem 0.5rem', borderBottom: '1px solid #e0e8f0', fontWeight: '600' },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '0.65rem 0.5rem', fontSize: '0.82rem', color: '#333' },
  torneoNombre: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  estadoBadge: { fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '10px' },
  accionIcon: { fontSize: '1rem', cursor: 'pointer', color: '#888' },
  pagosCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e0e8f0' },
  pagosTitle: { fontSize: '0.92rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem' },
  pagoRow: { marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0' },
  pagoAvatar: { width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#e8f0f7', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '700', marginBottom: '0.4rem' },
  pagoInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  pagoNombre: { fontSize: '0.82rem', fontWeight: '600', color: '#1a1a1a' },
  pagoMonto: { fontSize: '0.78rem', color: '#2d9e6b', fontWeight: '600' },
  pagoBtns: { display: 'flex', gap: '0.5rem' },
  btnRevisar: { flex: 1, padding: '0.35rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: 'transparent', color: '#666', fontSize: '0.75rem', cursor: 'pointer' },
  btnAprobar: { flex: 1, padding: '0.35rem', border: 'none', borderRadius: '6px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '600' },
};

export default OrganizadorDashboardPage;