import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';
import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './auth/signup';
import Login from './auth/login';
import Home from './home';
import BrowserListingPage from './pages/browserListingPage'
import ProductDetail from './components/productDetail';
import AdminPanel from './dashboard/adminPanel';
import 'antd/dist/reset.css';
import AuctionPage from './components/auctionPage';
import AuctionDetailPage from './pages/auctionDetailPage'

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/BrowserListingPage' element={<BrowserListingPage />}/>
        <Route path='/product-detail' element={<ProductDetail />}/>
        <Route path='/admin-dashboard' element={<AdminPanel />}/>
        <Route path='/auction' element={<AuctionPage />}/>
        <Route path='/auction-detail' element={<AuctionDetailPage />}/>
      </Routes>
    </Router>
    <ToastContainer theme='dark'/>
    </>
  );
}

export default App;
