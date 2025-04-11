import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Searchbox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <div className="center">
      <input
        type="text"
        className="w-full p-2 font-semibold border border-[#DCE0E5] rounded-l-md outline-none"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <span className=" rounded-r-md bg-primary p-3 text-lg text-white">
        <IoSearch />
      </span>
    </div>
  );
};
export default Searchbox;
