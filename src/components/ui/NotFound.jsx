import Navbar from './product/navbar'
import Footer from './Footer'
import Robot from '../../assets/images/robot-404.svg'
import { useNavigate } from 'react-router'

export default function NotFound() {
    const navigate = useNavigate()

  return (
    <>
        <Navbar/>
        <section className='sm:px-6 md:px-10 lg:px-16 xl:px-24 h-dvh flex items-center justify-between'>
            <div>
                <p className='text-8xl font-bold'>404</p>
                <p className='text-4xl font-bold mt-2'>Ooops!</p>
                <p className='text-4xl font-bold'>Page Not Found</p>
                <p className='text-[#4F5665] text-xl mt-2'>This Page Doesn't exits or was removed!</p>
                <p className='text-[#4F5665] text-xl'>We suggest you back to home</p>
                <button
                    onClick={() => navigate("/")} 
                    className='bg-brand-orange text-xl border-2 border-brand-orange font-medium px-8 py-4 rounded-full hover:bg-transparent hover:text-brand-orange mt-8'>
                    Back To Home
                </button>
            </div>
            <img src={Robot} alt="404 Not Found" className='w-110'/>
        </section>
        <Footer/>
    </>
  )
}
