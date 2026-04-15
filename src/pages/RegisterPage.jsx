import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    userType: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userTypes = [
    { value: 'STUDENT', label: 'Estudiante' },
    { value: 'PROFESSOR', label: 'Profesor' },
    { value: 'ADMINISTRATOR', label: 'Administrador' },
    { value: 'CAPTAIN', label: 'Capitan' },
    { value: 'ORGANIZER', label: 'Organizador' },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (!form.userType) {
      setError('Selecciona un tipo de usuario');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.userType,
        preferredPosition: '',
        skillLevel: 0,
      });
      if (response.userId) {
        navigate('/login');
      }
    } catch (err) {
      setError('Error al registrarse. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { height: 100%; overflow: hidden; }
      `}</style>

      <div style={styles.page}>
        {/* Panel izquierdo - Logo */}
        <div style={styles.leftPanel}>
          <img src="/logo.png" alt="TechCup" style={{ width: '450px', objectFit: 'contain' }} />
        </div>

        {/* Panel derecho - Formulario */}
        <div style={styles.rightPanel}>
          <h2 style={styles.title}>Crear una cuenta</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Nombre */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              style={styles.input}
              required
            />

            {/* Tipo de usuario */}
            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              style={{
                ...styles.input,
                color: form.userType ? '#1a1a1a' : '#999',
              }}
              required
            >
              <option value="" disabled>Tipo de usuario</option>
              {userTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
              required
            />

            {/* Contraseña y Confirmación */}
            <div style={styles.row}>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña"
                style={styles.inputHalf}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirmación"
                style={styles.inputHalf}
                required
              />
            </div>

            {error && <p style={styles.errorText}>⚠ {error}</p>}

            <button
              type="submit"
              style={loading ? styles.buttonDisabled : styles.button}
              disabled={loading}
            >
              {loading ? 'Registrando...' : 'Crear cuenta'}
            </button>

            <p style={styles.loginText}>
              ¿Ya tienes una cuenta?{' '}
              <span
                style={styles.loginLink}
                onClick={() => navigate('/login')}
              >
                Entra aquí
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  leftPanel: {
    width: '45%',
    background: 'linear-gradient(135deg, #1a7a8a 0%, #2d9e6b 50%, #1a8a6b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  rightPanel: {
    width: '55%',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 3rem',
    height: '100vh',
  },
  title: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '1.8rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    letterSpacing: '1px',
  },
  form: {
    width: '100%',
    maxWidth: '320px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#ffffff',
  },
  row: {
    display: 'flex',
    gap: '0.75rem',
  },
  inputHalf: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '50%',
    fontFamily: 'Inter, sans-serif',
  },
  errorText: {
    color: '#e53e3e',
    fontSize: '0.8rem',
  },
  button: {
    background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.85rem',
    fontSize: '0.95rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.25rem',
    fontFamily: 'Inter, sans-serif',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '0.85rem',
    fontSize: '0.95rem',
    cursor: 'not-allowed',
  },
  loginText: {
    fontSize: '0.78rem',
    color: '#666',
    textAlign: 'center',
  },
  loginLink: {
    color: '#2d9e6b',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default RegisterPage;