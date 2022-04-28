import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import Link from 'next/link'



export default function Home() {
  return (
  <Layout>
    <div className='bg-indigo-200 text-indigo-500  h-screen'>
      {/* <Head>
        <Navbar/>
      </Head> */}

      <main class="flex flex-col sm:flex-row justify-around p-5 sm:h-screen">
        <div class="flex flex-col justify-around  items-center ">
          
        <a href="http://localhost:3000/login" class="flex items-center">
          <img class="items-center h-3/5 ml-4 mr-4 rounded-full animate-bounce" src="https://i.pinimg.com/564x/4e/e2/57/4ee257f7c06cee59155ba66c5872fbc9.jpg" alt=""/>
        </a>
          
         
        </div>
      </main>
      
    






    </div>
  </Layout>
    
    
  )
}