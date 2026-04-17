import Layout from '../components/Layout';

const CalendarPage = ({menuType}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const eventos = [
    {
      fecha: '19', mes: 'ABR', dia: 'VIE',
      items: []
    },
    {
      fecha: '21', mes: 'ABR', dia: 'DOM',
      items: [
        { hora: '7AM a 12PM', titulo: 'Entrenamiento', color: '#2d9e6b' },
      ]
    },
    {
      fecha: '26', mes: 'ABR', dia: 'VIE',
      items: [
        { hora: 'Todo el día', titulo: 'Reunirse con el trainer', color: '#2d9e6b' },
        { hora: '3PM a 5PM', titulo: 'Revisión de videos para el partido', color: '#4a90d9' },
      ]
    },
    {
      fecha: '29', mes: 'ABR', dia: 'LUN',
      items: [
        { hora: '1PM a 3PM', titulo: 'Partido LOS PELICULEROS VS ABSOLUTE CINEMA', color: '#2d9e6b' },
      ]
    },
    {
      fecha: '30', mes: 'ABR', dia: 'MAR',
      items: [
        { hora: 'Todo el día', titulo: 'Descanso', color: '#4a90d9' },
      ]
    },
    {
      fecha: '1', mes: 'MAY', dia: 'MIE',
      items: [
        { hora: '2PM a 4PM', titulo: 'Partido LAS ALMOJABANAS VS LOS MOJICONES', color: '#2d9e6b' },
        { hora: '9AM a 2PM', titulo: 'Entrenamiento', color: '#4a90d9' },
      ]
    },
    {
      fecha: '8', mes: 'MAY', dia: 'MIE',
      items: [
        { hora: '1PM a 3PM', titulo: 'Partido LOS PERICOS VS LOS PERRITOS', color: '#2d9e6b' },
      ]
    },
  ];

  return (
    <Layout userName={user.name} userRole={
      user.role === 'REFEREE'       ? 'Árbitro'
      : user.role === 'CAPTAIN'     ? 'Capitán'
      : user.role === 'ORGANIZER'   ? 'Organizador'
      : user.role === 'ADMINISTRATOR' || user.role === 'ADMIN' ? 'Administrador'
      : user.role === 'STUDENT'     ? 'Estudiante'
      : user.role || 'Jugador'
    } menuType={menuType}>

      <div style={styles.container}>
        {/* Título */}
        <h1 style={styles.title}>CALENDARIO 2026-1</h1>

        {/* Controles */}
        <div style={styles.controls}>
          <div style={styles.leftControls}>
            <button style={styles.hoyBtn}>📅 Hoy</button>
            <span style={styles.mesLabel}>Abril – Sep, 2024</span>
            <button style={styles.arrowBtn}>{'<'}</button>
            <button style={styles.arrowBtn}>{'>'}</button>
          </div>
          <div style={styles.rightControls}>
            <button style={styles.horarioBtn}>☰ Horario ▾</button>
            <button style={styles.iconBtn}>✓</button>
            <button style={styles.iconBtn}>📅</button>
            <button style={styles.iconBtn}>↺</button>
          </div>
        </div>

        {/* Lista de eventos */}
        <div style={styles.eventList}>
          {eventos.map((grupo, idx) => (
            <div key={idx} style={styles.grupoFecha}>
              <div style={styles.fechaLabel}>
                <span style={styles.fechaNum}>{grupo.fecha}</span>
                <span style={styles.fechaMes}>{grupo.mes}, {grupo.dia}</span>
              </div>
              <div style={styles.eventItems}>
                {grupo.items.length === 0 ? (
                  <div style={styles.emptyRow} />
                ) : (
                  grupo.items.map((item, i) => (
                    <div key={i} style={styles.eventRow}>
                      <span style={styles.horaText}>{item.hora}</span>
                      <div
                        style={{
                          ...styles.colorDot,
                          backgroundColor: item.color,
                        }}
                      />
                      <span style={styles.eventoTitulo}>{item.titulo}</span>
                      <span style={styles.chevron}>▾</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
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
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #e0e8f0',
  },
  leftControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  rightControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  hoyBtn: {
    padding: '0.35rem 0.75rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.82rem',
    color: '#333',
  },
  mesLabel: {
    fontSize: '0.88rem',
    color: '#333',
    fontWeight: '500',
  },
  arrowBtn: {
    padding: '0.3rem 0.6rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.85rem',
    color: '#555',
  },
  horarioBtn: {
    padding: '0.35rem 0.85rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.82rem',
    color: '#333',
  },
  iconBtn: {
    padding: '0.35rem 0.6rem',
    border: '1px solid #ddd',
    borderRadius: '6px',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    fontSize: '0.82rem',
  },
  eventList: {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e0e8f0',
    overflow: 'hidden',
    flex: 1,
    overflowY: 'auto',
  },
  grupoFecha: {
    display: 'flex',
    borderBottom: '1px solid #f0f0f0',
  },
  fechaLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '80px',
    padding: '0.75rem',
    borderRight: '1px solid #f0f0f0',
    backgroundColor: '#fafafa',
  },
  fechaNum: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  fechaMes: {
    fontSize: '0.7rem',
    color: '#888',
    textTransform: 'uppercase',
  },
  eventItems: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  emptyRow: {
    height: '48px',
  },
  eventRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.7rem 1rem',
    borderBottom: '1px solid #f5f5f5',
  },
  horaText: {
    fontSize: '0.8rem',
    color: '#555',
    minWidth: '100px',
  },
  colorDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    minWidth: '10px',
  },
  eventoTitulo: {
    fontSize: '0.85rem',
    color: '#1a1a1a',
    flex: 1,
  },
  chevron: {
    color: '#888',
    fontSize: '0.85rem',
  },
};

export default CalendarPage;