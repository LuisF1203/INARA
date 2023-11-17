import logo from "../assets/INARA.png"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {BsChevronRight,BsTrash3} from "react-icons/bs"
import {BiLogoTiktok} from "react-icons/bi"
import {CiMenuBurger} from "react-icons/ci"
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useState,useEffect } from "react";

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'


function Layout({children}){

    const allCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    },[])

    useEffect(()=>{
        console.log(allCartItems)
    },[allCartItems])

    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
      });
    const [cartCount, setCartCount] = useState(0);
    
    // Luego, al eliminar un producto
    const removeItem = (productId) => {
        const updatedCart = allCartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCart);
    
        // Actualizar el localStorage eliminando el producto
        const updatedCartString = JSON.stringify(updatedCart);
        localStorage.setItem("cart", updatedCartString);
        
        // Recalcular el recuento del carrito después de eliminar el producto
        const count = updatedCart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
    };

    useEffect(() => {
        const count = allCartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      }, [allCartItems]);
      
    
    




      const total = parseFloat(allCartItems.reduce((acc, item) => (acc + item.price) * item.quantity, 0).toFixed(2)).toLocaleString();







        const [isPanelOpen, setIsPanelOpen] = useState(false);


        const [open, setOpen] = useState(false)
        const [cartOpen, setCartOpen] = useState(false)

        const [fastDCheck,setFastDCheck]=useState(false);


        const togglePanel = () => {
            setIsPanelOpen(!isPanelOpen);
        };

        const handleFastDCheck = (e) => {
            console.log(e)
            setFastDCheck(e.target.checked);
        };


        

        


    return(
        <>  

            {
                loading&&
                <div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-white text-white flex justify-center align-middle">
                    <img className="w-[10%] h-[10%] animate-pulse m-auto" src={logo}  alt="" />
                </div>
            }


            <nav className="fixed top-0 left-0 right-0 bg-white pb-2 z-10">
                <BrowserView>
                    <div>
                        <p className="p-2 text-center text-white bg-black text-sm">ENVÍO ESTÁNDAR GRATIS POR COMPRAS +$250</p>
                    </div>
                    <div className="flex justify-between">
                        <a href="/" className="w-[20%] ml-5">
                            <img className="w-32" src={logo} alt="" />
                        </a>
                        <ul className="flex justify-around w-[80%]">
                            <li className="m-auto"><a href="#" className="hover:border-b-black hover:border-b-2">Novedades</a></li>
                            <li className="m-auto"><a href="#" className="hover:border-b-black hover:border-b-2">Productos</a></li>
                            <li className="m-auto"><a href="#" className="hover:border-b-black hover:border-b-2">Best Sellers</a></li>
                            <li className="m-auto relative">
                                <p className="bg-red-500 text-center w-4 h-4 rounded-xl text-white flex justify-center absolute left-4 text-xs top-[-7px]">
                                    {cartCount}
                                </p>
                                <a href="/cart" className="hover:border-b-black hover:border-b-2"><AiOutlineShoppingCart size={15}/></a>
                            </li>
                        </ul>
                    </div>
                </BrowserView>
                <MobileView>
                    <div>
                        <p className="p-2 text-center text-white bg-black text-sm">ENVÍO ESTÁNDAR GRATIS POR COMPRAS +$250</p>
                    </div>
                    <div className="flex justify-between p-2">
                        <div className="mt-auto mb-auto">
                            <button onClick={() => setOpen(true)}>
                                <CiMenuBurger onClick={togglePanel}/>
                            </button>
                        </div>
                        <div>
                            <a href="/" className="mt-auto mb-auto">
                                <img className="w-32" src={logo} alt="" />
                            </a>
                        </div>
                        <div className="mt-auto mb-auto relative mr-4">
                                <p className="bg-red-500 text-center w-4 h-4 rounded-xl text-white flex justify-center absolute left-4 text-xs top-[-7px]">
                                    {cartCount}
                                </p>
                                <button onClick={() => setCartOpen(true)}  className="hover:border-b-black hover:border-b-2"><AiOutlineShoppingCart size={15}/></button>
                        </div>

                    </div>  




                    {
                        //MODAL PARA CARRITO
                    }

                    <Transition.Root show={cartOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={() => setCartOpen(false)}>
                            <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col  bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-hidden px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Carrito</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => {
                                                            setCartOpen(false)
                                                            handleFastDCheck({ target: { checked: fastDCheck } })
                                                        } }
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                        <div className="mt-8 overflow-y-auto ">
                                            <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {allCartItems.map((product) => (
                                                <li key={product.id} className="flex py-6">
                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        src={product.imageSrc}
                                                        alt={product.imageAlt}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={product.href}>{product.name}</a>
                                                        </h3>
                                                        <p className="ml-4">{product.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{product.id}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <p className="text-gray-500">Qty {product.quantity}</p>

                                                        <div className="flex">
                                                        <button
                                                            type="button"
                                                            className="font-medium text-red-600 hover:text-red-500"
                                                            onClick={() => removeItem(product.id)}
                                                        >
                                                            <BsTrash3 className="m-auto"/>
                                                            <p>Quitar</p>
                                                        </button>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <label htmlFor="fastDCheck" className="flex justify-between" onChange={handleFastDCheck}>
                                                {fastDCheck==false?
                                                <span className="mt-0.5 text-sm ">
                                                    Recibe este pedido el día de <strong className="text-orange-300">HOY</strong>
                                                    <div className="text-xs text-gray-600 font-base w-[60%] ">
                                                    Utilizamos los servicios de Uber para enviar tu paquete
                                                    </div>
                                                </span>
                                                :
                                                <span className="mt-0.5 text-sm ">
                                                    <strong className="text-orange-300">Fast Delivery</strong>
                                                    <div className="text-xs text-gray-600 font-base w-[60%] ">
                                                        Tu pedido llegará en Uber
                                                    </div>
                                                </span>    
                                            }
                                                
                                                <input type="checkbox" name="fastDCheck" id="fastDCheck" checked={fastDCheck}  />
                                            </label>

                                        <div className="mt-5 flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${total}</p>
                                        </div>

                                        <div className="mt-6">
                                            <a
                                            href="#"
                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                            Checkout
                                            </a>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                            <span>o </span>
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() =>{
                                                    setCartOpen(false)
                                                    handleFastDCheck({ target: { checked: fastDCheck } })
                                                } }
                                            >
                                                Continuar Comprando
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                            </p>
                                        </div>
                                        </div>
                                    </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                                </div>
                            </div>
                            </div>
                        </Dialog>
                        </Transition.Root>








                    {
                        //MODAL PARA MENU
                    }
                    <Transition.Root show={open} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
                            <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-hidden">
                            <div className="absolute inset-0 overflow-hidden">
                                <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="-translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        
                                    <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                        <button
                                        type="button"
                                        className="outline-none relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                        onClick={() => setOpen(false)}
                                        >
                                        <span className="absolute -inset-2.5" />
                                        <span className="sr-only">Close panel</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>

                                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                        <Dialog.Title className="text-2xl font-semibold leading-6 text-gray-900">
                                            MENU
                                        </Dialog.Title>
                                        </div>
                                        <div className="relative mt-10 flex-1 px-4 sm:px-6">
                                            <ul className="flex flex-col gap-14 text-xl">
                                                <li className="border-b-2 flex gap-2">
                                                    <a href="#" className="mt-auto mb-auto">Novedades </a>
                                                    <BsChevronRight className="mt-auto mb-auto"/>
                                                </li>
                                                <li className="border-b-2 flex gap-2">
                                                    <a href="#">Productos </a>
                                                    <BsChevronRight className="mt-auto mb-auto"/>
                                                </li>
                                                <li className="border-b-2 flex gap-2">
                                                    <a href="#">Best Sellers </a>
                                                    <BsChevronRight className="mt-auto mb-auto"/>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    </Dialog.Panel>
                                </Transition.Child>
                                </div>
                            </div>
                            </div>
                        </Dialog>
                    </Transition.Root>



                    



                </MobileView>
            </nav>
            <main className="mt-[100px] ">
                {children}
            </main>

            <footer className="w-full ">
                <div class="w-full min-h-screen flex items-center justify-center bg-black">
                    <div class="md:w-2/3 w-full px-4 text-white flex flex-col">
                        <div class="w-full text-7xl font-bold">
                            <h1 class="w-full md:w-2/3">Necesitas ayuda? contactanos</h1>
                        </div>
                        <div class="flex mt-8 flex-col md:flex-row md:justify-between">
                            <p class="w-full md:w-2/3 text-gray-400">Puedes contactarnos en cualquier momento, solo utiliza los medios de contactos oficiales proporcionados en esta sección.</p>
                            <div class="w-44 pt-6 md:pt-0">
                                <a href="https://wa.me/+527551382378/?text=Hola!%20necesito%20algo%20de%20ayuda" target="_blank" class="bg-green-500 justify-center text-center rounded-lg shadow px-10 py-3 flex items-center">Contact US</a>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex mt-24 mb-12 flex-row justify-between">
                                <div class="">
                                    <img className="w-32 invert" src={logo} alt="" />   
                                </div>
                                <a class="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">About</a>
                                <a class="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Products</a>
                                <a class="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Why us</a>
                                <a class="hidden md:block cursor-pointer text-gray-600 hover:text-white uppercase">Contact</a>
                                <div class="flex flex-row space-x-8 items-center justify-between">
                                    <a>
                                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.89782 12V6.53514H5.67481L5.93895 4.39547H3.89782V3.03259C3.89782 2.41516 4.06363 1.99243 4.91774 1.99243H6V0.0847928C5.47342 0.0262443 4.94412 -0.00202566 4.41453 0.000112795C2.84383 0.000112795 1.76542 0.994936 1.76542 2.82122V4.39147H0V6.53114H1.76928V12H3.89782Z" fill="white"/>
                                        </svg>                            
                                    </a>
                                    <a>
                                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.99536 2.91345C5.17815 2.91345 4.39441 3.23809 3.81655 3.81594C3.2387 4.3938 2.91406 5.17754 2.91406 5.99475C2.91406 6.81196 3.2387 7.5957 3.81655 8.17356C4.39441 8.75141 5.17815 9.07605 5.99536 9.07605C6.81257 9.07605 7.59631 8.75141 8.17417 8.17356C8.75202 7.5957 9.07666 6.81196 9.07666 5.99475C9.07666 5.17754 8.75202 4.3938 8.17417 3.81594C7.59631 3.23809 6.81257 2.91345 5.99536 2.91345ZM5.99536 7.99586C5.46446 7.99586 4.9553 7.78496 4.57989 7.40955C4.20448 7.03415 3.99358 6.52499 3.99358 5.99408C3.99358 5.46318 4.20448 4.95402 4.57989 4.57861C4.9553 4.20321 5.46446 3.99231 5.99536 3.99231C6.52626 3.99231 7.03542 4.20321 7.41083 4.57861C7.78624 4.95402 7.99714 5.46318 7.99714 5.99408C7.99714 6.52499 7.78624 7.03415 7.41083 7.40955C7.03542 7.78496 6.52626 7.99586 5.99536 7.99586Z" fill="white"/>
                                            <path d="M9.19863 3.51848C9.59537 3.51848 9.91698 3.19687 9.91698 2.80013C9.91698 2.4034 9.59537 2.08179 9.19863 2.08179C8.8019 2.08179 8.48029 2.4034 8.48029 2.80013C8.48029 3.19687 8.8019 3.51848 9.19863 3.51848Z" fill="white"/>
                                            <path d="M11.6821 2.06975C11.5279 1.67138 11.2921 1.30961 10.99 1.00759C10.6879 0.705576 10.326 0.469972 9.92759 0.31586C9.46135 0.140842 8.9688 0.0462069 8.4709 0.0359839C7.82919 0.00799638 7.62594 0 5.99867 0C4.37139 0 4.16282 -6.70254e-08 3.52643 0.0359839C3.02891 0.0456842 2.53671 0.140339 2.07108 0.31586C1.67255 0.469792 1.31059 0.705333 1.00844 1.00737C0.706289 1.30941 0.47061 1.67127 0.316526 2.06975C0.141474 2.53595 0.0470554 3.02855 0.0373167 3.52643C0.00866281 4.16748 0 4.37072 0 5.99867C0 7.62594 -4.96485e-09 7.83319 0.0373167 8.4709C0.0473123 8.96935 0.14127 9.46113 0.316526 9.92825C0.471042 10.3266 0.70695 10.6883 1.00918 10.9903C1.3114 11.2923 1.6733 11.5279 2.07175 11.6821C2.5365 11.8642 3.0289 11.9656 3.52777 11.982C4.16948 12.01 4.37272 12.0187 6 12.0187C7.62728 12.0187 7.83585 12.0187 8.47223 11.982C8.97008 11.9719 9.46262 11.8775 9.92892 11.7028C10.3272 11.5483 10.689 11.3125 10.9911 11.0104C11.2932 10.7083 11.529 10.3466 11.6835 9.94825C11.8587 9.48179 11.9527 8.99 11.9627 8.49156C11.9913 7.85051 12 7.64727 12 6.01932C12 4.39138 12 4.18481 11.9627 3.54709C11.9549 3.04216 11.86 2.54237 11.6821 2.06975ZM10.8705 8.42159C10.8662 8.80562 10.7961 9.18608 10.6633 9.54642C10.5632 9.80555 10.41 10.0409 10.2135 10.2372C10.017 10.4336 9.78162 10.5867 9.52243 10.6866C9.16608 10.8188 8.78967 10.8889 8.4096 10.8938C7.77654 10.9231 7.59796 10.9305 5.97468 10.9305C4.35007 10.9305 4.18414 10.9305 3.53909 10.8938C3.15921 10.8892 2.78298 10.8191 2.42692 10.6866C2.16683 10.5873 1.93048 10.4345 1.73316 10.2381C1.53584 10.0417 1.38194 9.80605 1.28143 9.54642C1.15045 9.18995 1.08039 8.81398 1.07419 8.43425C1.04554 7.8012 1.03887 7.62261 1.03887 5.99933C1.03887 4.37539 1.03887 4.20946 1.07419 3.56375C1.0785 3.17993 1.14859 2.7997 1.28143 2.43958C1.48467 1.91382 1.90116 1.5 2.42692 1.29876C2.78316 1.16691 3.15928 1.09682 3.53909 1.09151C4.17281 1.06286 4.35073 1.05486 5.97468 1.05486C7.59862 1.05486 7.76522 1.05486 8.4096 1.09151C8.7897 1.09609 9.16617 1.1662 9.52243 1.29876C9.7816 1.39889 10.017 1.55211 10.2134 1.74858C10.4099 1.94504 10.5631 2.18041 10.6633 2.43958C10.7942 2.79606 10.8643 3.17203 10.8705 3.55175C10.8992 4.18547 10.9065 4.36339 10.9065 5.98734C10.9065 7.61062 10.9065 7.78521 10.8778 8.42226H10.8705V8.42159Z" fill="white"/>
                                        </svg>    
                                    </a>
                                    <a href="#">
                                        <BiLogoTiktok/>                           
                                    </a>
                                </div>
                            </div>
                            <hr class="border-gray-600"/>
                            <p class="w-full text-center my-12 text-gray-600">Copyright © 2023 INARA</p>
                        </div>
                    </div>
                </div>
            </footer>


        </>
    )


}
export default Layout;