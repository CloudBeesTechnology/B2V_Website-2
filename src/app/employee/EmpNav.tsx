import Link from "next/link";

export const EmpNav = () => {
  return (
    <section className="text_size_3 text-gray flex gap-10 my-5">
      <Link href="/employee/personalInfo">Personal info</Link>
      <Link href="/employee/educationInfo">Education info</Link>
      <Link href="/employee/experience">Experience</Link>
      <Link href="/employee/familyInfo">Family info</Link>
      <Link href="/employee/workInfo">Work info</Link>
    </section>
  );
};
