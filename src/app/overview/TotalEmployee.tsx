import { PiMedalMilitary } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";

export const TotalEmployee = () => {
    const currentTime = new Date();
    const formattedDate = currentTime.toLocaleString("en-US", { month: "long", year: "numeric" }); 
   
  return (
    <section className='shadow-xl  max-w-sm w-full px-5 py-8 space-y-3 rounded-2xl'>
        <div className='flex justify-between items-center border-b pb-1 border-morelite_grey'>
            <p className='text-gray text_size_2'>
            Total Employee
            </p>
            <p className='text_size_5 text-mediumlite_grey'>{formattedDate}</p>
        </div>
        <div className="flex justify-between mt-5">
            <div className="space-y-3">
                <article className="flex gap-2">
                    <span className="text-gray"><PiMedalMilitary /></span>
                    <article className="space-y-1">
                        <p className='text-mediumlite_grey text-xs'>Male</p>
                        <p className='text-gray text_size_3'>150</p>
                    </article>
                </article>
                <article className="flex gap-2">
                    <span className="text-gray"><TbTargetArrow /></span>
                    <article className="space-y-1">
                        <p className='text-mediumlite_grey text-xs'>Female</p>
                        <p className='text-gray text_size_3'>50</p>
                    </article>
                </article>
            </div>
            <div>
                <p className='text-medium_gray text-xs font-medium'>Gender</p>
            </div>
        </div>
    </section>
  )
}
