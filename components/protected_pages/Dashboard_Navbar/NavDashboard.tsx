import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../../ui/dropdown-menu'
import Logo from '../../Logo'
import { Logout } from './Logout'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import SideNav from '../SideNav/SideNav'

export default function NavDashboard() {
    return (
        <nav className='w-full py-3 px-3 lg:px-20 flex  items-center justify-between  border-b border-gray-500'>
            <Logo />
            <div className='flex items-center gap-4 '>
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex gap-2 bg-green-600 rounded-lg text-white px-5  py-1 items-center ">
                        Add
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Add Income</DropdownMenuItem>
                        <DropdownMenuItem>Add Expense</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Logout />
                <div className='lg:hidden flex items-center'>
                    <Sheet>
                        <SheetTrigger><Menu className='' /></SheetTrigger>
                        <SheetContent side={"left"}>
                            <SideNav />
                        </SheetContent>
                    </Sheet>

                </div>
            </div>

        </nav>
    )
}
