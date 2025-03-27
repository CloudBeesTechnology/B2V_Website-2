import Image from "next/image";
import handperson from "../../assets/employee/handPerson.png";
import notepen from "../../assets/employee/notePen.png";
import Link from "next/link";

export const EmployeeHome = () => {
  return (
    <section className="flex gap-10 items-center my-10">
      <Link href="/allEmployee" className="border border-primary center flex-col py-5 rounded-md w-[25%] h-[150px]">
        <Image
          src={handperson}
          alt="hand person not found"
          width={50}
          height={50}
        />

        <p className="text_size_8 text-gray">All Employee</p>
      </Link>
      <Link href="/employeeDetails" className="border border-primary center flex-col gap-3 py-5 rounded-md w-[25%] h-[150px]">
        <Image src={notepen} alt="note with pen not found"   width={50}
          height={50} />
        <p className="text_size_8 text-gray">Add employee info</p>
      </Link>
    </section>
  );
};
