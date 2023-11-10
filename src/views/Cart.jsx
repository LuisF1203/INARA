import { useState } from "react";
import Layout from "../components/Layout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

function Cart() {
  const [typeCart, setTypeCart] = useState('cart');
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const favItems = JSON.parse(localStorage.getItem("favorites")) || [];

  // Calcular la cantidad de productos en el carrito
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);

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
          <li className={typeCart === 'cart' ? "border-b-2 border-black cursor-pointer w-[50%] text-center" : "hover:border-b-2 hover:border-black cursor-pointer w-[50%] text-center"}
            onClick={() => setTypeCart('cart')}>
            Tu Carrito
          </li>
          <li className={typeCart === 'fav' ? "border-b-2 border-black cursor-pointer w-[50%] text-center" : "hover:border-b-2 hover:border-black cursor-pointer w-[50%] text-center"}
            onClick={() => setTypeCart('fav')}>
            Tus Favoritos
          </li>
        </ul>
        {cartCount === 0 ? (
          <div className="flex-col mt-40">
            {typeCart === 'cart' ? (
              <AiOutlineShoppingCart size={40} className="m-auto text-[#858585]" />
            ) : (
              <MdFavoriteBorder size={40} className="m-auto text-[#858585]" />
            )}
            <br />
            <p className="text-center text-sm text-[#858585]">
              {typeCart === 'cart' ? 'TU CARRITO ESTÁ VACÍO' : 'NO HAY FAVORITOS'}
            </p>
          </div>
        ) : (
          <div className="flex-col mt-10 p-20">
            <ul>
              {typeCart === 'cart' ? (
                cartItems.map((item) => (
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
                        <button className="bg-black text-white py-2 px-4">Proceder al Pago</button>
                    </div>
                    </>
                ))
              ) : (
                favItems.map((item) => (
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
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;
