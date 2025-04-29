import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { CartProvider } from "./contexts/CartContext";
import { NotificationProvider } from "./contexts/NotificationContext";

// Layout Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Page Components
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderForm from "./pages/OrderForm";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderHistory from "./pages/OrderHistory";

// Styles
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<OrderForm />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
                <Route path="/order-history" element={<OrderHistory />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </NotificationProvider>
    </BrowserRouter>
  );
}

export default App;
