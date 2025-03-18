"use client";

import Link from "next/link";
import { FaRegBell } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { FaCaretDown } from "react-icons/fa";
const Navbar: React.FC = () => {
  return (
    <nav className=" p-2 flex justify-end items-center bg-[#EEEEEE] px-6 space-x-6">
      {/* Search Box */}
      <div className="relative w-1/3 max-w-[300px]">
        <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-full bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-6 ">
        {/* Bell Icon */}
        <FaRegBell className="text-gray-600 cursor-pointer hover:text-blue-500 mr-14" size={24} />

        {/* Profile Section */}
        <div className="flex items-center space-x-2 cursor-pointer">
            <div className="flex flex-col items-center">
                <strong>Bonte</strong>
                <small className="text-[#757575]">Admin</small>
            </div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdjLlJS2C2KD-fRoOykz8e5luqOtFFpGo_QQ&s"
            alt="Profile"
            className="w-10 h-10 rounded-2xl border border-gray-300"
          />
            <FaCaretDown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
