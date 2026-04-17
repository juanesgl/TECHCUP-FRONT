import { useState } from 'react';
import Layout from '../../components/Layout';

const PaymentsPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [form, setForm]       = useState({ nombre: '', apellido: '', correo: '' });
  const [errors, setErrors]   = useState({});
  const [archivos, setArchivos] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [enviado, setEnviado]   = useState(false);

  const handleChange = (field, value) => {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors(p => ({ ...p, archivo: 'El archivo no puede superar 5MB' }));
      return;
    }
    setArchivos(prev => [...prev, {
      id: Date.now(),
      nombre: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      completado: true,
      tipo: file.type.includes('pdf') ? 'pdf' : 'img',
    }]);
    setErrors(p => ({ ...p, archivo: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim())   e.nombre   = 'El nombre es obligatorio';
    if (!form.apellido.trim()) e.apellido  = 'El apellido es obligatorio';
    if (!form.correo.trim())   e.correo   = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.correo)) e.correo = 'Ingresa un correo válido';
    if (archivos.length === 0) e.archivo  = 'Debes subir al menos un comprobante';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleEnviar = () => {
    if (!validate()) return;
    setEnviado(true);
  };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={st.container}>

        {enviado ? (
          <div style={st.exitoCard}>
            <div style={st.exitoIcono}>✓</div>
            <h2 style={st.exitoTitulo}>¡Comprobante enviado!</h2>
            <p style={st.exitoSub}>Tu pago ha sido enviado para revisión. El organizador lo validará pronto.</p>
            <button style={st.exitoBtn} onClick={() => { setEnviado(false); setForm({ nombre: '', apellido: '', correo: '' }); setArchivos([]); }}>
              Enviar otro comprobante
            </button>
          </div>
        ) : (
          <>
            {/* Instrucciones */}
            <div style={st.card}>
              <div style={st.cardHeader}>
                <span style={st.infoIcon}>ℹ</span>
                <span style={st.cardTitle}>Instrucciones de Pago</span>
              </div>
              <p style={st.instruccionText}>
                Realiza tu pago a través de Nequi al número{' '}
                <span style={st.link}>300 123 4567</span>. Luego sube el comprobante abajo.
              </p>
            </div>

            {/* Datos personales */}
            <div style={st.card}>
              <div style={st.cardHeader}>
                <span style={st.cardTitleGreen}>👤 Datos Personales</span>
              </div>
              <div style={st.grid2}>
                <div style={st.field}>
                  <label style={st.label}>Nombre</label>
                  <input type="text" value={form.nombre} placeholder="ej. Juan"
                    onChange={e => handleChange('nombre', e.target.value)}
                    style={{ ...st.input, ...(errors.nombre ? st.inputError : {}) }} />
                  {errors.nombre && <span style={st.errorMsg}>⚠ {errors.nombre}</span>}
                </div>
                <div style={st.field}>
                  <label style={st.label}>Apellido</label>
                  <input type="text" value={form.apellido} placeholder="ej. Perez"
                    onChange={e => handleChange('apellido', e.target.value)}
                    style={{ ...st.input, ...(errors.apellido ? st.inputError : {}) }} />
                  {errors.apellido && <span style={st.errorMsg}>⚠ {errors.apellido}</span>}
                </div>
              </div>
              <div style={st.field}>
                <label style={st.label}>Correo Electrónico</label>
                <input type="email" value={form.correo} placeholder="juanperez@gmail.com"
                  onChange={e => handleChange('correo', e.target.value)}
                  style={{ ...st.input, ...(errors.correo ? st.inputError : {}) }} />
                {errors.correo && <span style={st.errorMsg}>⚠ {errors.correo}</span>}
              </div>
            </div>

            {/* Comprobante */}
            <div style={st.card}>
              <div style={st.cardHeader}>
                <span style={st.cardTitleGreen}>📎 Comprobante de Pago</span>
              </div>

              {archivos.length > 0 && (
                <div style={st.archivosList}>
                  {archivos.map((a) => (
                    <div key={a.id} style={st.archivoRow}>
                      <span style={st.archivoIcon}>{a.tipo === 'pdf' ? '📄' : '🖼'}</span>
                      <div style={st.archivoInfo}>
                        <span style={st.archivoNombre}>{a.nombre}</span>
                        <span style={st.archivoSub}>{a.size} · Cargado</span>
                      </div>
                      <span style={st.checkIcon}>✓</span>
                      <button style={st.eliminarBtn}
                        onClick={() => setArchivos(prev => prev.filter(x => x.id !== a.id))}>🗑</button>
                    </div>
                  ))}
                </div>
              )}

              <label
                style={{
                  ...st.dropZone,
                  ...(dragging ? st.dropZoneActive : {}),
                  ...(errors.archivo ? st.dropZoneError : {}),
                }}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => {
                  e.preventDefault(); setDragging(false);
                  handleFileUpload(e.dataTransfer.files[0]);
                }}
              >
                <span style={st.dropIcon}>☁</span>
                <p style={st.dropText}>Haz clic para subir o arrastra el archivo</p>
                <p style={st.dropSubText}>PNG, JPG, PDF · máx 5MB</p>
                <input type="file" accept=".png,.jpg,.jpeg,.pdf" style={st.fileInputHidden}
                  onChange={e => handleFileUpload(e.target.files[0])} />
              </label>
              {errors.archivo && <span style={st.errorMsg}>⚠ {errors.archivo}</span>}
            </div>

            <div style={st.btnRow}>
              <button style={st.enviarBtn} onClick={handleEnviar}>
                Enviar Comprobante →
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

const st = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', height: '100%' },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', padding: '1.25rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', gap: '0.85rem' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  infoIcon: { fontSize: '1rem', color: '#1a7a8a' },
  cardTitle: { fontSize: '0.88rem', fontWeight: '600', color: '#333' },
  cardTitleGreen: { fontSize: '0.88rem', fontWeight: '700', color: '#2d9e6b' },
  instruccionText: { fontSize: '0.82rem', color: '#555' },
  link: { color: '#1a7a8a', textDecoration: 'underline', cursor: 'pointer' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.75rem', color: '#888' },
  input: { padding: '0.6rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', fontSize: '0.88rem', outline: 'none', color: '#333' },
  inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  errorMsg: { fontSize: '0.68rem', color: '#e53e3e', fontWeight: '500' },
  archivosList: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  archivoRow: { display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e0e8f0' },
  archivoIcon: { fontSize: '1.1rem' },
  archivoInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.15rem' },
  archivoNombre: { fontSize: '0.82rem', fontWeight: '500', color: '#333' },
  archivoSub: { fontSize: '0.7rem', color: '#888' },
  checkIcon: { color: '#2d9e6b', fontWeight: 'bold', fontSize: '1rem' },
  eliminarBtn: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', color: '#e53e3e', padding: '0.2rem' },
  dropZone: { border: '2px dashed #d0dce8', borderRadius: '10px', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' },
  dropZoneActive: { borderColor: '#2d9e6b', backgroundColor: '#f0faf5' },
  dropZoneError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  dropIcon: { fontSize: '2rem', color: '#888' },
  dropText: { fontSize: '0.82rem', color: '#555', fontWeight: '500' },
  dropSubText: { fontSize: '0.72rem', color: '#aaa' },
  fileInputHidden: { position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' },
  btnRow: { display: 'flex', justifyContent: 'center', paddingBottom: '1rem' },
  enviarBtn: { backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.85rem 2.5rem', fontSize: '0.95rem', fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px' },
  exitoCard: { backgroundColor: '#ffffff', borderRadius: '16px', padding: '3rem 2rem', border: '1px solid #e0e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' },
  exitoIcono: { width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#e8f5ee', color: '#2d9e6b', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  exitoTitulo: { fontSize: '1.3rem', fontWeight: '700', color: '#1a1a1a', margin: 0 },
  exitoSub: { fontSize: '0.85rem', color: '#666', maxWidth: '320px' },
  exitoBtn: { padding: '0.65rem 1.5rem', backgroundColor: 'transparent', border: '1px solid #2d9e6b', color: '#2d9e6b', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
};

export default PaymentsPage;