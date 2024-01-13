import React from 'react'
const sideNavRoutes = [
  {
    title: "Home",
    route: "/dashboard/home",
  },
  {
    title: "Dashbaord",
    route: "/dashboard",
  },
  {
    title: "Overview",
    route: "/overview",
  },
  {
    title: "History",
    route: "/History",
  },
  {
    title: "Setting",
    route: "/setting",
  },

]
export default function SideNav() {
  return (
    <nav className=' h-full w-full bg-white rounded-lg'>
      Sidebar Contents
    </nav>
  )
}
