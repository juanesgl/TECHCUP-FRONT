import { useState } from 'react';
import Layout from '../../components/Layout';

const PagosOrganizadorPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [pagina, setPagina] = useState(1);
  const [pagos, setPagos] = useState([
    { id: 1, equipo: 'Real Madrid CF', capitan: 'Juan Perez', estado: 'Pendiente' },
    { id: 2, equipo: 'FC Barcelona', capitan: 'Carlos Ruiz', estado: 'Pendiente' },
    { id: 3, equipo: 'Manchester City', capitan: 'Liam Smith', estado: 'Pendiente' },
  ]);

  const kpis = [
    { label: 'PENDIENTES', value: 12, icon: '📋', iconColor: '#f5c542' },
    { label: 'APROBADOS', value: 10, icon: '✓', iconColor: '#2d9e6b' },
    { label: 'RECHAZADOS', value: 3, icon: '✕', iconColor: '#e05c5c' },
  ];

  const handleAceptar = (id) => setPagos(pagos.map(p => p.id === id ? { ...p, estado: 'Aprobado' } : p));
  const handleRechazar = (id) => setPagos(pagos.map(p => p.id === id ? { ...p, estado: 'Rechazado' } : p));

  const estadoColor = (estado) => {
    if (estado === 'Aprobado') return { bg: '#e8f5ee', color: '#2d9e6b' };
    if (estado === 'Rechazado') return { bg: '#fff0f0', color: '#e05c5c' };
    return { bg: '#fffbe6', color: '#d4a800' };
  };

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <h1 style={s.pageTitle}>APROBAR PAGOS</h1>
      <p style={s.sub}>Gestión y validación de comprobantes de pago de los equipos registrados.</p>

      <div style={s.kpiRow}>
        {kpis.map((k, i) => (
          <div key={i} style={s.kpiCard}>
            <div style={s.kpiTop}>
              <div style={s.kpiLabel}>{k.label}</div>
              <span style={{ color: k.iconColor, fontSize: '1rem' }}>{k.icon}</span>
            </div>
            <div style={s.kpiValue}>{k.value}</div>
          </div>
        ))}
      </div>

      <div style={s.tableCard}>
        <table style={s.table}>
          <thead>
            <tr style={s.tableHead}>
              <th style={s.th}>EQUIPO</th>
              <th style={s.th}>CAPITAN</th>
              <th style={s.th}>COMPROBANTE</th>
              <th style={s.th}>ESTADO</th>
              <th style={s.th}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p) => {
              const colores = estadoColor(p.estado);
              return (
                <tr key={p.id} style={s.tr}>
                  <td style={s.td}>
                    <div style={s.equipoCell}>
                      <div style={s.equipoDot} />
                      {p.equipo}
                    </div>
                  </td>
                  <td style={s.td}>{p.capitan}</td>
                  <td style={s.td}>
                    <span style={s.verPdf}>📄 Ver PDF</span>
                  </td>
                  <td style={s.td}>
                    <span style={{ ...s.estadoBadge, backgroundColor: colores.bg, color: colores.color }}>
                      {p.estado}
                    </span>
                  </td>
                  <td style={s.td}>
                    <div style={s.acciones}>
                      {p.estado === 'Pendiente' && (
                        <>
                          <button style={s.btnAceptar} onClick={() => handleAceptar(p.id)}>✓ Aceptar</button>
                          <button style={s.btnRechazar} onClick={() => handleRechazar(p.id)}>✕ Rechazar</button>
                        </>
                      )}
                      {p.estado === 'Aprobado' && <span style={{ color: '#2d9e6b', fontSize: '0.78rem' }}>✓ Aprobado</span>}
                      {p.estado === 'Rechazado' && <span style={{ color: '#e05c5c', fontSize: '0.78rem' }}>✕ Rechazado</span>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={s.pagination}>
          <span style={s.paginaInfo}>Mostrando 1-3 de 12 equipos pendientes</span>
          <div style={s.paginaBtns}>
            <button style={s.paginaBtn} onClick={() => setPagina(Math.max(1, pagina - 1))}>‹</button>
            {[1, 2, 3].map(n => (
              <button key={n}
                style={{ ...s.paginaBtn, ...(pagina === n ? s.paginaBtnActive : {}) }}
                onClick={() => setPagina(n)}>
                {n}
              </button>
            ))}
            <button style={s.paginaBtn} onClick={() => setPagina(Math.min(3, pagina + 1))}>›</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const s = {
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px', marginBottom: '0.25rem' },
  sub: { fontSize: '0.78rem', color: '#888', marginBottom: '1.25rem' },
  kpiRow: { display: 'flex', gap: '1rem', marginBottom: '1.25rem' },
  kpiCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: '10px', padding: '1rem 1.25rem', border: '1px solid #e0e8f0' },
  kpiTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' },
  kpiLabel: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  kpiValue: { fontSize: '1.8rem', fontWeight: '700', color: '#1a1a1a' },
  tableCard: { backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e0e8f0', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHead: { borderBottom: '1px solid #e0e8f0' },
  th: { padding: '0.75rem 1rem', fontSize: '0.7rem', color: '#888', textAlign: 'left', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '0.85rem 1rem', fontSize: '0.82rem', color: '#333' },
  equipoCell: { display: 'flex', alignItems: 'center', gap: '0.6rem' },
  equipoDot: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2d9e6b', minWidth: '8px' },
  verPdf: { fontSize: '0.78rem', color: '#2d9e6b', cursor: 'pointer' },
  estadoBadge: { fontSize: '0.72rem', fontWeight: '600', padding: '0.2rem 0.65rem', borderRadius: '10px' },
  acciones: { display: 'flex', gap: '0.5rem' },
  btnAceptar: { padding: '0.3rem 0.75rem', border: 'none', borderRadius: '6px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' },
  btnRechazar: { padding: '0.3rem 0.75rem', border: 'none', borderRadius: '6px', backgroundColor: '#e05c5c', color: '#ffffff', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' },
  pagination: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', borderTop: '1px solid #e0e8f0' },
  paginaInfo: { fontSize: '0.75rem', color: '#888' },
  paginaBtns: { display: 'flex', gap: '0.4rem' },
  paginaBtn: { width: '28px', height: '28px', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: 'transparent', color: '#666', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  paginaBtnActive: { backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none' },
};

export default PagosOrganizadorPage;