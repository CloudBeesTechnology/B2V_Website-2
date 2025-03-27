import { MdOutlineAddBox } from "react-icons/md";

export const ExperienceHome = () => {
  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Experience</h3>
      </div>
      <form className="flex flex-col justify-between my-5">
        <section className="flex flex-col gap-4">
          <div className="flex gap-24">
            <div className="flex flex-col gap-2">
              <label htmlFor="year" className="text-[15px] text-gray ">
                No of years experience<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="year" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className="text-[15px] text-gray ">
                Company Name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="company" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="work" className="text-[15px] text-gray ">
                Work type<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="work" className="outline-none py-1" />
              </div>
            </div>
            <article className="my-auto">
              <MdOutlineAddBox />
            </article>
          </div>
          <div className="flex gap-24 mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="manager" className="text-[15px] text-gray ">
                Manager <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="manager" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dept" className="text-[15px] text-gray ">
                Department<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="dept" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="location" className="text-[15px] text-gray ">
                Work location<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="location" className="outline-none py-1" />
              </div>
            </div>
          </div>
          <div className="mb-20 pt-10 center">
            <button className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md">
              Save
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
