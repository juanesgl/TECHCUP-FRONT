import { useState } from 'react';
import Layout from '../components/Layout';

const SoportePage = ({menuType}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const faqs = [
    {
      pregunta: '¿Como me inscribo en un equipo?',
      respuesta: 'Debes esperar la invitacion de un capitan o buscar un equipo disponible.',
    },
    {
      pregunta: '¿Quiénes pueden participar en el torneo?',
      respuesta: 'Estudiantes, profesores, personal administrativo, graduados y familiares de los programas de Ingeniería de Sistemas, IA, Ciberseguridad y Estadística de la Escuela Colombiana de Ingeniería.',
    },
    {
      pregunta: '¿Cuantos jugadores puede tener tu equipo?',
      respuesta: 'Mínimo 7 y máximo 12 jugadores.',
    },
    {
      pregunta: '¿Como se realiza el pago?',
      respuesta: 'El capitan paga por nequi o efectivo y sube el comprobante.',
    },
  ];

  return (
    <Layout userName={user.name} userRole={user.role} menuType={menuType}>
      <div style={styles.container}>
        <h1 style={styles.title}>SOPORTE</h1>
        <p style={styles.subtitle}>
          Aquí encontraras las respuestas a ciertas preguntas,{' '}
          <br />y una línea de comunicación directamente.
        </p>

        <div style={styles.mainCard}>
          {/* Botón contactar */}
          <div style={styles.contactRow}>
            <button style={styles.contactBtn}>
              💬 Contactar Soporte
            </button>
          </div>

          {/* FAQs */}
          <h2 style={styles.faqTitle}>Preguntas frecuentes</h2>
          <div style={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <div key={i} style={styles.faqCard}>
                <p style={styles.faqPregunta}>{faq.pregunta}</p>
                <p style={styles.faqRespuesta}>{faq.respuesta}</p>
              </div>
            ))}
          </div>

          {/* Sidebar derecho */}
          <div style={styles.sideActions}>
            <div style={styles.actionRow}>
              <span style={styles.actionIcon}>⚠</span>
              <span style={styles.actionText}>Reportar un problema</span>
              <span style={styles.chevron}>›</span>
            </div>
            <div style={styles.actionRow}>
              <span style={styles.actionIcon}>📍</span>
              <span style={styles.actionText}>Contacto Organizador</span>
              <span style={styles.chevron}>›</span>
            </div>
            <div style={styles.horarioCard}>
              <p style={styles.horarioTitle}>HORARIO DE ATENCIÓN</p>
              <p style={styles.horarioText}>Lunes a Viernes: 09:00 – 20:00</p>
              <p style={styles.horarioText}>Sábados y Domingos: 08:00 – 22:00</p>
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
  },
  title: {
    fontFamily: 'Bebas Neue, sans-serif',
    fontSize: '2rem',
    fontWeight: 'normal',
    color: '#1a1a1a',
    letterSpacing: '2px',
  },
  subtitle: {
    fontSize: '0.88rem',
    color: '#555',
    lineHeight: '1.5',
  },
  mainCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    border: '1px solid #e0e8f0',
    display: 'grid',
    gridTemplateColumns: '1fr 220px',
    gridTemplateRows: 'auto auto',
    gap: '1.25rem',
  },
  contactRow: {
    gridColumn: '1 / 2',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  contactBtn: {
    backgroundColor: '#2d9e6b',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    padding: '0.7rem 1.25rem',
    cursor: 'pointer',
    fontSize: '0.88rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  faqTitle: {
    gridColumn: '1 / 2',
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: '0.5rem',
  },
  faqGrid: {
    gridColumn: '1 / 2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  faqCard: {
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '1rem',
    border: '1px solid #e0e8f0',
  },
  faqPregunta: {
    fontSize: '0.88rem',
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: '0.5rem',
  },
  faqRespuesta: {
    fontSize: '0.8rem',
    color: '#555',
    lineHeight: '1.4',
  },
  sideActions: {
    gridColumn: '2 / 3',
    gridRow: '1 / 4',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #e0e8f0',
    cursor: 'pointer',
  },
  actionIcon: {
    fontSize: '1rem',
  },
  actionText: {
    flex: 1,
    fontSize: '0.82rem',
    color: '#333',
    fontWeight: '500',
  },
  chevron: {
    fontSize: '1rem',
    color: '#888',
  },
  horarioCard: {
    backgroundColor: '#e8f5ee',
    borderRadius: '8px',
    padding: '0.85rem',
    border: '1px solid #c3e6d0',
  },
  horarioTitle: {
    fontSize: '0.72rem',
    fontWeight: '700',
    color: '#2d9e6b',
    marginBottom: '0.4rem',
    letterSpacing: '0.5px',
  },
  horarioText: {
    fontSize: '0.78rem',
    color: '#444',
    lineHeight: '1.6',
  },
};

export default SoportePage;