import { useNavigate } from 'react-router-dom'
import '../App.css'
import '../assets/css/index.css'
import axios from 'axios';
import React from 'react'

function Home(){
    const navigate = useNavigate();
    

    //login with zalo and set axios global token
    const login = async ()=> {
        await axios.post(
            'https://test-pos.digibird.io/api/v1/front/sign-up-zalo',{
            id: '0869017747',
            name: 'Phát'
            }).then((res)=>{
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.data['token']}`
            })
    }

    login()
    return (
        <div className='container-home'>
            <div>
                <a href="https://digibird.io" target="_blank">
                    <img src='/public/logo-350x125.png' className="logo" alt="DigiBird logo" />
                </a>
            </div>
            <h1>DigiBird Test Exercise</h1>
            <div className="card" style={{ flexDirection: 'row' }}>
                <button className='button-home' style={{ marginLeft: 10 }} onClick={() => navigate('/address')}>
                    Start
                </button>
            </div>

            <p className="read-the-docs">
                Click on the button view details exercise
            </p>
        </div>
    )
}

export default Home
