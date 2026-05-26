import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import LiveCall from './pages/LiveCall';
import AISettings from './pages/AISettings';
import Login from './pages/Login';
import Register from './pages/Register';
import useAuthStore from './store/useAuthStore';

const ProtectedRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-900 text-white font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/contacts" element={<ProtectedRoute><Layout><Contacts /></Layout></ProtectedRoute>} />
        <Route path="/live-call" element={<ProtectedRoute><Layout><LiveCall /></Layout></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Layout><AISettings /></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
