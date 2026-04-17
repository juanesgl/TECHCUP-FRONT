import { useState } from 'react';
import Layout from '../../components/Layout';

const InvitationsPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const equipoData = JSON.parse(localStorage.getItem('equipoData') || 'null') || {
    nombre: 'Mi Equipo FC',
    colorPrimario: '#2d9e6b',
    colorSecundario: '#1a1a1a',
    escudo: null,
  };

  const [busqueda, setBusqueda]     = useState('');
  const [showModal, setShowModal]   = useState(false);
  const [inviteForm, setInviteForm] = useState({ nombre: '', correo: '', posicion: '' });
  const [inviteErrors, setInviteErrors] = useState({});
  const [inviteExito, setInviteExito]   = useState(false);

  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: 'Carlos Martinez',  posicion: 'DELANTERO', estado: 'Confirmado' },
    { id: 2, nombre: 'Andres Rivera',    posicion: 'DEFENSA',   estado: 'Confirmado' },
    { id: 3, nombre: 'Sebastian Gomez', posicion: 'PORTERO',   estado: 'Pendiente'  },
  ]);

  const MAX_JUGADORES = 12;
  const posicionColor = {
    DELANTERO: ['#e8f5ee','#2d9e6b'],
    DEFENSA:   ['#e8f0f7','#1a7a8a'],
    PORTERO:   ['#f0e8f7','#7a1a8a'],
    MEDIO:     ['#fff8e1','#b45309'],
  };
  const getPosStyle = (p) => ({
    backgroundColor: (posicionColor[p]||['#f5f5f5','#555'])[0],
    color:           (posicionColor[p]||['#f5f5f5','#555'])[1],
    padding: '0.2rem 0.6rem', borderRadius: '12px',
    fontSize: '0.72rem', fontWeight: '600',
  });
  const getEstadoStyle = (e) => ({
    color: e === 'Confirmado' ? '#2d9e6b' : '#f6c90e',
    fontSize: '0.78rem', fontWeight: '600',
  });

  /* ── Validación del modal de invitación ── */
  const validateInvite = () => {
    const e = {};
    if (!inviteForm.nombre.trim())  e.nombre  = 'El nombre es obligatorio';
    if (!inviteForm.correo.trim())  e.correo  = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(inviteForm.correo)) e.correo = 'Ingresa un correo válido';
    if (!inviteForm.posicion)       e.posicion = 'Selecciona una posición';
    if (jugadores.find(j => j.nombre.toLowerCase() === inviteForm.nombre.trim().toLowerCase()))
      e.nombre = 'Este jugador ya está en la plantilla';
    setInviteErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInvitar = () => {
    if (!validateInvite()) return;
    setJugadores(prev => [...prev, {
      id: Date.now(),
      nombre:   inviteForm.nombre.trim(),
      posicion: inviteForm.posicion,
      estado:   'Pendiente',
    }]);
    setInviteExito(true);
    setTimeout(() => {
      setInviteExito(false);
      setShowModal(false);
      setInviteForm({ nombre: '', correo: '', posicion: '' });
      setInviteErrors({});
    }, 1800);
  };

  const handleEliminar = (id) => {
    setJugadores(prev => prev.filter(x => x.id !== id));
  };

  const abrirModal = () => {
    if (jugadores.length >= MAX_JUGADORES) return;
    setInviteForm({ nombre: '', correo: '', posicion: '' });
    setInviteErrors({});
    setInviteExito(false);
    setShowModal(true);
  };

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={s.container}>
        <h1 style={s.title}>INVITA JUGADORES</h1>
        <p style={s.subtitle}>Gestiona tu plantilla oficial para el torneo.</p>

        <div style={s.mainRow}>
          {/* Card equipo */}
          <div style={s.equipoCard}>
            <div style={{ ...s.escudoCircle, backgroundColor: equipoData.colorPrimario }}>
              {equipoData.escudo
                ? <img src={equipoData.escudo} alt="Escudo" style={s.escudoImg} />
                : <span style={{ fontSize: '2rem' }}>⚽</span>
              }
            </div>
            <p style={s.equipoNombre}>{equipoData.nombre}</p>
            <div style={s.uniformeSection}>
              <p style={s.uniformeLabel}>COLOR DEL UNIFORME</p>
              <div style={s.coloresRow}>
                <div style={{ ...s.colorDot, backgroundColor: equipoData.colorPrimario }} />
                <div style={{ ...s.colorDot, backgroundColor: equipoData.colorSecundario }} />
              </div>
            </div>
            <div style={s.jugadoresCount}>
              <span style={{
                ...s.countNum,
                color: jugadores.length >= 7 ? '#2d9e6b' : '#e67e22',
              }}>{jugadores.length}</span>
              <span style={s.countLabel}>/ {MAX_JUGADORES} jugadores</span>
            </div>
            {jugadores.length < 7 && (
              <div style={s.alertaMínimo}>
                ⚠ Mínimo 7 jugadores requeridos
              </div>
            )}
            {jugadores.length >= MAX_JUGADORES && (
              <div style={s.alertaMaximo}>
                ✓ Plantilla completa
              </div>
            )}
          </div>

          {/* Plantilla */}
          <div style={s.plantillaCard}>
            <div style={s.plantillaHeader}>
              <div>
                <div style={s.plantillaTitle}><span>👥</span> PLANTILLA DEL EQUIPO</div>
                <p style={s.plantillaSubtitle}>Mínimo 7 jugadores, máximo {MAX_JUGADORES}</p>
              </div>
              <button
                style={{
                  ...s.invitarBtn,
                  ...(jugadores.length >= MAX_JUGADORES
                    ? { backgroundColor: '#aaa', cursor: 'not-allowed' }
                    : {}),
                }}
                onClick={abrirModal}
                disabled={jugadores.length >= MAX_JUGADORES}
              >
                + INVITAR JUGADOR
              </button>
            </div>

            <div style={s.searchBar}>
              <span>🔍</span>
              <input
                type="text"
                placeholder="Busca jugadores por nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={s.searchInput}
              />
            </div>

            {jugadores.filter(j => j.nombre.toLowerCase().includes(busqueda.toLowerCase())).length === 0 ? (
              <div style={s.emptyState}>
                {busqueda ? `Sin resultados para "${busqueda}"` : 'No hay jugadores en la plantilla aún'}
              </div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr style={s.tableHeader}>
                    <th style={s.th}>JUGADOR</th>
                    <th style={s.th}>POSICIÓN</th>
                    <th style={s.th}>ESTADO</th>
                    <th style={s.th}>ACCIÓN</th>
                  </tr>
                </thead>
                <tbody>
                  {jugadores
                    .filter(j => j.nombre.toLowerCase().includes(busqueda.toLowerCase()))
                    .map(j => (
                      <tr key={j.id} style={s.tableRow}>
                        <td style={s.td}>
                          <div style={s.jugadorCell}>
                            <div style={{ ...s.jugadorAvatar, backgroundColor: equipoData.colorPrimario + '33' }}>👤</div>
                            <span>{j.nombre}</span>
                          </div>
                        </td>
                        <td style={s.td}><span style={getPosStyle(j.posicion)}>{j.posicion}</span></td>
                        <td style={s.td}><span style={getEstadoStyle(j.estado)}>• {j.estado}</span></td>
                        <td style={s.td}>
                          <button style={s.eliminarBtn} onClick={() => handleEliminar(j.id)}>🗑</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Modal invitar jugador */}
      {showModal && (
        <div style={m.overlay} onClick={() => setShowModal(false)}>
          <div style={m.modal} onClick={e => e.stopPropagation()}>
            <button style={m.cerrar} onClick={() => setShowModal(false)}>✕</button>
            <div style={m.iconoWrap}>👥</div>
            <h3 style={m.titulo}>Invitar Jugador</h3>
            <p style={m.sub}>El jugador recibirá una invitación y quedará como pendiente</p>

            {inviteExito ? (
              <div style={m.exito}>✓ Invitación enviada correctamente</div>
            ) : (
              <>
                <div style={m.field}>
                  <label style={m.label}>NOMBRE COMPLETO</label>
                  <input style={{ ...m.input, ...(inviteErrors.nombre ? m.inputError : {}) }}
                    placeholder="Nombre del jugador"
                    value={inviteForm.nombre}
                    onChange={e => {
                      setInviteForm(p => ({ ...p, nombre: e.target.value }));
                      if (inviteErrors.nombre) setInviteErrors(p => ({ ...p, nombre: '' }));
                    }} />
                  {inviteErrors.nombre && <span style={m.errorMsg}>⚠ {inviteErrors.nombre}</span>}
                </div>

                <div style={m.field}>
                  <label style={m.label}>CORREO ELECTRÓNICO</label>
                  <input style={{ ...m.input, ...(inviteErrors.correo ? m.inputError : {}) }}
                    type="email" placeholder="correo@ejemplo.com"
                    value={inviteForm.correo}
                    onChange={e => {
                      setInviteForm(p => ({ ...p, correo: e.target.value }));
                      if (inviteErrors.correo) setInviteErrors(p => ({ ...p, correo: '' }));
                    }} />
                  {inviteErrors.correo && <span style={m.errorMsg}>⚠ {inviteErrors.correo}</span>}
                </div>

                <div style={m.field}>
                  <label style={m.label}>POSICIÓN</label>
                  <select style={{ ...m.input, ...(inviteErrors.posicion ? m.inputError : {}), color: inviteForm.posicion ? '#333' : '#999' }}
                    value={inviteForm.posicion}
                    onChange={e => {
                      setInviteForm(p => ({ ...p, posicion: e.target.value }));
                      if (inviteErrors.posicion) setInviteErrors(p => ({ ...p, posicion: '' }));
                    }}>
                    <option value="">Selecciona una posición...</option>
                    <option value="PORTERO">Portero</option>
                    <option value="DEFENSA">Defensa</option>
                    <option value="MEDIO">Medio</option>
                    <option value="DELANTERO">Delantero</option>
                  </select>
                  {inviteErrors.posicion && <span style={m.errorMsg}>⚠ {inviteErrors.posicion}</span>}
                </div>

                <div style={m.btns}>
                  <button style={m.btnCancelar} onClick={() => setShowModal(false)}>Cancelar</button>
                  <button style={m.btnConfirmar} onClick={handleInvitar}>Enviar invitación</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  subtitle: { fontSize: '0.85rem', color: '#555' },
  mainRow: { display: 'flex', gap: '1.25rem', flex: 1 },
  equipoCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e0e8f0', width: '180px', minWidth: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' },
  escudoCircle: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  escudoImg: { width: '100%', height: '100%', objectFit: 'cover' },
  equipoNombre: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a', textAlign: 'center' },
  uniformeSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', width: '100%' },
  uniformeLabel: { fontSize: '0.65rem', color: '#888', letterSpacing: '0.5px', fontWeight: '600' },
  coloresRow: { display: 'flex', gap: '0.5rem' },
  colorDot: { width: '22px', height: '22px', borderRadius: '50%', border: '2px solid rgba(0,0,0,0.1)' },
  jugadoresCount: { display: 'flex', alignItems: 'baseline', gap: '0.2rem', marginTop: '0.25rem' },
  countNum: { fontSize: '1.5rem', fontWeight: '700' },
  countLabel: { fontSize: '0.72rem', color: '#888' },
  alertaMínimo: { fontSize: '0.65rem', color: '#e67e22', backgroundColor: '#fff8e1', border: '1px solid #ffe082', borderRadius: '6px', padding: '0.3rem 0.5rem', textAlign: 'center' },
  alertaMaximo: { fontSize: '0.65rem', color: '#2d9e6b', backgroundColor: '#e8f5ee', border: '1px solid #b7e4cc', borderRadius: '6px', padding: '0.3rem 0.5rem', textAlign: 'center' },
  plantillaCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e0e8f0', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' },
  plantillaHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  plantillaTitle: { fontSize: '0.82rem', fontWeight: '700', color: '#333', display: 'flex', alignItems: 'center', gap: '0.4rem' },
  plantillaSubtitle: { fontSize: '0.72rem', color: '#888', marginTop: '0.2rem' },
  invitarBtn: { backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer' },
  searchBar: { display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #ddd', borderRadius: '8px', padding: '0.5rem 0.85rem', backgroundColor: '#fafafa' },
  searchInput: { border: 'none', outline: 'none', fontSize: '0.85rem', width: '100%', backgroundColor: 'transparent', color: '#333' },
  emptyState: { textAlign: 'center', padding: '2rem', fontSize: '0.82rem', color: '#aaa' },
  table: { width: '100%', borderCollapse: 'collapse' },
  tableHeader: { borderBottom: '1px solid #eee' },
  th: { padding: '0.5rem 0.75rem', fontSize: '0.72rem', color: '#888', textAlign: 'left', fontWeight: '700', letterSpacing: '0.5px' },
  tableRow: { borderBottom: '1px solid #f5f5f5' },
  td: { padding: '0.65rem 0.75rem', fontSize: '0.82rem', color: '#1a1a1a' },
  jugadorCell: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  jugadorAvatar: { width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' },
  eliminarBtn: { backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem', padding: '0.2rem' },
};

const m = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', width: '380px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  cerrar: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  iconoWrap: { fontSize: '1.8rem', textAlign: 'center' },
  titulo: { fontSize: '1rem', fontWeight: '700', color: '#1a1a1a', margin: 0, textAlign: 'center' },
  sub: { fontSize: '0.75rem', color: '#888', textAlign: 'center', margin: 0 },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' },
  input: { padding: '0.55rem 0.85rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: '#ffffff', color: '#333', fontSize: '0.85rem', outline: 'none', width: '100%' },
  inputError: { borderColor: '#e53e3e', backgroundColor: '#fff5f5' },
  errorMsg: { fontSize: '0.68rem', color: '#e53e3e', fontWeight: '500' },
  btns: { display: 'flex', gap: '0.75rem', marginTop: '0.25rem' },
  btnCancelar: { flex: 1, padding: '0.65rem', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: 'transparent', color: '#666', fontSize: '0.85rem', cursor: 'pointer' },
  btnConfirmar: { flex: 1, padding: '0.65rem', border: 'none', borderRadius: '8px', backgroundColor: '#2d9e6b', color: '#ffffff', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' },
  exito: { backgroundColor: '#e8f5ee', color: '#2d9e6b', borderRadius: '8px', padding: '1rem', textAlign: 'center', fontSize: '0.88rem', fontWeight: '600' },
};

export default InvitationsPage;