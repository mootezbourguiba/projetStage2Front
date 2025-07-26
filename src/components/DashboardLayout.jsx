// src/components/DashboardLayout.jsx

import React from 'react';
import Sidebar from './Sidebar'; // On utilise la belle sidebar
import { Outlet } from 'react-router-dom'; // <-- ON IMPORTE LA "BOÎTE DE DÉPÔT"

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* La Sidebar est fixe et partagée par toutes les pages */}
      <Sidebar />

      {/* Le contenu principal de la page sera injecté ici */}
      <main className="flex-1 p-8 ml-64 overflow-y-auto">
        {/* On installe la boîte de dépôt ici. */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default DashboardLayout;