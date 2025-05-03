"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignInSchema } from "@/validation/Schema";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import signImg from "../../../public/assets/sign/signInImg.png";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { useState } from "react";

type SignInFormValues = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: yupResolver(SignInSchema),
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
  
      const q = query(collection(db, "users"), where("email", "==", data.email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        alert("No user found with this email in the database.");
        return;
      }
  
      const userData = querySnapshot.docs[0].data();
  
      if (userData.status !== "Active") {
        alert("Oops! You Don’t Have Access. Please Reach Out to Your Administrator.");
        return;
      }
  
      // ✅ Store basic user info in localStorage
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userRole", userData.role);
      localStorage.setItem("userStatus", userData.status);
      localStorage.setItem("SignIn", JSON.stringify(true));
  
      // Ensure empID is available before querying employeeDetails
      if (!userData.empID) {
        alert("Employee ID not found for this user.");
        return;
      }
  
      // Query employeeDetails collection by empID
      const empQ = query(
        collection(db, "employeeDetails"),
        where("empID", "==", userData.empID)
      );
      const empQuerySnapshot = await getDocs(empQ);
  
      if (empQuerySnapshot.empty) {
        alert("No employee details found for this user.");
        return;
      }
  
      const employeeData = empQuerySnapshot.docs[0].data();
  
      // ✅ Store employee name and empID in localStorage
      localStorage.setItem("employeeName", employeeData.name);
      localStorage.setItem("empID", employeeData.empID);
  
      // Redirect based on user role
        router.push("/");
    
    } catch (error: any) {
      console.error("Sign in error:", error.message);
      alert("Sign in failed. Please check your email and password.");
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full focus:outline-none text-lg h-full"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[14px] mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text_size_10 mb-1 text-gray">Your Password</label>
          <div className="flex items-center border gap-5 border-primary rounded-md px-3 py-3 bg-[#F9FBFD]">
            <FaLock className="text-primary mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full focus:outline-none text-lg"
            />
             <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="text-primary focus:outline-none"
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash/>}
                        </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[14px] mt-1">{errors.password.message}</p>
          )}
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
