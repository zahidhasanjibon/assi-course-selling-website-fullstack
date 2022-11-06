import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authContext } from "../component/authentication/AuthContext";
import CheckOutCard from "../component/chekout/CheckOutCard";
import NotFound from "./NotFound";
export default function Checkout() {
  const [allCartProducts, setAllCartProducts] = useState([]);


  const {user} = useContext(authContext)

  const {logOut} = useContext(authContext) 


  useEffect(() => {

      let cartItemsId;
    if(!user?.email) return 

    const currentUserEmail = user?.email
      let cart  = localStorage.getItem("cart")
      if(!cart) return 

        cart = JSON.parse(cart)
        if(cart[currentUserEmail]){
          cartItemsId = Object.keys(cart[currentUserEmail]);
        }
        const jwttoken = localStorage.getItem("jwttoken")
    fetch(`${process.env.REACT_APP_API_URL}/productByIds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:`bearer ${jwttoken}`
      },
      body: JSON.stringify(cartItemsId),
    })
      .then((res) => {
        if(res.status === 401 || res.status === 403){
          toast.error('unauthorized access')
          logOut()
          return
        }
        return res.json()
      })
      .then((d) => {
        setAllCartProducts(d?.products)
    });

  }, [user,logOut]);

  // if not found id of this course then return not found page
  if (!allCartProducts?.length < 0) {
    return <NotFound />;
  }

  return (
    <section className="container mx-auto">
      <div className="checkout w-11/12 mx-auto mt-12">
        <h1 className="text-3xl font-bold">YOUR CART</h1>

        <div className="grid grid-cols-6 gap-x-8 mt-6 pb-12">
            <div className="col-span-3 md:col-span-4">
                 {allCartProducts?.length > 0 &&
            allCartProducts.map((item) => (
              <CheckOutCard cartInfo={item} key={item._id} />
            ))}
            </div>
         

          <div className="col-span-3 md:col-span-2 pt-12 rounded shadow-lg py-8 px-4 h-[500px]">
            <h3 className="text-2xl font-semibold">Summary</h3>
            <p>shipping are coming</p>

            <p>pay with :</p>
            <div>
              <p>crediit / debit card</p>
              <p>samsung pay</p>
            </div>

            <div>
              <p>Total</p>
              <p className="font-semibold text-yellow-400">{"price"}$</p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => toast.success("welcome to the course")}
                className="btn btn-primary btn-sm"
              >
                CHECKOUT
              </button>
            </div>

            <div className="mt-5">
              <p>this is awesome product</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
