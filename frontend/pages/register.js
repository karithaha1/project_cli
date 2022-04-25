
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'

export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div>
            <div class="mt-5">
                <label for="username">Username</label>
                <input
                    class="block w-full p-2 border rounded border-gray-500"
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div class="mt-5">
                <label for="username">email</label>
                <input
                    class="block w-full p-2 border rounded border-gray-500"
                    type="email"
                    name="email"
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>


            <div class="mt-5">
                <label for="username">password</label>
                <input
                    class="block w-full p-2 border rounded border-gray-500"
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)} />
            </div>

        </div>
    )


    return (
        
        <div class="container mx-auto p-2">
        <div class="max-w-sm mx-auto my-24 bg-white px-5 py-10 rounded shadow-xl">
            <div class="text-center mb-8">
            <h1 class="font-bold text-2xl font-bold">SignUp</h1>
            </div>
            
            {registerForm()}
            <div className='mt-3'>Status:  {status}</div>
            
            <div className='flex'>
                <button class="mr-2 mt-10 py-3 bg-green-500 hover:bg-green-600 rounded text-white text-center w-full"onClick={register}>SignUp</button>
                
            </div>

            
        </div>  
    </div>
        
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
