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
      if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
          userId: response.userId,
          name: response.name,
          role: response.role,
          token: response.token,
        }));
        if (response.role === 'CAPTAIN') navigate('/capitan/dashboard');
        else if (['ADMINISTRATOR','ADMIN','ORGANIZER'].includes(response.role)) navigate('/organizador/dashboard');
        else navigate('/dashboard');
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
        html, body, #root { height: 100%; }
        .login-input:focus { border-color: #2d9e6b !important; box-shadow: 0 0 0 3px rgba(45,158,107,0.1); }

        @media (max-width: 768px) {
          .login-page { flex-direction: column !important; overflow-y: auto !important; height: auto !important; min-height: 100vh !important; }
          .login-right { display: none !important; }
          .login-left { width: 100% !important; min-height: 100vh !important; padding: 2.5rem 1.5rem !important; justify-content: center !important; }
          .login-form { max-width: 100% !important; }
        }
      `}</style>

      <div className="login-page" style={s.page}>
        {/* Panel izquierdo — formulario */}
        <div className="login-left" style={s.left}>
          <div style={s.formWrap}>
            {/* Logo visible solo en móvil */}
            <div style={s.logoMobile}>
              <img src="/logotipo.png" alt="TechCup" style={{ width: '60px' }} />
              <span style={s.logoTexto}>TECHCUP</span>
            </div>

            <h2 style={s.title}>INICIAR SESIÓN</h2>
            <p style={s.subtitle}>Bienvenido de vuelta al torneo</p>

            <form onSubmit={handleSubmit} style={s.form} className="login-form">
              <div style={s.field}>
                <label style={s.label}>CORREO ELECTRÓNICO</label>
                <input className="login-input" type="email" name="email"
                  value={form.email} onChange={handleChange}
                  placeholder="tu@correo.com" style={s.input} required />
              </div>

              <div style={s.field}>
                <label style={s.label}>CONTRASEÑA</label>
                <input className="login-input" type="password" name="password"
                  value={form.password} onChange={handleChange}
                  placeholder="Tu contraseña" style={s.input} required />
              </div>

              <p style={s.forgot}>¿Has olvidado tu contraseña?</p>

              {error && <p style={s.error}>⚠ {error}</p>}

              <button type="submit" style={loading ? s.btnDisabled : s.btn} disabled={loading}>
                {loading ? 'Iniciando...' : 'Iniciar sesión'}
              </button>

              <p style={s.registerText}>
                ¿Aún no tienes cuenta?{' '}
                <span style={s.link} onClick={() => navigate('/register')}>Crea una aquí</span>
              </p>

              <div style={s.googleWrap}>
                <button type="button" style={s.googleBtn}>
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span style={{ fontSize: '0.85rem', color: '#555', fontFamily: 'Inter, sans-serif' }}>
                    Continuar con Google
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Panel derecho — solo desktop */}
        <div className="login-right" style={s.right}>
          <img src="/logo.png" alt="TechCup" style={{ width: '420px', objectFit: 'contain' }} />
        </div>
      </div>
    </>
  );
};

const s = {
  page: { display: 'flex', height: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif', overflow: 'hidden' },
  left: { width: '45%', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 3rem', overflowY: 'auto' },
  right: { width: '55%', background: 'linear-gradient(135deg, #1a7a8a 0%, #2d9e6b 50%, #1a8a6b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  formWrap: { width: '100%', maxWidth: '320px' },
  logoMobile: { display: 'none', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' },
  logoTexto: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#1a7a8a', letterSpacing: '2px' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.8rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px', marginBottom: '0.2rem' },
  subtitle: { fontSize: '0.78rem', color: '#888', marginBottom: '1.5rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.25rem' },
  label: { fontSize: '0.65rem', fontWeight: '700', color: '#888', letterSpacing: '0.5px' },
  input: { padding: '0.65rem 1rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.88rem', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', transition: 'border 0.2s' },
  forgot: { fontSize: '0.75rem', color: '#666', textAlign: 'right', cursor: 'pointer' },
  error: { color: '#e53e3e', fontSize: '0.8rem' },
  btn: { background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif' },
  btnDisabled: { backgroundColor: '#aaa', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem', fontSize: '0.95rem', cursor: 'not-allowed' },
  registerText: { fontSize: '0.78rem', color: '#666', textAlign: 'center' },
  link: { color: '#2d9e6b', cursor: 'pointer', fontWeight: '600' },
  googleWrap: { display: 'flex', justifyContent: 'center' },
  googleBtn: { display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1.5px solid #ddd', borderRadius: '8px', padding: '0.55rem 1.25rem', cursor: 'pointer', backgroundColor: '#fff', width: '100%', justifyContent: 'center' },
};

export default LoginPage;