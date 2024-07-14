import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './components/Home/Home';
import Purchase from './components/Purchase/Purchase';
import Order from './components/Order/Order';
import ImageUpload from './components/Sell/ImageUpload';
import Account from './components/Account/Account';
import Book from './components/Purchase/Book/Book';
import Instruments from './components/Purchase/Instruments/Instruments';
import Form from './components/Sell/Form/Form';
import Login from './components/LogSign/Login';
import Signup from './components/LogSign/Signup';
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component
import AdminImages from './components/Sell/AdminImages';
import Labcoats from './components/Purchase/Labcoats/Labcoats';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar  />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/AdminImages" element={<ProtectedRoute element={<AdminImages />} />} />
          <Route path="/purchase" element={<ProtectedRoute element={<Purchase />} />} />
          <Route path="/form/ImageUpload" element={<ProtectedRoute element={<ImageUpload />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Order />} />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/purchase/book" element={<ProtectedRoute element={<Book />} />} />
          <Route path="/purchase/instruments" element={<ProtectedRoute element={<Instruments />} />} />
          <Route path="/purchase/labcoats" element={<ProtectedRoute element={<Labcoats />} />} />
          <Route path="/form" element={<ProtectedRoute element={<Form />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
