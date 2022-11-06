import { ImStarEmpty, ImStarFull, ImStarHalf } from "react-icons/im";
import { useNavigate } from "react-router-dom";

export default function CourseCard({courseInfo}) {

    const {categorie,price,seller,_id,img,name} = courseInfo || {}

    const navigate = useNavigate()

      // navigate to single  course page
    const handleNavigate = (id) => {
        navigate(`/course/${id}`)
    }

  return (
    <div onClick={() => handleNavigate(_id)} className="w-11/12 card cursor-pointer bg-base-100 shadow-xl">
    <div className="h-3/5 w-full overflow-hidden">
      <img className="w-full" src={img} alt="Shoes" />
    </div>
    <div className="items-center text-center pt-3 pb-5">
      <h2 className="text-lg">{name}</h2>
      <p className="font-semibold">{categorie}</p>
      <p className="">{seller}</p>
      <div className="rating">
        <ImStarFull />
        <ImStarHalf /> <ImStarEmpty />
      </div>
      <p className="text-yellow-300 font-semibold text-2xl">
        {price} $
      </p>
      <p className="w-3/5 mx-auto mt-4 p-1 px-2 text-sm bg-blue-300 rounded font-semibold">
        see Details
      </p>
    </div>
  </div>
  )
}
