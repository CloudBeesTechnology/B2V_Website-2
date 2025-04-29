import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";

interface User {
  id: string;
  [key: string]: any;
}

interface SearchboxProps {
  allUser: User[]; // Array of users
  handleSelect: (selectedUser: User) => void; // Callback to parent
  parentRef: React.RefObject<HTMLDivElement | null>;
}

const Searchbox: React.FC<SearchboxProps> = ({
  allUser,
  handleSelect,
  parentRef,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const matchFields = ["empID", "name"];

  const getMatchPriority = (value: string, searchTerm: string): number => {
    const lowerVal = value?.toLowerCase() || "";
    const lowerSearch = searchTerm?.toLowerCase() || "";

    if (lowerVal.startsWith(lowerSearch)) return 1;
    if (lowerVal.includes(lowerSearch)) return 2;
    return 3;
  };

  const compareUsersByPriority = (a: User, b: User): number => {
    for (const field of matchFields) {
      const aPriority = getMatchPriority(a[field], searchTerm);
      const bPriority = getMatchPriority(b[field], searchTerm);

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }
    }
    return 0; // They're equally relevant
  };

  const filteredUsers = allUser
    ?.filter((user) =>
      matchFields.some((field) =>
        user[field]?.toLowerCase()?.includes(searchTerm.toLowerCase())
      )
    )
    .sort(compareUsersByPriority);

  const handleDropdownSelect = (user: User) => {
    handleSelect?.(user);
    setSearchTerm(`${user.empID}`);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickInsideParent = (event: MouseEvent) => {
      const clickedInsideParent = parentRef.current?.contains(
        event.target as Node
      );
      const clickedInsideInput = inputRef.current?.contains(
        event.target as Node
      );
      if (clickedInsideParent && !clickedInsideInput) {
        setShowDropdown(false); // Hide dropdown when clicking inside parent
      }
    };

    document.addEventListener("mousedown", handleClickInsideParent);
    return () =>
      document.removeEventListener("mousedown", handleClickInsideParent);
  }, [parentRef]);

  return (
    <div className="w-72" ref={inputRef}>
      <div className="flex">
        <input
          type="text"
          className="w-full p-2 font-semibold border border-[#DCE0E5] rounded-l-md outline-none bg-white"
          placeholder="Search EmpID / Name"
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
        <ul className="absolute z-10 w-72 bg-white p-1 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
          {filteredUsers?.map((user, idx) => (
            <li
              key={idx}
              onClick={() => handleDropdownSelect(user)}
              className="px-4 py-2 cursor-pointer hover:bg-[#f3f4f6]"
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
