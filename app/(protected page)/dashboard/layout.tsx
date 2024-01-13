import NavDashboard from '@/components/protected_pages/Dashboard_Navbar/NavDashboard'
import SideNav from '@/components/protected_pages/SideNav/SideNav'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='bg-[#F4F4F6] h-screen'>
            <NavDashboard />
            <main className='flex h-[calc(100vh-100px)]  gap-5 items-center p-4 '>
                <div className='hidden  lg:flex w-[350px] xl:w-[450px]   h-full '>
                    <SideNav />
                </div>
                <div className='h-full w-full'>
                    {children}
                </div>
            </main>
        </div>
    )
}
