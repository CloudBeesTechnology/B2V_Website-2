'use client';
import AuthLayout from "@/components/AuthLayout";
import emailImg from "../../../public/assets/sign/emailImg.png";
import { useState } from 'react';
import { useRouter } from "next/navigation"; 

export default function EmailOtp() {
  const [codes, setCodes] = useState(Array(6).fill(''));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return; // Only allow digits

    const newCodes = [...codes];
    newCodes[index] = val.slice(0, 1); // Only one digit per input
    setCodes(newCodes);

    if (val && index < codes.length - 1) {
      const next = document.getElementById(`code-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      const prev = document.getElementById(`code-${index - 1}`);
      prev?.focus();
    }
  };

  const router = useRouter();
  const handleSubmit = () => {
    const enteredCode = codes.join('');
    console.log("Entered OTP:", enteredCode);
    // alert(`Code entered: ${enteredCode}`);
    router.push("/passwordSet");

  };

  return (
    <AuthLayout
      title="Enter your OTP"
      subtitle="Enter the verification code we sent to b2*****@gmail.com"
      linkHref="/emailVerify"
      backHref="Back"
      image={emailImg}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="text-medium_gray mb-2 text_size_10">Enter code</div>

        <div className="flex flex-col">
         <div className="space-x-3 mb-3">
         {codes.map((value, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 border-2 border-primary rounded text-center text-lg focus:outline-none "
            />
          ))}
         </div>
         <div className="mb-5 text-end">
          <button
            onClick={() => alert('Resend code')}
            className="text-primary text-sm underline cursor-pointer"
          >
            Re-send
          </button>
        </div>
        </div>

        

        <button
          onClick={handleSubmit}
          type="button"
          className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
        >
          VERIFY
        </button>
      </div>
    </AuthLayout>
  );
}

// 'use client';
// import AuthLayout from "@/components/AuthLayout";
// import emailImg from "../../assets/sign/emailImg.png";

// import { useState } from 'react';
// export default function EmailOtp() {
//     const [codes, setCodes] = useState(Array(5).fill(''));

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const newCodes = [...codes];
//     newCodes[index] = e.target.value.slice(0, 1); // Only allow one digit
//     setCodes(newCodes);

//     // Auto-focus next input
//     if (e.target.value && index < 4) {
//       const next = document.getElementById(`code-${index + 1}`);
//       next?.focus();
//     }
//   };

//   const handleSubmit = () => {
//     alert(`Code entered: ${codes.join('')}`);
//   };
//   return (
//     <AuthLayout
//       title="Enter your OTP"
//       subtitle="Enter the verification code we  sent to b2*****@gmail.com"
//       linkHref="/signUp"
//       backHref="Back"
//       image={emailImg}
//     >
//       <div className="flex flex-col items-center justify-center  bg-white">
//       <div className="text-gray-700 mb-2 text-sm font-medium">Enter code</div>
//       <div className="flex flex-col  ">
//        <div className="space-x-3 mb-3">
//        {codes.map((value, index) => (
//           <input
//             key={index}
//             id={`code-${index}`}
//             type="text"
//             maxLength={1}
//             value={value}
//             onChange={(e) => handleChange(e, index)}
//             className="w-12 h-12 border-2 border-primary rounded text-center text-lg focus:outline-none"
//           />
//         ))}
//        </div>
//         <div className="mb-5 text-end">
//         <button
//           onClick={() => alert('Resend code')}
//           className="text-primary text-sm underline "
//         >
//           Re-send
//         </button>
//       </div>
//       </div>
      
//         <button
//           type="submit"
//           className="w-full text_size_10 font-bold bg-primary text-white py-3 rounded-md my-10"
//         >
//           VERIFY
//         </button>
//       </div>
//     </AuthLayout>
//   );
// }