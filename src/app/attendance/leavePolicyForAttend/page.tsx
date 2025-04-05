import { IoWarningOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
const LeavePolicyForAttend: React.FC = () => {
  return (
    <main>
      <header className="text-xl font-semibold text-gray py-10">
        <h3>Leave Policy</h3>
      </header>
      <section className="bg-white rounded-xl p-5 ">
        <h6 className="py-3 font-bold text-gray">Policy</h6>
        <div className="flex justify-start   gap-2 rounded border border-[#F0B732] bg-[#FCF1D6] p-4 max-w-4xl">
          <IoWarningOutline className="text-[#F0B732] text-xl" />

          <div>
            <p className="font-semibold text-gray">Note</p>
            <ol className="text-sm list-decimal pl-3 pt-2">
              <li>Any type of change will be effective on the next day.</li>
              <li>
                To understand how leave settings work, please checkout the{" "}
                <u>documentation.</u>
              </li>
              <li>Remained leave will not carry forward to next leave year.</li>
            </ol>
          </div>
          <button className="flex text-[#F0B732] text-xl ml-auto ">
            <RxCross2 />
          </button>
        </div>

        <form className="py-6 space-y-5 text_size_6">
          {/* Start month */}
          <div>
            <label className="" htmlFor="inputField">
              Start month
            </label>
            <select
              id="dropdown"
              className="w-full p-2 mt-2 border border-[#C2C2C2] h-10 outline-none rounded-md"
            >
              <option value="">Choose an option</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={index} value={month.toLowerCase()}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          {/* For paid leave */}
          <div>
            <div className="flex justify-between items-center space-y-2">
              <p>For paid leave</p>
              <p>
                {"(Add employment status to allow employee for auto allowance)"}
              </p>
            </div>
            <div className="border border-[#C2C2C2] flex justify-start gap-2 items-center rounded p-1 w-full h-10">
              <div className="border flex justify-between gap-2 border-[#146ADC] bg-[#D0E1F8] rounded-lg w-fit py-1 px-2">
                <p>Tag Name</p>
                <p className="center border-l-1 border-[#146ADC] pl-2"><RxCross2 /></p>
              </div>
              <div className="border flex justify-between gap-2 border-[#146ADC] bg-[#D0E1F8] rounded-lg w-fit py-1 px-2">
                <p>Tag Name</p>
                <p className="center border-l-1 border-[#146ADC] pl-2 "><RxCross2  /></p>
              </div>
            </div>
          </div>

          {/* Unpaid Leave Section */}
          <div>
            <div className="flex justify-between items-center space-y-2">
              <p>For unpaid leave</p>
              <p>
                {"(Add employment status to allow employee for auto allowance)"}
              </p>
            </div>
            <div className="border border-[#C2C2C2] flex justify-start gap-2 items-center rounded p-1 w-full h-10">
              <div className="border flex justify-between gap-2 border-[#146ADC] bg-[#D0E1F8] rounded-lg w-fit py-1 px-2">
                <p>Tag Name</p>
                <p className="center border-l-1 border-[#146ADC] pl-2"><RxCross2 /></p>
              </div>
              <div className="border flex justify-between gap-2 border-[#146ADC] bg-[#D0E1F8] rounded-lg w-fit py-1 px-2">
                <p>Tag Name</p>
                <p className="center border-l-1 border-[#146ADC] pl-2"><RxCross2 /></p>
              </div>
            </div>
          </div>
          <div className="flex text_size_5 space-x-4">
            <button className="rounded-lg bg-[#212143] text-white px-4 py-3">
              Save
            </button>
            <button className="rounded-lg bg-[#D3D3D9] text-[#212143] px-4 py-3">
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default LeavePolicyForAttend;
