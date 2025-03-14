import { FaThLarge } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BsClock, BsFileText, BsPerson, BsJournalBookmark } from "react-icons/bs";
// import { GiLeaf } from "react-icons/gi";


const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        {/* <Image src="/logo.png" alt="Logo" width={50} height={50} /> */}
        {/* <img src="/logo.png" alt="Logo" className="w-12 h-12" /> */}
      </div>
      
      {/* Menu Items */}
      <nav className="flex flex-col space-y-4 ">
        <button className="flex items-center space-x-3 p-3 bg-blue-500 text-white rounded-lg">
          <FaThLarge />
          <span>Overview</span>
        </button>
        
        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          <BsPerson />
          <span>Employee</span>
        </button>

        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          <BsClock />
          <span>Attendance</span>
        </button>

        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          {/* <GiLeaf /> */}
          <span>Leave Management</span>
        </button>

        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          <BsFileText />
          <span>Timesheet</span>
        </button>

        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          <FiSettings />
          <span>Settings</span>
        </button>

        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          <BsJournalBookmark />
          <span>Report</span>
        </button>
      </nav>
      
      {/* Logout Button */}
      <div className="mt-auto">
        <button className="flex items-center space-x-3 text-gray-600 hover:text-black p-2">
          <MdOutlineLogout />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
