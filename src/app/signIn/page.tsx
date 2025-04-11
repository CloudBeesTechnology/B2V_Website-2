"use client";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import signImg from "../../assets/sign/signInImg.png";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig"; // adjust if path is different

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Step 1: Firebase sign in
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Firestore query for user info
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("No user found with this email in the database.");
        return;
      }

      const userData = querySnapshot.docs[0].data();

      // Step 3: Check status
      if (userData.status !== "Active") {
        alert("Oops! You Don’t Have Access . Please Reach Out to Your Administrator.");
        return;
      }

      // Step 4: Check role and navigate
      if (userData.role === "Admin") {
        router.push("/");
      } else if (userData.role === "Employee") {
        router.push("/emailVerif");
      } else {
        alert("Invalid user role.");
      }

    } catch (error: any) {
      console.error("Sign in error:", error.message);
      alert("Sign in failed. Please check your email and password.");
    }
  };

  return (
    <AuthLayout
      title="SIGN IN"
      subtitle="Welcome back! Please enter your details"
      linkText="Don't have an account?"
      linkHref="/signUp"
      linkName="Sign Up"
      image={signImg}
    >
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full focus:outline-none text-[14px] h-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text_size_10 mb-1 text-gray">Your Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full focus:outline-none text-[14px]"
              required
            />
          </div>
          <Link
            href="/emailVerify"
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

// "use client"
// import { useState } from "react";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import Link from "next/link";
// import AuthLayout from "@/components/AuthLayout";
// import signImg from "../../assets/sign/signInImg.png";
// import { useRouter } from "next/navigation"; 

// export default function SignIn() {
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");

//   const router = useRouter();
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault(); // prevent page reload

//     console.log("Form Data:", {
//       email,
//       role,
//       password,
//     });

//     router.push("/");
//   };

//   return (
//     <AuthLayout
//       title="SIGN IN"
//       subtitle="Welcome back! Please enter your details"
//       linkText="Don’t have an account?"
//       linkHref="/signUp"
//       linkName="Sign Up"
//       image={signImg}
//     >
//       <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text_size_10 mb-1 text-gray ">Email Address</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaEnvelope className="text-primary mr-2" />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full focus:outline-none text-[14px] h-full"
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
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full focus:outline-none text-[14px]"
//             />
//           </div>
//           <Link
//             href="/emailVerify"
//             className="text_size_5 font-semibold text-primary float-right mt-3"
//           >
//             Forgot password?
//           </Link>
//         </div>

//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
//         >
//           SIGN IN
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }