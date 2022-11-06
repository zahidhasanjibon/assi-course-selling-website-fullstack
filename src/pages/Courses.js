import { useEffect, useState } from "react";
import CourseCard from "../component/courses/CourseCard";
import CourseSideBar from "../component/courses/CourseSideBar";
import "./courses.css";
export default function Courses() {
  const [category, setCategory] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [resultPerPage, setResultPerPage] = useState(12);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  const categoryData = [
    "all",
    "Men's Pants",
    "Men's Boot",
    "Bag",
    "Men's Sneaker",
    "Cap",
    "Earphones",
    "Bottle",
  ];

  const noOfPage = Math.ceil(totalProductsCount / resultPerPage);


  const handleCategory = (val) => {
    setCategory(val);
    setCurrentPage(0)
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products?category=${category}&limit=${resultPerPage}&currentPage=${currentPage}`
    )
      .then((res) => res.json())
      .then((d) => {
        setAllProducts(d?.products);
        setTotalProductsCount(d?.totalCount);
      });
  }, [category, resultPerPage, currentPage]);

  return (
    <section className="">
      <div className="top-banner">
        <span className="top-banner-overlay"></span>
        <div className="top-banner-title">
          <div className="banner-title">
            <h1>ALL COURSES</h1>
          </div>
        </div>
      </div>

      <div className="container w-11/12 mx-auto mt-14">
        <hr className="divider" />

        <div className="main-content grid grid-cols-5 gap-x-7 pt-3 pb-6">
          <div className="left-side-bar col-span-2 md:col-span-1">
            <h4 className="md:text-2xl font-semibold text-xs sm:text-sm">
              COURSE LIST
            </h4>
            <ul className="mt-3">
              {allProducts?.length > 0 &&
                categoryData.map((d, i) => (
                  <CourseSideBar
                    active={category === d ? true : false}
                    func={handleCategory}
                    key={i}
                    info={d}
                  />
                ))}
            </ul>
          </div>

          <div className="courses-list col-span-3 md:col-span-4 pb-12">
            <div className="course-list-wrapper grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 gap-6">
              {allProducts?.length > 0 &&
                allProducts.map((d) => (
                  <CourseCard key={d._id} courseInfo={d} />
                ))}
            </div>
            {allProducts.length > 0 && (
              <div className="pagination mx-auto text-center">
                <div className="btn-group mt-12">
                  {[...Array(noOfPage).keys()].map((page, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(page)}
                      className={`${page === currentPage ? "btn-active" : ""
                        } btn`}
                    >
                      {page + 1}
                    </button>
                  ))}
                  <div className="ml-4">
                    <select value={resultPerPage} onChange={(e) => setResultPerPage(e.target.value)} className="select select-info w-full max-w-xs">
                      <option value="8">8</option>
                      <option value="12">12</option>
                      <option value="16">16</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
