import React from 'react'
import { useTheme } from './context/ThemeContext'
import GradientBackground from './components/common/GradientBackground'
import Navbar from './components/layout/Navbar';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import NotificationToast from './components/common/NotificationToast';
import Footer from './components/layout/Footer';

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <GradientBackground />
      <Navbar />
      <NotificationToast />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auctions' element={<Home />} />
        <Route path='/auctions/:id' element={<AuctionDetail />} />
        <Route path='/create-auction' element={<CreateAuction />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
