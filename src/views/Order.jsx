import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { LuPackage } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa"; // Verifica que el import sea correcto
import { VscNewFile } from "react-icons/vsc";
import { MdLocalShipping,MdCheckCircle  } from "react-icons/md";
import "../assets/car.scss";

const Order = () => {
    const { id } = useParams();
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const docRef = doc(db, "orders", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setOrderStatus(docSnap.data().status);
                } else {
                    console.log("No se encontró ningún documento!");
                }
            } catch (error) {
                console.error("Error al obtener el documento:", error);
            }
        };

        fetchOrderData();
    }, [id]);

    const statusToIndex = {
        "created": 1,
        "payed": 2,
        "send": 3,
        "received": 4
    };

    // Obtiene el color basado en si el estado actual es igual o anterior al ícono
    const getIconColor = (iconStatus) => {
        return statusToIndex[orderStatus] >= statusToIndex[iconStatus] ? "bg-green-500" : "bg-gray-600";
    };

    // Obtiene el ancho de la barra de progreso basado en el estado actual
    const getProgressBarWidth = () => {
        const percentage = (statusToIndex[orderStatus] - 1) / (Object.keys(statusToIndex).length - 1) * 100;
        return `${percentage}%`;
    };




  return (
    
    <div className='main-order'>
    {orderStatus!=""?
    <>
        <div className='order-main'>
      <div className='noise-mask'></div>
        <div className='bus'>
          <div className='bus-bod-top'>
            <div className='dashboard'></div>
            <div className='dashboard-window'></div>
            <div className='dashboard-transom'></div>
            <div className='cabin'></div>
            <div className='mirror-rail'></div>
            <div className='left-mirror'></div>
            <div className='right-mirror'></div>
            <div className='window-3 relative'>
            <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
              <div className='flex animate-pulse justify-center items-center '>
                <LuPackage size={30} color='white' fill='#eb7632' />
              </div>
            </div>

             
            </div>
          </div>
          <div className='bus-bod-bot'>
            <div className='grill'>
              <div className='grill-bar-1'></div>
              <div className='grill-bar-2'></div>
              <div className='grill-bar-3'></div>
              <div className='grill-bar-4'></div>
            </div>
            <div className='bumper'></div>
            <div className='wheel-well-front'></div>
            <div className='wheel-well-rear'></div>
            <div className='wheel-left-front'>
              <div className='hubcap'></div>
            </div>
            <div className='wheel-left-rear'>
              <div className='hubcap'></div>
            </div>
            <div className='wheel-right-front'></div>
            <div className='wheel-right-rear'></div>
            <div className='chassy-front-top'></div>
            <div className='chassy-front-bottom'></div>
            <div className='chassy-back-top'></div>
            <div className='chassy-back-bottom'></div>
          </div>
        </div>
        <div className='road'></div>
        <div className='rock-1'></div>
        <div className='rock-2'></div>
        <div className='lamp-1'>
          <div className='lamp-base'></div>
          <div className='lamp-post'></div>
          <div className='lamp-bulb'></div>
          <div className='lamp-light'></div>
        </div>
        <div className='lamp-2'>
          <div className='lamp-base'></div>
          <div className='lamp-post'></div>
          <div className='lamp-bulb'></div>
          <div className='lamp-light'></div>
        </div>
    </div>
    
    
    
    
    <div className='fixed z-50 right-0 left-0 bottom-40'>
                    <div className='relative w-[90%] bg-gray-200 rounded-full h-7 m-auto'>
                        <div className={`absolute bg-green-300 h-full transition-width duration-500 ease-in-out rounded-full`} style={{ width: getProgressBarWidth() }}></div>
                        <div className='flex justify-between absolute top-[-10px] left-0 right-0 px-4 w-full'> {/* Ajuste la posición según sea necesario */}
                            <div className={`w-12 h-12 rounded-full flex justify-center items-center ${getIconColor("created")}`} style={{ zIndex: 2 }}>
                                <VscNewFile className='text-white' />
                                <span className="text-white absolute top-[50px] text-center w-40">Orden creada</span>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex justify-center items-center ${getIconColor("payed")}`} style={{ zIndex: 2 }}>
                                <FaCreditCard className='text-white' />
                                <span className="text-white absolute top-[50px] text-center w-40">Productos pagados</span>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex justify-center items-center ${getIconColor("send")}`} style={{ zIndex: 2 }}>
                                <MdLocalShipping className='text-white' />
                                <span className="text-white absolute top-[50px] text-center w-40">Paquete enviado</span>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex justify-center items-center ${getIconColor("received")}`} style={{ zIndex: 2 }}>
                                <MdCheckCircle className='text-white' />
                                <span className="text-white absolute top-[50px] text-center w-40">Orden recibida</span>
                            </div>
                        </div>
                    </div>
                    <p className='text-center text-white mt-10 text-sm'>ORDEN: <br /> <span className='text-xl'>{id}</span></p>
                </div>

    
    </>
    :
    <div className='flex justify-center items-center h-screen'>
        <h1 className='text-center text-5xl text-white font-bold'>ORDEN NO ENCONTRADA</h1>
    </div>

}




</div>



  );
};

export default Order;
