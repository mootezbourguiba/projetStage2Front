// src/pages/MouvementsPage.jsx

import React, { useState } from 'react';
import { FiArrowUpCircle, FiArrowDownCircle } from 'react-icons/fi';
import MovementModal from '../components/MovementModal'; // On importe la nouvelle modale

const MouvementsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('in');

  // Données de test pour le dropdown des produits dans la modale
  const [products] = useState([
    { id: 1, name: 'Ordinateur portable HP' },
    { id: 2, name: 'Imprimante Canon' },
    { id: 3, name: 'Clavier sans fil' },
    { id: 4, name: 'Souris gaming' },
  ]);

  // Données de test pour l'historique
  const [movements, setMovements] = useState([
    { id: 1, date: '2023-10-26', product: 'Ordinateur portable HP', type: 'in', quantity: 10, user: 'admin' },
    { id: 2, date: '2023-10-25', product: 'Imprimante Canon', type: 'out', quantity: 2, user: 'viewer' },
  ]);
  
  const handleOpenModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Fonction pour sauvegarder le nouveau mouvement
  const handleSaveMovement = (newMovementData) => {
    const product = products.find(p => p.id === parseInt(newMovementData.productId));
    const newMovement = {
      id: Date.now(), // ID unique pour la clé
      date: newMovementData.date,
      product: product ? product.name : 'Produit inconnu',
      type: newMovementData.type,
      quantity: parseInt(newMovementData.quantity),
      user: 'admin' // Simulé pour l'instant
    };
    setMovements([newMovement, ...movements]); // Ajoute le nouveau mouvement au début de la liste
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Historique des Mouvements</h1>
          <div className="flex gap-3">
            <button onClick={() => handleOpenModal('in')} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              <FiArrowUpCircle /> Enregistrer une Entrée
            </button>
            <button onClick={() => handleOpenModal('out')} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              <FiArrowDownCircle /> Enregistrer une Sortie
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="th-style">Date</th><th className="th-style">Produit</th><th className="th-style">Type</th><th className="th-style">Quantité</th><th className="th-style">Utilisateur</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.map((mov) => (
                <tr key={mov.id} className="hover:bg-gray-50">
                  <td className="td-style">{mov.date}</td>
                  <td className="td-style font-medium">{mov.product}</td>
                  <td className="td-style">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${mov.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {mov.type === 'in' ? 'Entrée' : 'Sortie'}
                    </span>
                  </td>
                  <td className={`td-style font-bold ${mov.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                    {mov.type === 'in' ? '+' : '-'}{mov.quantity}
                  </td>
                  <td className="td-style">{mov.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* On active enfin l'affichage de la modale */}
      {showModal && (
        <MovementModal 
          type={modalType} 
          onClose={() => setShowModal(false)}
          onSave={handleSaveMovement}
          products={products}
        />
      )}
    </>
  );
};

export default MouvementsPage;