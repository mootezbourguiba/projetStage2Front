// src/pages/Products.jsx

import React, { useState, useEffect } from 'react';
// -- AJOUT -- : Import de l'icône FiDownload
import { FiUploadCloud, FiEdit, FiTrash2, FiPlus, FiDownload } from 'react-icons/fi';

const AddProductModal = ({ onClose, onSave, categories }) => {
  const [formData, setFormData] = useState({ name: '', category: '', reference: '', barcode: '', stock: 0, alertThreshold: 5, photo: null });
  const [imagePreview, setImagePreview] = useState(null);
  const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleImageChange = (e) => { const file = e.target.files[0]; if (file) { setFormData(prev => ({ ...prev, photo: file })); setImagePreview(URL.createObjectURL(file)); } };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl"><h2 className="text-2xl font-bold text-gray-800 mb-6">Ajouter un nouveau produit</h2><form onSubmit={handleSubmit} className="space-y-6"><div><label className="block text-sm font-medium text-gray-700 mb-2">Photo du produit</label><label htmlFor="file-upload" className="cursor-pointer flex justify-center items-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors" style={{ background: imagePreview ? `url(${imagePreview}) center center / cover` : '#F9FAFB' }}>{!imagePreview && ( <div className="text-center"><FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" /><p className="mt-2 text-sm text-gray-600">Cliquez pour téléverser</p><p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p></div> )}</label><input id="file-upload" name="photo" type="file" className="hidden" onChange={handleImageChange} accept="image/*" /></div><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du Produit</label><input id="name" name="name" type="text" onChange={handleInputChange} className="input-style mt-1" required /></div><div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label><select id="category" name="category" onChange={handleInputChange} className="input-style mt-1" required><option value="">Sélectionnez une catégorie</option>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div><div><label htmlFor="reference" className="block text-sm font-medium text-gray-700">Référence</label><input id="reference" name="reference" type="text" onChange={handleInputChange} className="input-style mt-1" placeholder="Ex: HP-LAP-001" /></div><div><label htmlFor="barcode" className="block text-sm font-medium text-gray-700">Code-barres (optionnel)</label><input id="barcode" name="barcode" type="text" onChange={handleInputChange} className="input-style mt-1" placeholder="Ex: 3663602061595" /></div><div><label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Initial</label><input id="stock" name="stock" type="number" onChange={handleInputChange} className="input-style mt-1" required /></div><div><label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700">Seuil d'Alerte</label><input id="alertThreshold" name="alertThreshold" type="number" onChange={handleInputChange} defaultValue="5" className="input-style mt-1" required /></div></div><div className="flex justify-end space-x-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Annuler</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Sauvegarder le produit</button></div></form></div></div>
  );
};

const EditProductModal = ({ product, onClose, onSave, categories }) => {
  const [formData, setFormData] = useState(product);
  useEffect(() => { setFormData(product); }, [product]);
  const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); onClose(); };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl"><h2 className="text-2xl font-bold text-gray-800 mb-6">Modifier le produit</h2><form onSubmit={handleSubmit} className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom du Produit</label><input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className="input-style mt-1" required /></div><div><label htmlFor="category" className="block text-sm font-medium text-gray-700">Catégorie</label><select id="category" name="category" value={formData.category} onChange={handleInputChange} className="input-style mt-1" required>{categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}</select></div><div><label htmlFor="reference" className="block text-sm font-medium text-gray-700">Référence</label><input id="reference" name="reference" type="text" value={formData.reference || ''} onChange={handleInputChange} className="input-style mt-1" /></div><div><label htmlFor="barcode" className="block text-sm font-medium text-gray-700">Code-barres</label><input id="barcode" name="barcode" type="text" value={formData.barcode || ''} onChange={handleInputChange} className="input-style mt-1" /></div><div><label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">Stock Actuel</label><input id="currentStock" name="currentStock" type="number" value={formData.currentStock} onChange={handleInputChange} className="input-style mt-1" required /></div><div><label htmlFor="alertThreshold" className="block text-sm font-medium text-gray-700">Seuil d'Alerte</label><input id="alertThreshold" name="alertThreshold" type="number" value={formData.alertThreshold} onChange={handleInputChange} className="input-style mt-1" required /></div></div><div className="flex justify-end space-x-4 pt-4"><button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Annuler</button><button type="submit" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">Enregistrer les modifications</button></div></form></div></div>
  );
};

