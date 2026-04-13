import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const TorneosPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const kpis = [
    { label: 'TOTAL', value: '5' },
    { label: 'EN PROGRESO', value: '1' },
    { label: 'BORRADORES', value: '2', highlight: true },
    { label: 'FINALIZADOS', value: '2' },
  ];

  const activos = [
    { nombre: 'TEMPORADA 2026 – I SEMESTRE', fechas: '15 Mar – 26 Jun 2026', equipos: '10 equipos', cancha: 'Cancha A y B', progreso: 58, total: 32, estado: 'En progreso', tipo: 'activo' },
    { nombre: 'LIGA JUNIORS 2026', fechas: '01 May – 16 Jun 2026', equipos: '8 / 12 equipos inscritos', cancha: '', progreso: 15, total: 100, estado: 'Activo', tipo: 'activo_sel' },
  ];

  const borradores = [
    { nombre: 'COPA INTERNA 2026', fechas: '07 Ago – 10 Oct 2026', equipos: '0 / 11 equipos', estado: 'Borrador' },
  ];

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <div style={s.titleRow}>
        <div>
          <h1 style={s.pageTitle}>TORNEOS</h1>
          <p style={s.sub}>Gestiona, inicia y finaliza los torneos de la temporada</p>
        </div>
        <button style={s.crearBtn} onClick={() => navigate('/organizador/crear-torneo')}>
          📋 Crear Nuevo Torneo
        </button>
      </div>

      <div style={s.kpiRow}>
        {kpis.map((k, i) => (
          <div key={i} style={{ ...s.kpiCard, ...(k.highlight ? s.kpiHighlight : {}) }}>
            <div style={s.kpiLabel}>{k.label}</div>
            <div style={{ ...s.kpiValue, ...(k.highlight ? s.kpiValueHighlight : {}) }}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={s.seccionLabel}>ACTIVOS Y EN PROGRESO</div>
      <div style={s.torneosLista}>
        {activos.map((t, i) => (
          <div key={i} style={{ ...s.torneoCard, ...(t.tipo === 'activo_sel' ? s.torneoCardSel : {}) }}>
            <div style={s.torneoHeader}>
              <span style={s.torneoNombre}>{t.nombre}</span>
              <span style={{ ...s.estadoBadge, color: '#2d9e6b' }}>● {t.estado}</span>
            </div>
            <div style={s.torneoMeta}>
              📅 {t.fechas} &nbsp;·&nbsp; {t.equipos} {t.cancha && `· ${t.cancha}`}
            </div>
            <div style={s.progresoLabel}>Partidos</div>
            <div style={s.progresoBar}>
              <div style={{ ...s.progresoFill, width: `${(t.progreso / t.total) * 100}%` }} />
            </div>
            <div style={s.progresoNum}>{t.progreso} / {t.total}</div>
            <div style={s.torneoActions}>
              <button style={s.btnConsultar}>📋 Consultar partidos</button>
              <button style={s.btnFinalizar}>■ Finalizar torneo</button>
            </div>
          </div>
        ))}
      </div>

      <div style={s.seccionLabel}>BORRADORES</div>
      <div style={s.torneosLista}>
        {borradores.map((t, i) => (
          <div key={i} style={s.torneoCard}>
            <div style={s.torneoHeader}>
              <span style={s.torneoNombre}>{t.nombre}</span>
              <span style={{ ...s.estadoBadge, color: '#888' }}>● {t.estado}</span>
            </div>
            <div style={s.torneoMeta}>📅 {t.fechas} &nbsp;·&nbsp; {t.equipos}</div>
            <div style={s.torneoActions}>
              <button style={s.btnConsultar}>✏ Editar torneo</button>
              <button style={{ ...s.btnFinalizar, backgroundColor: 'transparent', color: '#2d9e6b', border: '1px solid #2d9e6b' }}>
                ▶ Iniciar torneo
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

const s = {
  titleRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' },
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  sub: { fontSize: '0.78rem', color: '#888', marginTop: '0.2rem' },
  crearBtn: { padding: '0.65rem 1.25rem', backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
  kpiRow: { display: 'flex', gap: '1rem', marginBottom: '1.5rem' },
  kpiCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '10px', padding: '0.85rem 1.25rem', border: '1px solid #e0e8f0' },
  kpiHighlight: { border: '1px solid #2d9e6b' },
  kpiLabel: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.4rem' },
  kpiValue: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  kpiValueHighlight: { color: '#2d9e6b' },
  seccionLabel: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', fontWeight: '600' },
  torneosLista: { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' },
  torneoCard: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e0e8f0' },
  torneoCardSel: { border: '1.5px solid #2d9e6b' },
  torneoHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' },
  torneoNombre: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a' },
  estadoBadge: { fontSize: '0.75rem', fontWeight: '600' },
  torneoMeta: { fontSize: '0.72rem', color: '#888', marginBottom: '0.6rem' },
  progresoLabel: { fontSize: '0.7rem', color: '#888', marginBottom: '0.25rem' },
  progresoBar: { height: '6px', backgroundColor: '#e0e8f0', borderRadius: '3px', marginBottom: '0.25rem' },
  progresoFill: { height: '100%', backgroundColor: '#2d9e6b', borderRadius: '3px' },
  progresoNum: { fontSize: '0.7rem', color: '#888', marginBottom: '0.75rem', textAlign: 'right' },
  torneoActions: { display: 'flex', gap: '0.75rem' },
  btnConsultar: { padding: '0.45rem 1rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: 'transparent', color: '#666', fontSize: '0.78rem', cursor: 'pointer' },
  btnFinalizar: { padding: '0.45rem 1rem', border: 'none', borderRadius: '6px', backgroundColor: '#e0e8f0', color: '#555', fontSize: '0.78rem', cursor: 'pointer' },
};

export default TorneosPage;