export const FamilyHome = () => {
  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Family Details</h3>
      </div>
      <form className="flex flex-col justify-between my-5">
        <section className="flex flex-col gap-4">
          <div className="flex gap-24">
            <div className="flex flex-col gap-2">
              <label htmlFor="father" className="text-[15px] text-gray ">
              Father Name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="father" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mother" className="text-[15px] text-gray ">
              Mother Name <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="mother" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="siblings" className="text-[15px] text-gray ">
              Siblings<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="siblings" className="outline-none py-1" />
              </div>
            </div>
        
          </div>
          <div className="flex gap-24 mt-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="fatherOcc" className="text-[15px] text-gray ">
              Father occupation <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="fatherOcc" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="motherocc" className="text-[15px] text-gray ">
              Mother occupation<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="motherocc" className="outline-none py-1" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contactNO" className="text-[15px] text-gray ">
               Contact Number<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input id="contactNO" className="outline-none py-1" />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-5 w-[73%] gap-2">
          <label htmlFor="address" className="text-[15px] text-gray ">
              Address<sup className="text-red">*</sup>
              </label>
            <textarea id="address"  className="border border-[#D9D9D9] outline-none rounded-sm resize-none"></textarea>
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
