import React, { useState } from 'react';
import "../assets/car.scss"
import { LuPackage } from "react-icons/lu";
import { FaCreditCard } from "react-icons/fa6";
import { VscNewFile } from "react-icons/vsc";
import { MdLocalShipping } from "react-icons/md";
const CarExample = () => {
  return (

    <>
    <div>
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
            <div className='window-1 relative'>
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
      <div className="w-full py-6">
        <div className="flex">
          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full">
                  
                  <VscNewFile  className='w-full' />
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base text-white">Orden creada</div>
          </div>

          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center" style={{width:"calc(100% - 2.5rem - 1rem)", top:"50%", transform:"translate(-50%, -50%)"}}>
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className="w-0 bg-green-300 py-1 rounded" style={{width:"100%"}}></div>
                </div>
              </div>

              <div className="w-10 h-10 mx-auto bg-green-500 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-white w-full">
                  <FaCreditCard className='w-full' />
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base  text-white">Productos pagados</div>
          </div>

          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center" style={{width:"calc(100% - 2.5rem - 1rem)", top:"50%", transform:"translate(-50%, -50%)"}}>
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className="w-0 bg-green-300 py-1 rounded" style={{width:"33%"}}></div>
                </div>
              </div>

              <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-gray-600 w-full">
                  <MdLocalShipping className='w-full'  />
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base text-white">Paquete enviado</div>
          </div>

          <div className="w-1/4">
            <div className="relative mb-2">
              <div className="absolute flex align-center items-center align-middle content-center" style={{width:"calc(100% - 2.5rem - 1rem)", top:"50%", transform:"translate(-50%, -50%)"}}>
                <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                  <div className="w-0 bg-green-300 py-1 rounded" style={{width:"0%"}}></div>
                </div>
              </div>

              <div className="w-10 h-10 mx-auto bg-white border-2 border-gray-200 rounded-full text-lg text-white flex items-center">
                <span className="text-center text-gray-600 w-full">
                  <svg className="w-full fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0 0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="text-xs text-center md:text-base text-white">Recibido</div>
          </div>
        </div>
      </div>

      <p className='text-center text-white mt-10 text-sm'>ORDEN: <br /> <span className='text-xl'>MMAMSLIQIQW1123LK</span></p>
    </div>
    
</>



  );
};

export default CarExample;
