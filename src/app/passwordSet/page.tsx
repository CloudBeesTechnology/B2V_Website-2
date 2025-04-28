"use client";
import { FaLock } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import passwordImg from "../../../public/assets/sign/passwordImg.png";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getAuth, updatePassword } from "firebase/auth";
import * as Yup from "yup";

const PasswordSchema = Yup.object().shape({
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function PasswordSet() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PasswordSchema),
  });

  const onSubmit = async (data: { password: string; confirmPassword: string }) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return alert("No email available");

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return alert("No user logged in");
    }

    try {
      await updatePassword(user, data.password); 
      alert("Password has been updated successfully");
      router.push("/signIn"); 
    } catch (error: any) {
      alert("Failed to update password: " + error.message);
    }
  };

  return (
    <AuthLayout
      title="Set Password"
      subtitle="Please kindly set your new password"
      linkHref="/emailOtp"
      backHref="Back"
      image={passwordImg}
    >
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text_size_10 mb-1 text-gray">New Password</label>
          <div className={`flex items-center border gap-5 rounded-md px-3 py-3 bg-[#F9FBFD] ${errors.password ? "border-red-500" : "border-primary"}`}>
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              className="w-full focus:outline-none text-[14px] bg-transparent"
              {...register("password")}
            />
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block text_size_10 mb-1 text-gray">Re-enter Password</label>
          <div className={`flex items-center border gap-5 rounded-md px-3 py-3 bg-[#F9FBFD] ${errors.confirmPassword ? "border-red-500" : "border-primary"}`}>
            <FaLock className="text-primary mr-2" />
            <input
              type="password"
              className="w-full focus:outline-none text-[14px] bg-transparent"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md mt-10">
          SUBMIT
        </button>
      </form>
    </AuthLayout>
  );
}


// "use client";
// import { FaLock } from "react-icons/fa";
// import AuthLayout from "@/components/AuthLayout";
// import passwordImg from "../../assets/sign/passwordImg.png";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { PasswordSchema } from "@/validation/Schema"; 


// export default function PasswordSet() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(PasswordSchema),
//   });

//   const onSubmit = (data: { password: string; confirmPassword: string }) => {
//     console.log("New password:", data.password);
//     router.push("/signIn");
//   };

//   return (
//     <AuthLayout
//       title="Set Password"
//       subtitle="Please kindly set your new password"
//       linkHref="/emailOtp"
//       backHref="Back"
//       image={passwordImg}
//     >
//       <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
//         {/* New Password */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">New Password</label>
//           <div
//             className={`flex items-center border gap-5 rounded-md px-3 py-3 bg-[#F9FBFD] ${
//               errors.password ? "border-red-500" : "border-primary"
//             }`}
//           >
//             <FaLock className="text-primary mr-2" />
//             <input
//               type="password"
//               className="w-full focus:outline-none text-[14px] bg-transparent"
//               {...register("password")}
//             />
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Re-enter Password</label>
//           <div
//             className={`flex items-center border gap-5 rounded-md px-3 py-3 bg-[#F9FBFD] ${
//               errors.confirmPassword ? "border-red-500" : "border-primary"
//             }`}
//           >
//             <FaLock className="text-primary mr-2" />
//             <input
//               type="password"
//               className="w-full focus:outline-none text-[14px] bg-transparent"
//               {...register("confirmPassword")}
//             />
//           </div>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-xs mt-1">
//               {errors.confirmPassword.message}
//             </p>
//           )}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md mt-10"
//         >
//           SUBMIT
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }

