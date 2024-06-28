import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import Purchase from './components/Purchase/purchase';
import Sell from './components/Sell/Sell';
import Order from './components/Order/Order';
import Account from './components/Account/Account';
import Book from './components/Purchase/Book/Book';
import Instruments from './components/Purchase/Instruments/Instruments';
import Form from './components/Sell/Form/Form';
import Login from './components/LogSign/Login';
import Signup from './components/LogSign/Signup';
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/purchase" element={<ProtectedRoute element={<Purchase />} />} />
          <Route path="/sell" element={<ProtectedRoute element={<Sell />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Order />} />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/purchase/book" element={<ProtectedRoute element={<Book />} />} />
          <Route path="/purchase/instruments" element={<ProtectedRoute element={<Instruments />} />} />
          <Route path="/sell/form" element={<ProtectedRoute element={<Form />} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
