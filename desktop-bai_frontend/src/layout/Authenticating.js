import React from 'react'
import { Outlet } from 'react-router-dom'
import background from '../assets/shake.png'
//import HeaderBar from '../components/HeaderBar';
import { Navbar } from '../components'

export default function SignInOption() {
    return (
        <div className='h-screen w-screen overflow-hidden'>
            <Navbar />
            <div className='w-full h-5/6 grid grid-cols-2 relative mt-24'>
                <div className='flex justify-center items-center'>
                    <img className='w-1/2 h-2/3 self-center' src={background} alt="background" />
                </div>
                <div className='relative w-11/12 h-full overflow-y-auto shadow-2xl'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}