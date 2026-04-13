import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await authService.login(form);
      console.log('Respuesta del backend', response);
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          userId: response.userId,
          name: response.name,
          role: response.role,
          token: response.token,
        }));
        if (response.role === 'CAPTAIN') {
          navigate('/capitan/dashboard');
        } else if (
          response.role === 'ADMINISTRATOR' ||
          response.role === 'ADMIN' ||
          response.role === 'ORGANIZER'
        ) {
          navigate('/organizador/dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(response.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Correo o contraseña incorrectos');
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
        <div style={styles.leftPanel}>
          <h2 style={styles.title}>INICIAR SESIÓN</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              style={styles.input}
              required
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              style={styles.input}
              required
            />

            <p style={styles.forgotPassword}>
              ¿Has olvidado tu contraseña?
            </p>

            {error && <p style={styles.errorText}>⚠ {error}</p>}

            <button
              type="submit"
              style={loading ? styles.buttonDisabled : styles.button}
              disabled={loading}
            >
              {loading ? 'Iniciando...' : 'Iniciar sesión'}
            </button>

            <p style={styles.registerText}>
              ¿Aún no tienes cuenta?{' '}
              <span
                style={styles.registerLink}
                onClick={() => navigate('/register')}
              >
                Crea una aquí
              </span>
            </p>

            <div style={styles.googleWrapper}>
              <div style={styles.googleButton}>
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>
            </div>
          </form>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.logoContainer}>
            <img src="/logo.png" alt="TechCup" style={{ width: '450px', objectFit: 'contain' }} />
          </div>
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
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    marginBottom: '1.5rem',
    letterSpacing: '2px',
  },
  form: {
    width: '100%',
    maxWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '0.9rem',
    outline: 'none',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  },
  forgotPassword: {
    fontSize: '0.75rem',
    color: '#666',
    textAlign: 'right',
    cursor: 'pointer',
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
    marginTop: '0.25rem',
  },
  registerText: {
    fontSize: '0.78rem',
    color: '#666',
    textAlign: 'center',
  },
  registerLink: {
    color: '#2d9e6b',
    cursor: 'pointer',
    fontWeight: '600',
  },
  googleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.25rem',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ddd',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    width: 'fit-content',
  },
  rightPanel: {
    width: '55%',
    background: 'linear-gradient(135deg, #1a7a8a 0%, #2d9e6b 50%, #1a8a6b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

export default LoginPage;