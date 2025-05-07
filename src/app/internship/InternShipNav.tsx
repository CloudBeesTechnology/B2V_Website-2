"use client";

import Image from "next/image";
import handperson from "../../../public/assets/employee/handPerson.png";
import notepen from "../../../public/assets/employee/notePen.png";
import Link from "next/link";
import useCheckPermission from "../utils/customHooks/useCheckPermission";

const InternNav = () => {
  const { hasPermission } = useCheckPermission();

  return (
    <section className="flex gap-10 items-center my-10">
      {/* {hasPermission("", "") && ( */}
        <Link
          href="/internship/tabs"
          className="border border-primary center flex-col py-5 rounded-md w-[20%] h-[150px]"
        >
          <Image
            src={handperson}
            alt="hand person not found"
            width={50}
            height={50}
          />
          <p className="text_size_8 text-gray">Interns</p>
        </Link>
      {/* )} */}
      {/* {hasPermission("", "") && ( */}
        <Link
          href="/internship/internStatus"
          className="border border-primary center flex-col gap-3 py-5 rounded-md w-[20%] h-[150px]"
        >
          <Image
            src={notepen}
            alt="note with pen not found"
            width={50}
            height={50}
          />
          <p className="text_size_8 text-gray">Internship Enrollment</p>
        </Link>
      {/* )} */}
    </section>
  );
};

export default InternNav;