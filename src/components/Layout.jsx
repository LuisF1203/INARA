function Layout({children}){
    return(
        <>
            <nav className="fixed top-0 left-0 right-0 bg-white pb-2 z-10">
                <div>
                    <p className="p-2 text-center text-white bg-black text-sm">ENVÍO ESTÁNDAR GRATIS POR COMPRAS +$250</p>
                </div>
                <div className="flex justify-between">
                    <a href="/" className="w-[20%]">INARA</a>
                    <ul className="flex justify-around w-[80%]">
                        <li><a href="#" className="hover:border-b-black hover:border-b-2">Novedades</a></li>
                        <li><a href="#" className="hover:border-b-black hover:border-b-2">Productos</a></li>
                        <li><a href="#" className="hover:border-b-black hover:border-b-2">Best Sellers</a></li>
                    </ul>
                </div>

            </nav>
            <main className="mt-10">
                {children}
            </main>
        </>
    )


}
export default Layout;