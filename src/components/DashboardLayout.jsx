import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  const navItems = [
    { name: 'Tableau de bord', path: '/dashboard', icon: '📊' },
    { name: 'Produits', path: '/products', icon: '📦' },
    { name: 'Catégories', path: '/categories', icon: '🏷️' },
    { name: 'Mouvements', path: '/movements', icon: '🔄' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white fixed h-full">
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-bold">ESPRIM Stock</h1>
          </div>

          {/* Navigation Items */}
          <nav className="flex-grow p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-700">
            <Link
              to="/login"
              className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-red-400 hover:text-red-300"
            >
              <span className="mr-3">🚪</span>
              Déconnexion
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
