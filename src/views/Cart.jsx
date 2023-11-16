import { useState } from "react";
import Layout from "../components/Layout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import axios from "axios"

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'



function Cart() {

  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);


  initMercadoPago('APP_USR-b532ca98-14d4-4c94-a7b4-fa87b3f5881b');

  const createPreference = async (product) => {
    console.log(product)
    try {
      //https://inara-server.onrender.com/create_preference
      const response = await axios.post("https://inara-server.onrender.com/create_preference", {
        description: product.name,
        price: product.price,
        quantity: product.quantity,
      });
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };


  const handleBuy = async (product) => {
    setLoading(true); // Activar indicador de carga
    const id = await createPreference(product);
    if (id) {
      setPreferenceId(id);
    }
    setLoading(false); // Desactivar indicador de carga cuando finaliza la solicitud
  };




  const [typeCart, setTypeCart] = useState('cart');
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(cartItems)
  const favItems = JSON.parse(localStorage.getItem("favorites")) || [];
  console.log(favItems)
  // Calcular la cantidad de productos en el carrito y favoritos
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  const favCount = favItems.length;

  console.log(favCount)



  
  const removeFromFavorites = (itemId) => {
    const updatedFavorites = favItems.filter((item) => item.id !== itemId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    location.reload();
  };



  return (
    <Layout>
      <div className="pt-10">
        <h1 className="text-center font-bold text-3xl mb-5">CARRITO</h1>
        <ul className="flex justify-around border-b-2 w-[90%] m-auto">
          <li
            className={
              typeCart === 'cart'
                ? "border-b-2 border-black cursor-pointer w-[50%] text-center"
                : "hover:border-b-2 hover:border-black cursor-pointer w-[50%] text-center"
            }
            onClick={() => setTypeCart('cart')}
          >
            Tu Carrito
          </li>
          <li
            className={
              typeCart === 'favorites'
                ? "border-b-2 border-black cursor-pointer w-[50%] text-center"
                : "hover:border-b-2 hover:border-black cursor-pointer w-[50%] text-center"
            }
            onClick={() => setTypeCart('favorites')}
          >
            Tus Favoritos
          </li>
        </ul>

        <div className="flex-col mt-10 p-20">
          {typeCart === 'cart' && cartCount === 0 ? (
            <div className="flex-col mt-40">
              <AiOutlineShoppingCart size={40} className="m-auto text-[#858585]" />
              <br />
              <p className="text-center text-sm text-[#858585]">TU CARRITO ESTÁ VACÍO</p>
            </div>
          ) : typeCart === 'favorites' && favCount === 0 ? (
            <div className="flex-col mt-40">
              <MdFavoriteBorder size={40} className="m-auto text-[#858585]" />
              <br />
              <p className="text-center text-sm text-[#858585]">NO HAY FAVORITOS</p>
            </div>
          ) : (
            <ul>
              {typeCart === 'cart'
                && cartItems.map((item) => (
                    <>
                      <li key={item.id} className="my-2 p-2 flex justify-between items-center border-b">
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                          <span className="ml-4">{item.name}</span>
                        </div>
                        <div>
                          <span className="font-bold">{item.quantity} x ${item.price.toFixed(2)}</span>
                        </div>
                      </li>
                      <div className="text-center mt-10">
                        <button onClick={() => handleBuy(item)} className="bg-black text-white py-2 px-4">Proceder al Pago</button>
                        {loading ? <p>Cargando...</p> : preferenceId && <Wallet initialization={{ preferenceId }} />}
                      </div>
                    </>
                  )
                )}
                {typeCart=='favorites'
                  && favItems.map((item) => (
                    <li key={item.id} className="my-2 p-2 flex justify-between items-center border-b gap-10">
                      <div className="flex items-center ">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                        <span className="ml-4">{item.name}</span>
                      </div>
                      <div>
                        <span className="font-bold">{item.quantity} ${item.price.toFixed(2)}</span>
                      </div>
                      <button onClick={() => removeFromFavorites(item.id)}>
                        <MdFavorite size={20} className="text-red-500" />
                      </button>
                    </li>
                  )
              )
                }
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
