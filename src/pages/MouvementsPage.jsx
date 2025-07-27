// src/pages/MouvementsPage.jsx

import React, { useState } from 'react';
// -- AJOUT -- : Import de l'icône FiDownload
import { FiArrowUpCircle, FiArrowDownCircle, FiDownload } from 'react-icons/fi';
import MovementModal from '../components/MovementModal';

const MouvementsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('in');
  const [products] = useState([ { id: 1, name: 'Ordinateur portable HP' }, { id: 2, name: 'Imprimante Canon' }, { id: 3, name: 'Clavier sans fil' }, { id: 4, name: 'Souris gaming' }, ]);
  const [suppliers] = useState([ { id: 1, name: 'Fournisseur A-Tech' }, { id: 2, name: 'BuroPlus Distribution' }, ]);
  const [clients] = useState([ { id: 1, name: 'Entreprise XYZ' }, { id: 2, name: 'Client Particulier - M. Bernard' }, ]);
  const [movements, setMovements] = useState([ { id: 1, date: '2023-10-26', product: 'Ordinateur portable HP', type: 'in', quantity: 10, user: 'admin', party: 'Fournisseur A-Tech' }, { id: 2, date: '2023-10-25', product: 'Imprimante Canon', type: 'out', quantity: 2, user: 'viewer', party: 'Entreprise XYZ' }, ]);
  
  const handleOpenModal = (type) => { setModalType(type); setShowModal(true); };
  const handleSaveMovement = (newMovementData) => {
    const product = products.find(p => p.id === parseInt(newMovementData.productId));
    const partyList = newMovementData.type === 'in' ? suppliers : clients;
    const party = partyList.find(p => p.id === parseInt(newMovementData.partyId));
    const newMovement = { id: Date.now(), date: newMovementData.date, product: product ? product.name : 'Produit inconnu', type: newMovementData.type, quantity: parseInt(newMovementData.quantity), user: 'admin', party: party ? party.name : 'Inconnu', };
    setMovements([newMovement, ...movements]);
  };

  // -- AJOUT -- : La fonction qui sera appelée au clic
  const handleExport = (format) => {
    alert(`Exportation en ${format} en cours de développement...`);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Historique des Mouvements</h1>
          <div className="flex gap-3">
            {/* -- AJOUT -- : onClick sur les boutons d'export */}
            <button onClick={() => handleExport('Excel')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"><FiDownload /> Excel</button>
            <button onClick={() => handleExport('PDF')} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"><FiDownload /> PDF</button>
            <button onClick={() => handleOpenModal('in')} className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"><FiArrowUpCircle /> Enregistrer une Entrée</button>
            <button onClick={() => handleOpenModal('out')} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"><FiArrowDownCircle /> Enregistrer une Sortie</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr><th className="th-style">Date</th><th className="th-style">Produit</th><th className="th-style">Fournisseur / Client</th><th className="th-style">Type</th><th className="th-style">Quantité</th><th className="th-style">Utilisateur</th></tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movements.map((mov) => (
                <tr key={mov.id} className="hover:bg-gray-50">
                  <td className="td-style">{mov.date}</td>
                  <td className="td-style font-medium">{mov.product}</td>
                  <td className="td-style text-sm text-gray-500">{mov.party}</td>
                  <td className="td-style"><span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${mov.type === 'in' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{mov.type === 'in' ? 'Entrée' : 'Sortie'}</span></td>
                  <td className={`td-style font-bold ${mov.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>{mov.type === 'in' ? '+' : '-'}{mov.quantity}</td>
                  <td className="td-style">{mov.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showModal && ( <MovementModal type={modalType} onClose={() => setShowModal(false)} onSave={handleSaveMovement} products={products} suppliers={suppliers} clients={clients} /> )}
    </>
  );
};

export default MouvementsPage;