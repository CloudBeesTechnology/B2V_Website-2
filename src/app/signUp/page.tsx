"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "@/validation/Schema"; // Adjust path if needed
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import signUpImg from "../../../public/assets/sign/signUpImg.png";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: any) => {
    try {
      let empID = null;
      let intID = null;

      // Step 1: Check in employeeDetails
      const employeeQuery = query(
        collection(db, "employeeDetails"),
        where("email", "==", data.email)
      );
      const employeeSnapshot = await getDocs(employeeQuery);

      if (!employeeSnapshot.empty) {
        empID = employeeSnapshot.docs[0].data().empID;
      } else {
        // Step 2: If not found, check in Internship
        const internQuery = query(
          collection(db, "Internship"),
          where("email", "==", data.email)
        );
        const internSnapshot = await getDocs(internQuery);

        if (!internSnapshot.empty) {
          intID = internSnapshot.docs[0].data().intID;
        }
      }

      // Step 3: If no match found in either
      if (!empID) {
        alert("This email is not registered in employeeDetails or Internship.");
        return;
      }

      // Step 4: Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Step 5: Hash password
      const hashedPassword = await bcrypt.hash(data.password, 10);

      // Step 6: Store user in 'users' collection
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        empID: empID,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        status: "Pending",
        createdAt: new Date().toISOString(),
      });

      // Step 7: Send email verification
      await sendEmailVerification(user);
      alert("Verification email sent! Please check your inbox.");

      // Step 8: Redirect to signIn page
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
// import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"; // <-- ADD sendEmailVerification
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

//       // Step 2: Get empID from employeeDetails
//       const employeeDoc = querySnapshot.docs[0];
//       const { empID } = employeeDoc.data();

//       // Step 3: Create user in Firebase Auth
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         data.email,
//         data.password
//       );
//       const user = userCredential.user;

//       // Step 4: Hash password
//       const hashedPassword = await bcrypt.hash(data.password, 10);

//       // Step 5: Store user in 'users' collection
//       await setDoc(doc(db, "users", user.uid), {
//         uid: user.uid,
//         empID: empID,
//         email: data.email,
//         password: hashedPassword,
//         role: data.role,
//         status: "Pending",
//         createdAt: new Date().toISOString(),
//       });

//       // Step 6: Send email verification
//       await sendEmailVerification(user);
//       alert("Verification email sent! Please check your inbox.");

//       // Step 7: Redirect to signIn page
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
//         {/* Email Field */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Email Address</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaEnvelope className="text-primary mr-2" />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               {...register("email")}
//               className="w-full focus:outline-none text-lg bg-transparent"
//             />
//           </div>
//           <p className="text-red-500 text-[16px] mt-1">{errors.email?.message}</p>
//         </div>

//         {/* Role Field */}
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
//               <option value="Lead">Lead</option>
//               <option value="Manager">Manager</option>
//               <option value="Intern">Intern</option>
//             </select>
//           </div>
//           <p className="text-red-500 text-[16px] mt-1">{errors.role?.message}</p>
//         </div>

//         {/* Password Field */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Your Password</label>
//           <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
//             <FaLock className="text-primary mr-2" />
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               {...register("password")}
//               className="w-full focus:outline-none text-lg bg-transparent"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="text-primary focus:outline-none"
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </button>
//           </div>
//           <p className="text-red-500 text-[16px] mt-1">{errors.password?.message}</p>
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10 "
//         >
//           SIGN UP
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }

