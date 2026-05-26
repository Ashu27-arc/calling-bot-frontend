import { PhoneCall, Users, Clock, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-card p-6 flex items-center gap-4 hover:scale-105 transition-transform cursor-default">
    <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <h3 className="text-3xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-slate-400">Welcome back. Here is your calling activity today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard title="Total Calls" value="1,248" icon={<PhoneCall className="text-blue-500" />} color="bg-blue-500" />
        <StatCard title="Active Leads" value="342" icon={<Users className="text-purple-500" />} color="bg-purple-500" />
        <StatCard title="Avg Call Duration" value="2m 45s" icon={<Clock className="text-green-500" />} color="bg-green-500" />
        <StatCard title="Conversion Rate" value="14.2%" icon={<Activity className="text-orange-500" />} color="bg-orange-500" />
      </div>

      <div className="glass-card p-6 min-h-[400px]">
        <h2 className="text-xl font-semibold mb-4">Recent Call Activity</h2>
        <div className="text-slate-400 flex items-center justify-center h-64">
          Analytics Chart Placeholder (Recharts)
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
