import { useState, useRef, useCallback } from 'react';
import Layout from '../../components/Layout';

const FORMACIONES = {
  '2-3-1': [
    { slot: 'POR', x: 6,  y: 50 },
    { slot: 'DEF', x: 25, y: 25 }, { slot: 'DEF', x: 25, y: 75 },
    { slot: 'MED', x: 48, y: 20 }, { slot: 'MED', x: 48, y: 50 }, { slot: 'MED', x: 48, y: 80 },
    { slot: 'DEL', x: 72, y: 50 },
  ],
  '3-2-1': [
    { slot: 'POR', x: 6,  y: 50 },
    { slot: 'DEF', x: 25, y: 20 }, { slot: 'DEF', x: 25, y: 50 }, { slot: 'DEF', x: 25, y: 80 },
    { slot: 'MED', x: 50, y: 33 }, { slot: 'MED', x: 50, y: 67 },
    { slot: 'DEL', x: 74, y: 50 },
  ],
  '1-3-2': [
    { slot: 'POR', x: 6,  y: 50 },
    { slot: 'DEF', x: 28, y: 50 },
    { slot: 'MED', x: 48, y: 20 }, { slot: 'MED', x: 48, y: 50 }, { slot: 'MED', x: 48, y: 80 },
    { slot: 'DEL', x: 72, y: 33 }, { slot: 'DEL', x: 72, y: 67 },
  ],
  '2-2-2': [
    { slot: 'POR', x: 6,  y: 50 },
    { slot: 'DEF', x: 26, y: 30 }, { slot: 'DEF', x: 26, y: 70 },
    { slot: 'MED', x: 50, y: 30 }, { slot: 'MED', x: 50, y: 70 },
    { slot: 'DEL', x: 74, y: 30 }, { slot: 'DEL', x: 74, y: 70 },
  ],
};

const SLOT_COLOR = { POR: '#f6c90e', DEF: '#3b82f6', MED: '#2d9e6b', DEL: '#e53e3e' };

const AlignmentPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const campoRef = useRef(null);

  const [banco, setBanco] = useState([
    { id: 1, nombre: 'Jackie Chan',  posicion: 'Delantero' },
    { id: 2, nombre: 'James Doakes', posicion: 'Defensa'   },
    { id: 3, nombre: 'Batista',      posicion: 'Portero'   },
    { id: 4, nombre: 'Chuck Norris', posicion: 'Defensa'   },
    { id: 5, nombre: 'Rambo',        posicion: 'Defensa'   },
    { id: 6, nombre: 'Sánchez',      posicion: 'Delantero' },
    { id: 7, nombre: 'D. Alvarez',   posicion: 'Delantero' },
  ]);

  const [enCancha, setEnCancha] = useState([]);

  const [formacionActiva, setFormacionActiva] = useState(null);

  const dragging = useRef(null);

  const jugadorById = useCallback(
    (id) => [...banco, ...enCancha.map(e => banco.find(j => j.id === e.jugadorId)).filter(Boolean)]
      .find(j => j && j.id === id),
    [banco, enCancha]
  );

  const allJugadores = banco;

  const onDragStartBanco = (e, jugadorId) => {
    dragging.current = { tipo: 'banco', id: jugadorId };
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragStartCancha = (e, jugadorId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    dragging.current = {
      tipo: 'cancha',
      id: jugadorId,
      offsetX: e.clientX - rect.left - rect.width / 2,
      offsetY: e.clientY - rect.top - rect.height / 2,
    };
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDropCancha = (e) => {
    e.preventDefault();
    if (!dragging.current || !campoRef.current) return;
    const rect = campoRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    const { tipo, id } = dragging.current;

    if (tipo === 'banco') {
      if (enCancha.find(j => j.jugadorId === id)) return;
      setEnCancha(prev => [...prev, { jugadorId: id, x, y }]);
    } else {
      setEnCancha(prev => prev.map(j => j.jugadorId === id ? { ...j, x, y } : j));
    }
    dragging.current = null;
  };

  const quitarDeCancha = (jugadorId) => {
    setEnCancha(prev => prev.filter(j => j.jugadorId !== jugadorId));
  };

  const aplicarFormacion = (nombre) => {
    setFormacionActiva(nombre);
    const slots = FORMACIONES[nombre];
    const nuevaCancha = slots.map((slot, i) => ({
      jugadorId: allJugadores[i]?.id,
      x: slot.x,
      y: slot.y,
      slot: slot.slot,
    })).filter(j => j.jugadorId !== undefined);
    setEnCancha(nuevaCancha);
  };

  const limpiarCancha = () => {
    setEnCancha([]);
    setFormacionActiva(null);
  };

  const enCanchaIds = new Set(enCancha.map(j => j.jugadorId));
  const suplentes = allJugadores.filter(j => !enCanchaIds.has(j.id));

  return (
    <Layout userName={user.name} userRole="Capitan" menuType="capitan">
      <div style={st.container}>
        <div style={st.headerRow}>
          <h1 style={st.title}>ALINEACIÓN</h1>
          <button style={st.btnLimpiar} onClick={limpiarCancha}>↺ Limpiar cancha</button>
        </div>

        <div style={st.mainRow}>
          {/* ── Panel izquierdo ── */}
          <div style={st.panelIzq}>
            {/* Suplentes / banco */}
            <div style={st.card}>
              <div style={st.panelLabel}>SUPLENTES <span style={st.badge}>{suplentes.length}</span></div>
              <div style={st.lista}>
                {suplentes.length === 0 && (
                  <p style={st.empty}>Todos en cancha</p>
                )}
                {suplentes.map(j => (
                  <div
                    key={j.id}
                    draggable
                    onDragStart={(e) => onDragStartBanco(e, j.id)}
                    style={st.jugadorRow}
                    title="Arrastra al campo"
                  >
                    <div style={st.avatar}>👤</div>
                    <div>
                      <div style={st.jugNombre}>{j.nombre}</div>
                      <div style={st.jugPos}>{j.posicion}</div>
                    </div>
                    <div style={st.dragHint}>⠿</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Formaciones predefinidas */}
            <div style={{ ...st.card, marginTop: '0.75rem' }}>
              <div style={st.panelLabel}>FORMACIONES</div>
              <div style={st.formGrid}>
                {Object.keys(FORMACIONES).map(f => (
                  <button
                    key={f}
                    style={{
                      ...st.btnForm,
                      ...(formacionActiva === f ? st.btnFormActive : {}),
                    }}
                    onClick={() => aplicarFormacion(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <p style={st.formHint}>Selecciona una formación para colocar a todos automáticamente, luego ajusta arrastrando.</p>
            </div>
          </div>

          {/* ── Campo ── */}
          <div style={st.campoWrap}>
            <div
              ref={campoRef}
              style={st.campo}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDropCancha}
            >
              {/* Líneas del campo */}
              <div style={st.lineaMedia} />
              <div style={st.circulo} />
              <div style={st.arcoIzq} />
              <div style={st.arcoDer} />
              <div style={st.areaIzq} />
              <div style={st.areaDer} />

              {/* Jugadores en cancha */}
              {enCancha.map(({ jugadorId, x, y, slot }) => {
                const j = allJugadores.find(p => p.id === jugadorId);
                if (!j) return null;
                const color = slot ? SLOT_COLOR[slot] : '#e53e3e';
                return (
                  <div
                    key={jugadorId}
                    draggable
                    onDragStart={(e) => onDragStartCancha(e, jugadorId)}
                    onDoubleClick={() => quitarDeCancha(jugadorId)}
                    style={{
                      ...st.dot,
                      left: `${x}%`,
                      top: `${y}%`,
                      backgroundColor: color,
                    }}
                    title="Doble clic para quitar · Arrastra para mover"
                  >
                    <span style={st.dotNombre}>{j.nombre.split(' ')[0].toUpperCase()}</span>
                  </div>
                );
              })}

              {/* Hint cuando está vacío */}
              {enCancha.length === 0 && (
                <div style={st.campoHint}>
                  Arrastra jugadores aquí o elige una formación
                </div>
              )}
            </div>
            <p style={st.instruccion}>
              🖱 Arrastra jugadores desde el panel · Doble clic sobre un jugador para devolverlo al banco
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const st = {
  container: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  headerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  btnLimpiar: { padding: '0.45rem 1rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: 'transparent', color: '#666', fontSize: '0.8rem', cursor: 'pointer' },

  mainRow: { display: 'flex', gap: '1rem', alignItems: 'flex-start' },

  panelIzq: { width: '200px', minWidth: '200px', display: 'flex', flexDirection: 'column' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1rem', border: '1px solid #e0e8f0' },
  panelLabel: { fontSize: '0.72rem', fontWeight: '700', color: '#1a1a1a', letterSpacing: '0.5px', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' },
  badge: { backgroundColor: '#e8f5ee', color: '#2d9e6b', borderRadius: '10px', padding: '0 6px', fontSize: '0.68rem', fontWeight: '700' },

  lista: { display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '260px', overflowY: 'auto' },
  empty: { fontSize: '0.75rem', color: '#aaa', textAlign: 'center', padding: '1rem 0' },

  jugadorRow: {
    display: 'flex', alignItems: 'center', gap: '0.5rem',
    padding: '0.4rem 0.5rem', borderRadius: '8px', cursor: 'grab',
    border: '1px solid transparent',
    transition: 'background 0.15s',
    userSelect: 'none',
  },
  avatar: { width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#e8f0f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 },
  jugNombre: { fontSize: '0.8rem', fontWeight: '600', color: '#1a1a1a' },
  jugPos: { fontSize: '0.68rem', color: '#888' },
  dragHint: { marginLeft: 'auto', color: '#ccc', fontSize: '1rem', cursor: 'grab' },

  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem', marginBottom: '0.5rem' },
  btnForm: { padding: '0.45rem', border: '1px solid #ddd', borderRadius: '6px', backgroundColor: 'transparent', color: '#555', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' },
  btnFormActive: { backgroundColor: '#2d9e6b', color: '#fff', border: '1px solid #2d9e6b' },
  formHint: { fontSize: '0.65rem', color: '#aaa', lineHeight: '1.4', margin: 0 },

  campoWrap: { flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  campo: {
    backgroundColor: '#2d7a3a', borderRadius: '10px', border: '3px solid rgba(255,255,255,0.25)',
    width: '100%', height: '360px', position: 'relative', overflow: 'hidden',
  },

  lineaMedia: { position: 'absolute', top: 0, bottom: 0, left: '50%', width: '2px', backgroundColor: 'rgba(255,255,255,0.35)' },
  circulo: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)' },
  arcoIzq: { position: 'absolute', top: '30%', left: 0, width: '35px', height: '40%', border: '2px solid rgba(255,255,255,0.35)', borderLeft: 'none', borderRadius: '0 8px 8px 0' },
  arcoDer: { position: 'absolute', top: '30%', right: 0, width: '35px', height: '40%', border: '2px solid rgba(255,255,255,0.35)', borderRight: 'none', borderRadius: '8px 0 0 8px' },
  areaIzq: { position: 'absolute', top: '20%', left: 0, width: '65px', height: '60%', border: '2px solid rgba(255,255,255,0.2)', borderLeft: 'none', borderRadius: '0 4px 4px 0' },
  areaDer: { position: 'absolute', top: '20%', right: 0, width: '65px', height: '60%', border: '2px solid rgba(255,255,255,0.2)', borderRight: 'none', borderRadius: '4px 0 0 4px' },

  dot: {
    position: 'absolute', width: '26px', height: '26px', borderRadius: '50%',
    transform: 'translate(-50%, -50%)', border: '2px solid rgba(255,255,255,0.7)',
    cursor: 'grab', display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 10,
  },
  dotNombre: { position: 'absolute', top: '110%', left: '50%', transform: 'translateX(-50%)', fontSize: '0.52rem', color: '#fff', whiteSpace: 'nowrap', fontWeight: '700', textShadow: '0 1px 3px rgba(0,0,0,0.9)' },

  campoHint: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', textAlign: 'center', pointerEvents: 'none', lineHeight: '1.5' },

  instruccion: { fontSize: '0.7rem', color: '#aaa', textAlign: 'center', margin: 0 },
};

export default AlignmentPage;