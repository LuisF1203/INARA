import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { db} from "../firebase/firebaseConfig";
import { doc, getDoc,getDocs, collection, query, where } from "firebase/firestore";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


function Home(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
      async function fetchData() {
        try {
          const q = query(collection(db, 'products'));
          const querySnapshot = await getDocs(q);
  
          const productsArray = [];
          querySnapshot.forEach((doc) => {
            // Agrega cada documento al array
            productsArray.push({
              id: doc.id,
              data: doc.data(),
            });
          });
          
  
          // Actualiza el estado con el array de productos
          setProducts(productsArray);
          setIsLoading(false);
          console.log(productsArray)
        } catch (error) {
          console.error('Error fetching documents: ', error);
        }
      }
  
      fetchData();
    }, []);
    
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
                {isLoading?
                <>
                    <Skeleton className="m-auto" count={1} duration={0.5} height={600} width="100%" />
                    <Skeleton className="m-auto" count={1} duration={0.5} height={600} width="100%" />
                    <Skeleton className="m-auto" count={1} duration={0.5} height={600} width="100%" />
                </>
                :
                products.map((el) => (
                    <a href={"/"+el.id} className="relative overflow-hidden"  key={el.id}>
                        <img className="object-cover hover:scale-105 w-full duration-150 cursor-pointer" src={el.data.bgImg} alt="" />
                        <h1 className="absolute top-[70%] text-4xl left-4 font-bold ">{el.id}</h1>
                        <p  className="absolute top-[80%] left-4">visitar</p>
                    </a>
                ))
                }

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