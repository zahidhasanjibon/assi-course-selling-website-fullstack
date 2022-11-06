import React from 'react'
import { Outlet } from 'react-router-dom'
import Cart from '../cart/Cart'
import Navbar from '../navbar/Navbar'

export default function Main() {
  return (
    <>
        <Navbar />
        <Cart />
        <Outlet></Outlet>
    
    </>
  )
}
