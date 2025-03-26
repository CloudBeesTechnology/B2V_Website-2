import { BsFillCloudSunFill } from "react-icons/bs";
import manrun from "../../assets/home/manRun.png"
import Image from "next/image";

export const Weather = () => {
  return (
    <section className="bg-gradient-to-r from-orange to-red flex gap-2 rounded-xl">
      <div className="text-gray border-r h-full center gap-1 flex-col border-dashed px-5 py-8">
        <p className="text-[#73877B] text-2xl">
          <BsFillCloudSunFill />
        </p>
        <p className="text-[13px] font-medium w-24">Partly Cloudy</p>
      </div>
      <div className="flex items-center justify-between w-full p-5">
        <article className="text-gray">
          <p className="text-[13px] font-medium ">21 September 2022</p>
          <p className="text_size_1">Today</p>
        </article>
        <div className="flex items-center justify-evenly w-1/2">
          <div className="relative px-2 py-1 rounded-md bg-[#73877B]">
            <p className="text-[13px] font-medium text-[#EEEEEE] ">Present-on time</p>
            <div className="absolute -bottom-2 -right-7">
                <Image src={manrun} width={100} className="w-full h-full" alt="man run not found" />
            </div>
          </div>
          <article className="text-[#D9F0C5]">
            <p  className="text-[13px] font-medium ">Entry Time</p>
            <p className="text_size_1">10:11 AM</p>
          </article>
        </div>
      </div>
    </section>
  );
};
