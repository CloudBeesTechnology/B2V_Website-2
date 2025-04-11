import Link from "next/link";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaCircleChevronDown } from "react-icons/fa6";
import { TableFormate } from "@/components/TableFormate";

export default function LeaveApproval() {
  const Heading=[
    "Name(s)",
    "Duration(s)",
    "Start Date",
    "End Date",
    "Type",
    "Reason(s)",
    "Actions"
  ]
  const LA=[
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
    {
name:"hema",
duration:"2",
startDate:"29-03-2025",
endDate:"30-03-2025",
type:"sick",
reason:"vomiting",
action:"pending"

  },
]
  return (
    <div className="py-14">
      <h1 className="text-[22px] font-normal text-gray flex items-center gap-3">
        <Link href="/leavemanagement" className="text-mediumlite_grey">
          <MdOutlineKeyboardBackspace />
        </Link>
        Leave Approval
      </h1>
      <div className="bg-white px-10 py-5 rounded-lg my-7">
        <article className="flex justify-between item-center">
          <h5 className="text-gray text_size_9">Leave Approval List</h5>
          <button className="text-lg font-bold text-white border px-5 py-2 bg-primary flex items-center gap-3 rounded-xl">
            Export
            <span>
              <FaCircleChevronDown />
            </span>
          </button>
        </article>
        <div className="mt-8">
          <TableFormate list="leaveApproval"  allEmp={[]} ovla={[]} heading={Heading} leaveApproval={LA}/>
        </div>
      </div>
    </div>
  );
}
