import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../authentication/AuthContext";

export default function Cart() {
  // eslint-disable-next-line no-unused-vars
  const [cartProductsCount, setCartProductsCount] = useState({});

  const navigate = useNavigate();

  const { user, cartCount, setCartCount } = useContext(authContext);


  const handleCart = () => {
    navigate("/course/checkout");
  };

  // useEffect(() => {
  //       if(user?.email){
  //         console.log(cartCount);

  //       }
  // },[cartCount,user])

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    let randomCartItems = {};
    if (!cart) return;
    cart = JSON.parse(cart);
    const userEmail = user?.email;
    if (user?.email) {
      if (cart?.random) {
        randomCartItems = {
          ...cart?.random,
        };

        delete cart?.random;
      }
      let setItem = {
        ...cart,
        [userEmail]: {
          ...cart[userEmail],
          ...randomCartItems,
        },
      };
      localStorage.setItem("cart", JSON.stringify(setItem));
      setCartCount(setItem);
      // setCartProductsCount(cart[userEmail]);
    } else {
      // if(cart?.random){
      //   setCartCount(cart?.random)
      // }
      // setCartProductsCount(cart?.random);
    }
  }, [user, setCartCount]);

  let render = 0;

  if (user?.email) {
    if (cartCount[user?.email]) {
      render = Object.keys(cartCount[user?.email]).length;
    } else {
      render = 0;
    }
  } else {
    if (cartCount?.random) {
      render = Object.keys(cartCount?.random).length;
    } else {
      render = 0;
    }
  }

  return (
    <div
      onClick={handleCart}
      className="cursor-pointer text-center top-80 fixed right-2 w-16 h-14 bg-slate-500 text-white pt-1 rounded"
    >
      <p>cart</p>
      <p className="font-bold">
        {
        //  user?.email ?  Object.keys(cartCount[user?.email]).length : cartCount?.random ? Object.keys(cartCount?.random).length : 0
        render
      }
        </p>
    </div>
  );
}
