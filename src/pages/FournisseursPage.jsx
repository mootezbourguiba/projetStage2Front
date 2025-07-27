// src/pages/FournisseursPage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

// --- MODALE D'AJOUT DE FOURNISSEUR ---
const AddSupplierModal = ({ onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({ name: '', contactPerson: '', email: '', phone: '', suppliedCategories: [] });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryName) => {
    const newCategories = formData.suppliedCategories.includes(categoryName)
      ? formData.suppliedCategories.filter(cat => cat !== categoryName)
      : [...formData.suppliedCategories, categoryName];
    setFormData(prev => ({ ...prev, suppliedCategories: newCategories }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un fournisseur</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du fournisseur</label><input id="name" name="name" type="text" onChange={handleInputChange} className="input-style mt-1" required /></div>
            <div><label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Personne à contacter</label><input id="contactPerson" name="contactPerson" type="text" onChange={handleInputChange} className="input-style mt-1" /></div>
            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label><input id="email" name="email" type="email" onChange={handleInputChange} className="input-style mt-1" /></div>
            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label><input id="phone" name="phone" type="tel" onChange={handleInputChange} className="input-style mt-1" /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Catégories Fournies</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 border p-4 rounded-lg">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={formData.suppliedCategories.includes(cat.name)} onChange={() => handleCategoryChange(cat.name)} />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MODALE DE MODIFICATION DE FOURNISSEUR (COMPLÈTE) ---
const EditSupplierModal = ({ supplier, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState(supplier);

  useEffect(() => { setFormData(supplier); }, [supplier]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (categoryName) => {
    const newCategories = formData.suppliedCategories.includes(categoryName)
      ? formData.suppliedCategories.filter(cat => cat !== categoryName)
      : [...formData.suppliedCategories, categoryName];
    setFormData(prev => ({ ...prev, suppliedCategories: newCategories }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier le fournisseur</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label><input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className="input-style mt-1" required /></div>
            <div><label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700">Contact</label><input id="contactPerson" name="contactPerson" type="text" value={formData.contactPerson} onChange={handleInputChange} className="input-style mt-1" /></div>
            <div><label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label><input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="input-style mt-1" /></div>
            <div><label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label><input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="input-style mt-1" /></div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Catégories Fournies</label>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 border p-4 rounded-lg">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" checked={formData.suppliedCategories.includes(cat.name)} onChange={() => handleCategoryChange(cat.name)} />
                  <span className="text-sm text-gray-700">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button>
            <button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Modifier</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MODALE DE SUPPRESSION DE FOURNISSEUR (COMPLÈTE) ---
const DeleteSupplierModal = ({ supplier, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2>
        <p className="mt-4 text-gray-600">Êtes-vous sûr de vouloir supprimer le fournisseur : <span className="font-semibold">{supplier?.name}</span> ?</p>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button>
          <button onClick={() => onConfirm(supplier)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Supprimer</button>
        </div>
      </div>
    </div>
  );
};

// --- COMPOSANT PRINCIPAL DE LA PAGE ---
const FournisseursPage = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Fournisseur A-Tech', contactPerson: 'Jean Dupont', email: 'contact@a-tech.com', phone: '0123456789', suppliedCategories: ['Ordinateurs', 'Accessoires'] },
    { id: 2, name: 'BuroPlus Distribution', contactPerson: 'Marie Curie', email: 'ventes@buroplus.fr', phone: '0987654321', suppliedCategories: ['Périphériques'] },
    { id: 3, name: 'Compo-Elec', contactPerson: 'Paul Martin', email: 'support@compo-elec.com', phone: '0147258369', suppliedCategories: ['Réseaux'] },
  ]);
  const [categories] = useState([
    { id: 1, name: 'Ordinateurs' }, { id: 2, name: 'Périphériques' }, { id: 3, name: 'Accessoires' }, { id: 4, name: 'Réseaux' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const handleOpenEditModal = (supplier) => { setSelectedSupplier(supplier); setShowEditModal(true); };
  const handleOpenDeleteModal = (supplier) => { setSelectedSupplier(supplier); setShowDeleteModal(true); };

  const handleSaveSupplier = (supplierData) => {
    if (supplierData.id) { setSuppliers(suppliers.map(s => s.id === supplierData.id ? supplierData : s)); } 
    else { const newSupplier = { ...supplierData, id: Date.now() }; setSuppliers([...suppliers, newSupplier]); }
  };

  const handleDeleteSupplier = (supplierToDelete) => {
    setSuppliers(suppliers.filter(s => s.id !== supplierToDelete.id));
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Fournisseurs</h1>
          <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FiPlus className="mr-2" /> Ajouter un fournisseur
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="th-style">Nom</th><th className="th-style">Contact</th><th className="th-style">Email</th><th className="th-style">Téléphone</th><th className="th-style">Catégories Fournies</th><th className="th-style">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50">
                  <td className="td-style font-medium">{supplier.name}</td>
                  <td className="td-style">{supplier.contactPerson}</td>
                  <td className="td-style">{supplier.email}</td>
                  <td className="td-style">{supplier.phone}</td>
                  <td className="td-style">
                    <div className="flex flex-wrap gap-1">
                      {supplier.suppliedCategories.map(cat => (
                        <span key={cat} className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded-full">{cat}</span>
                      ))}
                    </div>
                  </td>
                  <td className="td-style">
                    <div className="flex gap-4">
                      <button onClick={() => handleOpenEditModal(supplier)} className="text-indigo-600 hover:text-indigo-900"><FiEdit className="h-5 w-5" /></button>
                      <button onClick={() => handleOpenDeleteModal(supplier)} className="text-red-600 hover:text-red-900"><FiTrash2 className="h-5 w-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showAddModal && <AddSupplierModal onClose={() => setShowAddModal(false)} onSave={handleSaveSupplier} categories={categories} />}
      {showEditModal && <EditSupplierModal supplier={selectedSupplier} onClose={() => setShowEditModal(false)} onSave={handleSaveSupplier} categories={categories} />}
      {showDeleteModal && <DeleteSupplierModal supplier={selectedSupplier} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteSupplier} />}
    </>
  );
};

export default FournisseursPage;