import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const EmpTimeSheetInfo:React.FC=()=>{
    return (
        <section className="flex justify-around items-center rounded-xl  w-full max-w-7xl min-w-xl h-[105px] bg-white">
        <div>
          <FaArrowLeft className="text-gray text-base" />
        </div>
        <div className="flex-col center space-y-3">
          <p className="text-gray text-base font-semibold"> Employee name</p>
          <p className="text-[#8F8989] text-[15px] font-medium  ">sriram</p>
        </div>
        <div className="grid grid-rows-2 gap-y-3">
          <p className="flex-1 text-gray text-base font-semibold ">
            Cloudbees Tech
          </p>
        </div>
        <div className="flex-col center space-y-3">
          <p className="text-gray text-base font-semibold ">
            Week Ending (Day & Date)
          </p>
          <div className="flex justify-between text-[#8F8989] text-[15px] font-medium  gap-5 ">
            <p className=" border-b-1  border-gray pb-0.5">03/03/2025</p>
            <p className="border-b-1  border-gray pb-0.5">08/03/2025</p>
          </div>
        </div>
        <div>
          <FaArrowRight className="text-gray text-base" />
        </div>
      </section>
    )
}
export default EmpTimeSheetInfo;