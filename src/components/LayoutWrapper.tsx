"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { EmployeeContextProvider } from "@/app/utils/EmpContext";
import { InternProvider } from "@/app/utils/InternContext";

const pathList = [
  "/signIn",
  "/signUp",
  "/emailVerify",
  "/emailOtp",
  "/passwordSet",
];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathList.includes(pathname);

  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const storedSignIn = localStorage.getItem("SignIn");
      const signedInStatus = !!storedSignIn;
      setIsSignedIn(signedInStatus);
      
      if (!signedInStatus && !isAuthPage) {
        // Clear any potential cached data
        localStorage.clear();
        sessionStorage.clear();
        
        // Redirect to login with no history
        router.replace("/signIn");
      }
    };

    // Check auth on initial load and when path changes
    checkAuth();

    // Also check auth when window gains focus (user comes back via back button)
    const handleFocus = () => {
      checkAuth();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [isAuthPage, router, pathname]);

  if (isAuthPage) {
    return <main>{children}</main>;
  }

  if (isSignedIn === null) {
    return null;
  }

  return isSignedIn ? (
    <section className="flex h-screen">
      <div className="w-64 fixed top-0 left-0 h-screen overflow-hidden shadow-[3px_0px_13px_rgba(128,128,128,0.4)]">
        <Sidebar />
      </div>
      <div className="fixed top-0 h-screen ml-64 w-[calc(100%-16rem)] bg-[#F5F5F5] overflow-auto">
        <div className="w-full h-20 sticky top-0 z-[9999]">
          <Navbar />
        </div>
        <main className="px-10">
          <EmployeeContextProvider>
            <InternProvider>{children}</InternProvider>
          </EmployeeContextProvider>
        </main>
      </div>
    </section>
  ) : null;
}

// 'use client';

// import { usePathname } from 'next/navigation';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';

// const pathList = [
//   "/signIn",
//   "/signUp",
//   "/emailVerify",
//   "/emailOtp",
//   "/passwordSet",
// ];

// export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   const isAuthPage = pathList.includes(pathname);

//   let IsSignedIn = null;
//   if (typeof window !== "undefined") {
//     IsSignedIn = localStorage.getItem("SignIn");
//   }

//   return isAuthPage  ? (
//     <main >{children}</main>
//   ) : IsSignedIn && (
//     <section className="flex h-screen">
//       <div className="w-64 fixed top-0 left-0 h-screen overflow-hidden shadow-[3px_0px_13px_rgba(128,128,128,0.4)]">
//         <Sidebar />
//       </div>
//       <div className="fixed top-0 h-screen ml-64 w-[calc(100%-16rem)] bg-[#F5F5F5] overflow-auto">
//         <div className="w-full h-20 sticky top-0">
//           <Navbar />
//         </div>
//         <main className="px-10">{children}</main>
//       </div>
//     </section>
//   );
// }
