import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', userType: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userTypes = [
    { value: 'STUDENT',       label: 'Estudiante'       },
    { value: 'CAPTAIN',       label: 'Capitán'          },
    { value: 'ORGANIZER',     label: 'Organizador'      },
    { value: 'REFEREE',       label: 'Árbitro'          },
    { value: 'FAMILY_MEMBER', label: 'Miembro familiar' },
    { value: 'PROFESSOR',     label: 'Profesor'         },
    { value: 'ADMINISTRATOR', label: 'Administrador'    },
  ];

  const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); setError(''); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Las contraseñas no coinciden'); return; }
    if (!form.userType) { setError('Selecciona un tipo de usuario'); return; }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    setLoading(true);
    try {
      const response = await authService.register({
        name: form.name, email: form.email, password: form.password,
        role: form.userType, preferredPosition: '', skillLevel: 1,
      });
      if (response.userId) navigate('/login');
    } catch (err) {
      setError('Error al registrarse. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  const fuerzaPass = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Débil', color: '#e53e3e', ancho: '33%' };
    if (p.length < 10 || !/[0-9]/.test(p)) return { label: 'Media', color: '#f6c90e', ancho: '66%' };
    return { label: 'Fuerte', color: '#2d9e6b', ancho: '100%' };
  };
  const fuerza = fuerzaPass();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #root { height: 100%; }
        .input-register:focus { border-color: #2d9e6b !important; box-shadow: 0 0 0 3px rgba(45,158,107,0.1); }

        @media (max-width: 768px) {
          .register-page { flex-direction: column !important; height: auto !important; min-height: 100vh !important; }
          .register-left { display: none !important; }
          .register-right { width: 100% !important; min-height: 100vh !important; padding: 2.5rem 1.5rem !important; }
          .register-wrap { max-width: 100% !important; }
        }
      `}</style>

      <div className="register-page" style={s.page}>
        {/* Panel izquierdo — solo desktop */}
        <div className="register-left" style={s.left}>
          <img src="/logo.png" alt="TechCup" style={{ width: '420px', objectFit: 'contain' }} />
        </div>

        {/* Panel derecho — formulario */}
        <div className="register-right" style={s.right}>
          <div className="register-wrap" style={s.formWrap}>
            {/* Logo móvil */}
            <div style={s.logoMobile}>
              <img src="/logotipo.png" alt="TechCup" style={{ width: '50px' }} />
              <span style={s.logoTexto}>TECHCUP</span>
            </div>

            <h2 style={s.title}>CREAR UNA CUENTA</h2>
            <p style={s.subtitle}>Completa los datos para unirte al torneo</p>

            <form onSubmit={handleSubmit} style={s.form}>
              <div style={s.field}>
                <label style={s.label}>NOMBRE COMPLETO</label>
                <input className="input-register" type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="Tu nombre completo" style={s.input} required />
              </div>

              <div style={s.field}>
                <label style={s.label}>ROL EN EL TORNEO</label>
                <select className="input-register" name="userType" value={form.userType}
                  onChange={handleChange}
                  style={{ ...s.input, color: form.userType ? '#1a1a1a' : '#999' }} required>
                  <option value="" disabled>Selecciona tu rol...</option>
                  {userTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>

              <div style={s.field}>
                <label style={s.label}>CORREO ELECTRÓNICO</label>
                <input className="input-register" type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="tu@correo.com" style={s.input} required />
              </div>

              <div style={s.field}>
                <label style={s.label}>CONTRASEÑA</label>
                <div style={s.passWrap}>
                  <input className="input-register" type={showPass ? 'text' : 'password'}
                    name="password" value={form.password} onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    style={{ ...s.input, paddingRight: '2.5rem' }} required />
                  <button type="button" style={s.eyeBtn} onClick={() => setShowPass(v => !v)}>
                    {showPass ? '🙈' : '👁'}
                  </button>
                </div>
                {fuerza && (
                  <div style={s.fuerzaWrap}>
                    <div style={s.fuerzaBar}>
                      <div style={{ ...s.fuerzaFill, width: fuerza.ancho, backgroundColor: fuerza.color }} />
                    </div>
                    <span style={{ ...s.fuerzaLabel, color: fuerza.color }}>{fuerza.label}</span>
                  </div>
                )}
              </div>

              <div style={s.field}>
                <label style={s.label}>CONFIRMAR CONTRASEÑA</label>
                <div style={s.passWrap}>
                  <input className="input-register" type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                    placeholder="Repite tu contraseña"
                    style={{
                      ...s.input, paddingRight: '2.5rem',
                      ...(form.confirmPassword && form.confirmPassword !== form.password ? { borderColor: '#e53e3e' } : {}),
                      ...(form.confirmPassword && form.confirmPassword === form.password ? { borderColor: '#2d9e6b' } : {}),
                    }} required />
                  <button type="button" style={s.eyeBtn} onClick={() => setShowConfirm(v => !v)}>
                    {showConfirm ? '🙈' : '👁'}
                  </button>
                </div>
                {form.confirmPassword && form.confirmPassword !== form.password && (
                  <span style={s.matchMsg}>⚠ Las contraseñas no coinciden</span>
                )}
                {form.confirmPassword && form.confirmPassword === form.password && (
                  <span style={{ ...s.matchMsg, color: '#2d9e6b' }}>✓ Coinciden</span>
                )}
              </div>

              {error && <p style={s.errorText}>⚠ {error}</p>}

              <button type="submit" style={loading ? s.btnDisabled : s.btn} disabled={loading}>
                {loading ? 'Registrando...' : 'Crear cuenta'}
              </button>

              <p style={s.loginText}>
                ¿Ya tienes una cuenta?{' '}
                <span style={s.loginLink} onClick={() => navigate('/login')}>Entra aquí</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

const s = {
  page: { display: 'flex', height: '100vh', width: '100vw', fontFamily: 'Inter, sans-serif', overflow: 'hidden' },
  left: { width: '45%', background: 'linear-gradient(135deg, #1a7a8a 0%, #2d9e6b 50%, #1a8a6b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' },
  right: { width: '55%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' },
  formWrap: { width: '100%', maxWidth: '320px' },
  logoMobile: { display: 'none', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', justifyContent: 'center' },
  logoTexto: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', color: '#1a7a8a', letterSpacing: '2px' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.6rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '1px', marginBottom: '0.2rem' },
  subtitle: { fontSize: '0.75rem', color: '#888', marginBottom: '1rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '0.55rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  label: { fontSize: '0.63rem', fontWeight: '700', color: '#888', letterSpacing: '0.5px' },
  input: { padding: '0.55rem 0.85rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', width: '100%', fontFamily: 'Inter, sans-serif', color: '#1a1a1a', backgroundColor: '#fff', transition: 'border 0.2s' },
  passWrap: { position: 'relative' },
  eyeBtn: { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', padding: 0 },
  fuerzaWrap: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.3rem' },
  fuerzaBar: { flex: 1, height: '4px', backgroundColor: '#eee', borderRadius: '2px', overflow: 'hidden' },
  fuerzaFill: { height: '100%', borderRadius: '2px', transition: 'width 0.3s, background 0.3s' },
  fuerzaLabel: { fontSize: '0.65rem', fontWeight: '700', minWidth: '40px' },
  matchMsg: { fontSize: '0.7rem', color: '#e53e3e', marginTop: '0.2rem' },
  errorText: { fontSize: '0.8rem', color: '#e53e3e', fontWeight: '500' },
  btn: { background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', fontFamily: 'Inter, sans-serif', marginTop: '0.15rem' },
  btnDisabled: { backgroundColor: '#aaa', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.7rem', fontSize: '0.9rem', cursor: 'not-allowed' },
  loginText: { fontSize: '0.78rem', color: '#666', textAlign: 'center' },
  loginLink: { color: '#2d9e6b', cursor: 'pointer', fontWeight: '600' },
};

export default RegisterPage;