"use client";
import HistoryOfAttendance from "./historyOfAttendance/page";

const Attendance: React.FC = () => {
  return (
    <main>
      <header>
        <nav className="flex justify-start py-5 gap-7 text-[22px]  text-gray ">
          <p>Attendance</p>
          <p className="border-b-3 border-primary">History of Attendance</p>
        </nav>
      </header>
      <HistoryOfAttendance />
    </main>
  );
};
export default Attendance;
