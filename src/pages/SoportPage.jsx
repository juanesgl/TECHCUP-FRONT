import { useState } from 'react';
import Layout from '../components/Layout';

const SoportPage = ({ menuType }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [modal, setModal]                 = useState(null);
  const [reporteForm, setReporteForm]     = useState({ tipo: '', descripcion: '', email: '' });
  const [contactForm, setContactForm]     = useState({ nombre: '', email: '', mensaje: '' });
  const [enviado, setEnviado]             = useState(false);

  const esOrganizador = menuType === 'organizador';

  const faqs = [
    { pregunta: '¿Cómo me inscribo en un equipo?',          respuesta: 'Debes esperar la invitación de un capitán o buscar un equipo disponible.' },
    { pregunta: '¿Quiénes pueden participar en el torneo?', respuesta: 'Estudiantes, profesores, personal administrativo, graduados y familiares de los programas de Ingeniería de Sistemas, IA, Ciberseguridad y Estadística de la Escuela Colombiana de Ingeniería.' },
    { pregunta: '¿Cuántos jugadores puede tener tu equipo?',respuesta: 'Mínimo 7 y máximo 12 jugadores.' },
    { pregunta: '¿Cómo se realiza el pago?',                respuesta: 'El capitán paga por Nequi o efectivo y sube el comprobante en la sección de Pagos.' },
  ];

  const handleEnviar = () => {
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setModal(null);
      setReporteForm({ tipo: '', descripcion: '', email: '' });
      setContactForm({ nombre: '', email: '', mensaje: '' });
    }, 2000);
  };

  const ModalContactar = () => (
    <div style={s.overlay} onClick={() => setModal(null)}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <button style={s.cerrar} onClick={() => setModal(null)}>✕</button>
        <div style={s.modalIcono}>💬</div>
        <h3 style={s.modalTitulo}>Contactar Soporte</h3>
        <p style={s.modalSub}>Nuestro equipo te responderá en menos de 24 horas</p>
        {enviado ? (
          <div style={s.exitoBanner}>✓ Mensaje enviado correctamente</div>
        ) : (
          <>
            <div style={s.field}>
              <label style={s.label}>Nombre</label>
              <input style={s.input} value={contactForm.nombre} placeholder="Tu nombre completo"
                onChange={e => setContactForm(p => ({ ...p, nombre: e.target.value }))} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Correo electrónico</label>
              <input style={s.input} type="email" value={contactForm.email} placeholder="tu@correo.com"
                onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Mensaje</label>
              <textarea style={s.textarea} value={contactForm.mensaje} placeholder="¿En qué podemos ayudarte?"
                onChange={e => setContactForm(p => ({ ...p, mensaje: e.target.value }))} />
            </div>
            <button style={s.btnEnviar} onClick={handleEnviar}>Enviar mensaje</button>
          </>
        )}
      </div>
    </div>
  );

  const ModalReportar = () => (
    <div style={s.overlay} onClick={() => setModal(null)}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <button style={s.cerrar} onClick={() => setModal(null)}>✕</button>
        <div style={{ ...s.modalIcono, backgroundColor: '#fff3e0', color: '#e67e22' }}>⚠</div>
        <h3 style={s.modalTitulo}>Reportar un problema</h3>
        <p style={s.modalSub}>Cuéntanos qué está fallando para poder solucionarlo</p>
        {enviado ? (
          <div style={s.exitoBanner}>✓ Reporte enviado correctamente</div>
        ) : (
          <>
            <div style={s.field}>
              <label style={s.label}>Tipo de problema</label>
              <select style={s.input} value={reporteForm.tipo}
                onChange={e => setReporteForm(p => ({ ...p, tipo: e.target.value }))}>
                <option value="">Selecciona una categoría...</option>
                <option>Error en la aplicación</option>
                <option>Problema con pagos</option>
                <option>Problema con mi equipo</option>
                <option>Problema con el calendario</option>
                <option>Conducta inapropiada</option>
                <option>Otro</option>
              </select>
            </div>
            <div style={s.field}>
              <label style={s.label}>Correo para respuesta</label>
              <input style={s.input} type="email" value={reporteForm.email} placeholder="tu@correo.com"
                onChange={e => setReporteForm(p => ({ ...p, email: e.target.value }))} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Descripción del problema</label>
              <textarea style={s.textarea} value={reporteForm.descripcion}
                placeholder="Describe el problema con el mayor detalle posible..."
                onChange={e => setReporteForm(p => ({ ...p, descripcion: e.target.value }))} />
            </div>
            <button style={{ ...s.btnEnviar, backgroundColor: '#e67e22' }} onClick={handleEnviar}>
              Enviar reporte
            </button>
          </>
        )}
      </div>
    </div>
  );

  const ModalOrganizador = () => (
    <div style={s.overlay} onClick={() => setModal(null)}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <button style={s.cerrar} onClick={() => setModal(null)}>✕</button>
        <div style={{ ...s.modalIcono, backgroundColor: '#e8f0f7', color: '#3b82f6' }}>📍</div>
        <h3 style={s.modalTitulo}>Contacto del Organizador</h3>
        <p style={s.modalSub}>Información de contacto directo con el organizador del torneo</p>
        <div style={s.orgCard}>
          <div style={s.orgAvatar}>JG</div>
          <div>
            <div style={s.orgNombre}>Juan García</div>
            <div style={s.orgRol}>Organizador TECHCUP 2026</div>
          </div>
        </div>
        <div style={s.contactoGrid}>
          <div style={s.contactoItem}>
            <span style={s.contactoIcono}>📧</span>
            <div>
              <div style={s.contactoLabel}>Correo</div>
              <div style={s.contactoValor}>organizador@escuelaing.edu.co</div>
            </div>
          </div>
          <div style={s.contactoItem}>
            <span style={s.contactoIcono}>📱</span>
            <div>
              <div style={s.contactoLabel}>WhatsApp</div>
              <div style={s.contactoValor}>+57 300 123 4567</div>
            </div>
          </div>
          <div style={s.contactoItem}>
            <span style={s.contactoIcono}>🕐</span>
            <div>
              <div style={s.contactoLabel}>Disponibilidad</div>
              <div style={s.contactoValor}>Lun – Vie · 9:00 – 18:00</div>
            </div>
          </div>
          <div style={s.contactoItem}>
            <span style={s.contactoIcono}>📍</span>
            <div>
              <div style={s.contactoLabel}>Ubicación</div>
              <div style={s.contactoValor}>Bloque F, Oficina 204</div>
            </div>
          </div>
        </div>
        <button style={{ ...s.btnEnviar, backgroundColor: '#3b82f6' }} onClick={() => setModal(null)}>
          Entendido
        </button>
      </div>
    </div>
  );

  return (
    <Layout userName={user.name} userRole={user.role} menuType={menuType}>
      <div style={s.container}>
        <h1 style={s.title}>SOPORTE</h1>
        <p style={s.subtitle}>
          Aquí encontrarás las respuestas a ciertas preguntas y una línea de comunicación directa.
        </p>

        <div style={s.mainCard}>
          <div style={s.contactRow}>
            <button style={s.contactBtn} onClick={() => setModal('contactar')}>
              💬 Contactar Soporte
            </button>
          </div>

          <h2 style={s.faqTitle}>Preguntas frecuentes</h2>
          <div style={s.faqGrid}>
            {faqs.map((faq, i) => (
              <div key={i} style={s.faqCard}>
                <p style={s.faqPregunta}>{faq.pregunta}</p>
                <p style={s.faqRespuesta}>{faq.respuesta}</p>
              </div>
            ))}
          </div>

          <div style={s.sideActions}>
            <div style={s.actionRow} onClick={() => setModal('reportar')}>
              <span style={s.actionIcon}>⚠</span>
              <span style={s.actionText}>Reportar un problema</span>
              <span style={s.chevron}>›</span>
            </div>

            {!esOrganizador && (
              <div style={s.actionRow} onClick={() => setModal('organizador')}>
                <span style={s.actionIcon}>📍</span>
                <span style={s.actionText}>Contacto Organizador</span>
                <span style={s.chevron}>›</span>
              </div>
            )}

            {esOrganizador && (
              <div style={{ ...s.horarioCard, backgroundColor: '#f0f4ff', border: '1px solid #d0d8f0' }}>
                <p style={{ ...s.horarioTitle, color: '#3b82f6' }}>TU CONTACTO PÚBLICO</p>
                <p style={s.horarioText}>📧 organizador@escuelaing.edu.co</p>
                <p style={s.horarioText}>📱 +57 300 123 4567</p>
                <p style={s.horarioText}>📍 Bloque F, Oficina 204</p>
              </div>
            )}

            <div style={s.horarioCard}>
              <p style={s.horarioTitle}>HORARIO DE ATENCIÓN</p>
              <p style={s.horarioText}>Lunes a Viernes: 09:00 – 20:00</p>
              <p style={s.horarioText}>Sábados y Domingos: 08:00 – 22:00</p>
            </div>
          </div>
        </div>
      </div>

      {modal === 'contactar' && <ModalContactar />}
      {modal === 'reportar'  && <ModalReportar />}
      {modal === 'organizador' && !esOrganizador && <ModalOrganizador />}
    </Layout>
  );
};

