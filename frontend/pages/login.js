import Head from 'next/head'
import Layout from '../components/layout'
import { useState } from 'react'
import Navbar from '../components/navbar'
import axios from 'axios'
import config from '../config/config'
import Link from 'next/link'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.status + ': ' + result.data.user.username)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
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
                <label for="password">Password</label>
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

    <Layout>
        <div className='bg-indigo-200 text-indigo-500  h-screen'>

        <Head>
            <Navbar/>
        </Head>

        <div class="container mx-auto p-2">
        <div class="max-w-sm mx-auto my-24 bg-white px-5 py-10 rounded shadow-xl">
            <div class="text-center mb-8">
            <h1 class="font-bold text-2xl font-bold">LogIn</h1>
            </div>
            {loginForm()}
            <div className='mt-3'>Status: {status} </div>
            
            <div className='flex'>
                <button class="mr-2 mt-10 py-3 bg-green-500 hover:bg-green-600 rounded text-white text-center w-full" onClick={login}>LogIn</button>
                <button class="mt-10 py-3 bg-green-500 hover:bg-green-600 rounded text-white text-center w-full"><Link href="register"><a> Register </a></Link></button>
                
            </div>


        </div>  
    </div>

        </div>
        

    </Layout>
    
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
