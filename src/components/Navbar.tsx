import { useEffect, useState } from "react";
import Image from "next/image";
import {
  IoNotificationsOutline,
  IoSearchSharp,
  IoMicOutline,
} from "react-icons/io5";
import avatar from "../../public/assets/navbar/Missing_avatar.svg.png";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";


interface EmployeeData {
  name?: string;
  position?: string;
  profilePhoto?: string;
  department?: string;
  empID?: string;
}

const Navbar = () => {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  const fetchAndUpdateLeave = async () => {
    const empID = localStorage.getItem("empID");
    if (!empID) {
      alert("Employee ID not found.");
      return;
    }

    try {
      const employeesRef = collection(db, "employeeDetails");
      const q = query(employeesRef, where("empID", "==", empID));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Employee details not found.");
        return;
      }

      const data = querySnapshot.docs[0].data() as EmployeeData;
      setEmployeeData({
        ...data,
        profilePhoto: data?.profilePhoto
      });

    } catch (error) {
      console.error("Error updating totalLeave:", error);
    }
  };

  useEffect(() => {
    fetchAndUpdateLeave();
  }, []);

  const photo = employeeData?.profilePhoto
  
  return (
    <section className="bg-morelite_grey px-5 py-3 flex w-full sticky top-0 z-[100]">
      <div className="flex justify-end items-center w-full gap-4 ">
        <div className="rounded-full gap-1 bg-white flex items-center px-3 py-1">
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
            <p className="text-gray font-bold">{employeeData?.name}</p>
            <p className="text-medium_gray font-medium">{employeeData?.position}</p>
          </article>
           <div className="rounded-full h-[36px] w-[36px] overflow-hidden border-2 border-white">
            <Image
              src={photo || avatar}
              alt="profile not found"
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
        </article>
      </div>
    </section>
  );
};
export default Navbar;
