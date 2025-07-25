// src/pages/Dashboard.jsx
// Rôle : Uniquement le contenu de la page, sans layout.

const Dashboard = () => {
  const recentActivities = [
    { action: "Entrée de stock", product: "Produit A", quantity: "+50", time: "Il y a 2 heures" },
    { action: "Sortie de stock", product: "Produit B", quantity: "-20", time: "Il y a 4 heures" },
    { action: "Nouveau produit ajouté", product: "Produit C", time: "Il y a 1 jour" }
  ];

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2 text-blue-600">Total Produits</h3>
          <p className="text-3xl font-bold text-gray-700">150</p>
        </div>
        <div className="bg-green-100 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2 text-green-600">En Stock</h3>
          <p className="text-3xl font-bold text-gray-700">120</p>
        </div>
        <div className="bg-yellow-100 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2 text-yellow-600">À Commander</h3>
          <p className="text-3xl font-bold text-gray-700">15</p>
        </div>
        <div className="bg-purple-100 rounded-lg p-6">
          <h3 className="text-lg font-medium mb-2 text-purple-600">Catégories</h3>
          <p className="text-3xl font-bold text-gray-700">8</p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Activités récentes</h2>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
              <div>
                <p className="font-medium text-gray-700">{activity.action} - {activity.product}</p>
                {activity.quantity && <p className="text-sm text-gray-500">Quantité: {activity.quantity}</p>}
              </div>
              <span className="text-sm text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;