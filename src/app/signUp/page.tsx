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
    let empID: string | null = null;
    let intID: string | null = null;
    // let registeredRole: string | null = null;

    // Step 1: Check in employeeDetails
    const employeeQuery = query(
      collection(db, "employeeDetails"),
      where("email", "==", data.email)
    );
    const employeeSnapshot = await getDocs(employeeQuery);

    if (!employeeSnapshot.empty) {
      const employeeData = employeeSnapshot.docs[0].data();
      empID = employeeData.empID;
      // registeredRole = employeeData.role;
    } else {
      // Step 2: If not found, check in Internship
      const internQuery = query(
        collection(db, "Internship"),
        where("email", "==", data.email)
      );
      const internSnapshot = await getDocs(internQuery);

      if (!internSnapshot.empty) {
        const internData = internSnapshot.docs[0].data();
        intID = internData.intID;
        // registeredRole = internData.role;
      }
    }

    // Step 3: If no match found in either collection
    if (!empID && !intID) {
      alert("This email is not registered in employeeDetails or Internship.");
      return;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    // Step 6: Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Step 7: Store user in 'users' collection
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      empID: empID || null,
      intID: intID || null,
      email: data.email,
      password: hashedPassword,
      // role: registeredRole,
      status: "Pending",
      createdAt: new Date().toISOString(),
    });

    // Step 8: Send email verification
    await sendEmailVerification(user);
    alert("Verification email sent! Please check your inbox.");

    // Step 9: Redirect to signIn page
    router.push("/signIn");

  }  catch (error: any) {
  if (error.code === "auth/email-already-in-use") {
    alert("Email is already registered. Please sign in instead.");
  } else {
    console.error("Sign-up error:", error.message);
    alert(error.message);
  }
}
}


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
