import { useContext, useRef } from "react";
import { AiOutlineBell, AiOutlineClockCircle } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { IoIosFootball } from "react-icons/io";
import { MdGolfCourse } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import Pdf from "react-to-pdf";
import { authContext } from "../component/authentication/AuthContext";
import "./courses.css";
import NotFound from "./NotFound";

export default function CourseDetails() {
  const ref = useRef();
  const { product } = useLoaderData();

  const { user, setCartCount } = useContext(authContext);

  const navigate = useNavigate();
  const { category, ratings, stock, img, price, seller, _id, name } =
    product || {};

  const handleAddToCart = (id) => {
    const userEmail = user?.email;

    let cart = getLocalStorageData();

    if (cart) {
      cart = JSON.parse(cart);

      if (user?.email) {
        if (cart[userEmail][id]) {
          let setItem = {
            ...cart,
            [userEmail]: {
              ...cart[userEmail],
              [id]: cart[userEmail][id] + 1,
            },
          };
          setLocalStorageData(setItem);
        } else {
          let setItem = {
            ...cart,
            [userEmail]: {
              ...cart[userEmail],
              [id]: 1,
            },
          };
          setLocalStorageData(setItem);
        }
      } else {
        // do if not user
        // if random exist
        if (cart?.random) {
          if (cart?.random[id]) {
            let setItem = {
              ...cart,
              random: { ...cart.random, [id]: cart.random[id] + 1 },
            };
            setLocalStorageData(setItem);
          } else {
            let setItem = {
              ...cart,
              random: {
                ...cart?.random,
                [id]: 1,
              },
            };
            setLocalStorageData(setItem);
          }
        } else {
          // if no random exist
          let setItem = {
            ...cart,
            random: {
              [id]: 1,
            },
          };
          setLocalStorageData(setItem);
        }
      }
    } else {
      // no cart
      // user exist
      if (user?.email) {
        let setItem = {
          [userEmail]: {
            [id]: 1,
          },
        };
        setLocalStorageData(setItem);
      } else {
        let setItem = {
          random: {
            [id]: 1,
          },
        };
        setLocalStorageData(setItem);
      }
    }

    navigate(`/course/checkout`);
  };

  const setLocalStorageData = (data) => {
    data = JSON.stringify(data);
    localStorage.setItem("cart", data);
    setCartCount(JSON.parse(data));
  };

  const getLocalStorageData = () => {
    return localStorage.getItem("cart");
  };

  if (!product?._id) {
    return <NotFound />;
  }

  return (
    <section className="">
      <div className="top-banner">
        <span className="top-banner-overlay"></span>
        <div className="top-banner-title">
          <div className="banner-title">
            <h1>{category}</h1>
          </div>
        </div>
      </div>

      <div className="container w-4/5 mx-auto mt-14 grid grid-cols-5">
        <div className="col-span-5 md:col-span-4">
          <hr className="divider" />
          <div className="text-end">
            <Pdf targetRef={ref} filename="your-pdf-file.pdf" scale={0.8}>
              {({ toPdf }) => (
                <button onClick={toPdf} className="ml-4 btn btn-primary btn-sm">
                  download pdf
                </button>
              )}
            </Pdf>
          </div>

          <div ref={ref} className="course-details px-8 py-8">
            <h1 className="text-3xl font-bold">{name}</h1>

            <div className="course-header flex justify-between my-8">
              <div className="flex">
                <img className="w-12 h-12 rounded-full" src={img} alt="" />
                <div className="ml-2 md:ml-4 mr-2 md:mr-6 border-r-2 pr-2 md:pr-4">
                  <p className="text-cyan-400 text-sm md:text-xl">teacher</p>
                  <p className="text-sm md:text-lg">{seller}</p>
                </div>

                <div>
                  <p className="text-cyan-400 text-sm md:text-xl">categories</p>
                  <p className="text-sm md:text-lg">{category}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-sm md:text-3xl text-yellow-400 font-semibold">
                  ${price}{" "}
                </p>
              </div>
            </div>

            <div className="">
              <img className="course-img" src={img} alt="" />
            </div>

            <div className="mt-10 course-content grid grid-cols-5">
              <div className="col-span-5 md:col-span-3 w-11/12 pt-14">
                <h3 className="text-2xl font-semibold mb-3">
                  Course Description
                </h3>
                <p className="text-justify">{name}</p>
              </div>

              <div className="col-span-5 md:col-span-2">
                <div className="pl-8 border-l-2">
                  <div className="text-center pt-5 md:pt-0">
                    <button
                      onClick={() => handleAddToCart(_id)}
                      className="btn btn-primary btn-sm"
                    >
                      add to cart
                    </button>
                  </div>
                  <h3 className="text-2xl font-semibold pt-6">
                    Course Features
                  </h3>

                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center border-b-2 py-2">
                        <span>
                          <AiOutlineClockCircle />
                        </span>
                        <span>Duration</span>
                      </div>
                      <div className="flex items-center border-b-2 py-2">
                        <span>
                          <IoIosFootball />
                        </span>
                        <span>activity</span>
                      </div>
                      <div className="flex items-center border-b-2 py-2">
                        <span>
                          <AiOutlineBell />
                        </span>
                        <span>Time</span>
                      </div>

                      <div className="flex items-center border-b-2 py-2">
                        <span>
                          <BsPeople />
                        </span>
                        <span>Seat</span>
                      </div>
                      <div className="flex items-center border-b-2 py-2">
                        <span>
                          <MdGolfCourse />
                        </span>
                        <span>Skill Level</span>
                      </div>
                    </div>

                    <div>
                      <div className="py-2 border-b-2">
                        <p>{ratings}</p>
                      </div>
                      <div className="py-2 border-b-2">
                        <p>{category}</p>
                      </div>
                      <div className="py-2 border-b-2">
                        <p>10pm-12pm</p>
                      </div>
                      <div className="py-2 border-b-2">
                        <p>{stock}</p>
                      </div>
                      <div className="py-2 border-b-2">
                        <p>begginer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
