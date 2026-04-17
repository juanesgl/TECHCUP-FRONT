import { useState } from 'react';
import Layout from '../components/Layout';

const DATA = {
  cuartos: {
    titulo: 'CUARTOS DE FINAL',
    partidos: [
      { id: 1, equipo1: 'Leones',   g1: 2, equipo2: 'Jaguares', g2: 1, jugado: true,  ganador: 'Leones'   },
      { id: 2, equipo1: 'DOSW FC',  g1: 0, equipo2: 'MBDA',     g2: 3, jugado: true,  ganador: 'MBDA'     },
      { id: 3, equipo1: 'WD-40',    g1: 1, equipo2: 'LA LIGA',  g2: 1, jugado: true,  ganador: null       },
      { id: 4, equipo1: 'AYED FC',  g1: 2, equipo2: 'AYPR FC',  g2: 2, jugado: true,  ganador: null       },
    ],
  },
  semifinales: {
    titulo: 'SEMIFINALES',
    partidos: [
      { id: 5, equipo1: 'Leones',  g1: null, equipo2: 'MBDA',    g2: null, jugado: false, ganador: null, cancha: 'Cancha A', fecha: 'Abr 20 · 14:00 hr' },
      { id: 6, equipo1: 'WD-40',  g1: null, equipo2: 'AYED FC', g2: null, jugado: false, ganador: null, cancha: 'Cancha B', fecha: 'Abr 20 · 16:00 hr' },
    ],
  },
  final: {
    titulo: 'GRAN FINAL',
    partidos: [
      { id: 7, equipo1: null, g1: null, equipo2: null, g2: null, jugado: false, ganador: null, cancha: 'Cancha 1', fecha: 'Abr 26 · 16:00 hr' },
    ],
  },
};

const FASES = ['cuartos', 'semifinales', 'final'];
const FASE_LABEL = { cuartos: 'Cuartos', semifinales: 'Semifinales', final: 'Final' };

const teamColor = (nombre) => {
  if (!nombre) return '#ccc';
  const colores = ['#e53e3e','#3b82f6','#f6c90e','#2d9e6b','#9333ea','#f97316','#06b6d4','#ec4899'];
  let hash = 0;
  for (let i = 0; i < nombre.length; i++) hash = nombre.charCodeAt(i) + ((hash << 5) - hash);
  return colores[Math.abs(hash) % colores.length];
};

