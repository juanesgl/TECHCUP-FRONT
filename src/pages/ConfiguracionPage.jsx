import { useState } from 'react';
import Layout from '../components/Layout';

const ConfiguracionPage = ({menuType}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [config, setConfig] = useState({
    fechaInicio: '06/01/2024',
    fechaFin: '08/30/2024',
    cantidadEquipos: '20/21',
    maxJugadores: '13, 16',
    duracionPartido: '40 minutos (20 x 2)',
    canchas: ['Cancha 1', 'Cancha 2', 'Cancha 3 (VIP)'],
    notifInscripciones: true,
    notifPagos: true,
    notifCronograma: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setConfig({ ...config, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!config.fechaInicio || config.fechaInicio.trim() === '') {
      newErrors.fechaInicio = 'La fecha de inicio no puede estar vacía';
    }

    if (!config.fechaFin || config.fechaFin.trim() === '') {
      newErrors.fechaFin = 'La fecha fin no puede estar vacía';
    }

    if (config.fechaInicio && config.fechaFin && config.fechaInicio >= config.fechaFin) {
      newErrors.fechaInicio = 'La fecha de inicio no puede ser posterior a la fecha fin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = () => {
    if (validate()) {
      alert('Configuración guardada correctamente');
    }
  };

  const Toggle = ({ value, onChange }) => (
    <div
      onClick={() => onChange(!value)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        backgroundColor: value ? '#2d9e6b' : '#ccc',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '2px',
        left: value ? '22px' : '2px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );

  return (
    <Layout userName={user.name} userRole={user.role} menuType={menuType}>
      <div style={styles.container}>
        <h1 style={styles.title}>CONFIGURACIÓN</h1>
        <p style={styles.subtitle}>Gestión de parámetros, reglas y notificaciones del torneo</p>

        {/* Parámetros del torneo */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📅 PARÁMETROS DEL TORNEO</h3>
          <div style={styles.grid2}>
            <div style={styles.field}>
              <label style={styles.label}>Fecha inicio</label>
              <input
                type="text"
                value={config.fechaInicio}
                onChange={(e) => handleChange('fechaInicio', e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.fechaInicio ? styles.inputError : {}),
                }}
              />
              {errors.fechaInicio && (
                <p style={styles.errorText}>{errors.fechaInicio}</p>
              )}
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Fecha fin</label>
              <input
                type="text"
                value={config.fechaFin}
                onChange={(e) => handleChange('fechaFin', e.target.value)}
                style={{
                  ...styles.input,
                  ...(errors.fechaFin ? styles.inputError : {}),
                }}
              />
              {errors.fechaFin && (
                <p style={styles.errorText}>{errors.fechaFin}</p>
              )}
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Cantidad equipos</label>
              <input
                type="text"
                value={config.cantidadEquipos}
                onChange={(e) => handleChange('cantidadEquipos', e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Max jugadores</label>
              <input
                type="text"
                value={config.maxJugadores}
                onChange={(e) => handleChange('maxJugadores', e.target.value)}
                style={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Logística */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>📍 LOGÍSTICA</h3>
          <div style={styles.logisticaRow}>
            <div style={styles.field}>
              <label style={styles.label}>Duración del partido</label>
              <select
                value={config.duracionPartido}
                onChange={(e) => handleChange('duracionPartido', e.target.value)}
                style={styles.select}
              >
                <option>40 minutos (20 x 2)</option>
                <option>60 minutos (30 x 2)</option>
                <option>90 minutos (45 x 2)</option>
              </select>
            </div>
            <div style={styles.canchasGroup}>
              <label style={styles.label}>Canchas disponibles</label>
              <div style={styles.canchasBtns}>
                {config.canchas.map((cancha, i) => (
                  <button key={i} style={styles.canchaBtn}>{cancha}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>🔔 NOTIFICACIONES Y ALERTAS</h3>
          <div style={styles.notifList}>
            <div style={styles.notifRow}>
              <div style={styles.notifInfo}>
                <p style={styles.notifTitle}>Nuevas Inscripciones</p>
                <p style={styles.notifDesc}>Recibir aviso cuando un equipo se registre.</p>
              </div>
              <Toggle
                value={config.notifInscripciones}
                onChange={(v) => handleChange('notifInscripciones', v)}
              />
            </div>
            <div style={styles.notifRow}>
              <div style={styles.notifInfo}>
                <p style={styles.notifTitle}>Pagos pendientes</p>
                <p style={styles.notifDesc}>Alertar sobre deudas de equipos antes de la fecha límite.</p>
              </div>
              <Toggle
                value={config.notifPagos}
                onChange={(v) => handleChange('notifPagos', v)}
              />
            </div>
            <div style={styles.notifRow}>
              <div style={styles.notifInfo}>
                <p style={styles.notifTitle}>Cambios de cronograma</p>
                <p style={styles.notifDesc}>Notificar a los equipos automáticamente por cambios de horario.</p>
              </div>
              <Toggle
                value={config.notifCronograma}
                onChange={(v) => handleChange('notifCronograma', v)}
              />
            </div>
          </div>
        </div>

        {/* Botón guardar */}
        <div style={styles.footerBtn}>
          <button style={styles.guardarBtn} onClick={handleGuardar}>
            💾 GUARDAR CAMBIOS
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
  title: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '0.85rem',
    color: '#555',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '1px solid #e0e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  sectionTitle: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#333',
    letterSpacing: '0.5px',
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
  inputError: {
    borderColor: '#e53e3e',
    backgroundColor: '#fff5f5',
  },
  errorText: {
    color: '#e53e3e',
    fontSize: '0.82rem',
    marginTop: '0.2rem',
    fontWeight: '500',
  },
  select: {
    padding: '0.6rem 0.85rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.88rem',
    outline: 'none',
    color: '#333',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  logisticaRow: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-end',
  },
  canchasGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem',
  },
  canchasBtns: {
    display: 'flex',
    gap: '0.5rem',
  },
  canchaBtn: {
    padding: '0.5rem 0.85rem',
    border: '1px solid #2d9e6b',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    color: '#2d9e6b',
    fontSize: '0.8rem',
    cursor: 'pointer',
    fontWeight: '500',
  },
  notifList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  notifRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f5f5f5',
  },
  notifInfo: {
    flex: 1,
  },
  notifTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  notifDesc: {
    fontSize: '0.75rem',
    color: '#888',
    marginTop: '0.15rem',
  },
  footerBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: '1rem',
  },
  guardarBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.75rem 1.5rem',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontWeight: '700',
    letterSpacing: '0.5px',
  },
};

export default ConfiguracionPage;