import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext'; // Asegúrate de que la ruta aquí sea correcta
import {
  Home,
  Product,
  Products,
  Cart,
  NotFound,
  PaymentSuccess,
  Order
} from "./views";

function App() {
  return (
    <CartProvider> {/* Envuelve tus rutas en CartProvider */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pr/:id" element={<Product />} />
        <Route path="/:pr" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pay-success/:id" element={<PaymentSuccess />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
