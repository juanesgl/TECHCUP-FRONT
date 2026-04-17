import { useState } from 'react';
import Layout from '../components/Layout';

const BarChart = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));
  const colors = ['#2d9e6b', '#f5c542', '#e05c5c', '#1a7a8a'];
  return (
    <svg width="100%" height="140" viewBox="0 0 260 140">
      {data.map((d, i) => {
        const barH = (d.value / max) * 100;
        const x = i * 65 + 10;
        const y = 110 - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width="45" height={barH} rx="4" fill={colors[i % colors.length]} />
            <text x={x + 22} y={125} textAnchor="middle" fontSize="9" fill="#888">{d.label}</text>
            <text x={x + 22} y={y - 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#333">{d.value}</text>
          </g>
        );
      })}
    </svg>
  );
};

const DonutChart = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = ['#2d9e6b', '#1a7a8a', '#f5c542', '#e05c5c'];
  let offset = 0;
  const r = 45, cx = 60, cy = 60, stroke = 20;
  const circumference = 2 * Math.PI * r;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eee" strokeWidth={stroke} />
        {data.map((d, i) => {
          const dash = (d.value / total) * circumference;
          const gap = circumference - dash;
          const el = (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={colors[i % colors.length]}
              strokeWidth={stroke}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-offset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#555' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors[i % colors.length] }} />
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatisticsPage = ({menuType}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [temporada] = useState('2026-1');

  const kpis = [
    { label: 'PARTIDOS JUGADOS', value: '48', delta: '+15%', up: true },
    { label: 'EQUIPO MÁS VICTORIAS', value: 'LEONES', sub: '8 Victorias' },
    { label: 'TOTAL GOLES', value: '60', delta: '6', up: true },
    { label: 'PROMEDIO GOLES', value: '2.9', sub: '/ partido' },
  ];

  const desempeno = [
    { label: 'Llano FC', value: 32 },
    { label: 'Dosw FC', value: 28 },
    { label: 'Titanes', value: 22 },
    { label: 'Leones', value: 18 },
  ];

  const distribucion = [
    { label: 'Llano FC', value: 32 },
    { label: 'Dosw FC', value: 28 },
    { label: 'Titanes', value: 22 },
    { label: 'Leones', value: 18 },
  ];

  const goleadores = [
    { nombre: 'Juan Perez', equipo: 'Leones', goles: 8, avatar: 'J' },
    { nombre: 'Juan Suarez', equipo: 'Jugadores', goles: 6, avatar: 'J' },
    { nombre: 'Daniel Costa', equipo: 'Titanes', goles: 5, avatar: 'D' },
  ];

  return (
    <Layout userName={user.name} userRole={user.role} menuType = {menuType}>
      {/* Título */}
      <div style={s.titleRow}>
        <div>
          <h1 style={s.pageTitle}>CENTRO DE ESTADÍSTICAS</h1>
          <p style={s.temporada}>Temporada {temporada}</p>
        </div>
      </div>

      {/* KPIs */}
      <div style={s.kpiRow}>
        {kpis.map((k, i) => (
          <div key={i} style={s.kpiCard}>
            <div style={s.kpiLabel}>{k.label}</div>
            <div style={s.kpiValue}>{k.value}</div>
            {k.delta && (
              <div style={{ ...s.kpiDelta, color: k.up ? '#2d9e6b' : '#e05c5c' }}>
                {k.up ? '▲' : '▼'} {k.delta}
              </div>
            )}
            {k.sub && <div style={s.kpiSub}>{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Gráficas + Goleadores */}
      <div style={s.chartsRow}>
        {/* Barras */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>Desempeño del Torneo</div>
          <BarChart data={desempeno} />
        </div>

        {/* Dona */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>Distribución de Goles</div>
          <DonutChart data={distribucion} />
        </div>

        {/* Top goleadores */}
        <div style={s.chartCard}>
          <div style={s.chartTitle}>Top 3 Goleadores</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.5rem' }}>
            {goleadores.map((g, i) => (
              <div key={i} style={s.goleadorRow}>
                <div style={s.gAvatar}>{g.avatar}</div>
                <div style={s.gInfo}>
                  <div style={s.gNombre}>{g.nombre}</div>
                  <div style={s.gEquipo}>{g.equipo}</div>
                </div>
                <div style={s.gBadge}>
                  <span style={s.gNum}>{g.goles}</span>
                  <span style={s.gLabel}>GOLS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const s = {
  titleRow: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1rem' },
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  temporada: { fontSize: '0.78rem', color: '#888', marginTop: '0.1rem' },
  kpiRow: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
  kpiCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e0e8f0' },
  kpiLabel: { fontSize: '0.65rem', color: '#999', fontWeight: '600', letterSpacing: '0.5px', marginBottom: '0.3rem', textTransform: 'uppercase' },
  kpiValue: { fontSize: '1.6rem', fontWeight: '700', color: '#1a1a1a', lineHeight: '1' },
  kpiDelta: { fontSize: '0.75rem', fontWeight: '600', marginTop: '0.25rem' },
  kpiSub: { fontSize: '0.72rem', color: '#aaa', marginTop: '0.2rem' },
  chartsRow: { display: 'flex', gap: '1rem' },
  chartCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e0e8f0' },
  chartTitle: { fontSize: '0.85rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.75rem' },
  goleadorRow: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0', borderBottom: '1px solid #f5f5f5' },
  gAvatar: { width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem', minWidth: '34px' },
  gInfo: { flex: 1 },
  gNombre: { fontSize: '0.82rem', fontWeight: '600', color: '#1a1a1a' },
  gEquipo: { fontSize: '0.7rem', color: '#888' },
  gBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0faf5', borderRadius: '6px', padding: '0.25rem 0.6rem', minWidth: '40px' },
  gNum: { fontSize: '1rem', fontWeight: '700', color: '#2d9e6b', lineHeight: '1' },
  gLabel: { fontSize: '0.55rem', color: '#2d9e6b', fontWeight: '600' },
};

export default StatisticsPage;