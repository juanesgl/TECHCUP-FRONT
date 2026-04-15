import Layout from '../../components/Layout';

const AlineacionPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const suplentes = [
    { nombre: 'Jackie Chan', posicion: 'Delantero' },
    { nombre: 'James Doakes', posicion: 'Defensa' },
    { nombre: 'Batista', posicion: 'Portero' },
    { nombre: 'Chuck Norris', posicion: 'Defensa' },
    { nombre: 'Rambo', posicion: 'Defensa' },
  ];

  const jugadoresCancha = [
    { nombre: 'SANCHEZ', x: 52, y: 18, color: '#e53e3e' },
    { nombre: 'MARTINEZ', x: 68, y: 22, color: '#e53e3e' },
    { nombre: 'RODRIGUEZ', x: 28, y: 42, color: '#f6c90e' },
    { nombre: 'RAMIREZ', x: 52, y: 42, color: '#e53e3e' },
    { nombre: 'PEREZ', x: 74, y: 42, color: '#e53e3e' },
    { nombre: 'LOPEZ', x: 38, y: 65, color: '#e53e3e' },
    { nombre: 'GOMEZ', x: 52, y: 80, color: '#e53e3e' },
  ];

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={styles.container}>
        <h1 style={styles.title}>ALINEACIÓN</h1>

        <div style={styles.mainRow}>
          {/* Suplentes */}
          <div style={styles.suplentesCard}>
            <h3 style={styles.suplentesTitle}>SUPLENTES</h3>
            <div style={styles.suplantesList}>
              {suplentes.map((s, i) => (
                <div key={i} style={styles.suplenteRow}>
                  <div style={styles.suplenteAvatar}>
                    <span style={styles.avatarEmoji}>👤</span>
                  </div>
                  <div>
                    <div style={styles.suplenteNombre}>{s.nombre}</div>
                    <div style={styles.suplentePosicion}>{s.posicion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Campo */}
          <div style={styles.campoContainer}>
            <div style={styles.campo}>
              {/* Líneas */}
              <div style={styles.lineaMedia} />
              <div style={styles.circuloCentral} />
              <div style={styles.arcoIzq} />
              <div style={styles.arcoDer} />
              <div style={styles.areaIzq} />
              <div style={styles.areaDer} />

              {/* Jugadores */}
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
  mainRow: {
    display: 'flex',
    gap: '1rem',
    flex: 1,
  },
  suplentesCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem',
    border: '1px solid #e0e8f0',
    width: '200px',
    minWidth: '200px',
  },
  suplentesTitle: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '1rem',
    letterSpacing: '0.5px',
  },
  suplantesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  suplenteRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  suplenteAvatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: '#e8f0f7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  avatarEmoji: {
    fontSize: '1.2rem',
  },
  suplenteNombre: {
    fontSize: '0.82rem',
    fontWeight: '600',
    color: '#1a1a1a',
  },
  suplentePosicion: {
    fontSize: '0.72rem',
    color: '#888',
  },
  campoContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.25rem',
    border: '1px solid #e0e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  campo: {
    backgroundColor: '#2d7a3a',
    borderRadius: '8px',
    width: '100%',
    height: '320px',
    position: 'relative',
    overflow: 'hidden',
    border: '3px solid rgba(255,255,255,0.3)',
  },
  lineaMedia: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: '2px',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  circuloCentral: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
  },
  arcoIzq: {
    position: 'absolute',
    top: '30%',
    left: 0,
    width: '35px',
    height: '40%',
    border: '2px solid rgba(255,255,255,0.4)',
    borderLeft: 'none',
    borderRadius: '0 8px 8px 0',
  },
  arcoDer: {
    position: 'absolute',
    top: '30%',
    right: 0,
    width: '35px',
    height: '40%',
    border: '2px solid rgba(255,255,255,0.4)',
    borderRight: 'none',
    borderRadius: '8px 0 0 8px',
  },
  areaIzq: {
    position: 'absolute',
    top: '20%',
    left: 0,
    width: '60px',
    height: '60%',
    border: '2px solid rgba(255,255,255,0.25)',
    borderLeft: 'none',
    borderRadius: '0 4px 4px 0',
  },
  areaDer: {
    position: 'absolute',
    top: '20%',
    right: 0,
    width: '60px',
    height: '60%',
    border: '2px solid rgba(255,255,255,0.25)',
    borderRight: 'none',
    borderRadius: '4px 0 0 4px',
  },
  jugadorDot: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid rgba(255,255,255,0.6)',
  },
  jugadorNombre: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '0.48rem',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    fontWeight: '700',
    textShadow: '0 1px 3px rgba(0,0,0,0.9)',
    marginTop: '2px',
  },
};

export default AlineacionPage;