const DeleteProductModal = ({ product, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"><h2 className="text-xl font-bold text-gray-800">Confirmer la suppression</h2><p className="mt-4 text-gray-600">Êtes-vous sûr de vouloir supprimer définitivement le produit : <br /><span className="font-semibold text-gray-800">{product?.name}</span> ?</p><p className="mt-2 text-sm text-red-600">Cette action est irréversible.</p><div className="flex justify-end space-x-4 mt-8"><button onClick={onClose} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">Annuler</button><button onClick={() => onConfirm(product)} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm">Supprimer</button></div></div></div>
  );
};

const Products = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState([ { id: 1, photo: '/images/hp.jpg', name: 'Ordinateur portable HP', reference: 'HP-ENVY-13', barcode: '3616365412345', category: 'Ordinateurs', currentStock: 15, alertThreshold: 5 }, { id: 2, photo: '/images/imprim.jpg', name: 'Imprimante Canon', reference: 'CAN-PIX-55', barcode: '3616365467890', category: 'Périphériques', currentStock: 8, alertThreshold: 3 }, { id: 3, photo: '/images/clavier.jpg', name: 'Clavier sans fil', reference: 'LOG-K380', barcode: '3616365411223', category: 'Accessoires', currentStock: 24, alertThreshold: 10 }, { id: 4, photo: '/images/souris.jpg', name: 'Souris gaming', reference: 'RAZ-VIP-MINI', barcode: '3616365433445', category: 'Accessoires', currentStock: 4, alertThreshold: 5 }, ]);
  const categories = [ { id: 1, name: 'Ordinateurs' }, { id: 2, name: 'Périphériques' }, { id: 3, name: 'Accessoires' }, { id: 4, name: 'Réseaux' } ];
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleOpenEditModal = (product) => { setSelectedProduct(product); setShowEditModal(true); };
  const handleOpenDeleteModal = (product) => { setSelectedProduct(product); setShowDeleteModal(true); };
  const handleSaveProduct = (updatedProduct) => { if (updatedProduct.id) { setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p)); } else { const newProduct = { ...updatedProduct, id: Date.now() }; setProducts([newProduct, ...products]); } };
  const handleDeleteProduct = (productToDelete) => { setProducts(products.filter(p => p.id !== productToDelete.id)); setShowDeleteModal(false); };

  // -- AJOUT -- : La fonction qui sera appelée au clic
  const handleExport = (format) => {
    alert(`Exportation en ${format} en cours de développement...`);
  };

  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Produits</h1>
          <div className="flex gap-3">
            {/* -- AJOUT -- : onClick sur les boutons d'export */}
            <button onClick={() => handleExport('Excel')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"><FiDownload /> Excel</button>
            <button onClick={() => handleExport('PDF')} className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"><FiDownload /> PDF</button>
            <button onClick={() => setShowAddModal(true)} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"><FiPlus className="mr-2" /> Ajouter un produit</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr><th className="th-style">Photo</th><th className="th-style">Nom du Produit</th><th className="th-style">Référence</th><th className="th-style">Code-barres</th><th className="th-style">Catégorie</th><th className="th-style">Stock Actuel</th><th className="th-style">Seuil d'Alerte</th><th className="th-style">Actions</th></tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="td-style"><img src={product.photo} alt={product.name} className="w-12 h-12 object-cover rounded-md" /></td>
                  <td className="td-style font-medium">{product.name}</td>
                  <td className="td-style text-sm text-gray-500">{product.reference}</td>
                  <td className="td-style text-sm text-gray-500">{product.barcode}</td>
                  <td className="td-style">{product.category}</td>
                  <td className="td-style"><span className={`font-semibold ${product.currentStock <= product.alertThreshold ? 'text-red-600' : 'text-green-600'}`}>{product.currentStock}{product.currentStock <= product.alertThreshold && (<span className="material-icons text-red-500 ml-1" style={{ fontSize: '16px', verticalAlign: 'middle' }}>warning</span>)}</span></td>
                  <td className="td-style">{product.alertThreshold}</td>
                  <td className="td-style"><div className="flex gap-4"><button onClick={() => handleOpenEditModal(product)} className="text-indigo-600 hover:text-indigo-900"><FiEdit className="h-5 w-5" /></button><button onClick={() => handleOpenDeleteModal(product)} className="text-red-600 hover:text-red-900"><FiTrash2 className="h-5 w-5" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {showAddModal && <AddProductModal onClose={() => setShowAddModal(false)} onSave={handleSaveProduct} categories={categories} />}
      {showEditModal && <EditProductModal product={selectedProduct} onClose={() => setShowEditModal(false)} onSave={handleSaveProduct} categories={categories} />}
      {showDeleteModal && <DeleteProductModal product={selectedProduct} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteProduct} />}
    </>
  );
};

export default Products;