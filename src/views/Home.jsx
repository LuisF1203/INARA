import Layout from "../components/Layout";
function Home(){
    return(
        <Layout>
            <div className="w-full bg-blue-400">
                <img className="object-cover" src="https://static.tous.com/21202/pub/directus/4c5bf150-6cb0-4e64-9fe8-1867747b5fc9.jpg" alt="" />
            </div>
            <div className="bg-black w-full relative overflow-hidden">
                <ul className="flex gap-28 text-white text-center relative justify-between animate-slide-right-to-left duration-300
                ">
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                    <li>hola</li>
                </ul>
            </div>





            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
                <div className="relative">
                    <img className="object-cover" src="https://static.tous.com/21202/pub/directus/62d15cc6-3e75-4c08-9fbd-381bd32ee6f8.jpg" alt="" />
                    <h1 className="absolute top-[70%] text-4xl left-4 font-bold ">BOLSAS</h1>
                    <a href="#" className="absolute top-[80%] left-4">visitar</a>
                </div>
                <div className="relative">
                    <img className="object-cover" src="https://static.tous.com/21202/pub/directus/62d15cc6-3e75-4c08-9fbd-381bd32ee6f8.jpg" alt="" />
                    <h1 className="absolute top-[70%] text-4xl left-4 font-bold ">BOLSAS</h1>
                    <a href="#" className="absolute top-[80%] left-4">visitar</a>
                </div>
                <div className="relative">
                    <img className="object-cover" src="https://static.tous.com/21202/pub/directus/62d15cc6-3e75-4c08-9fbd-381bd32ee6f8.jpg" alt="" />
                    <h1 className="absolute top-[70%] text-4xl left-4 font-bold ">BOLSAS</h1>
                    <a href="#" className="absolute top-[80%] left-4">visitar</a>
                </div>
            </div>


            <div className="mt-20">
                <h2 className="text-center text-3xl font-bold">Recomendaciones</h2>
                <div className="flex">
                    <a href="#" className="p-10">
                        <img src="https://cloud-media.tous.com/medias/sys_master/images/sys-master/images/h7e/h55/10436686086174/product-295810282-20190506130525.jpg" alt="" />
                        <p className="ml-5">Bolsa de bebé</p>
                        <p className="ml-5">$3,750</p>
                    </a>
                </div>
            </div>

        </Layout>
    )
}

export default Home;