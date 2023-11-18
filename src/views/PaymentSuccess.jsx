import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import confetti from "https://esm.run/canvas-confetti@1";
import { useParams} from "react-router-dom";
import { doc, getDoc,getDocs, collection, query, where,addDoc } from "firebase/firestore";
import {db} from "../firebase/firebaseConfig"
function PaymentSuccess(){
    const { id } = useParams();
    const [orderStatus,setOrderStatus]=useState();
    
    useEffect(() => {
        // Función para obtener los datos del documento
        const fetchOrderData = async () => {
            try {
                const docRef = doc(db, "orders", id); // Referencia al documento
                const docSnap = await getDoc(docRef); // Obtiene el documento

                if (docSnap.exists()) {
                    console.log("Documento encontrado:", docSnap.data().status);
                    setOrderStatus(docSnap.data().status)
                    // Aquí puedes manejar los datos del documento como necesites
                } else {
                    console.log("No se encontró ningún documento!");
                    window.open("/","_self")
                }
            } catch (error) {
                console.error("Error al obtener el documento:", error);
            }
        };

        fetchOrderData();

        // Lógica para el confeti
        setTimeout(() => {
            confetti({
                particleCount: 350,
                spread: 400
            });
        }, 1500);

    }, [id]); // Dependencias del useEffect
    

    




    const handleNewPayment=()=>{
        alert("se esta añadiendo")
    }
    return(
        <Layout>
            <div className="h-[100vh] text-center">
                <h1 className="text-center font-bold text-4xl">FELICIDADES</h1>
                <br />
                <h2 className="text-center text-xl mb-20">Tu pago se completó correctamente</h2>
                <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-[50%] m-auto mb-20" role="alert">
                    <div className="flex">
                        <div className="py-1">
                            <div>
                                <svg className="animate-pulse w-5 h-5 inline mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <p className="font-bold text-left">Status: {orderStatus} </p>
                            <p className="text-sm">Revisa tu correo electronico para más información sobre tu pedido</p>
                        </div>
                    </div>
                </div>

                <br />
                <a href={"/order/"+id} className="m-auto bg-blue-500 text-white p-2 mt-10 animate-pulse">Rastrear pedido</a>
                



            </div>


        </Layout>
    )
}

export default PaymentSuccess;