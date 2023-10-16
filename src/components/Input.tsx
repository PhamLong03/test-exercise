import React from 'react'
import { IconType } from 'react-icons/lib'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { registerOptions } from '../constant/registerOptions';

interface InputProps {
    id: string,
    label: string,
    icon: IconType,
    hint: string,
    register: UseFormRegister<FieldValues>,
    errors: FieldErrors,
    value?: string,
    onChange?: (e: any)=> void,
}

function Input({
    id, label, icon: Icon, hint, register, errors, value, onChange
} : InputProps) {
  return (
    <div className='mt-2 mb-2'>
        <div className='flex flex-row items-center'>
            <Icon size={18} className='text-black/80 mr-1'/>
            <div className='text-black/80 font-semibold'>{label}</div>
        </div>
        <input 
            type="text" 
            placeholder={hint}
            value={value}
            className={`
                w-full border-[1px] rounded-sm py-[7px] px-2 focus:border-[2px] focus:outline-none 
                ${errors[id] ? 'border-red-400' : 'border-black/50'}
            `}
            {...register(id, registerOptions[id])}
            onChange={onChange}
        />

        {/*display error message */}
        {errors[id] 
            ? (<div className=' w-full text-red-400 '>*{errors[id]?.message?.toString()}</div> )
            : (<div></div>)}
    </div>
  )
}

export default Input