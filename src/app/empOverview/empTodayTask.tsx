const EmpTodayTask: React.FC = () => {
  return (
    <article className="flex flex-col justify-start items-start px-5  text-start h-48 gap-5 border w-1/3 bg-white border-[#E4E4E4] rounded-md py-5 ">
      <p className="text-[24px] font-semibold text-gray ">Today task.</p>
      <p className="font-semibold text-medium_gray ">
        Complete mobile application. add few correction
      </p>
      <p className="text-approved_blue text-[13px]  font-medium bg-lite_blue py-0.5 px-1.5 rounded-sm">
        Processing
      </p>
    </article>
  );
};
export default EmpTodayTask;
