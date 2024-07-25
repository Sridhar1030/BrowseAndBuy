import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Purchase from "./components/Purchase/Purchase";
import Order from "./components/Order/Order";
import ImageUpload from "./components/Sell/ImageUpload";
import Account from "./components/Account/Account";
import Book from "./components/Purchase/Book/Book";
import Instruments from "./components/Purchase/Instruments/Instruments";
import Form from "./components/Sell/Form/Form";
import Login from "./components/LogSign/Login";
import Signup from "./components/LogSign/Signup";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component
import AdminImages from "./components/Sell/AdminImages";
import Labcoats from "./components/Purchase/Labcoats/Labcoats";
import Cart from "./components/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import ChatPage  from "./components/Chat/ChatPage";
import ForgotPassword from "./components/LogSign/ForgotPassword";
import ResetPassword from "./components/LogSign/ResetPassword";
import YourItems from "./components/YourItems/YourItems";
import { io } from "socket.io-client";
import { SocketProvider } from "./contexts/SocketContext";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    return () => newSocket.close(); // Clean up the socket connection on unmount
  }, []);

  useEffect(() => {
    if (socket && user) {
      socket.emit("newUser", userId);
    }
  }, [socket, user]);



  console.log("socket provider is " , SocketProvider)

  return (
    <Router>
      <Navbar socket={socket} user={userId} />
        <SocketProvider >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<Home />} />}
          />
          <Route
            path="/chat"
            element={<ProtectedRoute element={<ChatPage socket={socket} />} />}
          />
          <Route
            path="/AdminImages"
            element={<ProtectedRoute element={<AdminImages  />} />}
          />
          <Route
            path="/purchase"
            element={<ProtectedRoute element={<Purchase />} />}
          />
          <Route
            path="/form/ImageUpload"
            element={<ProtectedRoute element={<ImageUpload />} />}
          />
          <Route
            path="/orders"
            element={<ProtectedRoute element={<Order />} />}
          />
          <Route
            path="/account"
            element={<ProtectedRoute element={<Account />} />}
          />
          <Route
            path="/purchase/book"
            element={<ProtectedRoute element={<Book />} />}
          />
          <Route
            path="/purchase/instruments"
            element={<ProtectedRoute element={<Instruments />} />}
          />
          <Route
            path="/purchase/labcoats"
            element={<ProtectedRoute element={<Labcoats />} />}
          />
          <Route
            path="/form"
            element={<ProtectedRoute element={<Form />} />}
            />
          <Route
            path="/cart"
            element={<ProtectedRoute element={<Cart />} />}
            />
          <Route
            path="/selling"
            element={<ProtectedRoute element={<YourItems />} />}
            />
        </Routes>
    
            </SocketProvider>
      </Router>
  );
}

export default App;
