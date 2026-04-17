import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const ModalConfirmar = ({ onCancel, onConfirm }) => (
  <div style={m.overlay}>
    <div style={m.modal}>
      <div style={m.icon}>?</div>
      <div style={m.titulo}>¿Confirmar creación del torneo?</div>
      <div style={m.desc}>
        El torneo quedará guardado en estado{' '}
        <span style={{ color: '#888', fontWeight: '600' }}>Borrador</span>. Podrás editarlo o
        iniciarlo desde la sección <strong>Torneos</strong> cuando estés listo.
      </div>
      <div style={m.btns}>
        <button style={m.btnCancelar} onClick={onCancel}>Cancelar</button>
        <button style={m.btnConfirmar} onClick={onConfirm}>Crear torneo</button>
      </div>
    </div>
  </div>
);

const m = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '2rem', width: '360px', textAlign: 'center', border: '1px solid #e0e8f0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' },
  icon: { width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e8f5ee', color: '#2d9e6b', fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' },
  titulo: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.75rem' },
  desc: { fontSize: '0.8rem', color: '#666', marginBottom: '1.5rem', lineHeight: '1.5' },
  btns: { display: 'flex', gap: '0.75rem' },
  btnCancelar: { flex: 1, padding: '0.65rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', fontSize: '0.85rem', cursor: 'pointer' },
  btnConfirmar: { flex: 1, padding: '0.65rem', border: 'none', borderRadius: '8px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
};

const CreateTournamentPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showModal, setShowModal] = useState(false);
  const [canchas, setCanchas] = useState({ principal: true, auxiliar: true, polideportivo: false });
  const [franjas, setFranjas] = useState({ manana: false, tarde: false, noche: true });
  const [form, setForm] = useState({ fechaInicio: '', fechaFin: '', cupos: '', costo: '', estado: 'Borrador', reglamento: null });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const e = {};

    if (!form.fechaInicio)
      e.fechaInicio = 'La fecha de inicio es obligatoria';

    if (!form.fechaFin)
      e.fechaFin = 'La fecha de fin es obligatoria';

    if (form.fechaInicio && form.fechaFin && form.fechaInicio >= form.fechaFin)
      e.fechaFin = 'La fecha de fin debe ser posterior a la fecha de inicio';

    if (!form.cupos || form.cupos <= 0)
      e.cupos = 'Ingresa un número válido de cupos';

    if (!form.reglamento)
      e.reglamento = 'El reglamento es obligatorio';

    else if (form.cupos < 4)
      e.cupos = 'El mínimo de equipos es 4';
    else if (form.cupos > 32)
      e.cupos = 'El máximo de equipos es 32';

    if (!form.costo || form.costo.trim() === '')
      e.costo = 'El costo de inscripción es obligatorio';

    const ningunaCanchaSeleccionada = !canchas.principal && !canchas.auxiliar && !canchas.polideportivo;
    if (ningunaCanchaSeleccionada)
      e.canchas = 'Selecciona al menos una cancha disponible';

    const ningunaFranjaSeleccionada = !franjas.manana && !franjas.tarde && !franjas.noche;
    if (ningunaFranjaSeleccionada)
      e.franjas = 'Selecciona al menos una franja horaria';


    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCrearClick = () => {
    if (validate()) setShowModal(true);
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
                <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange}
                  style={{ ...s.input, ...(errors.fechaInicio ? s.inputError : {}) }} />
                {errors.fechaInicio && <span style={s.errorMsg}>⚠ {errors.fechaInicio}</span>}
              </div>
              <div style={s.field}>
                <label style={s.label}>FECHA DE FIN *</label>
                <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange}
                  style={{ ...s.input, ...(errors.fechaFin ? s.inputError : {}) }} />
                {errors.fechaFin && <span style={s.errorMsg}>⚠ {errors.fechaFin}</span>}
              </div>
            </div>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>CUPOS DE EQUIPOS *</label>
                <input type="number" name="cupos" value={form.cupos} onChange={handleChange}
                  placeholder="Ej: 8" min="4" max="32"
                  style={{ ...s.input, ...(errors.cupos ? s.inputError : {}) }} />
                {errors.cupos && <span style={s.errorMsg}>⚠ {errors.cupos}</span>}
              </div>
              <div style={s.field}>
                <label style={s.label}>COSTO DE INSCRIPCION *</label>
                <input type="text" name="costo" value={form.costo} onChange={handleChange}
                  placeholder="$ 0.000"
                  style={{ ...s.input, ...(errors.costo ? s.inputError : {}) }} />
                {errors.costo && <span style={s.errorMsg}>⚠ {errors.costo}</span>}
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
                <div style={s.subLabel}>CANCHAS DISPONIBLES *</div>
                {[
                  { key: 'principal',   label: 'Cancha Principal (A)' },
                  { key: 'auxiliar',    label: 'Cancha Auxiliar (B)'  },
                  { key: 'polideportivo', label: 'Polideportivo Municipal' },
                ].map(c => (
                  <div key={c.key} style={s.checkRow}>
                    <input type="checkbox" checked={canchas[c.key]}
                      onChange={() => {
                        setCanchas({ ...canchas, [c.key]: !canchas[c.key] });
                        if (errors.canchas) setErrors({ ...errors, canchas: '' });
                      }}
                      style={{ accentColor: '#2d9e6b' }} />
                    <span style={s.checkLabel}>{c.label}</span>
                  </div>
                ))}
                {errors.canchas && <span style={s.errorMsg}>⚠ {errors.canchas}</span>}
              </div>

              <div>
                <div style={s.subLabel}>FRANJAS HORARIAS *</div>
                {[
                  { key: 'manana', label: 'Mañana', hora: '08:00 – 12:00' },
                  { key: 'tarde',  label: 'Tarde',  hora: '14:00 – 18:00' },
                  { key: 'noche',  label: 'Noche',  hora: '19:00 – 22:00' },
                ].map(f => (
                  <div key={f.key}
                    style={{ ...s.franjaCard, ...(franjas[f.key] ? s.franjaActive : {}) }}
                    onClick={() => {
                      setFranjas({ ...franjas, [f.key]: !franjas[f.key] });
                      if (errors.franjas) setErrors({ ...errors, franjas: '' });
                    }}>
                    <div style={s.franjaNombre}>{f.label}</div>
                    <div style={s.franjaHora}>{f.hora}</div>
                  </div>
                ))}
                {errors.franjas && <span style={s.errorMsg}>⚠ {errors.franjas}</span>}
                <div style={s.configHorario}>Configura Horario</div>
              </div>
            </div>
          </div>
        </div>

        <div style={s.colRight}>
          <div style={s.card}>
            <div style={s.cardTitle}>📄 Reglamento y Sanciones</div>
            <div style={s.subLabel}>REGLAMENTO (PDF/TEXTO) *</div>
            <label style={{
              ...s.uploadBox,
              display: 'block',
              cursor: 'pointer',
              ...(errors.reglamento ? { borderColor: '#e53e3e', backgroundColor: '#fff5f5' } : {}),
              ...(form.reglamento ? { borderColor: '#2d9e6b', backgroundColor: '#e8f5ee' } : {}),
            }}>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm(prev => ({ ...prev, reglamento: file }));
                    if (errors.reglamento) setErrors(prev => ({ ...prev, reglamento: '' }));
                  }
                }}
              />
              <div style={s.uploadIcon}>{form.reglamento ? '✅' : '📄'}</div>
              <div style={s.uploadText}>
                {form.reglamento ? form.reglamento.name : 'Haz clic para subir el reglamento'}
              </div>
              <div style={{ fontSize: '0.65rem', color: form.reglamento ? '#2d9e6b' : '#bbb', marginTop: '0.2rem' }}>
                {form.reglamento ? `${(form.reglamento.size / 1024).toFixed(1)} KB` : 'PDF, DOC, TXT'}
              </div>
            </label>
            {errors.reglamento && (
              <div style={{ marginTop: '0.3rem' }}>
                <span style={s.errorMsg}>⚠ {errors.reglamento}</span>
              </div>
            )}

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
  inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  errorMsg: { fontSize: '0.68rem', color: '#e53e3e', fontWeight: '500' },
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