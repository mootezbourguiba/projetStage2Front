// src/pages/CategoriesPage.jsx

import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const AddCategoryModal = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleSubmit = (e) => { e.preventDefault(); onSave({ name, description }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg"><h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter une catégorie</h2><form onSubmit={handleSubmit} className="space-y-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom de la catégorie</label><input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-style mt-1" required /></div><div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="input-style mt-1"></textarea></div><div className="flex justify-end space-x-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Ajouter</button></div></form></div></div>
  );
};

const EditCategoryModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState(category);
  useEffect(() => { setFormData(category); }, [category]);
  const handleInputChange = (e) => { const { id, value } = e.target; setFormData(prev => ({ ...prev, [id]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg"><h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier la catégorie</h2><form onSubmit={handleSubmit} className="space-y-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom de la catégorie</label><input id="name" type="text" value={formData.name} onChange={handleInputChange} className="input-style mt-1" required /></div><div><label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label><textarea id="description" value={formData.description} onChange={handleInputChange} rows="3" className="input-style mt-1"></textarea></div><div className="flex justify-end space-x-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Modifier</button></div></form></div></div>
  );
};

const DeleteCategoryModal = ({ category, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2><p className="mt-4 text-gray-600">Êtes-vous sûr de vouloir supprimer la catégorie : <span className="font-semibold">{category?.name}</span> ?</p><div className="flex justify-end space-x-4 mt-8"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">Annuler</button><button onClick={() => onConfirm(category)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Supprimer</button></div></div></div>
  );
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState([ { id: 1, name: 'Ordinateurs', description: 'Ordinateurs portables et de bureau' }, { id: 2, name: 'Périphériques', description: 'Imprimantes, scanners, etc.' }, { id: 3, name: 'Accessoires', description: 'Claviers, souris, câbles, etc.' }, { id: 4, name: 'Réseaux', description: 'Routeurs, switches, câbles réseau' } ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const handleOpenEditModal = (category) => { setSelectedCategory(category); setShowEditModal(true); };
  const handleOpenDeleteModal = (category) => { setSelectedCategory(category); setShowDeleteModal(true); };
  const handleSaveCategory = (updatedCategory) => { if (updatedCategory.id) { setCategories(categories.map(cat => cat.id === updatedCategory.id ? updatedCategory : cat)); } else { const newCategory = { ...updatedCategory, id: Date.now() }; setCategories([...categories, newCategory]); } };
  const handleDeleteCategory = (categoryToDelete) => { setCategories(categories.filter(cat => cat.id !== categoryToDelete.id)); setShowDeleteModal(false); };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Catégories</h1>
          <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FiPlus className="mr-2" /> Ajouter une catégorie
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr><th className="th-style">Nom</th><th className="th-style">Description</th><th className="th-style">Nombre de Produits</th><th className="th-style">Actions</th></tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="td-style font-medium">{category.name}</td>
                  <td className="td-style">{category.description}</td>
                  <td className="td-style">0</td>
                  <td className="td-style"><div className="flex gap-4"><button onClick={() => handleOpenEditModal(category)} className="text-indigo-600 hover:text-indigo-900"><FiEdit className="h-5 w-5" /></button><button onClick={() => handleOpenDeleteModal(category)} className="text-red-600 hover:text-red-900"><FiTrash2 className="h-5 w-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showAddModal && <AddCategoryModal onClose={() => setShowAddModal(false)} onSave={handleSaveCategory} />}
      {showEditModal && <EditCategoryModal category={selectedCategory} onClose={() => setShowEditModal(false)} onSave={handleSaveCategory} />}
      {showDeleteModal && <DeleteCategoryModal category={selectedCategory} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteCategory} />}
    </>
  );
};

export default CategoriesPage;