import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, PhoneCall, Settings, LogOut, User as UserIcon } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const links = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Contacts', path: '/contacts', icon: <Users size={20} /> },
    { name: 'Live Call', path: '/live-call', icon: <PhoneCall size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 glass-card m-4 p-4 flex flex-col gap-4">
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-8 text-center mt-4">
        CallBot AI
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
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

      {user && (
        <div className="mt-auto pt-4 border-t border-slate-700/50 flex flex-col gap-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <UserIcon size={20} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
