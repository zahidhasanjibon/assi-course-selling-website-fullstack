

export default function CourseSideBar({info,func,active}) {

  return (
    <li onClick={() => func(info)} className={`${active && 'text-blue-600 font-semibold'} mt-4 text-xs sm:text-sm md:text-lg`}>{info}</li>
  )
}
