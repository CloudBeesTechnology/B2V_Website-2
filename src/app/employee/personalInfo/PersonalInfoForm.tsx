import Image from "next/image";
import profileIcon from "../../../assets/employee/profileIcon.png";

export const PersonalInfoForm = () => {
  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Personal Info</h3>
      </div>
      <form className="flex justify-between my-5">
        <section className="flex flex-col gap-4 w-[70%] ">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[15px] text-gray ">
                Name<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="name" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact" className="text-[15px] text-gray ">
                Contact<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="contact" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[15px] text-gray ">
                Email ID<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="email" className="outline-none py-1" />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-[15px] text-gray ">
                Address<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="address" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="text-[15px] text-gray ">
                Phone No<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="phone" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="proof" className="text-[15px] text-gray ">
                Proof<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="proof" className="outline-none py-1" />
              </div>
            </div>
          </div>
          <div className="mb-20 pt-10 center">
            <button className="text-[15px] text-white bg-primary px-5 py-3 w-[20%] rounded-md">
              Save
            </button>
          </div>
        </section>
        <section className="w-[30%] flex items-center flex-col">
         <div className="max-w-[150px] w-full">
         <Image src={profileIcon} className="w-full" alt="profileIcon not found" />
         </div>
          {/* <input type="file" /> */}
          <p className="text-[15px] text-gray">Click to upload</p>
        </section>
      </form>
    </section>
  );
};
