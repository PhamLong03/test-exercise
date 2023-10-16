import React from 'react'
import { PiMapPin, PiPhoneBold } from 'react-icons/pi'
import { MdOutlineMailOutline } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

interface AddressCardProps{
    xid: string,
    name: string,
    address: string,
    phone: string,
    email: string,
}

function AddressCard({
    xid, name, address, phone, email
}:AddressCardProps){
  const navigate = useNavigate();
  return (
    <div className='h-72 w-auto items-center flex border-gray-300 border-[2px] mt-3'>
        <div className='h-60 flex flex-col w-full justify-between mx-6 text-[18px] font-semibold'>
            <div>
                <div className='flex flex-row justify-between mb-4'>
                    <div >Họ và tên: {name}</div>
                    <div className='font-normal text-red-600'>Xóa</div>
                </div>
                <div className='flex flex-row mt-3 items-center text-black/50 font-semibold text-sm'>
                    <PiMapPin/>
                    <div className='ml-1'>Địa chỉ</div>
                </div>
                <div className='text-[16px] font-[450]'>{address}</div>
                <div className='flex flex-row mt-3 items-center text-black/50 font-semibold text-sm'>
                    <PiPhoneBold/>
                    <div className='ml-1'>Số điện thoại</div>
                </div>
                <div className='text-[16px] font-[450]'>{phone}</div>
                <div className='flex flex-row mt-3 items-center text-black/50 font-semibold text-sm'>
                    <MdOutlineMailOutline/>
                    <div className='ml-1'>Địa chỉ email</div>
                </div>
                <div className='text-[16px] font-[450]'>{email}</div>
            </div>
            <div 
                onClick={()=> navigate(`/address/${xid}`)}
                className='flex font-normal w-max text-[16px] text-blue-600 hover:underline hover:cursor-pointer'
            >
                Chỉnh sửa
            </div>
        </div>
    </div>
  )
}

export default AddressCard