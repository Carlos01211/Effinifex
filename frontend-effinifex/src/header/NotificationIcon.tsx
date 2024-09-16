import { Bell } from 'lucide-react'; // Importar el ícono de campana de lucide-react

const NotificationIcon = () => (
  <div className="relative">
    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-700">
      <Bell color="gray" size={24} />  {/* Ícono de campana de lucide-react */}
    </button>
  </div>
);

export default NotificationIcon;
