"use client"; // if you're using app directory (Next.js 13+)

import { useRouter } from "next/navigation";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import useCheckPermission from "../utils/customHooks/useCheckPermission";
type CardType = {
  title: string;
  btnName: string;
  route: string;
};

const tiles: CardType[] = [
  {
    title: "Credential Request",
    btnName: "Details",
    route: "/user/credentialRequest",
  },
  {
    title: "Add User",
    btnName: "Details",
    route: "/user/addUser",
  },
];

const UserHome: React.FC = () => {
  const { hasPermission } = useCheckPermission();

  const router = useRouter();

  const handleClick = (route: string) => {
    router.push(route);
  };
  return (
    <section className="py-10  flex items-start justify-start max-w-3xl ">
      {/* grid grid-cols-1 md:grid-cols-3 */}
      <div className="flex justify-start gap-10  w-full">
        {tiles.map((card, index) => (
          <article
            key={index}
            onClick={() => handleClick(card.route)}
            className="bg-white rounded-xl shadow-xl px-5 py-6 flex flex-col items-center  w-full space-y-5 text-center"
          >
            <div className="  border-b border-[#D2D2D240] w-full h-full ">
              <h2 className="text_size_8 text-gray p-3 ">{card.title}</h2>
            </div>

            <button className="text_size_5 text-white bg-primary rounded px-3.5 py-2.5 center gap-2 cursor-pointer">
              {card.btnName}
              <span className="text-xl">
                <MdOutlineKeyboardArrowRight />
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default UserHome;
