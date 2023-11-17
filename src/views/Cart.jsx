import { useState } from "react";
import Layout from "../components/Layout";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import axios from "axios"

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { IoMdClose } from "react-icons/io";
import { doc, getDoc,getDocs, collection, query, where,addDoc } from "firebase/firestore";
import {db} from "../firebase/firebaseConfig"


function Cart() {

  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [typeCart, setTypeCart] = useState('cart');
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const favItems = JSON.parse(localStorage.getItem("favorites")) || [];


  initMercadoPago('APP_USR-b532ca98-14d4-4c94-a7b4-fa87b3f5881b');

  const createPreference = async (product,uid) => {
    console.log(product)
    try {
      //https://inara-server.onrender.com/create_preference
      const response = await axios.post("http://localhost:8080/create_preference", {
        description: product.name,
        price: product.price,
        quantity: product.quantity,
        id: uid,
      });
      
      console.log(response.data)
      
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };


  const handleBuy = async (el) => {
    el.preventDefault();
    const firstName = el.target.fName.value;
    const lastName = el.target.lName.value;
    const email = el.target.email.value;
    const phone = el.target.phone.value;
    const address = el.target.address.value;
    const city = el.target.city.value;
    const zipCode = el.target.zip.value;
    const instructions = el.target.inst.value;
    
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(phone);
    console.log(address);
    console.log(city);
    console.log(zipCode);
    console.log(instructions);
    document.getElementById("mainContentModal").style.display="none"

    let name='';
    let price=0;
    let quantity=0;
    cartItems.forEach(product => {
      name+="-"+product.name;
      price+=product.price;
      quantity+=product.quantity;
    });

    console.log(name)
    console.log(price)
    console.log(quantity)
    const newProduct={
      name:name,
      price:price,
      quantity:quantity
    }
    setLoading(true); // Activar indicador de carga

    const orderDetails = {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zipCode,
      instructions,
      products: cartItems, // Asumiendo que quieres guardar todos los productos en el carrito
      totalPrice: price,
      status:"In process"
    };

    try {
      // Agregar el pedido a la colección de 'orders' en Firestore
      const docRef = await addDoc(collection(db, "orders"), orderDetails);
      console.log("Pedido registrado con ID: ", docRef.id);

      const id = await createPreference(newProduct,docRef.id);
      if (id) {
        setPreferenceId(id);
      }
      setLoading(false); // Desactivar indicador de carga cuando finaliza la solicitud*/
    } catch (error) {
      console.error("Error al agregar el documento: ", error);
    }



  };






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
                && (<>

                    {cartItems.map((item) => (
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
                      </>
                    )
                  )} 
                  <div className="text-center mt-10">
                      <button onClick={()=>document.getElementById('my_modal_2').showModal()} className="bg-black text-white py-2 px-4">Proceder al Pago</button>
                      
                  </div>
                </>
                )
                }

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










      <dialog id="my_modal_2" class="modal">
        <div class="flex items-center justify-center p-12">
          <div class="mx-auto w-full max-w-[550px]">
            <form onSubmit={(el)=>handleBuy(el)} method="POST">
              <button onClick={()=>document.getElementById('my_modal_2').close()} className="absolute right-5 top-5">
                <IoMdClose />
              </button>

              <div id="mainContentModal">

              
                  <div class="flex flex-wrap -mx-3">
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label for="fName" class="mb-3 block text-base font-medium text-[#07074D]">
                          Nombre(s) <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="fName" id="fName" required placeholder="Nombre(s)"
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                      </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label for="lName" class="mb-3 block text-base font-medium text-[#07074D]">
                          Apellidos <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="lName" id="lName" required placeholder="Apellidos"
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                      </div>
                    </div>
                  </div>
                  <div class="mb-5">
                    <label for="email" class="mb-3 block text-base font-medium text-[#07074D]">
                      Dirección de Correo Electrónico <span className="text-red-500">*</span>
                    </label>
                    <input type="email" name="email" id="email" required placeholder="Email"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div class="mb-5">
                    <label for="phone" class="mb-3 block text-base font-medium text-[#07074D]">
                      Teléfono
                    </label>
                    <input type="tel" name="phone" id="phone" placeholder="Número de Teléfono"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div class="mb-5">
                    <label for="address" class="mb-3 block text-base font-medium text-[#07074D]">
                      Dirección de Envío <span className="text-red-500">*</span>
                    </label>
                    <input type="text" name="address" id="address" required placeholder="Dirección completa"
                      class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                  </div>
                  <div class="flex flex-wrap -mx-3">
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label for="city" class="mb-3 block text-base font-medium text-[#07074D]">
                          Ciudad <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="city" id="city" required placeholder="Ciudad"
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                      </div>
                    </div>
                    <div class="w-full px-3 sm:w-1/2">
                      <div class="mb-5">
                        <label for="zip" class="mb-3 block text-base font-medium text-[#07074D]">
                          Código Postal <span className="text-red-500">*</span>
                        </label>
                        <input type="text" name="zip" id="zip" required placeholder="Código Postal"
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                      </div>
                    </div>
                    <div class="w-full px-3">
                      <div class="mb-5">
                        <label for="inst" class="mb-3 block text-base font-medium text-[#07074D]">
                          Instrucciones de entrega
                        </label>
                        <textarea name="inst" id="" cols="30" rows="2" maxLength="100" class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"></textarea>
                      </div>
                    </div>
                  </div>
                  <div> 
                    <button class="rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white hover:shadow-form outline-none">
                      Realizar Pedido
                    </button>
                </div>

                
              </div>
              {loading ? <p>Cargando...</p> : preferenceId && <Wallet initialization={{ preferenceId }} />}
            </form>
          </div>
        </div>  
      </dialog>





    </Layout>
  );
}

export default Cart;
