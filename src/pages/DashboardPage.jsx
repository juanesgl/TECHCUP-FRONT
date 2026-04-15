import Layout from '../components/Layout';

const DashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const invitaciones = [
    { id: 1, equipo: 'DOSW FC', tipo: 'Equipo 3 miembros' },
    { id: 2, equipo: 'MBO', tipo: 'Equipo 1 Jugador' },
  ];

  const tablaPosiciones = [
    { pos: 1, nombre: '1.HALCONS', pj: 3, pg: 0, dg: -5, pts: 6 },
    { pos: 2, nombre: '2.DOSW FC', pj: 2, pg: 6, dg: -2, pts: 6 },
    { pos: 3, nombre: '3.DINAMONS', pj: 1, pg: 4, dg: -1, pts: 3 },
  ];

  return (
    <Layout userName={user.name} userRole={user.role}>
      <div style={styles.container}>
        {/* Card principal jugador */}
        <div style={styles.topSection}>
          <div style={styles.playerCard}>
            <h3 style={styles.teamName}>NOMBRE EQUIPO</h3>
            <div style={styles.dorsal}>10</div>
            <p style={styles.playerInfo}>Delantero • Ing Sistemas</p>
            <span style={styles.disponibleBadge}>Disponible</span>
            <div style={styles.statsRow}>
              <div style={styles.stat}>
                <div style={styles.statNum}>12</div>
                <div style={styles.statLabel}>Goles</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNum}>5</div>
                <div style={styles.statLabel}>Faltas</div>
              </div>
              <div style={styles.stat}>
                <div style={styles.statNum}>8</div>
                <div style={styles.statLabel}>PJ</div>
              </div>
            </div>
          </div>

          {/* Tabla del grupo */}
          <div style={styles.tablaCard}>
            <h3 style={styles.tablaTitle}>TABLA DEL GRUPO A</h3>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.th}>EQUIPO</th>
                  <th style={styles.th}>PJ</th>
                  <th style={styles.th}>PG</th>
                  <th style={styles.th}>DG</th>
                  <th style={styles.th}>PTS</th>
                </tr>
              </thead>
              <tbody>
                {tablaPosiciones.map((row) => (
                  <tr key={row.pos} style={styles.tableRow}>
                    <td style={styles.td}>{row.nombre}</td>
                    <td style={styles.tdCenter}>{row.pj}</td>
                    <td style={styles.tdCenter}>{row.pg}</td>
                    <td style={styles.tdCenter}>{row.dg}</td>
                    <td style={styles.tdCenter}>{row.pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invitaciones */}
        <div style={styles.invitacionesCard}>
          <h3 style={styles.invitacionesTitle}>✉ Invitaciones</h3>
          {invitaciones.map((inv) => (
            <div key={inv.id} style={styles.invitacionRow}>
              <div style={styles.invAvatar}>⚽</div>
              <div style={styles.invInfo}>
                <div style={styles.invNombre}>{inv.equipo}</div>
                <div style={styles.invTipo}>{inv.tipo}</div>
              </div>
              <div style={styles.invBtns}>
                <button style={styles.btnRechazar}>Rechazar</button>
                <button style={styles.btnAceptar}>Aceptar</button>
              </div>
            </div>
          ))}
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
  topSection: {
    display: 'flex',
    gap: '1rem',
  },
  playerCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.25rem',
    width: '220px',
    minWidth: '220px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    border: '1px solid #e0e8f0',
  },
  teamName: {
    fontSize: '0.85rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  dorsal: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
    lineHeight: '1',
  },
  playerInfo: {
    fontSize: '0.75rem',
    color: '#666',
  },
  disponibleBadge: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    padding: '0.2rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
  },
  statsRow: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '0.5rem',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNum: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  statLabel: {
    fontSize: '0.7rem',
    color: '#888',
  },
  tablaCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.25rem',
    flex: 1,
    border: '1px solid #e0e8f0',
  },
  tablaTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#1a1a1a',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeader: {
    borderBottom: '1px solid #eee',
  },
  th: {
    padding: '0.4rem 0.5rem',
    fontSize: '0.75rem',
    color: '#888',
    textAlign: 'left',
    fontWeight: '600',
  },
  tableRow: {
    borderBottom: '1px solid #f5f5f5',
  },
  td: {
    padding: '0.5rem 0.5rem',
    fontSize: '0.82rem',
    color: '#1a1a1a',
  },
  tdCenter: {
    padding: '0.5rem 0.5rem',
    fontSize: '0.82rem',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  invitacionesCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '1px solid #e0e8f0',
  },
  invitacionesTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#1a1a1a',
  },
  invitacionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 0',
    borderBottom: '1px solid #f5f5f5',
  },
  invAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#e8f0f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  invInfo: {
    flex: 1,
  },
  invNombre: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  invTipo: {
    fontSize: '0.75rem',
    color: '#888',
  },
  invBtns: {
    display: 'flex',
    gap: '0.5rem',
  },
  btnRechazar: {
    padding: '0.35rem 0.85rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.8rem',
    color: '#666',
  },
  btnAceptar: {
    padding: '0.35rem 0.85rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
  },
};

export default DashboardPage;