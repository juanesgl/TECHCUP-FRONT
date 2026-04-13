import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import EstadisticasPage from '../pages/EstadisticasPage';
import InscripcionesPage from '../pages/IncripcionesPage';
import CalendarioPage from '../pages/CalendarioPage';
import LlavesPage from '../pages/LlavesPage';
import SoportePage from '../pages/SoportePage';
import ConfiguracionPage from '../pages/ConfiguracionPage';
import CapitanDashboardPage from '../pages/capitan/CapitanDashboardPage';
import CrearEquipoPage from '../pages/capitan/CrearEquipoPage';
import AlineacionPage from '../pages/capitan/AlineacionPage';
import ConsultarEquipoPage from '../pages/capitan/ConsultarEquipoPage';
import InvitacionesPage from '../pages/capitan/InvitacionesPage';
import PagosPage from '../pages/capitan/PagosPage';
import OrganizadorDashboardPage from '../pages/organizador/OrganizadorDashboardPage';
import TorneosPage from '../pages/organizador/TorneosPage';
import CrearTorneoPage from '../pages/organizador/CrearTorneoPage';
import CalendarioOrganizadorPage from '../pages/organizador/CalendarioOrganizadorPage';
import PagosOrganizadorPage from '../pages/organizador/PagosOrganizadorPage';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const SharedRoute = ({ Page }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  const menuType = user.role === 'CAPTAIN' ? 'capitan'
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

        {/* Rutas jugador */}
        <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
        <Route path="/inscripciones" element={<PrivateRoute><InscripcionesPage /></PrivateRoute>} />

        {/* Rutas organizador */}
        <Route path="/organizador/dashboard" element={<PrivateRoute><OrganizadorDashboardPage /></PrivateRoute>} />
        <Route path="/organizador/torneos" element={<PrivateRoute><TorneosPage /></PrivateRoute>} />
        <Route path="/organizador/crear-torneo" element={<PrivateRoute><CrearTorneoPage /></PrivateRoute>} />
        <Route path="/organizador/calendario" element={<PrivateRoute><CalendarioOrganizadorPage /></PrivateRoute>} />
        <Route path="/organizador/pagos" element={<PrivateRoute><PagosOrganizadorPage /></PrivateRoute>} />

        {/* Rutas capitán */}
        <Route path="/capitan/dashboard" element={<PrivateRoute><CapitanDashboardPage /></PrivateRoute>} />
        <Route path="/capitan/crear-equipo" element={<PrivateRoute><CrearEquipoPage /></PrivateRoute>} />
        <Route path="/capitan/alineacion" element={<PrivateRoute><AlineacionPage /></PrivateRoute>} />
        <Route path="/capitan/equipo" element={<PrivateRoute><ConsultarEquipoPage /></PrivateRoute>} />
        <Route path="/capitan/invitaciones" element={<PrivateRoute><InvitacionesPage /></PrivateRoute>} />
        <Route path="/pagos" element={<PrivateRoute><PagosPage /></PrivateRoute>} />

        {/* Rutas compartidas */}
        <Route path="/estadisticas" element={<SharedRoute Page={EstadisticasPage} />} />
        <Route path="/calendario" element={<SharedRoute Page={CalendarioPage} />} />
        <Route path="/llaves" element={<SharedRoute Page={LlavesPage} />} />
        <Route path="/soporte" element={<SharedRoute Page={SoportePage} />} />
        <Route path="/configuracion" element={<SharedRoute Page={ConfiguracionPage} />} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;