"use client";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

const CredentialReq: React.FC = () => {
  const router = useRouter();

  const credentials = [
    { email: "raindrop@gmail.com", role: "Admin", status: "Pending" },
    { email: "raindrop@gmail.com", role: "Admin", status: "Pending" },
    { email: "raindrop@gmail.com", role: "Admin", status: "Pending" },
  ];

  return (
    <section>
      <header className="flex justify-start items-center text-[22px] text-gray gap-10 m-10">
        <IoArrowBack onClick={() => router.back()} className="cursor-pointer" />
        <h3>Leave History</h3>
      </header>

      <div className="center">
        <table className="table-fixed w-full max-w-[1500px]">
          <thead>
            <tr className="text-center text-white bg-primary">
              <th className="rounded-tl-md py-3">S.No</th>
              <th className="py-3">Email Id</th>
              <th className="py-3">Roles</th>
              <th className="rounded-tr-md py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {credentials.map((cred, index) => (
              <tr
                key={index}
                className="text-center text-gray border-b border-[#D2D2D240] bg-white"
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3">{cred.email}</td>
                <td className="py-3">{cred.role}</td>
                <td className="py-3">{cred.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default CredentialReq;
