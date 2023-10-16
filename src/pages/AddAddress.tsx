import React, { useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';
import { BsPerson } from 'react-icons/bs'
import { PiMapPin, PiPhoneBold } from 'react-icons/pi'
import { MdOutlineMailOutline,MdKeyboardArrowDown } from 'react-icons/md'
import { cities } from '../data/cities';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { notifySuccess } from '../constant/toast';
import { useRecoilState } from 'recoil';
import { toastState } from '../state';
import { ToastContainer } from 'react-toastify';


function AddAddress() {  
  const [cityCode, setCityCode] = useState('0')  
  const navigate = useNavigate();
  const [toast, setToast] = useRecoilState(toastState)

  //create form
  const {
    register, 
    handleSubmit, 
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      shipping_address: '',
      city: '',
      state: '',
      zipcode: '1',
      country: 'VN'
    }
  })

  //submit function
  const onSubmit: SubmitHandler<FieldValues> = async (data) =>{

    //format city & state
    data.state = cities[data.city]['districts'][data.state]['name']
    data.city = cities[data.city]['name']
    data.address = data.city + ' - ' +data.state

    //add new address
    await axios.post('https://test-pos.digibird.io/api/v1/front/self/address', data)
      .then((res)=>{
        setToast('Add successfully')
        notifySuccess(toast)
      })
      .then(()=>{
        navigate('/address')
      })
  }

  return (
    <div className='h-screen w-screen'>
          <ToastContainer/>

      <div className='h-auto w-auto m-4 border-gray-300 border-[2px]'>
        <div className='text-2xl font-bold text-black/80 border-b-[2px] py-2 px-4 mb-4'>
          Thêm mới địa chỉ
        </div>
        <form action="" className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className='h-auto flex flex-col w-auto justify-between mx-4'>
              <Input 
                id='name' 
                label='Họ và tên' 
                hint='Nguyễn Văn Ánh' 
                icon={BsPerson} 
                errors={errors}
                register={register}
              />

              <Input 
                id='phone' 
                label='Số điện thoại' 
                hint='0 xxx xxx xxx' 
                icon={PiPhoneBold} 
                errors={errors} 
                register={register}
              />

              <Input 
                id='email' 
                label='Địa chỉ email' 
                hint='example@gmail.com' 
                icon={MdOutlineMailOutline} 
                errors={errors}
                register={register}
              />

              {/*city select field */}
              <div className='mt-2 mb-2'>
                <div className='flex flex-row items-center'>
                  <PiMapPin size={18} className='text-black/80 mr-1'/>
                  <div className='text-black/80 font-semibold'>Tỉnh, thành phố</div>
                </div>
                <div className='relative flex flex-row items-center justify-end'>
                  <select 
                    id="city" 
                    {...register('city',{
                      required: true,
                   })}
                    onChange={(e)=>{
                      console.log(cityCode);
                      setCityCode(e.target.value)                      
                    }} 
                    className='w-full border-[1px] rounded-sm border-black/50 py-[7px] px-2 focus:border-[2px] focus:outline-none  appearance-none'
                  >
                    <option value={''} disabled selected >Chọn tỉnh/ thành phố</option>
                    {cities.map((item:any, index:any)=>(
                      <option key={item.code} value={index} >{item.name}</option>
                    ))}
                  </select>
                  <div className='absolute flex w-10 h-[26px] border-l-[1px] border-black/40 items-center justify-center '>
                    <MdKeyboardArrowDown size={25} className='text-black/50'/>
                  </div>
                </div>
              </div>

              {/*state select field */}
              <div className='mt-2 mb-2'>
                <div className='flex flex-row items-center'>
                  <PiMapPin size={18} className='text-black/80 mr-1'/>
                  <div className='text-black/80 font-semibold'>Quận, huyện</div>
                </div>
                <div className='relative flex flex-row items-center justify-end'>
                  <select 
                    id="state" 
                    {...register('state',{
                      required: true,
                   })}
                    className='w-full border-[1px] rounded-sm border-black/50 py-[7px] px-2 focus:border-[2px] focus:outline-none  appearance-none'
                  >
                    <option value={''} selected disabled>Chọn quận/ huyện</option>
                    {cities[cityCode]["districts"].map((item:any, index:any)=>(
                      <option key={item.code} value={index} >{item.name}</option>
                    ))}
                  </select>
                  <div className='absolute flex w-10 h-[26px] border-l-[1px] border-black/40 items-center justify-center '>
                    <MdKeyboardArrowDown size={25} className='text-black/50'/>
                  </div>
                </div>
              </div>

              <Input 
                id='shipping_address' 
                label='Địa chỉ cụ thể' 
                hint='số 23 đường 8, phường Linh Trung, ...' 
                icon={PiMapPin} 
                errors={errors}
                register={register}
              />
          </div>
          <button className='m-4 bg-yellow-500 px-4 py-2 rounded-md font-semibold text-black/80' type='submit'>
            Lưu thông tin
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddAddress