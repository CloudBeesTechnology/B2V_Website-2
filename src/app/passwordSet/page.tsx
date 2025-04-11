"use client"
import { FaLock } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import passwordImg from "../../assets/sign/passwordImg.png";
import { useRouter } from "next/navigation"; 

export default function PasswordSet() {
   const router = useRouter();
      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page reload  
        router.push("/signIn");
      };
  return (
    <AuthLayout
      title="Set Password"
      subtitle="Please kindly set your new password"
      linkHref="/emailOtp"
      backHref="Back"
      image={passwordImg}
    >
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text_size_10 mb-1 text-gray">New Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              className="w-full focus:outline-none text-[14px]"
            />
          </div>
        </div>
        <div>
          <label className="block text_size_10 mb-1 text-gray">Re-enter Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              className="w-full focus:outline-none text-[14px]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md mt-10"
        >
          SUBMIT
        </button>
      </form>
    </AuthLayout>
  );
}