const MatchCard = ({ partido, onClick, highlight }) => {
  const { equipo1, g1, equipo2, g2, jugado, ganador, cancha, fecha } = partido;
  const porJugar = !jugado;

  return (
    <div
      style={{
        ...st.matchCard,
        ...(highlight ? st.matchCardHL : {}),
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      {/* Equipo 1 */}
      <div style={{ ...st.matchRow, ...(ganador === equipo1 ? st.ganadorRow : {}) }}>
        <div style={{ ...st.dot, backgroundColor: teamColor(equipo1) }} />
        <span style={{ ...st.teamName, fontWeight: ganador === equipo1 ? '700' : '400' }}>
          {equipo1 || 'POR DEFINIR'}
        </span>
        <span style={porJugar ? st.dash : st.goles}>{porJugar ? '—' : g1}</span>
      </div>
      {/* Equipo 2 */}
      <div style={{ ...st.matchRow, ...(ganador === equipo2 ? st.ganadorRow : {}) }}>
        <div style={{ ...st.dot, backgroundColor: teamColor(equipo2) }} />
        <span style={{ ...st.teamName, fontWeight: ganador === equipo2 ? '700' : '400' }}>
          {equipo2 || 'POR DEFINIR'}
        </span>
        <span style={porJugar ? st.dash : st.goles}>{porJugar ? '—' : g2}</span>
      </div>
      {/* Fecha/cancha si aplica */}
      {(cancha || fecha) && (
        <div style={st.matchMeta}>
          {cancha && <span>📍 {cancha}</span>}
          {fecha && <span>🕐 {fecha}</span>}
        </div>
      )}
    </div>
  );
};

const ModalPartido = ({ partido, onClose }) => {
  if (!partido) return null;
  const { equipo1, g1, equipo2, g2, jugado, ganador, cancha, fecha, titulo } = partido;

  return (
    <div style={st.overlay} onClick={onClose}>
      <div style={st.modal} onClick={e => e.stopPropagation()}>
        <button style={st.cerrar} onClick={onClose}>✕</button>
        {titulo && <div style={st.modalFase}>{titulo}</div>}
        <div style={st.modalTeams}>
          <div style={st.modalTeam}>
            <div style={{ ...st.modalAvatar, backgroundColor: teamColor(equipo1) + '33', color: teamColor(equipo1) }}>
              {equipo1 ? equipo1[0] : '?'}
            </div>
            <div style={st.modalTeamNombre}>{equipo1 || 'POR DEFINIR'}</div>
            {jugado && <div style={st.modalGol}>{g1}</div>}
          </div>
          <div style={st.modalVs}>VS</div>
          <div style={st.modalTeam}>
            <div style={{ ...st.modalAvatar, backgroundColor: teamColor(equipo2) + '33', color: teamColor(equipo2) }}>
              {equipo2 ? equipo2[0] : '?'}
            </div>
            <div style={st.modalTeamNombre}>{equipo2 || 'POR DEFINIR'}</div>
            {jugado && <div style={st.modalGol}>{g2}</div>}
          </div>
        </div>

        {ganador && (
          <div style={st.modalGanadorBadge}>🏆 Ganador: <strong>{ganador}</strong></div>
        )}
        {!jugado && !ganador && (
          <div style={st.modalPendiente}>⏳ Partido pendiente</div>
        )}

        <div style={st.modalInfoGrid}>
          {cancha && <div style={st.modalInfoItem}><span style={st.modalInfoIcon}>📍</span><div><div style={st.modalInfoLabel}>Cancha</div><div style={st.modalInfoVal}>{cancha}</div></div></div>}
          {fecha  && <div style={st.modalInfoItem}><span style={st.modalInfoIcon}>📅</span><div><div style={st.modalInfoLabel}>Fecha</div><div style={st.modalInfoVal}>{fecha}</div></div></div>}
        </div>
      </div>
    </div>
  );
};

const KeysPage = ({ menuType }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [fase, setFase] = useState('cuartos');
  const [modalPartido, setModalPartido] = useState(null);

  const data = DATA[fase];

  const renderBracket = () => (
    <div style={st.bracket}>
      {/* Cuartos */}
      <div style={st.columna}>
        <div style={st.colTitle}>CUARTOS DE FINAL</div>
        <div style={st.matchesCol}>
          {DATA.cuartos.partidos.map(p => (
            <MatchCard
              key={p.id}
              partido={p}
              highlight={fase === 'cuartos'}
              onClick={() => setModalPartido({ ...p, titulo: 'Cuartos de Final' })}
            />
          ))}
        </div>
      </div>

      {/* Semifinales */}
      <div style={st.columna}>
        <div style={st.colTitle}>SEMIFINALES</div>
        <div style={st.matchesColCenter}>
          {DATA.semifinales.partidos.map(p => (
            <MatchCard
              key={p.id}
              partido={p}
              highlight={fase === 'semifinales'}
              onClick={() => setModalPartido({ ...p, titulo: 'Semifinal' })}
            />
          ))}
        </div>
      </div>

      {/* Final */}
      <div style={st.columna}>
        <div style={{ ...st.colTitle, textAlign: 'center' }}>GRAN FINAL</div>
        <div style={st.finalCard}>
          <div style={st.finalTeams}>
            <div style={st.finalTeam}>
              <div style={{ ...st.finalAvatar, backgroundColor: teamColor(DATA.final.partidos[0].equipo1) + '33' }}>
                {DATA.final.partidos[0].equipo1 ? DATA.final.partidos[0].equipo1[0] : '?'}
              </div>
              <span style={st.porDefinir}>{DATA.final.partidos[0].equipo1 || 'POR DEFINIR'}</span>
            </div>
            <span style={st.vs}>VS</span>
            <div style={st.finalTeam}>
              <div style={{ ...st.finalAvatar, backgroundColor: teamColor(DATA.final.partidos[0].equipo2) + '33' }}>
                {DATA.final.partidos[0].equipo2 ? DATA.final.partidos[0].equipo2[0] : '?'}
              </div>
              <span style={st.porDefinir}>{DATA.final.partidos[0].equipo2 || 'POR DEFINIR'}</span>
            </div>
          </div>
          <div style={st.finalInfo}>
            <span style={st.finalCancha}>CANCHA 1</span>
            <span style={st.finalFecha}>Abril 26 2026 · 16:00 hr</span>
          </div>
          <button
            style={st.verDetallesBtn}
            onClick={() => setModalPartido({ ...DATA.final.partidos[0], titulo: 'Gran Final' })}
          >
            VER DETALLES
          </button>
        </div>
      </div>
    </div>
  );

  /* Vista semifinales: solo semifinales + final */
  const renderSemifinales = () => (
    <div style={st.bracket}>
      <div style={{ ...st.columna, flex: 1.5 }}>
        <div style={st.colTitle}>SEMIFINALES</div>
        <div style={st.matchesCol}>
          {DATA.semifinales.partidos.map(p => (
            <MatchCard
              key={p.id}
              partido={p}
              highlight
              onClick={() => setModalPartido({ ...p, titulo: 'Semifinal' })}
            />
          ))}
        </div>
      </div>
      <div style={{ ...st.columna, flex: 1 }}>
        <div style={{ ...st.colTitle, textAlign: 'center' }}>GRAN FINAL</div>
        <div style={st.finalCard}>
          <div style={st.finalTeams}>
            <div style={st.finalTeam}>
              <div style={st.finalAvatar}>?</div>
              <span style={st.porDefinir}>POR DEFINIR</span>
            </div>
            <span style={st.vs}>VS</span>
            <div style={st.finalTeam}>
              <div style={st.finalAvatar}>?</div>
              <span style={st.porDefinir}>POR DEFINIR</span>
            </div>
          </div>
          <div style={st.finalInfo}>
            <span style={st.finalCancha}>CANCHA 1</span>
            <span style={st.finalFecha}>Abril 26 2026 · 16:00 hr</span>
          </div>
          <button style={{ ...st.verDetallesBtn, opacity: 0.5, cursor: 'default' }}>AÚN NO DEFINIDA</button>
        </div>
      </div>
    </div>
  );

  /* Vista final: solo la final */
  const renderFinal = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <div style={{ ...st.finalCard, width: '360px', padding: '2rem' }}>
        <div style={{ ...st.colTitle, textAlign: 'center', fontSize: '1rem', marginBottom: '0.5rem' }}>🏆 GRAN FINAL</div>
        <div style={st.finalTeams}>
          <div style={st.finalTeam}>
            <div style={{ ...st.finalAvatar, width: '52px', height: '52px', fontSize: '1.5rem' }}>?</div>
            <span style={st.porDefinir}>POR DEFINIR</span>
          </div>
          <span style={{ ...st.vs, fontSize: '1.3rem' }}>VS</span>
          <div style={st.finalTeam}>
            <div style={{ ...st.finalAvatar, width: '52px', height: '52px', fontSize: '1.5rem' }}>?</div>
            <span style={st.porDefinir}>POR DEFINIR</span>
          </div>
        </div>
        <div style={st.finalInfo}>
          <span style={st.finalCancha}>CANCHA 1</span>
          <span style={st.finalFecha}>Abril 26 2026 · 16:00 hr</span>
        </div>
        <div style={st.pendienteBanner}>⏳ Los finalistas se definirán tras las semifinales</div>
        <button
          style={{ ...st.verDetallesBtn, opacity: 0.5, cursor: 'default', width: '100%' }}
        >
          AÚN NO DEFINIDA
        </button>
      </div>
    </div>
  );

  return (
    <Layout userName={user.name} userRole={
      user.role === 'REFEREE'       ? 'Árbitro'
      : user.role === 'CAPTAIN'     ? 'Capitán'
      : user.role === 'ORGANIZER'   ? 'Organizador'
      : user.role === 'ADMINISTRATOR' || user.role === 'ADMIN' ? 'Administrador'
      : user.role === 'STUDENT'     ? 'Estudiante'
      : user.role || 'Jugador'
    } menuType={menuType}>

      <div style={st.container}>
        {/* Header */}
        <div style={st.titleRow}>
          <div>
            <h1 style={st.title}>LLAVES</h1>
            <p style={st.subtitle}>Seguimiento de la fase eliminatoria y resultados en tiempo real</p>
          </div>
          <div style={st.faseBtns}>
            {FASES.map(f => (
              <button
                key={f}
                style={{ ...st.faseBtn, ...(fase === f ? st.faseBtnActive : {}) }}
                onClick={() => setFase(f)}
              >
                {FASE_LABEL[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Contenido según fase */}
        {fase === 'cuartos'    && renderBracket()}
        {fase === 'semifinales'&& renderSemifinales()}
        {fase === 'final'      && renderFinal()}

        {/* Footer */}
        <div style={st.footerCards}>
          <div style={st.footerCard}>
            <span style={st.footerIcon}>📅</span>
            <div>
              <div style={st.footerLabel}>Próximo Partido</div>
              <div style={st.footerValue}>Mañana, 16:00 hrs</div>
            </div>
          </div>
          <div style={st.footerCard}>
            <span style={st.footerIcon}>📍</span>
            <div>
              <div style={st.footerLabel}>Escuela</div>
              <div style={st.footerValue}>Cancha 1</div>
            </div>
          </div>
          <div style={st.footerCard}>
            <span style={st.footerIcon}>📈</span>
            <div>
              <div style={st.footerLabel}>Goleador Actual</div>
              <div style={st.footerValue}>Juan S. (8 goles)</div>
            </div>
          </div>
        </div>
      </div>

      <ModalPartido partido={modalPartido} onClose={() => setModalPartido(null)} />
    </Layout>
  );
};

const st = {
  container: { display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  subtitle: { fontSize: '0.82rem', color: '#666', marginTop: '0.2rem' },
  faseBtns: { display: 'flex', gap: '0.5rem' },
  faseBtn: { padding: '0.4rem 1rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'pointer', fontSize: '0.82rem', color: '#555' },
  faseBtnActive: { backgroundColor: '#2d9e6b', color: '#ffffff', border: '1px solid #2d9e6b', fontWeight: '600' },

  bracket: { display: 'flex', gap: '1.5rem', flex: 1, alignItems: 'flex-start' },
  columna: { display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 },
  colTitle: { fontSize: '0.75rem', fontWeight: '700', color: '#2d9e6b', letterSpacing: '1px' },
  matchesCol: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  matchesColCenter: { display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'center', flex: 1 },

  matchCard: { backgroundColor: '#ffffff', borderRadius: '8px', padding: '0.6rem 0.85rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '0.35rem', transition: 'box-shadow 0.15s' },
  matchCardHL: { border: '1.5px solid #2d9e6b', boxShadow: '0 2px 8px rgba(45,158,107,0.12)' },
  matchRow: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  ganadorRow: { backgroundColor: '#f0fdf6', borderRadius: '4px', padding: '0 2px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0 },
  teamName: { fontSize: '0.82rem', color: '#1a1a1a', flex: 1 },
  goles: { fontSize: '0.82rem', fontWeight: '700', color: '#1a1a1a', minWidth: '14px', textAlign: 'right' },
  dash: { fontSize: '0.82rem', color: '#bbb', minWidth: '14px', textAlign: 'right' },
  matchMeta: { display: 'flex', gap: '0.75rem', marginTop: '0.2rem', fontSize: '0.65rem', color: '#aaa' },

  finalCard: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '2px solid #2d9e6b', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  finalTeams: { display: 'flex', alignItems: 'center', gap: '1rem' },
  finalTeam: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' },
  finalAvatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', color: '#888', fontWeight: '700' },
  porDefinir: { fontSize: '0.62rem', color: '#888', textAlign: 'center', maxWidth: '70px' },
  vs: { fontSize: '1rem', fontWeight: 'bold', color: '#333' },
  finalInfo: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' },
  finalCancha: { fontSize: '0.78rem', fontWeight: '600', color: '#333' },
  finalFecha: { fontSize: '0.72rem', color: '#888' },
  verDetallesBtn: { backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.55rem 1.25rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px' },
  pendienteBanner: { backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '6px', padding: '0.5rem 0.85rem', fontSize: '0.75rem', color: '#b45309', textAlign: 'center', width: '100%' },

  footerCards: { display: 'flex', gap: '1rem' },
  footerCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '8px', padding: '0.85rem 1rem', border: '1px solid #e0e8f0', display: 'flex', alignItems: 'center', gap: '0.75rem' },
  footerIcon: { fontSize: '1.2rem' },
  footerLabel: { fontSize: '0.72rem', color: '#888' },
  footerValue: { fontSize: '0.85rem', fontWeight: '600', color: '#1a1a1a' },

  // Modal
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', width: '340px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative' },
  cerrar: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  modalFase: { fontSize: '0.7rem', fontWeight: '700', color: '#2d9e6b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1rem' },
  modalTeams: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '1rem' },
  modalTeam: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' },
  modalAvatar: { width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: '700' },
  modalTeamNombre: { fontSize: '0.82rem', fontWeight: '600', color: '#1a1a1a', maxWidth: '80px', textAlign: 'center' },
  modalGol: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  modalVs: { fontSize: '1rem', fontWeight: '700', color: '#888' },
  modalGanadorBadge: { backgroundColor: '#e8f5ee', color: '#2d9e6b', borderRadius: '8px', padding: '0.4rem 1rem', fontSize: '0.82rem', marginBottom: '1rem' },
  modalPendiente: { backgroundColor: '#f5f5f5', color: '#888', borderRadius: '8px', padding: '0.4rem 1rem', fontSize: '0.82rem', marginBottom: '1rem' },
  modalInfoGrid: { display: 'flex', gap: '0.75rem', justifyContent: 'center' },
  modalInfoItem: { display: 'flex', alignItems: 'center', gap: '0.4rem', backgroundColor: '#fafafa', borderRadius: '8px', padding: '0.5rem 0.75rem', border: '1px solid #eee' },
  modalInfoIcon: { fontSize: '1rem' },
  modalInfoLabel: { fontSize: '0.65rem', color: '#888' },
  modalInfoVal: { fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a' },
};

export default KeysPage;