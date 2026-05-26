import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PhoneCall, Settings } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Contacts', path: '/contacts', icon: <Users size={20} /> },
    { name: 'Live Call', path: '/live-call', icon: <PhoneCall size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 glass-card m-4 p-4 flex flex-col gap-4">
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-8 text-center">
        CallBot AI
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'hover:bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
