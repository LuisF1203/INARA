import logo from "../assets/INARA.png"
import {AiOutlineShoppingCart} from "react-icons/ai"

function Layout({children}){
        // Obtener el carrito del localStorage y parsearlo a un array
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Calcular la cantidad de productos en el carrito
        // Si cada item tiene una cantidad, se debe sumar, de lo contrario, usar cartItems.length
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    return(
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white pb-2 z-10">
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

            </nav>
            <main className="mt-[100px] ">
                {children}
            </main>

            <footer>
                <ul>
                    <li>hola</li>
                    <li>hola</li>
                </ul>
            </footer>


        </>
    )


}
export default Layout;