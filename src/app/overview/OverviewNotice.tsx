import { IoIosArrowForward } from "react-icons/io";

export const OverviewNotice = () => {
  const notifyData = [
    {
      date: "03 Feb",
      notifyType: "Annual Retreat",
      desc: "Announcement concrning the public holidays..",
    },
    {
      date: "03 Feb",
      notifyType: "Annual Retreat",
      desc: "Announcement concrning the public holidays..",
    },
    {
      date: "03 Feb",
      notifyType: "Annual Retreat",
      desc: "Announcement concrning the public holidays..",
    },
  ];

  return (
    <section className="rounded-xl px-5 py-8 shadow-xl">
      <div className="flex justify-between items-center pb-1">
        <p className="text-gray text_size_3">Notice</p>
        <p className="text-text_size_6 text-medium_blue flex items-center gap-1">
          All Notice
          <span>
            <IoIosArrowForward />
          </span>
        </p>
      </div>
      <div>
        {notifyData.map((notify, index) => {
          return (
            <div key={index} className="border-b pt-5 pb-3 border-morelite_grey flex w-full justify-between items-center">
              <article className="space-y-2 ">
                <p className="text-medium_gray text_size_7">{notify.date}</p>
                <p className="text-sm font-bold text-gray">
                  {notify.notifyType}- 
                  <span className="font-normal text-mediumlite_grey">{notify.desc}</span>
                </p>
              </article>
              <p className="text-xs font-medium text-mediumlite_grey">
                Details
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
