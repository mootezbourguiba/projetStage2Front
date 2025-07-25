import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#1E1E2D] text-gray-400 p-6 fixed left-0 top-0">
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white">ESPRIM Stock</h1>
      </div>
      
      <nav className="space-y-6">
        <Link 
          to="/dashboard" 
          className="flex items-center gap-3 p-2 text-blue-400 hover:bg-[#2A2A3C]"
        >
          <span className="material-icons">dashboard</span>
          <span>Tableau de bord</span>
        </Link>

        <Link 
          to="/products" 
          className="flex items-center gap-3 p-2 hover:bg-[#2A2A3C] hover:text-gray-200"
        >
          <span className="material-icons">inventory_2</span>
          <span>Produits</span>
        </Link>

        <Link 
          to="/categories" 
          className="flex items-center gap-3 p-2 hover:bg-[#2A2A3C] hover:text-gray-200"
        >
          <span className="material-icons">category</span>
          <span>Catégories</span>
        </Link>

        <Link 
          to="/movements" 
          className="flex items-center gap-3 p-2 hover:bg-[#2A2A3C] hover:text-gray-200"
        >
          <span className="material-icons">swap_horiz</span>
          <span>Mouvements</span>
        </Link>
      </nav>

      <div className="absolute bottom-6 w-full left-0 px-6">
        <button 
          onClick={() => {/* TODO: Implement logout */}} 
          className="flex items-center gap-3 p-2 text-red-400 hover:bg-[#2A2A3C] w-full"
        >
          <span className="material-icons">logout</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
