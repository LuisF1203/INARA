import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { CartProvider } from './context/CartContext'; // Asegúrate de que la ruta aquí sea correcta
import {
  Home,
  NotFound,
  Product,
} from "./views";

function App() {
  return (
    <CartProvider> {/* Envuelve tus rutas en CartProvider */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:pr/:id" element={<Product />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
