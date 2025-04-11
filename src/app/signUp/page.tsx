"use client";
import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import signUpImg from "../../assets/sign/signUpImg.png";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig"; // Update the path if needed
import bcrypt from "bcryptjs";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      //  Create user in Firebase Authentication (email + password stored securely)
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const hashedPassword = await bcrypt.hash(password, 10);
      // Store additional user data in Firestore (email, password, role)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        password: hashedPassword, 
        role: role,
        status:"Pending",
        createdAt: new Date().toISOString(),
      });

      console.log(" User created and data stored.");
      router.push("/signIn");

    } catch (error: any) {
      console.error(" Sign-up error:", error.message);
      alert(error.message);
    }
  };

  return (
    <AuthLayout
      title="Create New Account"
      subtitle="Welcome back! Please enter your details"
      linkText="Already have Account"
      linkHref="/signIn"
      linkName="Sign in"
      image={signUpImg}
    >
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
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

        {/* Role */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Select Type</label>
          <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
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

        {/* Password */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Your Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full focus:outline-none text-[14px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
        >
          SIGN UP
        </button>
      </form>
    </AuthLayout>
  );
}

// "use client"
// import { useState } from "react";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import AuthLayout from "@/components/AuthLayout";
// import signUpImg from "../../assets/sign/signUpImg.png";
// import { useRouter } from "next/navigation"; 

// export default function SignUp() {
//     const [email, setEmail] = useState("");
//     const [role, setRole] = useState("");
//     const [password, setPassword] = useState("");
  
//     const router = useRouter();
//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault(); // prevent page reload
  
//       console.log("Form Data:", {
//         email,
//         role,
//         password,
//       });
  
//       router.push("/signIn");
//     };

//   return (
//     <AuthLayout
//       title="Create New Account"
//       subtitle="Welcome back! Please enter your details"
//       linkText="Already have Account"
//       linkHref="/signIn"
//       linkName="Sign in"
//       image={signUpImg}
//     >
//      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Email Address</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaEnvelope className="text-primary mr-2" />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full focus:outline-none text-[14px]"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Select Type</label>
//           <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaUser className="text-primary mr-2" />
//             <select
//               className="w-full focus:outline-none bg-transparent text-[14px]"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="">Select role</option>
//               <option value="Admin">Admin</option>
//               <option value="User">User</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Your Password</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaLock className="text-primary mr-2" />
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full focus:outline-none text-[14px]"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
//         >
//           SIGN Up
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }