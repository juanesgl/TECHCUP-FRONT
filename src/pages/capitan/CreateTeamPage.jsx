import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const CrearEquipoPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreEquipo: '',
    colorUniforme: '#2d9e6b',
    escudo: null,
  });
  const [errors, setErrors] = useState({});

  const colores = ['#2d9e6b', '#1a7a8a', '#e53e3e', '#f6c90e', '#1a1a1a'];

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nombreEquipo || form.nombreEquipo.trim() === '') {
      newErrors.nombreEquipo = 'El nombre del equipo es requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinuar = () => {
    if (validate()) {
      navigate('/capitan/invitaciones');
    }
  };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={styles.container}>
        <h1 style={styles.title}>CREA TU EQUIPO</h1>
        <p style={styles.subtitle}>
          Configura la identidad de tu escuadra y gestiona tu plantilla oficial para el torneo.
        </p>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>📋</span>
            <span style={styles.cardTag}>🏷</span>
            <h3 style={styles.cardTitle}>IDENTIDAD DEL EQUIPO</h3>
            <div style={styles.escudoContainer}>
              <div style={{
                ...styles.escudo,
                backgroundColor: form.colorUniforme,
              }}>
                {form.escudo ? (
                  <img src={form.escudo} alt="Escudo" style={styles.escudoImg} />
                ) : (
                  <span style={styles.escudoPlaceholder}>⚽</span>
                )}
              </div>
              <div style={styles.escudoBadge}>✓</div>
            </div>
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Escudo del equipo</label>
            <input
              type="file"
              accept="image/*"
              style={styles.fileInput}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  handleChange('escudo', url);
                }
              }}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>NOMBRE DEL EQUIPO</label>
            <input
              type="text"
              value={form.nombreEquipo}
              onChange={(e) => handleChange('nombreEquipo', e.target.value)}
              placeholder="Tu nombre FC"
              style={{
                ...styles.input,
                ...(errors.nombreEquipo ? styles.inputError : {}),
              }}
            />
            {errors.nombreEquipo && (
              <p style={styles.errorText}>⚠ {errors.nombreEquipo}</p>
            )}
          </div>

          <div style={styles.field}>
            <label style={styles.label}>COLOR DEL UNIFORME</label>
            <div style={styles.coloresRow}>
              {colores.map((color) => (
                <div
                  key={color}
                  onClick={() => handleChange('colorUniforme', color)}
                  style={{
                    ...styles.colorCircle,
                    backgroundColor: color,
                    ...(form.colorUniforme === color ? styles.colorSelected : {}),
                  }}
                />
              ))}
            </div>
          </div>

          <div style={styles.btnRow}>
            <button style={styles.continuarBtn} onClick={handleContinuar}>
              Continuar
            </button>
          </div>
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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    border: '1px solid #e0e8f0',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    position: 'relative',
  },
  cardIcon: { fontSize: '1.1rem' },
  cardTag: { fontSize: '1rem' },
  cardTitle: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '1.1rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    letterSpacing: '1px',
  },
  escudoContainer: {
    marginLeft: 'auto',
    position: 'relative',
  },
  escudo: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  escudoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  escudoPlaceholder: {
    fontSize: '2rem',
  },
  escudoBadge: {
    position: 'absolute',
    bottom: '2px',
    right: '2px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    fontSize: '0.7rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.75rem',
    color: '#888',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },
  fileInput: {
    fontSize: '0.85rem',
    color: '#555',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '0.9rem',
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
    fontWeight: '500',
  },
  coloresRow: {
    display: 'flex',
    gap: '0.85rem',
    alignItems: 'center',
  },
  colorCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'transform 0.15s',
  },
  colorSelected: {
    border: '3px solid #1a1a1a',
    transform: 'scale(1.15)',
  },
  btnRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'auto',
  },
  continuarBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.85rem 2.5rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
};

export default CrearEquipoPage;