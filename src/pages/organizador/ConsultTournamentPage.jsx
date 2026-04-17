import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const ConsultTournamentPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const [tabActiva, setTabActiva] = useState('fechas');

  const fechas = [
    { label: 'CIERRE INSCRIPCIONES', valor: '25 Abr 2026' },
    { label: 'INICIO FASE GRUPOS',   valor: '02 May 2026' },
    { label: 'CUARTOS DE FINAL',     valor: '21 Jun 2026' },
    { label: 'SEMIFINAL',            valor: '05 Jul 2026' },
    { label: 'FINAL',                valor: '19 Jul 2026' },
  ];

  const sanciones = [
    { color: '#f5c542', texto: '2 Amarillas = 1 partido de suspensión' },
    { color: '#e05c5c', texto: 'Roja Directa = 2 partidos de suspensión' },
    { color: '#e05c5c', texto: '2 Rojas acumuladas = Eliminación del torneo' },
  ];

  const estadisticas = [
    { label: 'TOTAL GOLES', valor: '87' },
    { label: 'AMARILLAS',   valor: '34' },
    { label: 'ROJAS',       valor: '4'  },
    { label: 'FAIR PLAY',   valor: '92%'},
  ];

  const partidos = [
    { equipo1: 'Los Peliculeros', equipo2: 'WD-40',     fecha: 'Mar 12', hora: '14:30', cancha: 'Cancha 1', estado: 'Programado' },
    { equipo1: 'DOSW FC',         equipo2: 'MBDA',      fecha: 'Mar 15', hora: '16:00', cancha: 'Cancha 2', estado: 'Programado' },
    { equipo1: 'Los Pericos',     equipo2: 'Almojabanas',fecha: 'Mar 19', hora: '12:00', cancha: 'Cancha 1', estado: 'Finalizado' },
  ];

  const TABS = [
    { id: 'fechas',      label: '📅 Fechas'      },
    { id: 'partidos',    label: '⚽ Partidos'    },
    { id: 'estadisticas',label: '📊 Estadísticas'},
    { id: 'sanciones',   label: '⚠ Sanciones'   },
  ];

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <div style={s.container}>
        {/* Header */}
        <div style={s.headerRow}>
          <div>
            <button style={s.backBtn} onClick={() => navigate('/organizador/torneos')}>← Volver</button>
            <h1 style={s.pageTitle}>TEMPORADA 2026 — I SEMESTRE</h1>
            <p style={s.sub}>Gestiona todos los aspectos de la competición activa desde este panel.</p>
          </div>
          <span style={s.estadoBadge}>● En progreso</span>
        </div>

        {/* KPIs rápidos */}
        <div style={s.kpiRow}>
          {estadisticas.map((e, i) => (
            <div key={i} style={s.kpiCard}>
              <div style={s.kpiLabel}>{e.label}</div>
              <div style={s.kpiValue}>{e.valor}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={s.tabs}>
          {TABS.map(t => (
            <button key={t.id}
              style={{ ...s.tab, ...(tabActiva === t.id ? s.tabActive : {}) }}
              onClick={() => setTabActiva(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Contenido tab */}
        {tabActiva === 'fechas' && (
          <div style={s.grid2}>
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
              <div style={s.horarioRow}>
                <span style={s.horarioLabel}>Días de juego</span>
                <span style={s.horarioValor}>Miérc. y Viernes</span>
              </div>
              <div style={s.horarioRow}>
                <span style={s.horarioLabel}>Horario</span>
                <span style={s.horarioValor}>12:00 – 16:00</span>
              </div>
              <div style={s.horarioRow}>
                <span style={s.horarioLabel}>Jugadores / equipo</span>
                <span style={s.horarioValor}>7</span>
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                {['Cancha A — Bloque F Principal', 'Cancha B — Bloque F Auxiliar'].map((c, i) => (
                  <div key={i} style={s.canchaChip}>
                    <span style={s.canchaIcono}>●</span> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tabActiva === 'partidos' && (
          <div style={s.card}>
            <div style={s.cardTitle}>⚽ Partidos del torneo</div>
            <table style={s.table}>
              <thead>
                <tr style={s.tableHead}>
                  <th style={s.th}>EQUIPOS</th>
                  <th style={s.th}>FECHA</th>
                  <th style={s.th}>HORA</th>
                  <th style={s.th}>CANCHA</th>
                  <th style={s.th}>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {partidos.map((p, i) => (
                  <tr key={i} style={s.tr}>
                    <td style={s.td}>
                      <span style={s.equipoNombre}>{p.equipo1}</span>
                      <span style={s.vs}> vs </span>
                      <span style={s.equipoNombre}>{p.equipo2}</span>
                    </td>
                    <td style={s.td}>{p.fecha}</td>
                    <td style={s.td}>{p.hora}</td>
                    <td style={s.td}>{p.cancha}</td>
                    <td style={s.td}>
                      <span style={{
                        ...s.estadoChip,
                        backgroundColor: p.estado === 'Finalizado' ? '#e8f5ee' : '#f0f4ff',
                        color: p.estado === 'Finalizado' ? '#2d9e6b' : '#5b6abf',
                      }}>
                        {p.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tabActiva === 'estadisticas' && (
          <div style={s.grid2}>
            <div style={s.card}>
              <div style={s.cardTitle}>📊 Estadísticas generales</div>
              <div style={s.statsGrid}>
                {estadisticas.map((e, i) => (
                  <div key={i} style={s.statCard}>
                    <div style={s.statLabel}>{e.label}</div>
                    <div style={s.statValor}>{e.valor}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={s.card}>
              <div style={s.cardTitle}>🏆 Goleador del torneo</div>
              <div style={s.goleadorCard}>
                <div style={s.goleadorAvatar}>JR</div>
                <div>
                  <div style={s.goleadorNombre}>J. Ramírez</div>
                  <div style={s.goleadorSub}>12 goles marcados</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tabActiva === 'sanciones' && (
          <div style={s.card}>
            <div style={s.cardTitle}>⚠ Sanciones vigentes</div>
            <div style={s.sancionesList}>
              {sanciones.map((san, i) => (
                <div key={i} style={s.sancionRow}>
                  <div style={{ ...s.sancionDot, backgroundColor: san.color }} />
                  <span style={s.sancionTexto}>{san.texto}</span>
                </div>
              ))}
              <div style={s.sancionInfo}>
                <div style={s.sancionInfoLabel}>INCOMPARECENCIA (W.O.)</div>
                <div style={s.sancionInfoValor}>Derrota automática 3-0</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  headerRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' },
  backBtn: { background: 'none', border: 'none', color: '#2d9e6b', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '0.3rem', display: 'block' },
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px', margin: 0 },
  sub: { fontSize: '0.78rem', color: '#888', marginTop: '0.2rem' },
  estadoBadge: { backgroundColor: '#e8f5ee', color: '#2d9e6b', fontSize: '0.75rem', fontWeight: '600', padding: '0.3rem 0.85rem', borderRadius: '20px', marginTop: '0.4rem', whiteSpace: 'nowrap' },

  kpiRow: { display: 'flex', gap: '1rem' },
  kpiCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '10px', padding: '0.85rem 1.25rem', border: '1px solid #e0e8f0' },
  kpiLabel: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' },
  kpiValue: { fontSize: '1.6rem', fontWeight: '700', color: '#1a1a1a' },

  tabs: { display: 'flex', gap: '0.5rem', borderBottom: '2px solid #e0e8f0', paddingBottom: '0' },
  tab: { padding: '0.5rem 1rem', border: 'none', backgroundColor: 'transparent', fontSize: '0.82rem', color: '#888', cursor: 'pointer', borderBottom: '2px solid transparent', marginBottom: '-2px' },
  tabActive: { color: '#2d9e6b', fontWeight: '600', borderBottom: '2px solid #2d9e6b' },

  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e0e8f0' },
  cardTitle: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem' },

  fechasList: { display: 'flex', flexDirection: 'column', gap: '0.65rem' },
  fechaRow: { display: 'flex', flexDirection: 'column', gap: '0.1rem', paddingBottom: '0.65rem', borderBottom: '1px solid #f5f5f5' },
  fechaLabel: { fontSize: '0.63rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  fechaValor: { fontSize: '0.88rem', fontWeight: '600', color: '#1a1a1a' },

  horarioRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  horarioLabel: { fontSize: '0.78rem', color: '#888' },
  horarioValor: { fontSize: '0.82rem', fontWeight: '600', color: '#1a1a1a' },
  canchaChip: { display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#f0fdf7', borderRadius: '6px', padding: '0.4rem 0.75rem', fontSize: '0.78rem', color: '#2d9e6b', fontWeight: '500', marginBottom: '0.4rem' },
  canchaIcono: { fontSize: '0.6rem' },

  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { borderBottom: '1px solid #eee' },
  th: { padding: '0.5rem 0.75rem', fontSize: '0.68rem', color: '#aaa', textAlign: 'left', fontWeight: '700', letterSpacing: '0.5px' },
  tr: { borderBottom: '1px solid #f5f5f5' },
  td: { padding: '0.65rem 0.75rem', fontSize: '0.82rem', color: '#1a1a1a' },
  equipoNombre: { fontWeight: '600' },
  vs: { color: '#aaa', fontSize: '0.75rem' },
  estadoChip: { padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '600' },

  statsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  statCard: { backgroundColor: '#f8fafc', borderRadius: '8px', padding: '0.75rem', border: '1px solid #e0e8f0' },
  statLabel: { fontSize: '0.62rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' },
  statValor: { fontSize: '1.4rem', fontWeight: '700', color: '#1a1a1a' },

  goleadorCard: { display: 'flex', alignItems: 'center', gap: '0.75rem', backgroundColor: '#e8f5ee', borderRadius: '8px', padding: '0.75rem' },
  goleadorAvatar: { width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2d9e6b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: '700' },
  goleadorNombre: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a' },
  goleadorSub: { fontSize: '0.72rem', color: '#666' },

  sancionesList: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  sancionRow: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid #f5f5f5' },
  sancionDot: { width: '12px', height: '12px', borderRadius: '2px', minWidth: '12px' },
  sancionTexto: { fontSize: '0.82rem', color: '#333' },
  sancionInfo: { backgroundColor: '#f8fafc', borderRadius: '6px', padding: '0.65rem 0.85rem', marginTop: '0.25rem' },
  sancionInfoLabel: { fontSize: '0.62rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' },
  sancionInfoValor: { fontSize: '0.82rem', color: '#333', marginTop: '0.2rem', fontWeight: '500' },
};

export default ConsultTournamentPage;