import React from 'react'
import styles from './Success.module.css'

const Success = () => {
  return (
    <div className={` ${styles.container} h-full min-h-screen font-aoboshi text-white `}>
        <div className='flex justify-center md:mx-26 sm:mx-4 mx-2 sm:mt-4 mt-2 '>
            <div className='w-full flex sm:flex-row flex-col justify-between sm:items-center border-t-white border-t-[1px] border-b-[1px] border-b-white font-faculty sm:text-[16px] text-[10px] '>
                <p>FROM CC IJOYE</p>
                <p>DISPATCHED VIA THE BATCAVE</p>
                <p> </p>
            </div>
            <img src='/images/logonexts.png' className=' border-b-[1px] border-b-white sm:h-4 h-2 ' alt='logo' />
        </div>
        <div className={`absolute top-1/4 sm:left-1/8 z-8 sm:mt-4 mt-1 `}>
            <img src='/images/car.png' className='w-100 ' alt='car' />
        </div>
        <div className='sm:bg-none bg-[url("/images/smnextsBg2.png")] bg-contain bg-no-repeat bg-top flex flex-col sm:px-26 px-2 sm:pt-0 pt-4 items-center sm:text-[8rem] text-[2.5rem] '>
            <div className='sm:self-start '>REGISTRATION</div>
            <div className='sm:self-end '>SUCCESSFUL!</div>
        </div>
        <div className='flex flex-col sm:mt-0 mt-3 sm:px-26 px-2 ms:pt-0 pt-7 items-center sm:text-[4rem] text-[2.5rem]  '>
            <div className='sm:self-start sm:w-30 w-auto sm:z-1 z-9 sm:text-left text-center '>YOU'RE NOW ON YOUR WAY</div>
            <div className='sm:bg-none bg-[url("/images/smnextsBg3.png")] bg-contain bg-no-repeat bg-top sm:self-end sm:w-40 w-auto z-10 sm:text-right text-center pt-3 sm:pt-0 '>TO THE PLACE WHERE MASTERPIECES ARE FORGED</div>
        </div>
    </div>
  )
}

export default Success