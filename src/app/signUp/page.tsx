"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/validation/Schema"; // Update path if needed
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import signUpImg from "../../assets/sign/signUpImg.png";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import bcrypt from "bcryptjs";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = async (data: any) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const hashedPassword = await bcrypt.hash(data.password, 10);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: data.email,
        number: data.number,
        password: hashedPassword,
        role: data.role,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });

      router.push("/signIn");
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      alert(error.message);
    }
  };

  return (
    <AuthLayout
      title="Create New Account"
      subtitle="Welcome back! Please enter your details"
      linkText="Already have an account?"
      linkHref="/signIn"
      linkName="Sign in"
      image={signUpImg}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
        {/* Email */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full focus:outline-none text-lg"
            />
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.email?.message}</p>
        </div>
        <div>
          <label className="block text_size_10 mb-1 text-gray">Phone Number</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="number"
              placeholder="Enter your Phone Number"
              {...register("number")}
              className="w-full focus:outline-none text-lg"
            />
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.number?.message}</p>
        </div>

        {/* Role */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Select Type</label>
          <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaUser className="text-primary mr-2" />
            <select
              {...register("role")}
              className="w-full focus:outline-none bg-transparent text-lg"
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Employee">Employee</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.role?.message}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Your Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full focus:outline-none text-lg"
            />
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.password?.message}</p>
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


// "use client";
// import { useState } from "react";
// import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
// import AuthLayout from "@/components/AuthLayout";
// import signUpImg from "../../assets/sign/signUpImg.png";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "@/lib/firebaseConfig"; // Update the path if needed
// import bcrypt from "bcryptjs";

// export default function SignUp() {
//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     try {
//       //  Create user in Firebase Authentication (email + password stored securely)
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       // Store additional user data in Firestore (email, password, role)
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         email: user.email,
//         password: hashedPassword, 
//         role: role,
//         status:"Pending",
//         createdAt: new Date().toISOString(),
//       });

//       console.log(" User created and data stored.");
//       router.push("/signIn");

//     } catch (error: any) {
//       console.error(" Sign-up error:", error.message);
//       alert(error.message);
//     }
//   };

//   return (
//     <AuthLayout
//       title="Create New Account"
//       subtitle="Welcome back! Please enter your details"
//       linkText="Already have Account"
//       linkHref="/signIn"
//       linkName="Sign in"
//       image={signUpImg}
//     >
//       <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
//         {/* Email */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Email Address</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaEnvelope className="text-primary mr-2" />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full focus:outline-none text-lg"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Role */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Select Type</label>
//           <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaUser className="text-primary mr-2" />
//             <select
//               className="w-full focus:outline-none bg-transparent text-lg"
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             >
//               <option value="">Select role</option>
//               <option value="Admin">Admin</option>
//               <option value="User">User</option>
//             </select>
//           </div>
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Your Password</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaLock className="text-primary mr-2" />
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full focus:outline-none text-lg"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
//         >
//           SIGN UP
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }