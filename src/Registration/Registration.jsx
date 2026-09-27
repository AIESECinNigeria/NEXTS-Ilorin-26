import React from 'react'
import { useForm, FormProvider } from "react-hook-form";
import FirstPage from './FirstPage/FirstPage'
import SecondPage from './SecondPage/SecondPage'
import ThirdPage from './ThirdPage/ThirdPage'
import FourthPage from './FourthPage/FourthPage'
import styles from './Registration.module.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Registration = () => {
    const methods = useForm({
        defaultValues: { 
            fullName: "", 
            number: "", 
            gender: "",
            email: "",
            d_o_b: "",
            lc: "",
            role: "",
            first_conf: "",
            allergies:"",
            remedy:"",
            roomSituation:"",
            nextOfKin:"",
            relationship:"",
            expectations:"",
            additionalInfo:""
        },
        mode: "onBlur"
    });

  return (
    <div className={`${styles.container} flex sm:flex-row flex-col `}>
        <div className='flex justify-between pt-3 px-2 sm:hidden block '>
            <img src='/images/smpuzzly.png' alt='puzzle piece' className='h-2 w-auto ' />
            <img src='/images/logowhite.png' alt='logo' className='h-2 w-auto ' />
        </div>
        <div className={`font-aoboshi h-full flex flex-col justify-between pt-1 sm:py-3 pl-2 top-0 left-0 sm:fixed `}>
            <p className={`text-[#FF6B00] text-[4rem] sm:block hidden `}>...how ready <br/> are you...</p>
            <p className={`text-[#F4F2ED] text-[30px] sm:hidden block `}>...how ready are you...</p>
            <img src='/images/nextsLogo.png' alt='logo' className={`w-[150px] h-[50px] object-cover sm:block hidden `} />
        </div>
        <FormProvider {...methods}>
            <Routes>
                <Route path="step-one" element={<FirstPage />} />
                <Route path="step-two" element={<SecondPage />} />
                <Route path="step-three" element={<ThirdPage />} />
                <Route path="step-four" element={<FourthPage />} />
            </Routes>
        </FormProvider>
    </div>
  )
}

export default Registration