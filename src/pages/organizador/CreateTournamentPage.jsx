import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const ModalConfirmar = ({ onCancel, onConfirm }) => (
  <div style={m.overlay}>
    <div style={m.modal}>
      <div style={m.iconWrap}>
        <span style={m.iconText}>?</span>
      </div>
      <h2 style={m.titulo}>¿Confirmar creación del torneo?</h2>
      <p style={m.desc}>
        El torneo quedará guardado en estado{' '}
        <span style={{ color: '#888', fontWeight: '600' }}>Borrador</span>. Podrás editarlo o
        iniciarlo desde la sección <strong>Torneos</strong> cuando estés listo.
      </p>
      <div style={m.btns}>
        <button style={m.btnCancelar} onClick={onCancel}>Cancelar</button>
        <button style={m.btnConfirmar} onClick={onConfirm}>Crear torneo</button>
      </div>
    </div>
  </div>
);

const m = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff', borderRadius: '12px',
    padding: '2.25rem 2rem 1.75rem', width: '340px', textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
  },
  iconWrap: {
    width: '52px', height: '52px', borderRadius: '50%',
    backgroundColor: '#e8f5ee', display: 'flex',
    alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.1rem',
  },
  iconText: { fontSize: '1.5rem', fontWeight: '700', color: '#2d9e6b', lineHeight: 1 },
  titulo: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.75rem', lineHeight: '1.4' },
  desc: { fontSize: '0.82rem', color: '#666', marginBottom: '1.6rem', lineHeight: '1.6' },
  btns: { display: 'flex', gap: '0.75rem' },
  btnCancelar: {
    flex: 1, padding: '0.65rem', border: '1.5px solid #ddd', borderRadius: '8px',
    backgroundColor: 'transparent', color: '#555', fontSize: '0.88rem', fontWeight: '500', cursor: 'pointer',
  },
  btnConfirmar: {
    flex: 1, padding: '0.65rem', border: 'none', borderRadius: '8px',
    backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer',
  },
};

