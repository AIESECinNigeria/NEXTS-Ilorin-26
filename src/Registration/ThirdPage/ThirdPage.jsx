import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from './ThirdPage.module.css';
import Progress from '../../Components/progress';

const ThirdPage = () => {
    const { register, control, trigger, formState: { errors } } = useFormContext();
    const navigate = useNavigate();
  
    const inputValue1 = useWatch({ control, name: "allergies" }) || "";
    const inputValue2 = useWatch({ control, name: "remedy" }) || "";
    const inputValue3 = useWatch({ control, name: "roomSituation" }) || "";

    let progress = 0;
    if (inputValue1.trim().length !== 0) progress += 33;
    if (inputValue2.toString().trim().length !== 0) progress += 33;
    if (inputValue3.trim().length !== 0) progress += 34;

    const handleNextStep = async () => {
        const isPageValid = await trigger(["allergies", "remedy", "roomSituation"]); 
        
        if (isPageValid) {
          navigate("/registration/step-four"); 
        }
    };

    return (
        <div className={`${styles.container} pt-5 sm:pt-0 text-white `}>
            <div className={`flex sm:justify-end justify-center `}>
                <div className='py-3 sm:pr-2 text-[#1A1B1E] font-aoboshi sm:text-[24px] text-[16px] '>
                    <div className={`bg-[#FF6B00] flex flex-col sm:w-36 w-20 sm:p-2 p-1 pb-7 `}>
                        <div className={`flex justify-around items-center h-[20px] `}>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <Progress value={progress} max={100}  />
                            <div className={`w-[60px] sm:w-[120px] h-[5px] bg-[#ffffff3c] `}></div>
                        </div>

                        {/* Allergy Input */}
                        <label htmlFor='allergies'> What must be kept away from the apprentice <br/>
                            <input
                                id="allergies"
                                {...register("allergies", { required: "Allergies is required" })}
                                type="text"
                                placeholder='What is/are  your allergy(ies)?'
                            />
                            {errors.allergies && <p className="text-sm text-red-200 mt-1">{errors.allergies.message}</p>}
                        </label>

                        {/* Remedy Input */}
                        <label htmlFor='remedy'>Which workshop does the apprentice call your home? <br/>
                          <input
                            id="remedy"
                            {...register("remedy", { required: "Remedy is required" })}
                            type="text"
                            placeholder='What cures your allergy(ies)?'
                          />
                            {errors.remedy && <p className="text-sm text-red-200 mt-1">{errors.remedy.message}</p>}
                        </label>

                        {/* roomSituation Input */}
                        <label htmlFor='roomSituation'>Will the apprentice you share the workshop with apprentices of another gender <br/>
                            <select
                                id="roomSituation"
                                {...register("roomSituation", { required: "Room Situation selection is required" })}
                                defaultValue=""
                            >
                                <option value="" disabled>Choose your workshop arrangement</option>
                                <option value="yes">YES</option>
                                <option value="no">NO</option>
                            </select>
                            {errors.roomSituation && <p className="text-sm text-red-200 mt-1">{errors.roomSituation.message}</p>}
                        </label>
                    </div>

                    <div className={`flex justify-between items-center mt-3 relative `}>
                        <button type="button" className={`bg-white text-black text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
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

export default ThirdPage;
