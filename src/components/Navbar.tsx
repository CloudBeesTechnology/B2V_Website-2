"use client";

import Image from "next/image";
import {
  IoNotificationsOutline,
  IoSearchSharp,
  IoMicOutline,
} from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import avatar from "../../public/assets/navbar/Missing_avatar.svg.png";
import { auth } from "@/lib/firebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        localStorage.clear()
        router.push("/signIn");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      }); 
    }

  return (
    <section className="bg-morelite_grey px-5 py-3 flex">
      <div className="flex justify-end items-center w-full gap-4">
        <div className=" rounded-full gap-1 bg-white flex items-center px-3 py-1">
          <span className="text-gray">
            <IoSearchSharp />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="text_size_6 text-lite_gray outline-none py-1"
          />
          <span className="text-approved_blue text-lg">
            <IoMicOutline />
          </span>
        </div>
        <article>
          <p className="text-gray text-2xl">
            <IoNotificationsOutline />
          </p>
        </article>
        <article className="flex gap-3">
          <article className="text-[13px] my-auto">
            <p className="text-gray font-bold">Name</p>
            <p className="text-medium_gray font-medium">Position</p>
          </article>
          <div className="bg-white rounded-md max-w-[50px] w-full">
            <Image
              src={avatar}
              alt="profile not found"
              className="bg-cover w-full"
            />
          </div>
          <p className="text-gray text-xl cursor-pointer" onClick={handleLogout}> 
            <FaSortDown />
            Logout
          </p>
        </article>
      </div>
    </section>
  );
};
export default Navbar;