const s = {
  container: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  title: { fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 'normal', color: '#1a1a1a', letterSpacing: '2px' },
  subtitle: { fontSize: '0.88rem', color: '#555', lineHeight: '1.5' },
  mainCard: { backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e0e8f0', display: 'grid', gridTemplateColumns: '1fr 220px', gridTemplateRows: 'auto auto', gap: '1.25rem' },
  contactRow: { gridColumn: '1 / 2', display: 'flex', justifyContent: 'flex-end' },
  contactBtn: { backgroundColor: '#2d9e6b', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '0.7rem 1.25rem', cursor: 'pointer', fontSize: '0.88rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' },
  faqTitle: { gridColumn: '1 / 2', fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', marginTop: '0.5rem' },
  faqGrid: { gridColumn: '1 / 2', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  faqCard: { backgroundColor: '#f8fafc', borderRadius: '8px', padding: '1rem', border: '1px solid #e0e8f0' },
  faqPregunta: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a', marginBottom: '0.5rem' },
  faqRespuesta: { fontSize: '0.8rem', color: '#555', lineHeight: '1.4' },
  sideActions: { gridColumn: '2 / 3', gridRow: '1 / 4', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  actionRow: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e0e8f0', cursor: 'pointer' },
  actionIcon: { fontSize: '1rem' },
  actionText: { flex: 1, fontSize: '0.82rem', color: '#333', fontWeight: '500' },
  chevron: { fontSize: '1rem', color: '#888' },
  horarioCard: { backgroundColor: '#e8f5ee', borderRadius: '8px', padding: '0.85rem', border: '1px solid #c3e6d0' },
  horarioTitle: { fontSize: '0.72rem', fontWeight: '700', color: '#2d9e6b', marginBottom: '0.4rem', letterSpacing: '0.5px' },
  horarioText: { fontSize: '0.78rem', color: '#444', lineHeight: '1.6' },

  overlay: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { backgroundColor: '#fff', borderRadius: '16px', padding: '2rem', width: '420px', boxShadow: '0 12px 40px rgba(0,0,0,0.15)', position: 'relative', display: 'flex', flexDirection: 'column', gap: '0.85rem' },
  cerrar: { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1rem', color: '#aaa', cursor: 'pointer' },
  modalIcono: { width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#e8f5ee', color: '#2d9e6b', fontSize: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modalTitulo: { fontSize: '1.1rem', fontWeight: '700', color: '#1a1a1a', margin: 0 },
  modalSub: { fontSize: '0.78rem', color: '#888', margin: 0 },
  field: { display: 'flex', flexDirection: 'column', gap: '0.3rem' },
  label: { fontSize: '0.7rem', fontWeight: '700', color: '#888', letterSpacing: '0.3px' },
  input: { padding: '0.6rem 0.85rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', color: '#333', backgroundColor: '#fff' },
  textarea: { padding: '0.6rem 0.85rem', border: '1px solid #ddd', borderRadius: '8px', fontSize: '0.85rem', outline: 'none', color: '#333', minHeight: '90px', resize: 'vertical', fontFamily: 'Inter, sans-serif' },
  btnEnviar: { padding: '0.7rem', backgroundColor: '#2d9e6b', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '0.88rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.25rem' },
  exitoBanner: { backgroundColor: '#e8f5ee', color: '#2d9e6b', borderRadius: '8px', padding: '0.85rem', textAlign: 'center', fontSize: '0.88rem', fontWeight: '600' },
  orgCard: { display: 'flex', alignItems: 'center', gap: '0.85rem', backgroundColor: '#f8fafc', borderRadius: '10px', padding: '0.85rem', border: '1px solid #e0e8f0' },
  orgAvatar: { width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #1a7a8a, #2d9e6b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '0.9rem', flexShrink: 0 },
  orgNombre: { fontSize: '0.88rem', fontWeight: '700', color: '#1a1a1a' },
  orgRol: { fontSize: '0.72rem', color: '#888' },
  contactoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' },
  contactoItem: { display: 'flex', alignItems: 'flex-start', gap: '0.5rem', backgroundColor: '#f8fafc', borderRadius: '8px', padding: '0.65rem', border: '1px solid #eee' },
  contactoIcono: { fontSize: '1rem', flexShrink: 0 },
  contactoLabel: { fontSize: '0.65rem', color: '#aaa', fontWeight: '600', textTransform: 'uppercase' },
  contactoValor: { fontSize: '0.78rem', color: '#333', fontWeight: '500', marginTop: '0.1rem' },
};

export default SoportPage;