import NavDashboard from '@/components/protected_pages/Dashboard_Navbar/NavDashboard'
import { Menu } from 'lucide-react'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className=' h-screen flex  flex-col lg:flex-row'>
            <NavDashboard />
            <div className='w-full h-full p-4'>
                {children}
            </div>
        </div>
    )
}
