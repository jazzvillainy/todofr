import React from 'react'
import { Outlet } from 'react-router'

function RootLayout() {
  return (
    <div className='bg-black'>
        <Outlet/>
        <nav className='text-white fixed bottom-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aspernatur laboriosam inventore, eligendi facere corporis suscipit amet commodi reiciendis quidem earum ab itaque quisquam quod ducimus. Rem necessitatibus esse aspernatur!</nav>
    </div>
  )
}

export default RootLayout