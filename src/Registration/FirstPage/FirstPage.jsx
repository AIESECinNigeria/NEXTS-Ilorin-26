import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from './FirstPage.module.css';
import Progress from '../../Components/progress';

const FirstPage = () => {
    const { register, control, trigger, formState: { errors } } = useFormContext();
    const navigate = useNavigate();
  
    const inputValue1 = useWatch({ control, name: "fullName" }) || "";
    const inputValue2 = useWatch({ control, name: "number" }) || "";
    const inputValue3 = useWatch({ control, name: "gender" }) || "";
    const inputValue4 = useWatch({ control, name: "email" }) || "";

    let progress = 0;
    if (inputValue1.trim().length !== 0) progress += 25;
    if (inputValue2.toString().trim().length !== 0) progress += 25;
    if (inputValue3.trim().length !== 0) progress += 25;
    if (inputValue4.trim().length !== 0) progress += 25;

    const handleNextStep = async () => {
        const isPageValid = await trigger(["fullName", "number", "gender", "email"]); 
        
        if (isPageValid) {
          navigate("/registration/step-two"); 
        }
    };

    return (
        <div className={`${styles.container} pt-5 sm:pt-0 text-white `}>
            <div className={`flex sm:justify-end justify-center `}>
                <div className='py-3 sm:pr-2 text-[#1A1B1E] font-aoboshi sm:text-[24px] text-[16px] '>
                    <div className={`bg-[#FF6B00] flex flex-col sm:w-36 w-20 sm:p-2 p-1 pb-7 `}>
                        <div className={`flex justify-around items-center h-[20px] `}>
                            <Progress value={progress} max={100}  />
                            <div className={`w-[60px] sm:w-[120px] h-[5px] bg-[#ffffff3c] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[5px] bg-[#ffffff3c] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[5px] bg-[#ffffff3c] `}></div>
                        </div>

                        {/* Full Name Input */}
                        <label htmlFor='name'> What do we call the apprentice? <br/>
                            <input
                                id="name"
                                {...register("fullName", { required: "Full Name is required" })}
                                type="text"
                                placeholder='Michelangelo Buonarroti'
                            />
                            {errors.fullName && <p className="text-sm text-red-200 mt-1">{errors.fullName.message}</p>}
                        </label>

                        {/* Phone Number Input */}
                        <label htmlFor='number'>How do we reach the master? <br/>
                            <span className='text-[#1a1b1e3c] '>{`(Phone Number)`}</span> <br/>
                            <input
                                id="number"
                                {...register("number", { required: "Phone Number is required" })}
                                type="text"
                                placeholder='Your golden ratio...'
                            />
                            {errors.number && <p className="text-sm text-red-200 mt-1">{errors.number.message}</p>}
                        </label>

                        {/* Gender Input */}
                        <label htmlFor='gender'>What is your gender? <br/>
                            <select
                                id="gender"
                                {...register("gender", { required: "Gender selection is required" })}
                                defaultValue=""
                            >
                                <option value="" disabled>Select one</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                            {errors.gender && <p className="text-sm text-red-200 mt-1">{errors.gender.message}</p>}
                        </label>

                        {/* Email Input */}
                        <label htmlFor='email'>Where should we send the artist's correspondence? <br/>
                            <span className='text-[#1a1b1e3c] '>{`(Email Address)`}</span> <br/>
                            <input
                                id="email"
                                {...register("email", { required: "Email is required" })}
                                type="email"
                                placeholder='Your workshop digital address...'
                            />
                            {errors.email && <p className="text-sm text-red-200 mt-1">{errors.email.message}</p>}
                        </label>
                    </div>

                    <div className={`flex justify-between items-center mt-3 relative `}>
                        <button type="button" onClick={() => navigate("/")} className={`bg-white text-black text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
                            <img src='/images/left.png' className='w-[20px] h-[20px] object-contain no-repeat ' alt="back icon" />
                            <p>BACK</p>
                        </button>
                        <div className='hidden sm:block '>
                            <img src='/images/puzzly.png' className='w-[180px] h-[180px] object-contain no-repeat absolute left-15 bottom-0 ' alt="decorative puzzle" />
                        </div>
                        <button type="button" onClick={handleNextStep} className={`bg-[#FF6B00] text-white text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
                            <p>NEXT</p>
                            <img src='/images/right.png' className='w-[20px] h-[20px] object-contain no-repeat ' alt="next icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
