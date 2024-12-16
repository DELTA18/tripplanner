import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PackageDetails from './pages/PackageDetails';
import BookingForm from './pages/BookingForm';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/package/:id/book" element={<BookingForm />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
