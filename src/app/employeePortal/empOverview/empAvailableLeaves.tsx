const EmpAvailableLeaves:React.FC=()=>{
    return (
        <section className="flex justify-between items-center mt-20 gap-10 ">
        <article className="flex  w-2/3 justify-around p-5 gap-5 border h-48 border-[#E4E4E4] bg-white rounded-md">
          <div className="center flex-col gap-2 border border-[#D4EBDC] w-full rounded-md">
            <p className="text-gray text_size_4">Annual Leave</p>
            <p className="text-2xl font-medium text-[#01C441]">12</p>
            <p className="text-12px font-medium text-medium_gray">
              Available
            </p>
          </div>
          <div className="center flex-col gap-2 border border-[#E3CFD4] w-full rounded-md">
            <p className="text-gray text_size_4">Sick Leave</p>
            <p className="text-2xl font-medium text-[#E83265]">09</p>
            <p className="text-12px font-medium text-medium_gray">
              Available
            </p>
          </div>
          <div className="center flex-col gap-2 border border-[#D1DEE7] w-full rounded-md">
            <p className="text-gray text_size_4">Casual Leave</p>
            <p className="text-2xl font-medium text-[#0186E3]">09</p>
            <p className="text-12px font-medium text-medium_gray">
              Available
            </p>
          </div>
        </article>

        <article className="flex flex-col justify-start items-start px-5  text-start h-48 gap-5 border w-1/3 bg-white border-[#E4E4E4] rounded-md py-5 ">
          <p className="text-[24px] font-semibold text-gray ">Today task.</p>
          <p className="font-semibold text-medium_gray ">
            Complete mobile application. add few correction
          </p>
          <p className="text-approved_blue text-[13px]  font-medium bg-lite_blue py-0.5 px-1.5 rounded-sm">
            Processing
          </p>
        </article>
      </section>
    )
}
export default EmpAvailableLeaves;