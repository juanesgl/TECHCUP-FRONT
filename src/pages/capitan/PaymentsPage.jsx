import { useState } from 'react';
import Layout from '../../components/Layout';

const PagosPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [form, setForm] = useState({
    nombre: 'Juan',
    apellido: 'Perez',
    correo: 'juanperez@gmail.com',
  });
  const [archivos, setArchivos] = useState([
    { nombre: 'comprobante_pago.pdf', progreso: 75, tipo: 'pdf' },
    { nombre: 'comprobante_finalizado.png', completado: true, tipo: 'img' },
  ]);
  const [dragging, setDragging] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivos([...archivos, {
        nombre: file.name,
        progreso: 100,
        completado: true,
        tipo: file.type.includes('pdf') ? 'pdf' : 'img',
      }]);
    }
  };

  const handleEliminar = (idx) => {
    setArchivos(archivos.filter((_, i) => i !== idx));
  };

  const handleEnviar = () => {
    alert('Comprobante enviado correctamente');
  };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={styles.container}>

        {/* Instrucciones */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.infoIcon}>ℹ</span>
            <span style={styles.cardTitle}>Instrucciones de Pago</span>
          </div>
          <p style={styles.instruccionText}>
            Realiza tu pago a través de Nequi al número{' '}
            <span style={styles.link}>Número de Nequi</span>
          </p>
        </div>

        {/* Datos personales */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitleGreen}>👤 Datos Personales</span>
          </div>
          <div style={styles.grid2}>
            <div style={styles.field}>
              <label style={styles.label}>Nombre</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                placeholder="ej. Juan"
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Apellido</label>
              <input
                type="text"
                value={form.apellido}
                onChange={(e) => handleChange('apellido', e.target.value)}
                placeholder="ej. Perez"
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Correo Electrónico</label>
            <input
              type="email"
              value={form.correo}
              onChange={(e) => handleChange('correo', e.target.value)}
              placeholder="juanperez@gmail.com"
              style={styles.input}
            />
          </div>
        </div>

        {/* Detalles de transferencia */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitleGreen}>📎 Detalles de Transferencia</span>
          </div>

          {/* Archivos subidos */}
          <div style={styles.archivosList}>
            {archivos.map((archivo, i) => (
              <div key={i} style={styles.archivoRow}>
                <span style={styles.archivoIcon}>
                  {archivo.tipo === 'pdf' ? '📄' : '🖼'}
                </span>
                <div style={styles.archivoInfo}>
                  <span style={styles.archivoNombre}>{archivo.nombre}</span>
                  {!archivo.completado && (
                    <div style={styles.progressBar}>
                      <div style={{
                        ...styles.progressFill,
                        width: `${archivo.progreso}%`,
                      }} />
                    </div>
                  )}
                  {archivo.completado && (
                    <span style={styles.archivoSub}>
                      1 MB · Cargado comprobante
                    </span>
                  )}
                </div>
                {!archivo.completado && (
                  <span style={styles.progresoPct}>{archivo.progreso}%</span>
                )}
                {archivo.completado && (
                  <span style={styles.checkIcon}>✓</span>
                )}
                <button
                  style={styles.eliminarBtn}
                  onClick={() => handleEliminar(i)}
                >
                  🗑
                </button>
              </div>
            ))}
          </div>

          {/* Drop zone */}
          <div
            style={{
              ...styles.dropZone,
              ...(dragging ? styles.dropZoneActive : {}),
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) {
                setArchivos([...archivos, {
                  nombre: file.name,
                  completado: true,
                  tipo: file.type.includes('pdf') ? 'pdf' : 'img',
                }]);
              }
            }}
          >
            <span style={styles.dropIcon}>☁</span>
            <p style={styles.dropText}>
              Haz clic para subir o arrastra el archivo
            </p>
            <p style={styles.dropSubText}>PNG, JPG, PDF max 5MB</p>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.pdf"
              style={styles.fileInputHidden}
              onChange={handleFileUpload}
            />
          </div>
        </div>

        {/* Botón enviar */}
        <div style={styles.btnRow}>
          <button style={styles.enviarBtn} onClick={handleEnviar}>
            Enviar Comprobante →
          </button>
        </div>

      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    overflowY: 'auto',
    height: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '1px solid #e0e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  infoIcon: {
    fontSize: '1rem',
    color: '#1a7a8a',
  },
  cardTitle: {
    fontSize: '0.88rem',
    fontWeight: '600',
    color: '#333',
  },
  cardTitleGreen: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#2d9e6b',
  },
  instruccionText: {
    fontSize: '0.82rem',
    color: '#555',
  },
  link: {
    color: '#1a7a8a',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.85rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  label: {
    fontSize: '0.75rem',
    color: '#888',
  },
  input: {
    padding: '0.6rem 0.85rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.88rem',
    outline: 'none',
    color: '#333',
  },
  archivosList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  archivoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    padding: '0.5rem 0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e0e8f0',
  },
  archivoIcon: {
    fontSize: '1.1rem',
  },
  archivoInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  archivoNombre: {
    fontSize: '0.82rem',
    fontWeight: '500',
    color: '#333',
  },
  archivoSub: {
    fontSize: '0.7rem',
    color: '#888',
  },
  progressBar: {
    height: '4px',
    backgroundColor: '#e0e8f0',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2d9e6b',
    borderRadius: '2px',
    transition: 'width 0.3s',
  },
  progresoPct: {
    fontSize: '0.75rem',
    color: '#888',
  },
  checkIcon: {
    color: '#2d9e6b',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  eliminarBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.9rem',
    color: '#e53e3e',
    padding: '0.2rem',
  },
  dropZone: {
    border: '2px dashed #d0dce8',
    borderRadius: '10px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    cursor: 'pointer',
    position: 'relative',
    transition: 'border-color 0.2s',
  },
  dropZoneActive: {
    borderColor: '#2d9e6b',
    backgroundColor: '#f0faf5',
  },
  dropIcon: {
    fontSize: '2rem',
    color: '#888',
  },
  dropText: {
    fontSize: '0.82rem',
    color: '#555',
    fontWeight: '500',
  },
  dropSubText: {
    fontSize: '0.72rem',
    color: '#aaa',
  },
  fileInputHidden: {
    position: 'absolute',
    inset: 0,
    opacity: 0,
    cursor: 'pointer',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: '1rem',
  },
  enviarBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.85rem 2.5rem',
    fontSize: '0.95rem',
    fontWeight: '700',
    cursor: 'pointer',
    letterSpacing: '0.5px',
  },
};

export default PagosPage;