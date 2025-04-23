"use client"

type EmpData = {
  doj: string;
  department: string;
  manager: string;

  // add other fields if needed
};
type EmpBasicDetailsProps = {
  data: EmpData; // or data: any for maximum flexibility
};

const EmpBasicDetails: React.FC<EmpBasicDetailsProps> = ({ data }) => {


  
    return (
        <section className="flex justify-around items-center border-l-6 border-l-primary text_size_4 bg-white p-6 border-y border-[#E4E4E4] border-r">
        <div className="center flex-col gap-4">
          <p className="text-gray">Date of Joining</p>
          <p className="text-[#303030] text-start w-full">{data?.doj}</p>
        </div>
        <div className="center flex-col gap-4">
          <p className="text-gray">Department</p>
          <p className="text-[#303030] text-start w-full">{data?.department}</p>
        </div>

        <div className="center flex-col gap-4">
          <p className="text-gray">Manager Assign</p>
          <p className="text-[#303030] text-start w-full">{data?.manager}</p>
        </div>
      </section>
    )
}
export default EmpBasicDetails;