import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';

const CapitanDashboardPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const tarjetas = [
    { nombre: 'S. Martinez', numero: 'FC', tarjeta: 'AMARILLA', color: '#f6c90e' },
    { nombre: 'K. Perez', numero: 'PB', tarjeta: 'ROJA', color: '#e53e3e' },
    { nombre: 'M. Gomez', numero: 'MS', tarjeta: 'AMARILLA', color: '#f6c90e' },
  ];

  const jugadoresCancha = [
    { nombre: 'SANCHEZ', x: 38, y: 25, color: '#e53e3e' },
    { nombre: 'MARTINEZ', x: 55, y: 22, color: '#e53e3e' },
    { nombre: 'RODRIGUEZ', x: 25, y: 48, color: '#f6c90e' },
    { nombre: 'RAMIREZ', x: 48, y: 48, color: '#e53e3e' },
    { nombre: 'PEREZ', x: 68, y: 45, color: '#e53e3e' },
    { nombre: 'LOPEZ', x: 35, y: 68, color: '#e53e3e' },
    { nombre: 'GOMEZ', x: 52, y: 78, color: '#e53e3e' },
  ];

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={styles.container}>
        <div style={styles.topRow}>
          {/* Card Alineaciones */}
          <div style={styles.alineacionCard}>
            <h3 style={styles.cardTitle}>ALINEACIONES</h3>
            <div style={styles.equipoInfo}>
              <div style={styles.equipoAvatar}>⚽</div>
              <div>
                <div style={styles.equipoNombre}>NOMBRE DEL EQUIPO FC</div>
                <div style={styles.uniformeInfo}>
                  <span style={styles.uniformeDot} /> UNIFORME LOCAL
                </div>
              </div>
              <button
                style={styles.editarBtn}
                onClick={() => navigate('/capitan/alineacion')}
              >
                EDITAR
              </button>
            </div>

            {/* Campo */}
            <div style={styles.campo}>
              <div style={styles.lineaMedia} />
              <div style={styles.circuloCentral} />
              <div style={styles.arcoIzq} />
              <div style={styles.arcoDer} />
              {jugadoresCancha.map((j, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.jugadorDot,
                    left: `${j.x}%`,
                    top: `${j.y}%`,
                    backgroundColor: j.color,
                  }}
                >
                  <span style={styles.jugadorNombre}>{j.nombre}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card Tarjetas */}
          <div style={styles.tarjetasCard}>
            <h3 style={styles.cardTitle}>TARJETAS DEL EQUIPO</h3>
            <div style={styles.tarjetasResumen}>
              <div style={styles.tarjetaCount}>
                <div style={styles.tarjetaAmarilla} />
                <div style={styles.tarjetaNum}>2</div>
                <div style={styles.tarjetaLabel}>AMARILLAS</div>
              </div>
              <div style={styles.tarjetaCount}>
                <div style={styles.tarjetaRoja} />
                <div style={styles.tarjetaNum}>1</div>
                <div style={styles.tarjetaLabel}>ROJAS</div>
              </div>
            </div>
            <div style={styles.divider} />
            <div style={styles.tarjetasList}>
              {tarjetas.map((t, i) => (
                <div key={i} style={styles.tarjetaRow}>
                  <div style={styles.jugAvatar}>{t.numero}</div>
                  <span style={styles.jugNombre}>{t.nombre}</span>
                  <div style={styles.tarjetaBadge}>
                    <div style={{
                      ...styles.tarjetaIndicador,
                      backgroundColor: t.color,
                    }} />
                    <span style={styles.tarjetaTipo}>{t.tarjeta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Próximo partido */}
        <div style={styles.proximoPartido}>
          <div style={styles.proximoInfo}>
            <span style={styles.proximoLabel}>Próximo Partido</span>
            <span style={styles.proximoRival}>vs WD-40</span>
          </div>
          <div style={styles.proximoFecha}>
            <span style={styles.proximoMes}>MAR</span>
            <span style={styles.proximoDia}>12</span>
          </div>
          <div style={styles.proximoHora}>14:30</div>
          <div style={styles.proximoCancha}>Cancha 1</div>
          <div style={styles.proximoIcon}>⚽</div>
        </div>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    height: '100%',
  },
  topRow: {
    display: 'flex',
    gap: '1.25rem',
    flex: 1,
  },
  alineacionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem',
    flex: 1.5,
    border: '1px solid #e0e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  tarjetasCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem',
    flex: 1,
    border: '1px solid #e0e8f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  cardTitle: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '1.1rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    letterSpacing: '1px',
  },
  equipoInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  equipoAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: '#e8f0f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
  },
  equipoNombre: {
    fontSize: '0.82rem',
    fontWeight: '700',
    color: '#1a1a1a',
  },
  uniformeInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.72rem',
    color: '#888',
  },
  uniformeDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#e53e3e',
    display: 'inline-block',
  },
  editarBtn: {
    marginLeft: 'auto',
    padding: '0.35rem 0.85rem',
    backgroundColor: 'transparent',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '0.75rem',
    cursor: 'pointer',
    color: '#555',
    fontWeight: '600',
  },
  campo: {
    backgroundColor: '#2d7a3a',
    borderRadius: '8px',
    flex: 1,
    minHeight: '200px',
    position: 'relative',
    overflow: 'hidden',
    border: '2px solid #ffffff30',
  },
  lineaMedia: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: '2px',
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  circuloCentral: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
  },
  arcoIzq: {
    position: 'absolute',
    top: '30%',
    left: 0,
    width: '30px',
    height: '40%',
    border: '2px solid rgba(255,255,255,0.4)',
    borderLeft: 'none',
    borderRadius: '0 8px 8px 0',
  },
  arcoDer: {
    position: 'absolute',
    top: '30%',
    right: 0,
    width: '30px',
    height: '40%',
    border: '2px solid rgba(255,255,255,0.4)',
    borderRight: 'none',
    borderRadius: '8px 0 0 8px',
  },
  jugadorDot: {
    position: 'absolute',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    cursor: 'pointer',
  },
  jugadorNombre: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.45rem',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    fontWeight: '600',
    textShadow: '0 1px 2px rgba(0,0,0,0.8)',
    marginTop: '2px',
  },
  tarjetasResumen: {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    padding: '0.5rem 0',
  },
  tarjetaCount: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.3rem',
  },
  tarjetaAmarilla: {
    width: '30px',
    height: '40px',
    backgroundColor: '#f6c90e',
    borderRadius: '4px',
  },
  tarjetaRoja: {
    width: '30px',
    height: '40px',
    backgroundColor: '#e53e3e',
    borderRadius: '4px',
  },
  tarjetaNum: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  tarjetaLabel: {
    fontSize: '0.65rem',
    color: '#888',
    letterSpacing: '0.5px',
  },
  divider: {
    height: '1px',
    backgroundColor: '#f0f0f0',
  },
  tarjetasList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  tarjetaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  jugAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: '#e8f0f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.6rem',
    fontWeight: '700',
    color: '#555',
  },
  jugNombre: {
    flex: 1,
    fontSize: '0.82rem',
    color: '#1a1a1a',
  },
  tarjetaBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem',
  },
  tarjetaIndicador: {
    width: '10px',
    height: '14px',
    borderRadius: '2px',
  },
  tarjetaTipo: {
    fontSize: '0.7rem',
    color: '#888',
  },
  proximoPartido: {
    background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)',
    borderRadius: '12px',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    color: '#ffffff',
  },
  proximoInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  proximoLabel: {
    fontSize: '0.75rem',
    opacity: '0.8',
  },
  proximoRival: {
    fontSize: '0.9rem',
    fontWeight: '600',
  },
  proximoFecha: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '8px',
    padding: '0.4rem 0.75rem',
  },
  proximoMes: {
    fontSize: '0.65rem',
    opacity: '0.8',
  },
  proximoDia: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  proximoHora: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  proximoCancha: {
    fontSize: '0.82rem',
    opacity: '0.85',
  },
  proximoIcon: {
    fontSize: '1.5rem',
  },
};

export default CapitanDashboardPage;