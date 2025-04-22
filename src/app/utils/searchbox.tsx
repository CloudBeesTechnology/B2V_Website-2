// import { useState } from "react";
// import { IoSearch } from "react-icons/io5";

// const Searchbox: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   return (
//     <div className="center">
//       <input
//         type="text"
//         className="w-auto  p-2 font-semibold border border-[#DCE0E5] rounded-l-md outline-none"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <span className=" rounded-r-md bg-primary p-3 text-lg text-white">
//         <IoSearch />
//       </span>
//     </div>
//   );
// };
// export default Searchbox;

import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface User {
  id: string;
  [key: string]: any;
}

interface SearchboxProps {
  allUser: User[]; // Array of users
  handleSelect: (selectedUser: User) => void; // Callback to parent
}

const Searchbox: React.FC<SearchboxProps> = ({ allUser, handleSelect }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const filteredUsers = allUser
    ?.filter((user) =>
      user?.empID?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
    .sort((a, b) => {
      const aStarts = a.empID

        .toLowerCase()
        .startsWith(searchTerm?.toLowerCase());
      const bStarts = b.empID

        ?.toLowerCase()
        ?.startsWith(searchTerm?.toLowerCase());

      // const aNameStarts = a.name

      //   .toLowerCase()
      //   .startsWith(searchTerm?.toLowerCase());
      // const bNameStarts = b.name

      //   ?.toLowerCase()
      //   ?.startsWith(searchTerm?.toLowerCase());

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  const handleDropdownSelect = (user: User) => {
    handleSelect(user);
    setSearchTerm(`${user.empID}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-72">
      <div className="flex">
        <input
          type="text"
          className="w-full p-2 font-semibold border border-[#DCE0E5] rounded-l-md outline-none"
          placeholder="Search by User ID..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
        />
        <span className="rounded-r-md bg-primary p-3 text-lg text-white">
          <IoSearch />
        </span>
      </div>

      {showDropdown && filteredUsers.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
          {filteredUsers?.map((user, idx) => (
            <li
              key={idx}
              onClick={() => handleDropdownSelect(user)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {user.name} ({user.empID})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbox;
