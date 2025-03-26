import { PiUserCircleGear } from "react-icons/pi";

export const ActiveEmployee = () => {
  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="shadow-xl  max-w-sm w-full px-5 py-8 space-y-3 rounded-2xl">
      <div className="flex justify-between items-center border-b pb-1  border-morelite_grey">
        <p className="text-gray text_size_2">Active Employee</p>
        <p className="text_size_5 text-mediumlite_grey">{formattedDate}</p>
      </div>
      <div className="flex justify-evenly gap-10 mt-5">
        <div className="space-y-3">
          <article className="flex gap-2">
            <span className="text-[#2748B3] text-xl">
              <PiUserCircleGear />
            </span>
            <article className="space-y-1">
              <p className="text-mediumlite_grey text-xs">Present</p>
              <p className="text-gray text_size_3">15</p>
            </article>
          </article>
          <article className="flex gap-2">
            <span className="text-[#CD8181] text-xl">
              <PiUserCircleGear />
            </span>
            <article className="space-y-1">
              <p className="text-mediumlite_grey text-xs">Absent</p>
              <p className="text-gray text_size_3">10</p>
            </article>
          </article>
        </div>
        <div className="flex  gap-2">
          <span className="text-[#40C0A2] text-xl">
            <PiUserCircleGear />
          </span>
          <article className="space-y-1">
              <p className="text-mediumlite_grey text-xs">Late</p>
              <p className="text-gray text_size_3">5</p>
            </article>
        </div>
      </div>
    </section>
  );
};
