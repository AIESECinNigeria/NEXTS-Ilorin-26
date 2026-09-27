import React, { useState, useEffect } from 'react';
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from './FourthPage.module.css';
import Progress from '../../Components/progress';

const FourthPage = () => {
    const { register, control, trigger, handleSubmit, formState: { errors } } = useFormContext();
    const navigate = useNavigate();
    
    const [isLoading, setIsLoading] = useState(false);

    const inputValue1 = useWatch({ control, name: "nextOfKin" }) || "";
    const inputValue2 = useWatch({ control, name: "relationship" }) || "";
    const inputValue3 = useWatch({ control, name: "expectations" }) || "";
    const inputValue4 = useWatch({ control, name: "additionalInfo" }) || "";

    let progress = 0;
    if (inputValue1.trim().length !== 0) progress += 25;
    if (inputValue2.toString().trim().length !== 0) progress += 25;
    if (inputValue3.trim().length !== 0) progress += 25;
    if (inputValue4.trim().length !== 0) progress += 25;

    const onFinalSubmit = async (allFormData) => {
        setIsLoading(true);
        const payload = {
            // Core Profile Information
            name: allFormData.fullName,
            phone: allFormData.number,
            gender: allFormData.gender,
            email: allFormData.email,
            date_of_birth: allFormData.d_o_b,
            
            lc: allFormData.lc,
            role: allFormData.role,
            allergies: allFormData.allergies,
            allergy_treatment: allFormData.remedy,
            
            first_conference: allFormData.first_conf === "true" || allFormData.first_conf === true,
            can_stay_with_opposite_sex: allFormData.roomSituation === "true" || allFormData.roomSituation === true,
            
            emergency_contact: allFormData.nextOfKin,
            emergency_contact_relationship: allFormData.relationship,
            expectations: allFormData.expectations,
            additional_information: allFormData.additionalInfo
        };

        console.log("MAPPED PAYLOAD READY FOR PYDANTIC:", payload);


        console.log("EXACT JSON SENT TO BACKEND:", JSON.stringify(allFormData, null, 2));
        console.log("Submitting complete form to API:", allFormData);
        try {
            const response = await axios.post('https://ain-backend.fly.dev/api/nexts-ilorin/register', payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            console.log("Registration successful!", response.data);
            navigate("/success");
        
        } catch (error) {
            console.error('Registration API error:', error);
            const backendMessage = error.response?.data?.message || error.response?.data?.error;
            console.log("Backend rejection reason details:", error.response?.data);
            
            alert(`Backend error: ${backendMessage || 'Failed to register. Please check input formats.'}`);
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className={`${styles.container} md:pr-2 sm:pr-0 sm:pt-0 text-white `}>
            {isLoading && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                    {/* Tailwind CSS Animate-Spin Spinner */}
                    <div className="w-14 h-14 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-faculty text-lg text-white tracking-widest animate-pulse">
                        STOKING THE FORGE...
                    </p>
                </div>
            )}
            <div className={`flex sm:justify-end justify-center `}>
                <div className='py-3 sm:pr-2 text-[#1A1B1E] font-aoboshi sm:text-[24px] text-[16px] '>
                    
                    <form onSubmit={handleSubmit(onFinalSubmit)} className={`bg-[#FF6B00] flex flex-col sm:w-36 w-20 sm:p-2 p-1 pb-7 `}>
                        <div className={`flex justify-around items-center h-[20px] `}>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <div className={`w-[60px] sm:w-[120px] h-[10px] bg-[#ffffff] `}></div>
                            <Progress value={progress} max={100}  />
                        </div>

                        {/* next of kin Input */}
                        <label htmlFor='kin'> Who do we call when the apprentice needs an extra pair of hands? <br/>
                            <input
                            className='mt-1'
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
                            className='mt-1'
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
                            className='mt-1'
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
                            className='mt-1'
                                id="additionalInfo"
                                {...register("additionalInfo", { required: "Additional Info is required" })}
                                type="text"
                                placeholder='Any additional info?'
                            />
                            {errors.additionalInfo && <p className="text-sm text-red-200 mt-1">{errors.additionalInfo.message}</p>}
                        </label>
                    </form>

                    <div className={`flex justify-between items-center mt-3 relative `}>
                        <button disabled={isLoading} type="button" onClick={() => navigate("/registration/step-three")} className={`bg-white text-black text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
                            <img src='/images/left.png' className='w-[20px] h-[20px] object-contain no-repeat ' alt="back icon" />
                            <p>BACK</p>
                        </button>
                        <div className='hidden sm:block '>
                            <img src='/images/puzzly.png' className='w-[180px] h-[180px] object-contain no-repeat absolute left-15 bottom-0 ' alt="decorative puzzle" />
                        </div>
                        
                        <button disabled={isLoading} type="submit" onClick={handleSubmit(onFinalSubmit)} className={`bg-[#FF6B00] text-white text-[16px] flex justify-between items-center font-faculty p-[0.5rem] `}>
                            <p>SUBMIT</p>
                            <img src='/images/right.png' className='w-[20px] h-[20px] object-contain no-repeat ' alt="next icon" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FourthPage;