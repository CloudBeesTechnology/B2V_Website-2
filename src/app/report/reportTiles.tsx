"use client"; // if you're using app directory (Next.js 13+)

import Image from "next/image";
import employeeDetails from "../../../public/assets/report/reportTailIcons/employeeDetails.svg";
import Certificate from "../../../public/assets/report/reportTailIcons/Cerificate.svg";
import leaveData from "../../../public/assets/report/reportTailIcons/LeaveData.svg";
import { useRouter } from "next/navigation";

type CardType = {
  image: string;
  title: string;
  route: string;
};

const tiles: CardType[] = [
  {
    image: employeeDetails,
    title: "Attendance Report",
    route: "/report/reportDetails",
  },
  {
    image: employeeDetails,
    title: "Employee Details",
    route: "/report/reportDetails",
  },
  {
    image: leaveData,
    title: "Leave Data",
    route: "/report/leaveData",
  },
  {
    image: Certificate,
    title: "Candidate records",
    route: "/report/records",
  },
  {
    image: Certificate,
    title: "Permission Report",
    route: "/report/permission",
  },
];

const ReportTiles: React.FC = () => {
  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };
  return (
    <section className="my-10 bg-gray-100 min-h-screen">
      {/* grid grid-cols-1 md:grid-cols-3 */}
      <div className="grid grid-cols-3 gap-10 w-full">
        {tiles.map((card, index) => (
          <article
            key={index}
            onClick={() => handleClick(card.route)}
            className="bg-white rounded-xl shadow-xl p-5 flex flex-col items-center text-center border border-primary  w-full"
          >
            <Image
              src={card.image}
              alt={card.title}
              width={50}
              height={50}
              className="mb-4"
            />
            <h2 className="text_size_8 text-gray mt-auto">{card.title}</h2>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ReportTiles;
