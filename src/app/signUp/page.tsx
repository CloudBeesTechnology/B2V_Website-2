"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/validation/Schema"; // Update path if needed
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import signUpImg from "../../../public/assets/sign/signUpImg.png";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; // <-- ADD sendEmailVerification
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import bcrypt from "bcryptjs";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const onSubmit = async (data: any) => {
    try {
      // Step 1: Check if email exists in employeeDetails
      const q = query(
        collection(db, "employeeDetails"),
        where("email", "==", data.email)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("This email is not registered in employeeDetails.");
        return;
      }

      // Step 2: Get empID from employeeDetails
      const employeeDoc = querySnapshot.docs[0];
      const { empID } = employeeDoc.data();

      // Step 3: Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Step 4: Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Step 5: Store user in 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        empID: empID,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });

      // Step 6: Send email verification
      await sendEmailVerification(user);
      alert("Verification email sent! Please check your inbox.");

      // Step 7: Redirect to signIn page
      router.push("/signIn");
    } catch (error: any) {
      console.error("Sign-up error:", error.message);
      alert(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        {/* Email Field */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full focus:outline-none text-lg bg-transparent"
            />
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.email?.message}</p>
        </div>

        {/* Role Field */}
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
              <option value="Lead">Lead</option>
              <option value="Manager">Manager</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.role?.message}</p>
        </div>

        {/* Password Field */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Your Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full focus:outline-none text-lg bg-transparent"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-primary focus:outline-none"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          <p className="text-red-500 text-[16px] mt-1">{errors.password?.message}</p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10 "
        >
          SIGN UP
        </button>
      </form>
    </AuthLayout>
  );
}

// "use client";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { signUpSchema } from "@/validation/Schema"; // Update path if needed
// import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
// import AuthLayout from "@/components/AuthLayout";
// import signUpImg from "../../../public/assets/sign/signUpImg.png";
// import { useRouter } from "next/navigation";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
// import { auth, db } from "@/lib/firebaseConfig";
// import bcrypt from "bcryptjs";
// import { useState } from "react";

// export default function SignUp() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(signUpSchema) });

//   const onSubmit = async (data: any) => {
//     try {
//       // Step 1: Check if email exists in employeeDetails
//       const q = query(
//         collection(db, "employeeDetails"),
//         where("email", "==", data.email)
//       );
//       const querySnapshot = await getDocs(q);
  
//       if (querySnapshot.empty) {
//         alert("This email is not registered in employeeDetails.");
//         return;
//       }
  
//       // Step 2: Get empID from the result
//       const employeeDoc = querySnapshot.docs[0];
//       const { empID } = employeeDoc.data();
  
//       // Step 3: Create Firebase Auth user
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );
//       const user = userCredential.user;
//       const hashedPassword = await bcrypt.hash(data.password, 10);
  
//       // Step 4: Store in users collection
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         empID: empID,
//         email: data.email,
//         password: hashedPassword,
//         role: data.role,
//         status: "Pending",
//         createdAt: new Date().toISOString(),
//       });
  
//       router.push("/signIn");
//     } catch (error: any) {
//       console.error("Sign-up error:", error.message);
//       alert(error.message);
//     }
//   };
  
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <AuthLayout
//       title="Create New Account"
//       subtitle="Welcome back! Please enter your details"
//       linkText="Already have an account?"
//       linkHref="/signIn"
//       linkName="Sign in"
//       image={signUpImg}
//     >
//       <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-4">
//         {/* Email */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Email Address</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaEnvelope className="text-primary mr-2" />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               {...register("email")}
//               className="w-full focus:outline-none text-lg"
//             />
//           </div>
//           <p className="text-red-500 text-[16px] mt-1">{errors.email?.message}</p>
//         </div>
        
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Select Type</label>
//           <div className="flex items-center gap-5 border border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaUser className="text-primary mr-2" />
//             <select
//               {...register("role")}
//               className="w-full focus:outline-none bg-transparent text-lg"
//             >
//               <option value="">Select role</option>
//               <option value="Admin">Admin</option>
//               <option value="Employee">Employee</option>
//               <option value="Intern">Intern</option>
//             </select>
//           </div>
//           <p className="text-red-500 text-[16px] mt-1">{errors.role?.message}</p>
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Your Password</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaLock className="text-primary mr-2" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               {...register("password")}
//               className="w-full focus:outline-none text-lg"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="text-primary focus:outline-none"
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash/>}
//             </button>
//           </div>
//           <p className="text-red-500 text-[16px] mt-1">{errors.password?.message}</p>
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
