// src/App.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages d'authentification
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';

// Pages du tableau de bord
import Dashboard from './pages/Dashboard.jsx';
import Products from './pages/Products.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import MouvementsPage from './pages/MouvementsPage.jsx';
import FournisseursPage from './pages/FournisseursPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import EmpruntsPage from './pages/EmpruntsPage.jsx';

// Composants de structure
import ProtectedRoute from './components/ProtectedRoute.jsx';
import DashboardLayout from './components/DashboardLayout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- ROUTES PUBLIQUES --- */}
        {/* Ces routes n'ont pas de layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- ROUTES PROTÉGÉES --- */}
        {/* Toutes les routes imbriquées ici sont protégées et utilisent le DashboardLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/mouvements" element={<MouvementsPage />} />
            <Route path="/fournisseurs" element={<FournisseursPage />} />   {/* CORRECTION : Déplacée ici */}
            <Route path="/notifications" element={<NotificationsPage />} /> {/* CORRECTION : Déplacée ici */}
            <Route path="/emprunts" element={<EmpruntsPage />} />
            
            {/* Redirection pour la racine du site (quand on est connecté) */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>
        </Route>
        
        {/* --- REDIRECTION FINALE --- */}
        {/* Si une route ne correspond à RIEN ci-dessus, on redirige vers le login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;