import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChannelProvider } from './context/ChannelContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';

export default function App() {
  return (
    <ChannelProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ChannelProvider>
  );
}
