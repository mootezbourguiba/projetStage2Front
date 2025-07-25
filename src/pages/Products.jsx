import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products] = useState([
    {
      id: 1,
      photo: '/path/to/laptop.jpg',
      name: 'Ordinateur portable HP',
      category: 'Ordinateurs',
      currentStock: 15,
      alertThreshold: 5
    },
    {
      id: 2,
      photo: '/path/to/printer.jpg',
      name: 'Imprimante Canon',
      category: 'Périphériques',
      currentStock: 8,
      alertThreshold: 3
    },
    {
      id: 3,
      photo: '/path/to/keyboard.jpg',
      name: 'Clavier sans fil',
      category: 'Accessoires',
      currentStock: 24,
      alertThreshold: 10
    },
    {
      id: 4,
      photo: '/path/to/mouse.jpg',
      name: 'Souris gaming',
      category: 'Accessoires',
      currentStock: 4,
      alertThreshold: 5
    }
  );
  const AddProductModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">Ajouter un nouveau produit</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du Produit
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option>Sélectionnez une catégorie</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock Initial
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Seuil d'Alerte
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de la Photo
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  className="ml-2 p-2 border border-gray-300 rounded-md shadow-sm"
                >
                  📁
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FA]">
      <Sidebar />
      <div className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Gestion des Produits</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#6366F1] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#5457E5]"
          >
            <span className="material-icons">add</span>
            Ajouter un produit
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-6 text-left text-gray-500 font-medium">PHOTO</th>
                <th className="py-4 px-6 text-left text-gray-500 font-medium">NOM DU PRODUIT</th>
                <th className="py-4 px-6 text-left text-gray-500 font-medium">CATÉGORIE</th>
                <th className="py-4 px-6 text-left text-gray-500 font-medium">STOCK ACTUEL</th>
                <th className="py-4 px-6 text-left text-gray-500 font-medium">SEUIL D'ALERTE</th>
                <th className="py-4 px-6 text-left text-gray-500 font-medium">ACTIONS</th>
              </tr>
            </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b last:border-0">
                <td className="py-4 px-6">
                  <img 
                    src={product.photo} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">{product.category}</td>
                <td className="py-4 px-6">
                  <span className={`${
                    product.currentStock <= product.alertThreshold 
                      ? 'text-red-500' 
                      : 'text-gray-700'
                  }`}>
                    {product.currentStock}
                    {product.currentStock <= product.alertThreshold && (
                      <span className="material-icons text-red-500 ml-1" style={{fontSize: '16px'}}>
                        warning
                      </span>
                    )}
                  </span>
                </td>
                <td className="py-4 px-6">{product.alertThreshold}</td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <span className="material-icons">edit</span>
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddProductModal />}
      {/* End of main content */}
    </div>
  );
};

export default Products;
