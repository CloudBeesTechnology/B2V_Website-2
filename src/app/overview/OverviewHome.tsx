import { ActiveEmployee } from "./ActiveEmployee";
import { TotalEmployee } from "./TotalEmployee";
import { OverviewNotice } from "./OverviewNotice";
import { OverviewLeaveApproval } from "./OverviewLeaveApproval";
import { OverviewHolidays } from "./OverviewHolidays";
import { Birthday } from "./Birthday";
import { Weather } from "./Weather";
import PersonalCal from "./PersonalCal";

export const OverviewHome = () => {
  return (
    <section className="grid grid-cols-3 gap-4 py-5">
      {/* Left Column */}
      <div className="col-span-2 flex flex-col gap-4 h-full">
        {/* Weather and Entry Time */}
        <Weather />

        {/* Employee Statistics */}
        <div className="grid grid-cols-2 gap-4">
          <TotalEmployee />
          <ActiveEmployee />
        </div>

        {/* Notices */}
        <div className=" min-h-[35%]">
          <OverviewNotice />
        </div>

        {/* Leave Approval */}
        <div className=" min-h-[24.5%]">
          <OverviewLeaveApproval />
        </div>
      </div>

      {/* Right Column */}
      <div className="col-span-1 flex flex-col gap-4 h-full">
        {/* Personal Calendar */}
        <div className=" flex-1 min-h-[43%]">
          <PersonalCal />
        </div>

        {/* Birthdays */}
        <div className=" flex-[0.3] min-h-[25%]">
          <Birthday />
        </div>

        {/* Holidays */}
        <div className=" flex-[0.4] min-h-[25%]">
          <OverviewHolidays />
        </div>
      </div>
    </section>
    // <section className="grid grid-cols-2 grid-rows-4">
    //   <div className="flex flex-col">
    //     <Weather />

    //     <div className="flex items-center">
    //       <TotalEmployee />
    //       <ActiveEmployee />
    //     </div>
    //   </div>
    //   <div className="row-span-2">
    //     <PersonalCal />
    //   </div>
    //   <div className="row-span-2">

    //   <OverviewNotice />
    //   </div>
    //   <Birthday />
    //   <OverviewLeaveApproval />
    //   <OverviewHolidays />
    // </section>
  );
};
