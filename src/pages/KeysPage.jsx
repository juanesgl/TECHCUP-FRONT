import Layout from '../components/Layout';
import { useState } from 'react';

const LlavesPage = ({menuType}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [fase, setFase] = useState('cuartos');

  const cuartos = [
    { equipo1: 'Leones', goles1: 2, equipo2: 'Jaguares', goles2: 1 },
    { equipo1: 'DOSW FC', goles1: 0, equipo2: 'MBDA', goles2: 3 },
    { equipo1: 'WD-40', goles1: 1, equipo2: 'LA LIGA', goles2: 1 },
    { equipo1: 'AYED FC', goles1: 2, equipo2: 'AYPR FC', goles2: 2 },
  ];

  const semifinales = [
    { equipo1: 'Leones', equipo2: 'DOSW FC' },
    { equipo1: 'WD-40', equipo2: 'AYED FC' },
  ];

  return (
    <Layout userName={user.name} userRole={user.role} menuType={menuType}>
      <div style={styles.container}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.title}>LLAVES</h1>
            <p style={styles.subtitle}>Seguimiento de la fase eliminatoria y resultados en tiempo real</p>
          </div>
          <div style={styles.faseBtns}>
            {['Cuartos', 'Semifinales', 'Final'].map((f) => (
              <button
                key={f}
                style={{
                  ...styles.faseBtn,
                  ...(fase === f.toLowerCase() ? styles.faseBtnActive : {}),
                }}
                onClick={() => setFase(f.toLowerCase())}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Bracket */}
        <div style={styles.bracket}>
          {/* Cuartos */}
          <div style={styles.columna}>
            <h3 style={styles.colTitle}>CUARTOS DE FINAL</h3>
            <div style={styles.matchesCol}>
              {cuartos.map((match, i) => (
                <div key={i} style={styles.matchCard}>
                  <div style={styles.matchRow}>
                    <div style={styles.teamDot} />
                    <span style={styles.teamName}>{match.equipo1}</span>
                    <span style={styles.goles}>{match.goles1}</span>
                  </div>
                  <div style={styles.matchRow}>
                    <div style={styles.teamDot} />
                    <span style={styles.teamName}>{match.equipo2}</span>
                    <span style={styles.goles}>{match.goles2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Semifinales */}
          <div style={styles.columna}>
            <h3 style={styles.colTitle}>SEMIFINALES</h3>
            <div style={styles.matchesColCenter}>
              {semifinales.map((match, i) => (
                <div key={i} style={styles.matchCard}>
                  <div style={styles.matchRow}>
                    <div style={styles.teamDotGray} />
                    <span style={styles.teamName}>{match.equipo1}</span>
                    <span style={styles.dash}>—</span>
                  </div>
                  <div style={styles.matchRow}>
                    <div style={styles.teamDotGray} />
                    <span style={styles.teamName}>{match.equipo2}</span>
                    <span style={styles.dash}>—</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gran Final */}
          <div style={styles.columna}>
            <h3 style={styles.colTitleGreen}>GRAN FINAL</h3>
            <div style={styles.finalCard}>
              <div style={styles.finalTeams}>
                <div style={styles.finalTeam}>
                  <div style={styles.finalAvatar}>?</div>
                  <span style={styles.porDefinir}>POR DEFINIR</span>
                </div>
                <span style={styles.vs}>VS</span>
                <div style={styles.finalTeam}>
                  <div style={styles.finalAvatar}>?</div>
                  <span style={styles.porDefinir}>POR DEFINIR</span>
                </div>
              </div>
              <div style={styles.finalInfo}>
                <span style={styles.finalCancha}>CANCHA 1</span>
                <span style={styles.finalFecha}>Abril 26 2026 · 16:00 hr</span>
              </div>
              <button style={styles.verDetallesBtn}>VER DETALLES</button>
            </div>
          </div>
        </div>

        {/* Footer cards */}
        <div style={styles.footerCards}>
          <div style={styles.footerCard}>
            <span style={styles.footerIcon}>📅</span>
            <div>
              <div style={styles.footerLabel}>Próximo Partido</div>
              <div style={styles.footerValue}>Mañana, 16:00 hrs</div>
            </div>
          </div>
          <div style={styles.footerCard}>
            <span style={styles.footerIcon}>📅</span>
            <div>
              <div style={styles.footerLabel}>Escuela</div>
              <div style={styles.footerValue}>Cancha 1</div>
            </div>
          </div>
          <div style={styles.footerCard}>
            <span style={styles.footerIcon}>📈</span>
            <div>
              <div style={styles.footerLabel}>Goleador Actual</div>
              <div style={styles.footerValue}>Juan S. (8 goles)</div>
            </div>
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
    gap: '1.25rem',
    height: '100%',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '0.82rem',
    color: '#666',
    marginTop: '0.2rem',
  },
  faseBtns: {
    display: 'flex',
    gap: '0.5rem',
  },
  faseBtn: {
    padding: '0.4rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.82rem',
    color: '#555',
  },
  faseBtnActive: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: '1px solid #2d9e6b',
    fontWeight: '600',
  },
  bracket: {
    display: 'flex',
    gap: '1.5rem',
    flex: 1,
    alignItems: 'center',
  },
  columna: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1,
  },
  colTitle: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#2d9e6b',
    letterSpacing: '1px',
  },
  colTitleGreen: {
    fontSize: '0.78rem',
    fontWeight: '700',
    color: '#2d9e6b',
    letterSpacing: '1px',
    textAlign: 'center',
  },
  matchesCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  matchesColCenter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    justifyContent: 'center',
    flex: 1,
  },
  matchCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '0.6rem 0.85rem',
    border: '1px solid #e0e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  matchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  teamDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
  },
  teamDotGray: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#cccccc',
  },
  teamName: {
    fontSize: '0.82rem',
    color: '#1a1a1a',
    flex: 1,
  },
  goles: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#333',
  },
  dash: {
    fontSize: '0.82rem',
    color: '#aaa',
  },
  finalCard: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '2px solid #2d9e6b',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
  },
  finalTeams: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  finalTeam: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
  },
  finalAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#e0e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#888',
  },
  porDefinir: {
    fontSize: '0.65rem',
    color: '#888',
    textAlign: 'center',
  },
  vs: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  finalInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.2rem',
  },
  finalCancha: {
    fontSize: '0.78rem',
    fontWeight: '600',
    color: '#333',
  },
  finalFecha: {
    fontSize: '0.72rem',
    color: '#888',
  },
  verDetallesBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.6rem 1.25rem',
    cursor: 'pointer',
    fontSize: '0.82rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
  footerCards: {
    display: 'flex',
    gap: '1rem',
  },
  footerCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '0.85rem 1rem',
    border: '1px solid #e0e8f0',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  footerIcon: {
    fontSize: '1.2rem',
  },
  footerLabel: {
    fontSize: '0.72rem',
    color: '#888',
  },
  footerValue: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
};

export default LlavesPage;