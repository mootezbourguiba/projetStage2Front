// src/pages/NotificationsPage.jsx

const NotificationsPage = () => {
  const notifications = [
    { type: 'alert', message: 'Le stock de "Souris gaming" est à 4, en dessous du seuil de 5.', time: 'Il y a 10 minutes' },
    { type: 'in', message: '20 unités de "Clavier sans fil" ont été ajoutées.', time: 'Il y a 2 heures' },
    { type: 'out', message: '5 unités de "Ordinateur portable HP" ont été sorties.', time: 'Il y a 1 jour' },
  ];

  const getNotificationStyle = (type) => {
    switch (type) {
      case 'alert':
        return { style: 'text-red-600', label: '[Alerte Stock Bas]' };
      case 'in':
        return { style: 'text-green-600', label: '[Entrée de Stock]' };
      case 'out':
        return { style: 'text-yellow-600', label: '[Sortie de Stock]' };
      default:
        return { style: 'text-gray-600', label: '' };
    }
  };

  return (
    // --- NOUVEAU: Structure de carte unifiée ---
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        <button className="text-sm text-indigo-600 hover:underline">Marquer tout comme lu</button>
      </div>
      <ul className="divide-y divide-gray-200">
        {notifications.map((notif, index) => {
          const { style, label } = getNotificationStyle(notif.type);
          return (
            <li key={index} className="p-4 hover:bg-gray-50">
              <p>
                <span className={`font-semibold ${style}`}>{label}</span> {notif.message}
              </p>
              <p className="text-sm text-gray-500 mt-1">{notif.time}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationsPage;