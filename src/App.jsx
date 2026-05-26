import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import LiveCall from './pages/LiveCall';
import AISettings from './pages/AISettings';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-slate-900 text-white font-sans overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Navbar could go here */}
          <main className="p-8 flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/live-call" element={<LiveCall />} />
              <Route path="/settings" element={<AISettings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
