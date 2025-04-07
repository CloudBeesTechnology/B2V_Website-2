import { FaEnvelope } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import emailImg from "../../assets/sign/emailImg.png";

export default function EmailVerify() {
  return (
    <AuthLayout
      title="Enter your Email Address"
      subtitle="A verification code will be sent to your registered email ID."
      linkHref="/signUp"
      backHref="Back"
      image={emailImg}
    >
      <form className="w-full max-w-md space-y-4">
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full focus:outline-none text-[14px]"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
        >
          VERIFY
        </button>
      </form>
    </AuthLayout>
  );
}