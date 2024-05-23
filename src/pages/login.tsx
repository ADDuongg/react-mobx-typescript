import React, { useState } from 'react';
import Master, { useStore } from '../layout/master';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ModalCart from '../modal/modalCart';


const Login = observer(() => {
    const navigate = useNavigate();
    const { userStore, cartStore } = useStore()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleLogin = () => {
        if (userStore.login(email, password)) {
            navigate('/'); 
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <Master>
            <div className='w-11/12 mx-auto p-5 h-full flex gap-2 justify-start items-end'>
                <div className='text-[#2c2b49] cursor-pointer' onClick={() => navigate('/')}>Home</div>
                <div><i className="fa-solid fa-right-long"></i></div>
                <div className='text-red-600'>Account</div>
            </div>
            <div className='lg:w-[80%] w-full mx-auto h-auto flex justify-center items-center my-8'>
                <div className='lg:w-2/4 w-[80%] mx-auto border flex flex-col justify-between items-center px-14  py-14 gap-10'>
                    <div className='font-bold text-6xl'>Login</div>
                    <div className='text-black text-xl'>Please login below account detail</div>
                    <div className='w-full space-y-5'>
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange={handleChangeEmail} 
                            value={email} 
                            type="email" 
                            className='w-full rounded-lg outline-none border h-20 pl-5' 
                            placeholder='Email' 
                            id="email" 
                        />
                    </div>
                    <div className='w-full space-y-5'>
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange={handleChangePassword} 
                            value={password} 
                            type="password" 
                            className='w-full rounded-lg outline-none border h-20 pl-5' 
                            placeholder='Password' 
                            id="password" 
                        />
                    </div>
                    <div className='w-full flex flex-col items-center gap-5'>
                        <button 
                            className='rounded-lg px-16 text-white bg-red-600 py-5 font-bold hover:opacity-85'
                            onClick={handleLogin}
                        >
                            SIGN IN
                        </button>
                        <Link to={'/forgot'} className='underline'>Forgot your password?</Link>
                        <div className='font-bold text-2xl'>Don't have an account?</div>
                        <Link to={'/account/create'} className='underline'>Create account</Link>
                    </div>
                </div>
            </div>
            {cartStore.isShow && <ModalCart/>}
        </Master>
    );
});

export default Login;
