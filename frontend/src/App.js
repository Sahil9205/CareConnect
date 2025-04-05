import React from 'react';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import Header from './components/Header';
 import Footer from "./components/Footer";
  import Home from "./pages/Home";
 import Login from "./pages/Login";
 import Register from "./pages/Register";
 import Dashboard from "./pages/Dashboard";
  import HealthRecords from './pages/HealthRecords';
  import Profile from "./pages/Profile";
   function App() {
  return (
    <Router>
      <div>
        <Home />
        <Login />
        <Register />
        <Dashboard />
        <Profile />
        <Footer />
      </div>
      <div className="min-h-screen bg-white">
        
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/health-records" element={<HealthRecords />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}export default App;