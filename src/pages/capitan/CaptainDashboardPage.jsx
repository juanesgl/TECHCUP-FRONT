import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const JUGADORES_CANCHA = [
  { nombre: 'BAUTISTA',  x: 6,  y: 50, color: '#f6c90e', pos: 'POR' },
  { nombre: 'DOAKES',    x: 20, y: 18, color: '#3b82f6',  pos: 'DEF' },
  { nombre: 'KEVIN',     x: 20, y: 40, color: '#3b82f6',  pos: 'DEF' },
  { nombre: 'NORRIS',    x: 20, y: 62, color: '#3b82f6',  pos: 'DEF' },
  { nombre: 'RAMBO',     x: 20, y: 82, color: '#3b82f6',  pos: 'DEF' },
  { nombre: 'JACKIE',    x: 45, y: 25, color: '#2d9e6b',  pos: 'MED' },
  { nombre: 'RAMIREZ',   x: 45, y: 50, color: '#2d9e6b',  pos: 'MED' },
  { nombre: 'DISEL',     x: 45, y: 75, color: '#2d9e6b',  pos: 'MED' },
  { nombre: 'SANCHEZ',   x: 72, y: 20, color: '#e53e3e',  pos: 'DEL' },
  { nombre: 'PITBULL',   x: 72, y: 50, color: '#e53e3e',  pos: 'DEL' },
  { nombre: 'D. ALVAREZ',x: 72, y: 80, color: '#ffffff',  pos: 'DEL', esCap: true },
];

const REGLAMENTO = [
  { icono: '⏱', titulo: 'Duración',        texto: '40 min (2 × 20 min)' },
  { icono: '👥', titulo: 'Plantilla',       texto: '7 mín – 12 máx jugadores' },
  { icono: '🟨', titulo: 'Amarillas',       texto: '2 amarillas = expulsión' },
  { icono: '🟥', titulo: 'Roja directa',   texto: 'Suspensión 1 partido' },
  { icono: '💰', titulo: 'Inscripción',     texto: 'Pago antes del inicio' },
  { icono: '📋', titulo: 'Alineación',      texto: 'Entregar 30 min antes' },
];

const CaptainDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const equipoData = JSON.parse(localStorage.getItem('equipoData') || 'null');
  const navigate = useNavigate();

  const [reglamentoAbierto, setReglamentoAbierto] = useState(false);
  const [jugadorHover, setJugadorHover] = useState(null);

  const tarjetas = [
    { nombre: 'S. Martinez', numero: 'FC', tarjeta: 'AMARILLA', color: '#f6c90e' },
    { nombre: 'K. Perez',    numero: 'PB', tarjeta: 'ROJA',     color: '#e53e3e' },
    { nombre: 'M. Gomez',    numero: 'MS', tarjeta: 'AMARILLA', color: '#f6c90e' },
  ];

  const equipoNombre = equipoData?.nombre || 'NOMBRE DEL EQUIPO FC';
  const colorPrimario = equipoData?.colorPrimario || '#e53e3e';
  const escudo = equipoData?.escudo || null;

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>

        {/* ── Fila superior ── */}
        <div style={s.topRow}>

          {/* Alineación */}
          <div style={s.alineacionCard}>
            <div style={s.cardTitleRow}>
              <h3 style={s.cardTitle}>ALINEACIONES</h3>
              {/* Banner reglamento — discreto, arriba a la derecha */}
              <button style={s.reglamentoBtn} onClick={() => setReglamentoAbierto(true)}>
                📋 Reglamento
              </button>
            </div>

            <div style={s.equipoInfo}>
              <div style={{ ...s.equipoAvatar, backgroundColor: colorPrimario }}>
                {escudo
                  ? <img src={escudo} alt="Escudo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                  : <span style={{ fontSize: '1rem' }}>⚽</span>
                }
              </div>
              <div>
                <div style={s.equipoNombre}>{equipoNombre}</div>
                <div style={s.uniformeInfo}>
                  <span style={{ ...s.uniformeDot, backgroundColor: colorPrimario }} /> UNIFORME LOCAL
                </div>
              </div>
              <button style={s.editarBtn} onClick={() => navigate('/capitan/alineacion')}>EDITAR</button>
            </div>

            {/* Campo con la alineación del capitán */}
            <div style={s.campo}>
              <div style={s.lineaMedia} />
              <div style={s.circuloCentral} />
              <div style={s.arcoIzq} />
              <div style={s.arcoDer} />
              <div style={s.areaIzq} />
              <div style={s.areaDer} />

              {JUGADORES_CANCHA.map((j, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setJugadorHover(i)}
                  onMouseLeave={() => setJugadorHover(null)}
                  style={{
                    ...s.dot,
                    left: `${j.x}%`,
                    top: `${j.y}%`,
                    backgroundColor: j.color,
                    border: j.esCap
                      ? '2px solid #f6c90e'
                      : '2px solid rgba(255,255,255,0.6)',
                    boxShadow: j.esCap ? '0 0 0 3px rgba(246,201,14,0.4)' : 'none',
                    zIndex: jugadorHover === i ? 20 : 10,
                  }}
                >
                  {j.esCap && <span style={s.capBand}>C</span>}
                  <span style={{ ...s.dotNombre, color: j.esCap ? '#f6c90e' : '#fff' }}>
                    {j.nombre}
                  </span>
                  {/* Tooltip al hover */}
                  {jugadorHover === i && (
                    <div style={s.tooltip}>
                      <div style={s.tooltipNombre}>{j.nombre}</div>
                      <div style={s.tooltipPos}>{j.pos}{j.esCap ? ' · Capitán' : ''}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Leyenda posiciones */}
            <div style={s.leyenda}>
              {[['#f6c90e','POR'],['#3b82f6','DEF'],['#2d9e6b','MED'],['#e53e3e','DEL'],['#ffffff','CAP']].map(([c,l]) => (
                <div key={l} style={s.leyendaItem}>
                  <div style={{ ...s.leyendaDot, backgroundColor: c, border: l === 'CAP' ? '1.5px solid #f6c90e' : 'none' }} />
                  <span style={s.leyendaLabel}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tarjetas */}
          <div style={s.tarjetasCard}>
            <h3 style={s.cardTitle}>TARJETAS DEL EQUIPO</h3>
            <div style={s.tarjetasResumen}>
              <div style={s.tarjetaCount}>
                <div style={s.tarjetaAmarilla} />
                <div style={s.tarjetaNum}>2</div>
                <div style={s.tarjetaLabel}>AMARILLAS</div>
              </div>
              <div style={s.tarjetaCount}>
                <div style={s.tarjetaRoja} />
                <div style={s.tarjetaNum}>1</div>
                <div style={s.tarjetaLabel}>ROJAS</div>
              </div>
            </div>
            <div style={s.divider} />
            <div style={s.tarjetasList}>
              {tarjetas.map((t, i) => (
                <div key={i} style={s.tarjetaRow}>
                  <div style={s.jugAvatar}>{t.numero}</div>
                  <span style={s.jugNombre}>{t.nombre}</span>
                  <div style={s.tarjetaBadge}>
                    <div style={{ ...s.tarjetaIndicador, backgroundColor: t.color }} />
                    <span style={s.tarjetaTipo}>{t.tarjeta}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Aviso de riesgo de suspensión */}
            <div style={s.avisoCard}>
              <span style={s.avisoIcon}>⚠️</span>
              <div>
                <div style={s.avisoTitulo}>Riesgo de suspensión</div>
                <div style={s.avisoDesc}>S. Martinez tiene 2 amarillas — próxima = expulsión</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Próximo partido ── */}
        <div style={s.proximoPartido}>
          <div style={s.proximoInfo}>
            <span style={s.proximoLabel}>Próximo Partido</span>
            <span style={s.proximoRival}>vs WD-40</span>
          </div>
          <div style={s.proximoFecha}>
            <span style={s.proximoMes}>MAR</span>
            <span style={s.proximoDia}>12</span>
          </div>
          <div style={s.proximoHora}>14:30</div>
          <div style={s.proximoCancha}>Cancha 1</div>
          <span style={s.proximoIcon}>⚽</span>
        </div>
      </div>

      {/* ── Modal Reglamento ── */}
      {reglamentoAbierto && (
        <div style={s.overlay} onClick={() => setReglamentoAbierto(false)}>
          <div style={s.reglamentoModal} onClick={e => e.stopPropagation()}>
            <button style={s.cerrar} onClick={() => setReglamentoAbierto(false)}>✕</button>
            <div style={s.reglamentoHeader}>
              <div style={s.reglamentoIcono}>📋</div>
              <div>
                <div style={s.reglamentoTitulo}>REGLAMENTO DEL TORNEO</div>
                <div style={s.reglamentoSub}>Normas que aplican a todos los equipos</div>
              </div>
            </div>
            <div style={s.reglamentoGrid}>
              {REGLAMENTO.map((r, i) => (
                <div key={i} style={s.reglamentoItem}>
                  <span style={s.reglamentoItemIcono}>{r.icono}</span>
                  <div>
                    <div style={s.reglamentoItemTitulo}>{r.titulo}</div>
                    <div style={s.reglamentoItemTexto}>{r.texto}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={s.reglamentoFooter}>
              El reglamento completo está disponible en el documento oficial del torneo.
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' },
  topRow: { display: 'flex', gap: '1.25rem', flex: 1 },

  alineacionCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem', flex: 1.5, border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  tarjetasCard:   { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.25rem', flex: 1,   border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '0.75rem' },

  cardTitleRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  cardTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '1px' },

  reglamentoBtn: { display: 'flex', alignItems: 'center', gap: '0.3rem', padding: '0.3rem 0.7rem', backgroundColor: '#f0f7ff', border: '1px solid #d0e4f7', borderRadius: '20px', fontSize: '0.7rem', color: '#1a7a8a', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },

  equipoInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  equipoAvatar: { width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 },
  equipoNombre: { fontSize: '0.82rem', fontWeight: '700', color: '#1a1a1a' },
  uniformeInfo: { display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: '#888' },
  uniformeDot: { width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block' },
  editarBtn: { marginLeft: 'auto', padding: '0.35rem 0.85rem', backgroundColor: 'transparent', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer', color: '#555', fontWeight: '600' },

  campo: { backgroundColor: '#2d7a3a', borderRadius: '8px', flex: 1, minHeight: '200px', position: 'relative', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)' },
  lineaMedia: { position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', backgroundColor: 'rgba(255,255,255,0.3)' },
  circuloCentral: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '60px', height: '60px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)' },
  arcoIzq: { position: 'absolute', top: '30%', left: 0, width: '28px', height: '40%', border: '2px solid rgba(255,255,255,0.3)', borderLeft: 'none', borderRadius: '0 8px 8px 0' },
  arcoDer: { position: 'absolute', top: '30%', right: 0, width: '28px', height: '40%', border: '2px solid rgba(255,255,255,0.3)', borderRight: 'none', borderRadius: '8px 0 0 8px' },
  areaIzq: { position: 'absolute', top: '20%', left: 0, width: '50px', height: '60%', border: '2px solid rgba(255,255,255,0.15)', borderLeft: 'none', borderRadius: '0 4px 4px 0' },
  areaDer: { position: 'absolute', top: '20%', right: 0, width: '50px', height: '60%', border: '2px solid rgba(255,255,255,0.15)', borderRight: 'none', borderRadius: '4px 0 0 4px' },

  dot: { position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', transform: 'translate(-50%,-50%)', cursor: 'default' },
  capBand: { position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.45rem', backgroundColor: '#f6c90e', color: '#1a1a1a', borderRadius: '3px', padding: '0 2px', fontWeight: '800', lineHeight: '1.4' },
  dotNombre: { position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.45rem', whiteSpace: 'nowrap', fontWeight: '700', textShadow: '0 1px 2px rgba(0,0,0,0.9)' },
  tooltip: { position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'rgba(0,0,0,0.85)', borderRadius: '6px', padding: '0.3rem 0.5rem', whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 30 },
  tooltipNombre: { fontSize: '0.65rem', fontWeight: '700', color: '#fff' },
  tooltipPos: { fontSize: '0.6rem', color: '#aaa' },

  leyenda: { display: 'flex', gap: '0.75rem', justifyContent: 'center', paddingTop: '0.25rem' },
  leyendaItem: { display: 'flex', alignItems: 'center', gap: '0.3rem' },
  leyendaDot: { width: '10px', height: '10px', borderRadius: '50%' },
  leyendaLabel: { fontSize: '0.62rem', color: '#888', fontWeight: '600' },

  tarjetasResumen: { display: 'flex', gap: '1.5rem', justifyContent: 'center', padding: '0.5rem 0' },
  tarjetaCount: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' },
  tarjetaAmarilla: { width: '30px', height: '40px', backgroundColor: '#f6c90e', borderRadius: '4px' },
  tarjetaRoja:     { width: '30px', height: '40px', backgroundColor: '#e53e3e', borderRadius: '4px' },
  tarjetaNum: { fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a1a' },
  tarjetaLabel: { fontSize: '0.65rem', color: '#888', letterSpacing: '0.5px' },
  divider: { height: '1px', backgroundColor: '#f0f0f0' },
  tarjetasList: { display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 },
  tarjetaRow: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  jugAvatar: { width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#e8f0f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: '700', color: '#555' },
  jugNombre: { flex: 1, fontSize: '0.82rem', color: '#1a1a1a' },
  tarjetaBadge: { display: 'flex', alignItems: 'center', gap: '0.3rem' },
  tarjetaIndicador: { width: '10px', height: '14px', borderRadius: '2px' },
  tarjetaTipo: { fontSize: '0.7rem', color: '#888' },

  avisoCard: { display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '8px', padding: '0.65rem 0.85rem', marginTop: 'auto' },
  avisoIcon: { fontSize: '1rem', flexShrink: 0 },
  avisoTitulo: { fontSize: '0.75rem', fontWeight: '700', color: '#b45309' },
  avisoDesc: { fontSize: '0.68rem', color: '#92400e', marginTop: '0.1rem', lineHeight: '1.4' },

  proximoPartido: { background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', borderRadius: '12px', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#ffffff' },
  proximoInfo: { display: 'flex', flexDirection: 'column', flex: 1 },
  proximoLabel: { fontSize: '0.75rem', opacity: '0.8' },
  proximoRival: { fontSize: '0.9rem', fontWeight: '600' },
  proximoFecha: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '0.4rem 0.75rem' },
  proximoMes: { fontSize: '0.65rem', opacity: '0.8' },
  proximoDia: { fontSize: '1.2rem', fontWeight: 'bold' },
  proximoHora: { fontSize: '1rem', fontWeight: '600' },
  proximoCancha: { fontSize: '0.82rem', opacity: '0.85' },
  proximoIcon: { fontSize: '1.5rem' },

  // Modal reglamento
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  reglamentoModal: { backgroundColor: '#fff', borderRadius: '16px', padding: '1.75rem', width: '420px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative' },
  cerrar: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  reglamentoHeader: { display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' },
  reglamentoIcono: { fontSize: '1.8rem' },
  reglamentoTitulo: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.1rem', letterSpacing: '1px', color: '#1a1a1a' },
  reglamentoSub: { fontSize: '0.72rem', color: '#888', marginTop: '0.1rem' },
  reglamentoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '1rem' },
  reglamentoItem: { display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: '#f8fbff', borderRadius: '8px', padding: '0.65rem 0.75rem', border: '1px solid #e8f0f7' },
  reglamentoItemIcono: { fontSize: '1.1rem', flexShrink: 0 },
  reglamentoItemTitulo: { fontSize: '0.72rem', fontWeight: '700', color: '#1a1a1a' },
  reglamentoItemTexto: { fontSize: '0.68rem', color: '#666', marginTop: '0.1rem', lineHeight: '1.4' },
  reglamentoFooter: { fontSize: '0.68rem', color: '#aaa', textAlign: 'center', borderTop: '1px solid #f0f0f0', paddingTop: '0.75rem' },
};

export default CaptainDashboardPage;