const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showModal, setShowModal] = useState(false);
  const [canchas, setCanchas] = useState({ principal: true, auxiliar: true, polideportivo: false });
  const [franjas, setFranjas] = useState({ manana: false, tarde: false, noche: true });
  const [form, setForm] = useState({ fechaInicio: '', fechaFin: '', cupos: '', costo: '', estado: 'Borrador' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleCrearClick = () => {
    if (!form.fechaInicio || !form.fechaFin || !form.cupos || !form.costo) {
      alert('Por favor completa todos los campos obligatorios antes de crear el torneo.');
      return;
    }
    setShowModal(true);
  };

  return (
    <Layout userName={user.name} userRole="Organizador" menuType="organizador">
      <div style={s.titleRow}>
        <div>
          <h1 style={s.pageTitle}>CREA TU TORNEO</h1>
          <p style={s.sub}>Crea y configura el siguiente torneo de la temporada</p>
        </div>
        <button style={s.crearBtn}>📋 Crear Nuevo Torneo</button>
      </div>

      <div style={s.grid}>
        <div style={s.col}>
          <div style={s.card}>
            <div style={s.cardTitle}>ℹ Información General</div>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>FECHA DE INICIO *</label>
                <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} style={s.input} />
              </div>
              <div style={s.field}>
                <label style={s.label}>FECHA DE FIN *</label>
                <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} style={s.input} />
              </div>
            </div>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>CUPOS DE EQUIPOS *</label>
                <input type="number" name="cupos" value={form.cupos} onChange={handleChange} placeholder="Ej: 16" style={s.input} />
              </div>
              <div style={s.field}>
                <label style={s.label}>COSTO DE INSCRIPCION *</label>
                <input type="text" name="costo" value={form.costo} onChange={handleChange} placeholder="$ 0.000" style={s.input} />
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>ESTADO DEL TORNEO</label>
              <select name="estado" value={form.estado} onChange={handleChange} style={s.input}>
                <option>Borrador</option>
                <option>Activo</option>
                <option>Finalizado</option>
              </select>
            </div>
          </div>

          <div style={s.card}>
            <div style={s.cardTitle}>📅 Logística y Programación</div>
            <div style={s.logisticaGrid}>
              <div>
                <div style={s.subLabel}>FECHAS IMPORTANTES</div>
                <div style={s.fechaRow}>
                  <input type="text" placeholder="Label" style={{ ...s.input, width: '80px', fontSize: '0.75rem' }} />
                  <input type="date" style={{ ...s.input, flex: 1, fontSize: '0.75rem' }} />
                </div>
                <div style={s.agregarFecha}>+ Agregar fecha</div>
              </div>
              <div>
                <div style={s.subLabel}>CANCHAS DISPONIBLES</div>
                {[
                  { key: 'principal', label: 'Cancha Principal (A)' },
                  { key: 'auxiliar', label: 'Cancha Auxiliar (B)' },
                  { key: 'polideportivo', label: 'Polideportivo Municipal' },
                ].map(c => (
                  <div key={c.key} style={s.checkRow}>
                    <input type="checkbox" checked={canchas[c.key]}
                      onChange={() => setCanchas({ ...canchas, [c.key]: !canchas[c.key] })}
                      style={{ accentColor: '#2d9e6b' }} />
                    <span style={s.checkLabel}>{c.label}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={s.subLabel}>FRANJAS HORARIAS</div>
                {[
                  { key: 'manana', label: 'Mañana', hora: '08:00 – 12:00' },
                  { key: 'tarde', label: 'Tarde', hora: '14:00 – 18:00' },
                  { key: 'noche', label: 'Noche', hora: '19:00 – 22:00' },
                ].map(f => (
                  <div key={f.key}
                    style={{ ...s.franjaCard, ...(franjas[f.key] ? s.franjaActive : {}) }}
                    onClick={() => setFranjas({ ...franjas, [f.key]: !franjas[f.key] })}>
                    <div style={s.franjaNombre}>{f.label}</div>
                    <div style={s.franjaHora}>{f.hora}</div>
                  </div>
                ))}
                <div style={s.configHorario}>Configura Horario</div>
              </div>
            </div>
          </div>
        </div>

        <div style={s.colRight}>
          <div style={s.card}>
            <div style={s.cardTitle}>📄 Reglamento y Sanciones</div>
            <div style={s.subLabel}>REGLAMENTO (PDF/TEXTO)</div>
            <div style={s.uploadBox}>
              <div style={s.uploadIcon}>📄</div>
              <div style={s.uploadText}>Sube el reglamento oficial</div>
            </div>
            <div style={s.subLabel}>SANCIONES PREDETERMINADAS</div>
            <textarea placeholder="Describe las sanciones que aplican en este torneo..." style={s.textarea} />
          </div>
        </div>
      </div>

      <div style={s.footerBtns}>
        <button style={s.btnCancelar} onClick={() => navigate('/organizador/torneos')}>Cancelar y Borrar</button>
        <button style={s.btnCrear} onClick={handleCrearClick}>✓ Crear Torneo Oficial</button>
      </div>

      {showModal && (
        <ModalConfirmar
          onCancel={() => setShowModal(false)}
          onConfirm={() => { setShowModal(false); navigate('/organizador/torneos'); }}
        />
      )}
    </Layout>
  );
};

const s = {
  titleRow: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' },
  pageTitle: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  sub: { fontSize: '0.78rem', color: '#888', marginTop: '0.2rem' },
  crearBtn: { padding: '0.65rem 1.25rem', backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' },
  grid: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },
  col: { flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' },
  colRight: { flex: 1 },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e0e8f0' },
  cardTitle: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '1rem' },
  row2: { display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem', flex: 1 },
  label: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  input: { padding: '0.55rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#ffffff', color: '#333', fontSize: '0.85rem', outline: 'none', width: '100%' },
  logisticaGrid: { display: 'flex', gap: '1rem' },
  subLabel: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600', marginBottom: '0.5rem' },
  fechaRow: { display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' },
  agregarFecha: { fontSize: '0.75rem', color: '#2d9e6b', cursor: 'pointer', marginTop: '0.25rem' },
  checkRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' },
  checkLabel: { fontSize: '0.78rem', color: '#555' },
  franjaCard: { padding: '0.4rem 0.6rem', borderRadius: '6px', border: '1px solid #ddd', marginBottom: '0.4rem', cursor: 'pointer' },
  franjaActive: { backgroundColor: '#e8f5ee', border: '1px solid #2d9e6b' },
  franjaNombre: { fontSize: '0.7rem', color: '#888', textTransform: 'uppercase' },
  franjaHora: { fontSize: '0.78rem', color: '#1a1a1a', fontWeight: '600' },
  configHorario: { fontSize: '0.72rem', color: '#2d9e6b', cursor: 'pointer', marginTop: '0.4rem' },
  uploadBox: { border: '2px dashed #ddd', borderRadius: '8px', padding: '1.5rem', textAlign: 'center', marginBottom: '1rem', cursor: 'pointer' },
  uploadIcon: { fontSize: '1.5rem', marginBottom: '0.4rem' },
  uploadText: { fontSize: '0.75rem', color: '#888' },
  textarea: { width: '100%', minHeight: '80px', padding: '0.65rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#ffffff', color: '#555', fontSize: '0.8rem', outline: 'none', resize: 'vertical' },
  footerBtns: { display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' },
  btnCancelar: { padding: '0.65rem 1.25rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', fontSize: '0.85rem', cursor: 'pointer' },
  btnCrear: { padding: '0.65rem 1.5rem', border: 'none', borderRadius: '8px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

export default CreateTournamentPage;