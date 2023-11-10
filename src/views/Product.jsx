import React, { useContext } from 'react';
import { useParams} from "react-router-dom";
import Layout from "../components/Layout";
import { CartContext ,CartProvider} from '../context/CartContext';
import {MdOutlineLocalShipping,MdOutlineAssignmentReturn,MdOutlinePayment,MdOutlinePersonSearch,MdFavorite} from "react-icons/md"
import {AiOutlineCheckCircle} from "react-icons/ai"
import { useState, useEffect } from 'react';
function Product(){
    const [isFavorite, setIsFavorite] = useState(false);
    const { pr } = useParams();
    const { id } = useParams();

    const { addToCart } = useContext(CartContext); // usa addToCart del contexto

    // Aquí se define la información del producto, asegúrate de que coincida con la estructura de tus datos del carrito.
    const product = {
        id: id, // o cualquier otra identificación única
        name: 'Collar elástico verde con acero y nácar TOUS Instint WEITT',
        price: 3750,
        color: 'Piedra',
        // Cualquier otra propiedad que necesite el carrito
    };

    // Maneja el evento de clic para añadir el producto al carrito
    const handleAddToCart = () => {
        addToCart(product, 1); // añade 1 cantidad del producto al carrito
    };

    

    // Carga inicial para verificar si el producto está en favoritos
    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setIsFavorite(favorites.some(favorite => favorite.id === id));
    }, [id]);

    // Maneja el evento de añadir a favoritos
    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (isFavorite) {
            // Remover de favoritos
            const filteredFavorites = favorites.filter(favorite => favorite.id !== id);
            localStorage.setItem('favorites', JSON.stringify(filteredFavorites));
            setIsFavorite(false);
        } else {
            // Agregar a favoritos
            const newFavorite = {
                id: id,
                name: 'Collar elástico verde con acero y nácar TOUS Instint WEITT',
                price: 3750,
                color: 'Piedra',
                // Añade aquí más detalles si es necesario
            };
            localStorage.setItem('favorites', JSON.stringify([...favorites, newFavorite]));
            setIsFavorite(true);
        }
    };

    return(
        <Layout>
            <div>
                <a href="/" className="text-xl ml-10 mb-5  hover:border-black hover:border-b-2">{'<'} {pr.toUpperCase()}</a>
                <div className="flex">
                    <div className="grid grid-cols-2 gap-2 w-[60%] ">
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/hbc/h36/12451142074398/515Wx515H_product_311792530-20230626120154/515Wx515H-product-311792530-20230626120154.jpg" alt="" />
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/h1e/he8/12451144466462/515Wx515H_product_311792530_1-20230626120154/515Wx515H-product-311792530-1-20230626120154.jpg" alt="" />
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/h7f/hd7/12451144925214/515Wx515H_product_311792530_2-20230626120154/515Wx515H-product-311792530-2-20230626120154.jpg" alt="" />
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/h27/h6d/12451145973790/515Wx515H_product_311792530_3-20230626120154/515Wx515H-product-311792530-3-20230626120154.jpg" alt="" />
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/h7d/hdd/12478247108638/515Wx515H_product_311792530_5-20230707123451/515Wx515H-product-311792530-5-20230707123451.jpg" alt="" />
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/h1d/hcc/12478247632926/515Wx515H_product_311792530_6-20230707123451/515Wx515H-product-311792530-6-20230707123451.jpg" alt="" />
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/hee/h65/12478248517662/515Wx515H_product_311792530_9-20230707123451/515Wx515H-product-311792530-9-20230707123451.jpg" alt="" />
                    </div>
                    <div className="fixed top-32 right-0 w-[40%] h-screen overflow-auto product-info p-5">
                        
                        <strong className="text-xl">Collar elástico verde con acero y nácar TOUS Instint WEITT</strong>
                        <p className="text-xs">{id.toUpperCase()}</p>
                        <p className="">$3,750</p>
                        <div>
                            <div className="flex justify-between">
                                <p className="text-sm">COLOR</p>
                                <p className="text-xs">Piedra</p>
                            </div>
                            <hr />
                            <div className="flex pt-4 pb-4 gap-4">
                                <img className="w-20 hover:outline hover:opacity-50 cursor-pointer" src="https://cloud-media.tous.com/medias/sys_master/images/hbc/h36/12451142074398/515Wx515H_product_311792530-20230626120154/515Wx515H-product-311792530-20230626120154.jpg" alt="" />
                                <img className="w-20 hover:outline hover:opacity-50 cursor-pointer" src="https://cloud-media.tous.com/medias/sys_master/images/hbc/h36/12451142074398/515Wx515H_product_311792530-20230626120154/515Wx515H-product-311792530-20230626120154.jpg" alt="" />
                                <img className="w-20 hover:outline hover:opacity-50 cursor-pointer" src="https://cloud-media.tous.com/medias/sys_master/images/hbc/h36/12451142074398/515Wx515H_product_311792530-20230626120154/515Wx515H-product-311792530-20230626120154.jpg" alt="" />
        

                            </div>
                        </div>

                        <div className='flex mt-10'>
                            <button onClick={handleAddToCart}  className=" bg-black text-white p-2 hover:bg-[#2c2c2c]">Añadir al carrito</button>
                            <button onClick={toggleFavorite} className={isFavorite?'mt-auto mb-auto ml-5 text-[#e73737]':'mt-auto mb-auto ml-5 text-[#929292]'}><MdFavorite/></button>
                        </div>



                        <div id='SuccessProductAdded' className='hidden text-xs text-green-700 mt-5 w-48'>
                            <AiOutlineCheckCircle className='m-auto'/>
                            <p className='m-auto'>Producto agregado al carrito</p>
                        </div>
                        
                        <label htmlFor="code" className="flex border-2 border-[#c6c6c6] rounded-md w-[60%] mt-10">
                            <p className="bg-gray-300 p-1 text-xs w-[40%] rounded-md ">Código de descuento</p>
                            <input type="text" className=" w-[60%] rounded-md pl-2 outline-none" maxLength={10} name="" id="code" placeholder="codigo"/>
                        </label>



                        <div className="mt-[40%] ">
                        <hr />
                            <ul className="text-xs mt-10">
                                <li className="flex">
                                    <MdOutlineLocalShipping className="mt-auto mb-auto"/>
                                    <p className="ml-2">Envío estándar gratis en pedidos superiores a $250</p>
                                </li>
                                <li className="flex">
                                    <MdOutlineAssignmentReturn className="mt-auto mb-auto"/>
                                    <p className="ml-2">10 días para devolver tu compra</p>
                                </li>
                                <li className="flex">
                                    <MdOutlinePayment className="mt-auto mb-auto"/>
                                    <p className="ml-2">Métodos de pago</p>
                                </li>
                                <li className="flex">
                                    <MdOutlinePersonSearch className="mt-auto mb-auto"/>
                                    <p className="ml-2">Personal shopper</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            </div>

        </Layout>
    )

}

export default Product;