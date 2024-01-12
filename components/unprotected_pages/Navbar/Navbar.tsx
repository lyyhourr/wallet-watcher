import React from 'react'
import NavbarRoute from './Navbar-Route'
import MobileMenu from './Mobile-Menu'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-between px-5  lg:px-20 xl:px-48 py-4 border-b border-gray-400 fixed top-0 w-full'>
            <section className='flex items-center gap-2'>
                <p>logo</p>
                <p>name</p>
            </section>
            <section className='hidden md:flex items-center gap-5 lg:gap-10  '>
                <NavbarRoute />
                <div className="flex items-center gap-3">
                    <button className='bg-black text-white px-5 py-2 rounded-md hover:bg-slate-900'>Login</button>
                    <button className='bg-black text-white px-5 py-2 rounded-md hover:bg-slate-900'>Register</button>
                </div>
            </section>
            <section className='md:hidden'><MobileMenu /></section>
        </nav>
    )
}
