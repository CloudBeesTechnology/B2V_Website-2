"use client"
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import signImg from "../../assets/sign/signInImg.png";
import { useRouter } from "next/navigation"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload

    console.log("Form Data:", {
      email,
      role,
      password,
    });

    router.push("/");
  };

  return (
    <AuthLayout
      title="SIGN IN"
      subtitle="Welcome back! Please enter your details"
      linkText="Don’t have an account?"
      linkHref="/signUp"
      linkName="Sign Up"
      image={signImg}
    >
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 hover:border-2">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full focus:outline-none text-[14px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text_size_10 mb-1 text-gray">Select Type</label>
          <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 hover:border-2">
            <FaUser className="text-primary mr-2" />
            <select
              className="w-full focus:outline-none bg-transparent text-[14px]"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text_size_10 mb-1 text-gray">Your Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 hover:border-2">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full focus:outline-none text-[14px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            href="/forgot-password"
            className="text_size_5 font-semibold text-primary float-right mt-3"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
        >
          SIGN IN
        </button>
      </form>
    </AuthLayout>
  );
}



// import Image from "next/image";
// import Link from "next/link";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import signImg from "../../assets/sign/signInImg.png";
// import logo from "../../assets/logo/logo.png";

// export default function SignIn() {
//   return (
//     <div className="flex min-h-screen">
//       {/* Left Side Image & Text */}
//       <div className="hidden lg:flex w-1/2 bg-blue-50 justify-center items-center ">
//         <div className="text-center">
//           <Image src={signImg} alt="Sign illustration" className="mx-auto w-2/3" />
//           <p className="mt-4 text_size_10 flex justify-evenly">
//           Don’t have Account{" "}
//             <Link href="/signUp" className="text-primary font-semibold">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>

//       <div className="w-full lg:w-1/2 flex flex-col justify-evenly items-center px-6 py-12 ">
//         <div className="text-center mb-6 ">
//           <Image src={logo} alt="Logo" className="mx-auto w-36 mb-4" />
//           <h2 className="text_size_9 text-gray">SIGN IN</h2>
//           <p className="text_size_10 mt-3 text-medium_gray">Welcome back! Please enter your details</p>
//         </div>

//         <form className="w-full max-w-md space-y-4 ">
//           <div>
//             <label className="block text_size_10 mb-1 text-gray">Email Address</label>
//             <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 hover:border-2">
//               <FaEnvelope className="text-primary mr-2" />
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full focus:outline-none text-[14px]"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text_size_10 mb-1 text-gray">Select Type</label>
//             <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 hover:border-2">
//               <FaUser className="text-primary mr-2" />
//               <select className="w-full focus:outline-none bg-transparent text-[14px]">
//                 <option>Select role</option>
//                 <option>Admin</option>
//                 <option>User</option>
//               </select>
//             </div>
//           </div>

//           <div>
//             <label className="block text_size_10 mb-1 text-gray">Your Password</label>
//             <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 hover:border-2">
//               <FaLock className="text-primary mr-2" />
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 className="w-full focus:outline-none text-[14px]"
//               />
//             </div>
//             <Link href="/forgot-password" className="text_size_5 font-semibold text-primary float-right mt-3">
//               Forgot password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md  my-10"
//           >
//             SIGN IN
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
