import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import StatisticsPage from '../pages/StatisticsPage';
import RegistrationsPage from '../pages/RegistrationsPage';
import CalendarPage from '../pages/CalendarPage';
import KeysPage from '../pages/KeysPage';
import SoportPage from '../pages/SoportPage';
import ConfigurationPage from '../pages/ConfigurationPage';
import CaptainDashboardPage from '../pages/capitan/CaptainDashboardPage';
import CreateTeamPage from '../pages/capitan/CreateTeamPage';
import AlignmentPage from '../pages/capitan/AlignmentPage';
import ConsultTeamPage from '../pages/capitan/ConsultTeamPage';
import InvitationsPage from '../pages/capitan/InvitationsPage';
import PaymentsPage from '../pages/capitan/PaymentsPage';
import OrganizerDashboardPage from '../pages/organizador/OrganizerDashboardPage';
import TournamentsPage from '../pages/organizador/TournamentsPage';
import CreateTournamentPage from '../pages/organizador/CreateTournamentPage';
import CalendarOrganizerPage from '../pages/organizador/CalendarOrganizerPage';
import PaymentsOrganizerPage from '../pages/organizador/PaymentsOrganizerPage';
import RefereeDashboardPage from '../pages/arbitro/RefereeDashboardPage';
import ViewAlignmentPage from '../pages/capitan/ViewAlignmentPage';
import PerfilPage from '../pages/PerfilPage'
import EditShieldPage from '../pages/capitan/EditShieldPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const SharedRoute = ({ Page }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const menuType =
    user.role === 'CAPTAIN'   ? 'capitan'
    : user.role === 'REFEREE' ? 'arbitro'
    : (user.role === 'ADMINISTRATOR' || user.role === 'ADMIN' || user.role === 'ORGANIZER') ? 'organizador'
    : 'jugador';
  return <Page menuType={menuType} />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Jugador */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/inscripciones" element={<PrivateRoute><RegistrationsPage /></PrivateRoute>} />

        {/* Árbitro */}
        <Route path="/arbitro/dashboard" element={<PrivateRoute><RefereeDashboardPage /></PrivateRoute>} />

        {/* Organizador */}
        <Route path="/organizador/dashboard" element={<PrivateRoute><OrganizerDashboardPage /></PrivateRoute>} />
        <Route path="/organizador/torneos" element={<PrivateRoute><TournamentsPage /></PrivateRoute>} />
        <Route path="/organizador/crear-torneo" element={<PrivateRoute><CreateTournamentPage /></PrivateRoute>} />
        <Route path="/organizador/calendario" element={<PrivateRoute><CalendarOrganizerPage /></PrivateRoute>} />
        <Route path="/organizador/pagos" element={<PrivateRoute><PaymentsOrganizerPage /></PrivateRoute>} />

        {/* Capitán */}
        <Route path="/capitan/dashboard" element={<PrivateRoute><CaptainDashboardPage /></PrivateRoute>} />
        <Route path="/capitan/crear-equipo" element={<PrivateRoute><CreateTeamPage /></PrivateRoute>} />
        <Route path="/capitan/alineacion" element={<PrivateRoute><AlignmentPage /></PrivateRoute>} />
        <Route path="/capitan/ver-alineacion" element={<PrivateRoute><ViewAlignmentPage /></PrivateRoute>} />
        <Route path="/capitan/equipo" element={<PrivateRoute><ConsultTeamPage /></PrivateRoute>} />
        <Route path="/capitan/invitaciones" element={<PrivateRoute><InvitationsPage /></PrivateRoute>} />
        <Route path="/pagos" element={<PrivateRoute><PaymentsPage /></PrivateRoute>} />
        <Route path="/capitan/editor-escudo" element={<PrivateRoute><EditShieldPage /></PrivateRoute>} />

        {/* Compartidas — el menuType se resuelve según el rol */}
        <Route path="/estadisticas" element={<SharedRoute Page={StatisticsPage} />} />
        <Route path="/calendario" element={<SharedRoute Page={CalendarPage} />} />
        <Route path="/llaves" element={<SharedRoute Page={KeysPage} />} />
        <Route path="/soporte" element={<SharedRoute Page={SoportPage} />} />
        <Route path="/configuracion" element={<SharedRoute Page={ConfigurationPage} />} />
        <Route path="/perfil" element={<SharedRoute Page={PerfilPage} />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;