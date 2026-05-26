import { Upload, Plus, Search, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contacts & Leads</h1>
          <p className="text-slate-400">Manage your calling lists and import new leads.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700">
            <Upload size={18} /> Import CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg shadow-primary/30">
            <Plus size={18} /> Add Contact
          </button>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search contacts..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-slate-400 text-sm uppercase tracking-wider">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Added On</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50 text-sm">
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-medium text-white">John Doe</td>
              <td className="p-4 text-slate-300">+1 (555) 123-4567</td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold">New</span>
              </td>
              <td className="p-4 text-slate-400">Oct 24, 2023</td>
              <td className="p-4 text-right">
                <button 
                  onClick={() => navigate('/live-call?contact=John+Doe')}
                  className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-medium"
                >
                  <PhoneCall size={16} /> Web Call
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors">
              <td className="p-4 font-medium text-white">Jane Smith</td>
              <td className="p-4 text-slate-300">+1 (555) 987-6543</td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">Contacted</span>
              </td>
              <td className="p-4 text-slate-400">Oct 23, 2023</td>
              <td className="p-4 text-right">
                <button 
                  onClick={() => navigate('/live-call?contact=Jane+Smith')}
                  className="p-2 bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-medium"
                >
                  <PhoneCall size={16} /> Web Call
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts;
