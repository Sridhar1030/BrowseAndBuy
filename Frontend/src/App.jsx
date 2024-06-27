
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar"
import Home from './components/Home/Home';
import Purchase from './components/Purchase/purchase';
import Sell from './components/Sell/Sell';
import Order from './components/Order/Order';
import Account from './components/Account/Account';
import Book from './components/Purchase/Book/Book'
import Instruments from './components/Purchase/Instruments/Instruments';
import Form from './components/Sell/Form/Form';
import Login from './components/LogSign/Login';
import Signup from './components/LogSign/Signup';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/sell" element={<Sell/>} />
          <Route path="/orders" element={<Order/>} />
          <Route path="/account" element={<Account/>} />
          <Route path="/purchase/book" element={<Book/>} />
          <Route path="/purchase/instruments" element={<Instruments/>} />
          <Route path="/sell/form" element={<Form/>} />
          
        </Routes>
      </Router>
    </>
  )
}

export default App
