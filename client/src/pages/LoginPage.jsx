import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { UserContext } from '../userContext.jsx';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext)

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const {data} = await axios.post('/login', { email, password });
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        } catch (error) {
            alert('Login failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className='mb-32'>
                <h1 className='text-4xl text-center mb-4'>Login</h1>
                <form className='max-w-md mx-auto' onSubmit={handleLogin}>
                    <input type="email" placeholder='your@email.com' value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} />
                    <button className='primary'>Login</button>
                    <div className='text-center py-2'>Dont have an account yet? <Link className='text-primary underline' to={'/register'}>Register now</Link></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
