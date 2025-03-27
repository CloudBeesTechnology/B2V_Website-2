// import Link from "next/link";

// export const EmpNav = () => {
//   return (
//     <section className="text_size_3 text-gray flex gap-10 my-5">
//       <Link href="/employee">Personal info</Link>
//       <Link href="/employee/educationInfo">Education info</Link>
//       <Link href="/employee/experience">Experience</Link>
//       <Link href="/employee/familyInfo">Family info</Link>
//       <Link href="/employee/workInfo">Work info</Link>
//     </section>
//   );
// };

"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const EmpNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab") || "personalInfo";

  return (
    <section className="text_size_3 text-gray flex gap-10 my-5">
      <button
        className={selectedTab === "personalInfo" ? "text-primary border-b-2 border-primary py-2 px-1" : ""}
        onClick={() => router.push(`/employeeDetails?tab=personalInfo`)}
      >
        Personal info
      </button>
      <button
        className={selectedTab === "educationInfo" ? "text-primary border-b-2 border-primary py-2 px-1" : ""}
        onClick={() => router.push(`/employeeDetails?tab=educationInfo`)}
      >
        Education info
      </button>
      <button
        className={selectedTab === "experience" ? "text-primary border-b-2 border-primary py-2 px-1" : ""}
        onClick={() => router.push(`/employeeDetails?tab=experience`)}
      >
        Experience
      </button>
      <button
        className={selectedTab === "familyInfo" ? "text-primary border-b-2 border-primary py-2 px-1" : ""}
        onClick={() => router.push(`/employeeDetails?tab=familyInfo`)}
      >
        Family info
      </button>
   
    </section>
  );
};
