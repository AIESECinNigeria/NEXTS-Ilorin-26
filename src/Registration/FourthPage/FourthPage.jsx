import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from './FourthPage.module.css';
import Progress from '../../Components/progress';

const FourthPage = () => {
    const { register, control, trigger, formState: { errors } } = useFormContext();
    const navigate = useNavigate();
  
    const inputValue1 = useWatch({ control, name: "nextOfKin" }) || "";
    const inputValue2 = useWatch({ control, name: "relationship" }) || "";
    const inputValue3 = useWatch({ control, name: "expectations" }) || "";
    const inputValue4 = useWatch({ control, name: "additionalInfo" }) || "";

    let progress = 0;
    if (inputValue1.trim().length !== 0) progress += 25;
    if (inputValue2.toString().trim().length !== 0) progress += 25;
    if (inputValue3.trim().length !== 0) progress += 25;
    if (inputValue4.trim().length !== 0) progress += 25;

    const onFinalSubmit = (allFormData) => {
      console.log("Submitting complete form to API:", allFormData);
      // axios.post('/api/submit', allFormData);
      navigate("/success"); 
    };

    return (
        <div className={`${styles.container} pt-5 sm:pt-0 text-white `}>
            <div className={`flex sm:justify-end justify-center `}>
                <div className='py-3 sm:pr-2 text-[#1A1B1E] font-aoboshi sm:text-[24px] text-[16px] '>
                    <div className={`bg-[#FF6B00] flex flex-col sm:w-36 w-20 sm:p-2 p-1 pb-7 `}>
                        <div className={`flex justify-around items-center h-[20px] `}>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <Progress value={progress} max={100}  />
                        </div>

                        {/* next of kin Input */}
                        <label htmlFor='dob'> Who do we call when the apprentice needs an extra pair of hands? <br/>
                            <input
                                id="kin"
                                {...register("nextOfKin", { required: "Next of Kin is required" })}
                                type="text"
                                placeholder='Name, number of your next of kin'
                            />
                            {errors.nextOfKin && <p className="text-sm text-red-200 mt-1">{errors.nextOfKin.message}</p>}
                        </label>

                        {/* relationship Input */}
                        <label htmlFor='relationship'>What stands their place in your circle of trust?<br/>
                            <input
                                id="relationship"
                                {...register("relationship", { required: "relationship selection is required" })}
                                type="text"
                                placeholder='Parent, sibling, guardian...'
                            />
                            {errors.relationship && <p className="text-sm text-red-200 mt-1">{errors.relationship.message}</p>}
                        </label>

                        {/* expectations Input */}
                        <label htmlFor='expectations'>What masterpiece does the apprentice hope to unveil after their time in the forge?<br/>
                            <input
                                id="expectations"
                                {...register("expectations", { required: "expectations is required" })}
                                type="text"
                                placeholder='Expectations?'
                            />
                            {errors.expectations && <p className="text-sm text-red-200 mt-1">{errors.expectations.message}</p>}
                        </label>

                        {/* additionalInfo Input */}
                        <label htmlFor='additionalInfo'>Is there anything the forge should know before the heat rises? <br/>
                            <input
                                id="additionalInfo"
                                {...register("additionalInfo", { required: "Additional Info is required" })}
                                type="text"
                                placeholder='Any additional info?'
                            />
                            {errors.additionalInfo && <p className="text-sm text-red-200 mt-1">{errors.additionalInfo.message}</p>}
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
                        <button type="button" onClick={onFinalSubmit} className={`bg-[#FF6B00] text-white text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
                            <p>NEXT</p>
                            <img src='/images/right.png' className='w-[20px] h-[20px] object-contain no-repeat ' alt="next icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FourthPage;
