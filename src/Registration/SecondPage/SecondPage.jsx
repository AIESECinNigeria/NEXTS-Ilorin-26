import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from './SecondPage.module.css';
import Progress from '../../Components/progress';

const SecondPage = () => {
    const { register, control, trigger, formState: { errors } } = useFormContext();
    const navigate = useNavigate();
  
    const inputValue1 = useWatch({ control, name: "d_o_b" }) || "";
    const inputValue2 = useWatch({ control, name: "lc" }) || "";
    const inputValue3 = useWatch({ control, name: "role" }) || "";
    const inputValue4 = useWatch({ control, name: "first_conf" }) || "";

    let progress = 0;
    if (inputValue1.trim().length !== 0) progress += 25;
    if (inputValue2.toString().trim().length !== 0) progress += 25;
    if (inputValue3.trim().length !== 0) progress += 25;
    if (inputValue4.trim().length !== 0) progress += 25;

    const handleNextStep = async () => {
        const isPageValid = await trigger(["d_o_b", "lc", "role", "first_conf"]); 
        
        if (isPageValid) {
          navigate("/registration/step-three"); 
        }
    };

    return (
        <div className={`${styles.container} pt-5 sm:pt-0 text-white `}>
            <div className={`flex sm:justify-end justify-center `}>
                <div className='py-3 sm:pr-2 text-[#1A1B1E] font-aoboshi sm:text-[24px] text-[16px] '>
                    <div className={`bg-[#FF6B00] flex flex-col sm:w-36 w-20 sm:p-2 p-1 pb-7 `}>
                        <div className={`flex justify-around items-center h-[20px] `}>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <Progress value={progress} max={100}  />
                            <div className={`w-[60px] sm:w-[120px] h-[5px] bg-[#ffffff3c] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[5px] bg-[#ffffff3c] `}></div>
                        </div>

                        {/* DOB Input */}
                        <label htmlFor='dob'> When was the apprentice sculpted? <br/>
                            <input
                                id="dob"
                                {...register("d_o_b", { required: "Date of Birth is required" })}
                                type="date"
                                placeholder='Select your date of birth'
                            />
                            {errors.d_o_b && <p className="text-sm text-red-200 mt-1">{errors.d_o_b.message}</p>}
                        </label>

                        {/* LC Input */}
                        <label htmlFor='lc'>Which workshop does the apprentice call their home? <br/>
                          <select
                                id="lc"
                                {...register("lc", { required: "LC selection is required" })}
                                defaultValue=""
                            >
                                <option value="" disabled>Select one</option>
                                <option value="the_cooks_est">The Cooks (EST)</option>
                                <option value="abeokuta">Abeokuta</option>
                                <option value="abuja">Abuja</option>
                                <option value="akure">Akure</option>
                                <option value="benin">Benin</option>
                                <option value="benue">Benue</option>
                                <option value="calabar">Calabar</option>
                                <option value="ekiti">Ekiti</option>
                                <option value="enugu">Enugu</option>
                                <option value="ibadan">Ibadan</option>
                                <option value="ife">Ife</option>
                                <option value="illorin">Illorin</option>
                                <option value="jos">Jos</option>
                                <option value="kano">Kano</option>
                                <option value="port_harcourt">Port Harcourt</option>
                                <option value="zaria">Zaria</option>
                            </select>
                            {errors.lc && <p className="text-sm text-red-200 mt-1">{errors.lc.message}</p>}
                        </label>

                        {/* role Input */}
                        <label htmlFor='role'>What role does the apprentice play in the making of the masterpiece <br/>
                            <select
                                id="role"
                                {...register("role", { required: "role selection is required" })}
                                defaultValue=""
                            >
                                <option value="" disabled>Select one</option>
                                <option value="tm">TM</option>
                                <option value="tl">TL</option>
                                <option value="lcvp">LCVP</option>
                                <option value="lcp">LCP</option>
                                <option value="alumni">ALUMNI</option>
                            </select>
                            {errors.role && <p className="text-sm text-red-200 mt-1">{errors.role.message}</p>}
                        </label>

                        {/* first_conf Input */}
                        <label htmlFor='first_conf'>Is this the apprentice's first time entering the forge? <br/>
                            <select
                                id="first_conf"
                                {...register("first_conf", { required: "First Conference selection is required" })}
                                defaultValue=""
                            >
                                <option value="" disabled>Select one</option>
                                <option value="true">YES</option>
                                <option value="false">NO</option>
                            </select>
                            {errors.first_conf && <p className="text-sm text-red-200 mt-1">{errors.first_conf.message}</p>}
                        </label>
                    </div>

                    <div className={`flex justify-between items-center mt-3 relative `}>
                        <button type="button" onClick={() => navigate("/registration/step-one")} className={`bg-white text-black text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
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

export default SecondPage;