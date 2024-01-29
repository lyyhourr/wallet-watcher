import Sidebar from '@/components/protected_pages/Sidebar/Sidebar'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=' h-screen flex  flex-col lg:flex-row bg-white `'>
            <Sidebar />
            <div className='w-full h-full p-1 sm:p-2 md:p-4 overflow-auto mb-4 xl:mb-0'>
                {children}
            </div>
        </div>
    )
}
