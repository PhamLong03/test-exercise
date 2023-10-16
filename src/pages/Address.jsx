import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoAddOutline } from 'react-icons/io5'
import AddressCard from '../components/AddressCard';
import { ClipLoader } from 'react-spinners';
import { useRecoilState } from 'recoil'
import { ToastContainer } from 'react-toastify';
import { toastState } from '../state'
import { notifyError, notifySuccess } from '../constant/toast';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

function Address() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [toast, setToast] = useRecoilState(toastState)
  console.log(toast);
  //get all address from api
  useState(() => {
    axios.get('https://test-pos.digibird.io/api/v1/front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country')
    .then((res)=>{ 
      setToast('Log in successfully')
      setData(res.data.data)
      notifySuccess(toast)
      console.log('sucss',toast);

    })
    .catch((error)=>{
      if (error.response.status == 401) {
        setToast('Unauthorized')
        notifyError(toast)
        console.log(toast);
      }
    })
  }, []);
  return (
    <div className='h-screen w-screen'>
          <ToastContainer/>

      <div className='h-auto w-auto m-4'>
        <div className='h-56 w-auto items-center flex border-gray-300 border-[2px]'>
          <div className='h-48 w-full mx-3 border-gray-300 border-[2px] border-dashed'>
            <div className='h-full w-full flex flex-col justify-center items-center hover:cursor-pointer' onClick={() => navigate('/add-address')}>
              <IoAddOutline size={55} className='text-gray-300 border-2 rounded-full border-dashed hover:text-black/60 hover:border-black/60'/>
              <div className='h-auto w-auto bg-black/10 py-1 px-2 mt-5'>
                  <button className='text-sm font-semibold text-black/75' onClick={() => navigate('/add-address')}>
                      Thêm mới
                  </button>
              </div>
            </div>
          </div>
        </div>
        {data == undefined 
          ? <div className='flex items-center justify-center h-96'>
              <ClipLoader size={40}/>
            </div>
          : data.map((item)=>(
            <AddressCard xid={item.xid} name={item.name} address={item.address} phone={item.phone} email={item.email}/>
          ))}
      </div>
    </div>
  )
}

export default Address