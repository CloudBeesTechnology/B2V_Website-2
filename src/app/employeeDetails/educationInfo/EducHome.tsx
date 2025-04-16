import { MdOutlineAddBox } from "react-icons/md";

export const EducHome = () => {
  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Education info</h3>
      </div>
      <form className="flex flex-col justify-between my-5">
        <section className="flex flex-col gap-4">
          <div className="flex gap-24">
            <div className="flex flex-col gap-2">
              <label htmlFor="degree" className="text-[15px] text-gray ">
                Bachelor’s degree<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="degree" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="study" className="text-[15px] text-gray ">
                Field of study<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="study" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="school" className="text-[15px] text-gray ">
                School<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="school" className="outline-none py-1" />
              </div>
            </div>
            <article className="my-auto">
              <MdOutlineAddBox />
            </article>
          </div>
          <div className="flex gap-24 mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="master" className="text-[15px] text-gray ">
                Master’s degree <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="master" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="field" className="text-[15px] text-gray ">
                Field of study<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="field" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="highSchool" className="text-[15px] text-gray ">
                School<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="highSchool" className="outline-none py-1" />
              </div>
            </div>
            <article className="my-auto">
              <MdOutlineAddBox />
            </article>
          </div>
        
        </section>
        <section className="flex flex-col gap-4  my-10">
        <div>
        <h3 className="text-mediumlite_grey text-[22px]">Courses</h3>
      </div>
          <div className="flex gap-24">
            <div className="flex flex-col gap-2 w-[20%]">
              <label htmlFor="course" className="text-[15px] text-gray ">
              Course cerificate<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="course" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[44%]">
              <label htmlFor="academic" className="text-[15px] text-gray ">
              Academic name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="academic" className="outline-none py-1" />
              </div>
            </div>
            <article className=" center">
                <MdOutlineAddBox />
              </article>
          </div>
        
          <div className="mb-20 pt-10 center">
            <button className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md">
              Next
            </button>
          </div>
        </section>
      </form>
    </section>
  );
};
