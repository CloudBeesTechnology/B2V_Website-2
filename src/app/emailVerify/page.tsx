"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaEnvelope } from "react-icons/fa";
import AuthLayout from "@/components/AuthLayout";
import emailImg from "../../../public/assets/sign/emailImg.png";
import { useRouter } from "next/navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "@/lib/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function EmailVerify() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmailSchema),
  });

  const onSubmit = async (data: { email: string }) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", data.email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("Email not found in our system");
      }

      await sendPasswordResetEmail(auth, data.email);

      alert("Password reset link sent! Please check your email.");
      router.push("/signIn");
    } catch (error: any) {
      console.error("Error sending password reset email:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <AuthLayout
      title="Enter your Email Address"
      subtitle="We will send a password reset link to your email"
      linkHref="/signIn"
      backHref="Back"
      image={emailImg}
    >
      <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <div>
          <label className="block text_size_10 mb-1 text-gray">Email Address</label>
          <div className={`flex items-center border gap-5 rounded-md px-3 py-3 bg-[#F9FBFD] ${errors.email ? "border-red-500" : "border-primary"}`}>
            <FaEnvelope className="text-primary mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full focus:outline-none text-lg bg-transparent"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-[16px] mt-1">{errors.email.message}</p>
          )}
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


// "use client";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { FaEnvelope } from "react-icons/fa";
// import AuthLayout from "@/components/AuthLayout";
// import emailImg from "../../../public/assets/sign/emailImg.png";
// import { useRouter } from "next/navigation";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { auth, db, RecaptchaVerifier } from "@/lib/firebaseConfig";
// import { signInWithPhoneNumber } from "firebase/auth";
// import { useEffect } from "react";

// // Fix for TypeScript: declare window custom properties
// declare global {
//   interface Window {
//     recaptchaVerifier: RecaptchaVerifier;
//     confirmationResult: any;
//   }
// }

// const EmailSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email address")
//     .required("Email is required"),
// });

// export default function EmailVerify() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(EmailSchema),
//   });

//   const setupRecaptcha = () => {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         auth,
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response: any) => {
//             console.log("reCAPTCHA solved:", response);
//           },
//           "expired-callback": () => {
//             console.warn("reCAPTCHA expired. Please try again.");
//           },
//         }
//       );
//     }
//     return window.recaptchaVerifier;
//   };

//   const onSubmit = async (data: { email: string }) => {
//     try {
//       const q = query(collection(db, "users"), where("email", "==", data.email));
//       const querySnapshot = await getDocs(q);
  
//       if (querySnapshot.empty) throw new Error("Email not found");
  
//       const userData = querySnapshot.docs[0].data();
//       let phoneNumber = userData.number;
  
//       if (!phoneNumber) throw new Error("Phone number not available");
  
//       // ✅ Clean & format the phone number
//       phoneNumber = phoneNumber.toString().replace(/\s+/g, ""); // remove spaces
//       if (!phoneNumber.startsWith("+")) {
//         phoneNumber = "+91" + phoneNumber; // use your country code
//       }
  
//       console.log("Formatted Phone:", phoneNumber);
  
//       const appVerifier = setupRecaptcha();
//       const confirmation = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
//       window.confirmationResult = confirmation;
  
//       console.log("OTP sent to:", phoneNumber);
//       router.push("/verifyOtp");
//     } catch (error: any) {
//       alert(error.message);
//       console.error("Error sending OTP:", error);
//     }
//   };
  
//   return (
//     <AuthLayout
//       title="Enter your Email Address"
//       subtitle="We will send an OTP to your phone number"
//       linkHref="/signIn"
//       backHref="Back"
//       image={emailImg}
//     >
//       <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit(onSubmit)}>
//         {/* Email Input */}
//         <div>
//           <label className="block text_size_10 mb-1 text-gray">Email Address</label>
//           <div className={`flex items-center border gap-5 rounded-md px-3 py-3 bg-[#F9FBFD] ${errors.email ? "border-red-500" : "border-primary"}`}>
//             <FaEnvelope className="text-primary mr-2" />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full focus:outline-none text-lg bg-transparent"
//               {...register("email")}
//             />
//           </div>
//           {errors.email && (
//             <p className="text-red-500 text-[16px] mt-1">{errors.email.message}</p>
//           )}
//         </div>

//         {/* reCAPTCHA container */}
//         <div id="recaptcha-container"></div>

//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
//         >
//           SEND OTP
//         </button>
//       </form>
//     </AuthLayout>
//   );
// }
