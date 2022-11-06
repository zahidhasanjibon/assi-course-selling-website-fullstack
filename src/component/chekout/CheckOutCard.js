import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../authentication/AuthContext';

export default function CheckOutCard({cartInfo}) {

    const [quantity,setQuantity] = useState("")
    const {user} = useContext(authContext)

    const {img,name,category,price,_id} =  cartInfo || {}

    useEffect(() => {

         const getItemsQuantity = () => {
        let cart = localStorage.getItem("cart")
        if(cart){
            cart = JSON.parse(cart)
                setQuantity(cart[user?.email][_id])
        }
    }
    getItemsQuantity()

    },[_id,user])

   
    

  return (
    <div className='flex flex-col md:flex-row md:justify-between  items-center  shadow-lg px-4 py-3 rounded'>

    <div className='checkout-img py-3'>
        <img className="w-24 h-auto rounded" src={img} alt="" />
    </div>

    <div className="py-4">
        <h3 className="font-semibold">{name}</h3>
        <p>{category}</p>
    </div>

    <div className="py-4 flex w-12 justify-between items-center">
        <p className="">-</p>
        <p>{quantity}</p>
        <p>+</p>
    </div>

<div>
    <p className="text-yellow-400 text-2xl font-semibold">{price} $</p>
    <p>remove</p>
</div>



    </div>
  )
}
