const EmpBasicDetails:React.FC=()=>{
    return (
        <section className="flex justify-around items-center border-l-6 border-l-primary text_size_4 bg-white p-6 border-y border-[#E4E4E4] border-r">
        <div className="center flex-col gap-4">
          <p className="text-gray">Date of Joining</p>
          <p className="text-[#303030]">12/02/2023</p>
        </div>
        <div className="center flex-col gap-4">
          <p className="text-gray">Department</p>
          <p className="text-[#303030]">Developer</p>
        </div>
        <div className="center flex-col gap-4">
          <p className="text-gray">Location</p>
          <p className="text-[#303030]">Puducherry</p>
        </div>
        <div className="center flex-col gap-4">
          <p className="text-gray">Manager Assign</p>
          <p className="text-[#303030]">Tech Lead</p>
        </div>
      </section>
    )
}
export default EmpBasicDetails;