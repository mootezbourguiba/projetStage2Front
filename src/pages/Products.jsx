// src/pages/Products.jsx
// Rôle : Uniquement le contenu de la page, sans layout.

import React, { useState, useEffect } from 'react';
import { FiUploadCloud, FiEdit, FiTrash2 } from 'react-icons/fi';

const AddProductModal = ({ onClose, categories }) => {
  const [formData, setFormData] = useState({ name: '', category: '', stock: 0, alertThreshold: 5, photo: null });
  const [imagePreview, setImagePreview] = useState(null);
  const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) { setFormData(prev => ({ ...prev, photo: file })); setImagePreview(URL.createObjectURL(file)); }
  };
  const handleSubmit = (e) => { e.preventDefault(); console.log('Données à sauvegarder:', formData); onClose(); };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg"><h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouveau produit</h2><form onSubmit={handleSubmit} className="space-y-6"><div><label className="block text-sm font-medium text-gray-700 mb-2">Photo du produit</label><label htmlFor="file-upload" className="cursor-pointer flex justify-center items-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors" style={{ background: imagePreview ? `url(${imagePreview}) center center / cover` : '#F9FAFB' }}>{!imagePreview && ( <div className="text-center"><FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" /><p className="mt-2 text-sm text-gray-600">Cliquez pour téléverser</p><p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p></div> )}</label><input id="file-upload" name="photo" type="file" className="hidden" onChange={handleImageChange} accept="image/*" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du Produit</label><input id="name" name="name" type="text" onChange={handleInputChange} className="input-style" required /></div><div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label><select id="category" name="category" onChange={handleInputChange} className="input-style" required><option value="">Sélectionnez une catégorie</option>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div><div><label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Initial</label><input id="stock" name="stock" type="number" onChange={handleInputChange} className="input-style" required /></div><div><label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700">Seuil d'Alerte</label><input id="alertThreshold" name="alertThreshold" type="number" onChange={handleInputChange} defaultValue="5" className="input-style" required /></div></div><div className="flex justify-end space-x-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Annuler</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Sauvegarder le produit</button></div></form></div></div>
  );
};

const EditProductModal = ({ product, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState(product);
  useEffect(() => { setFormData(product); }, [product]);
  const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg"><h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier le produit</h2><form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du Produit</label><input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className="input-style" required /></div><div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label><select id="category" name="category" value={formData.category} onChange={handleInputChange} className="input-style" required>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div><div><label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">Stock Actuel</label><input id="currentStock" name="currentStock" type="number" value={formData.currentStock} onChange={handleInputChange} className="input-style" required /></div><div><label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700">Seuil d'Alerte</label><input id="alertThreshold" name="alertThreshold" type="number" value={formData.alertThreshold} onChange={handleInputChange} className="input-style" required /></div></div><div className="flex justify-end space-x-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Annuler</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Enregistrer les modifications</button></div></form></div></div>
  );
};

const DeleteProductModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2><p className="mt-4 text-gray-600">Êtes-vous sûr de vouloir supprimer définitivement le produit : <br /><span className="font-semibold text-gray-800">{product?.name}</span> ?</p><p className="mt-2 text-sm text-red-600">Cette action est irréversible.</p><div className="flex justify-end space-x-4 mt-8"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Annuler</button><button onClick={() => onConfirm(product)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm">Supprimer</button></div></div></div>
  );
};

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([ { id: 1, photo: '/images/hp.jpg', name: 'Ordinateur portable HP', category: 'Ordinateurs', currentStock: 15, alertThreshold: 5 }, { id: 2, photo: '/images/imprim.jpg', name: 'Imprimante Canon', category: 'Périphériques', currentStock: 8, alertThreshold: 3 }, { id: 3, photo: '/images/clavier.jpg', name: 'Clavier sans fil', category: 'Accessoires', currentStock: 24, alertThreshold: 10 }, { id: 4, photo: '/images/souris.jpg', name: 'Souris gaming', category: 'Accessoires', currentStock: 4, alertThreshold: 5 }, ]);
  const categories = [ { id: 1, name: 'Ordinateurs' }, { id: 2, name: 'Périphériques' }, { id: 3, name: 'Accessoires' }, { id: 4, name: 'Réseaux' } ];
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleOpenEditModal = (product) => { setSelectedProduct(product); setShowEditModal(true); };
  const handleOpenDeleteModal = (product) => { setSelectedProduct(product); setShowDeleteModal(true); };
  const handleSaveProduct = (updatedProduct) => { setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p)); console.log("Produit mis à jour :", updatedProduct); };
  const handleDeleteProduct = (productToDelete) => { setProducts(products.filter(p => p.id !== productToDelete.id)); console.log("Produit supprimé :", productToDelete); setShowDeleteModal(false); };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Gestion des Produits</h1>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow">
          <span className="material-icons text-base">add</span>Ajouter un produit
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="th-style">Photo</th><th className="th-style">Nom du Produit</th><th className="th-style">Catégorie</th><th className="th-style">Stock Actuel</th><th className="th-style">Seuil d'Alerte</th><th className="th-style">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="td-style"><img src={product.photo} alt={product.name} className="w-12 h-12 object-cover rounded-md" /></td>
                <td className="td-style font-medium text-gray-900">{product.name}</td>
                <td className="td-style text-gray-500">{product.category}</td>
                <td className="td-style">
                  <span className={`font-semibold ${product.currentStock <= product.alertThreshold ? 'text-red-600' : 'text-green-600'}`}>
                    {product.currentStock}
                    {product.currentStock <= product.alertThreshold && (<span className="material-icons text-red-500 ml-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>warning</span>)}
                  </span>
                </td>
                <td className="td-style text-gray-500">{product.alertThreshold}</td>
                <td className="td-style">
                  <div className="flex gap-4">
                    <button onClick={() => handleOpenEditModal(product)} className="text-indigo-600 hover:text-indigo-900"><FiEdit className="w-5 h-5" /></button>
                    <button onClick={() => handleOpenDeleteModal(product)} className="text-red-600 hover:text-red-900"><FiTrash2 className="w-5 h-5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} categories={categories} />}
      {showEditModal && <EditProductModal product={selectedProduct} onClose={() => setShowEditModal(false)} onSave={handleSaveProduct} categories={categories} />}
      {showDeleteModal && <DeleteProductModal product={selectedProduct} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteProduct} />}
    </>
  );
};

export default Products;