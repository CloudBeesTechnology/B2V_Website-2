'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const pathList = [
  "/signIn",
  "/signUp",
  "/emailVerify",
  "/emailOtp",
  "/passwordSet",
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isAuthPage = pathList.includes(pathname);
  let IsSignedIn = null;
  if (typeof window !== "undefined") {
    IsSignedIn = localStorage.getItem("SignIn");
  }
  // IsSignedIn=localStorage.getItem("signIN")

  return isAuthPage  ? (
    <main >{children}</main>
  ) : IsSignedIn && (
    <section className="flex h-screen">
      <div className="w-64 fixed top-0 left-0 h-screen overflow-hidden shadow-[3px_0px_13px_rgba(128,128,128,0.4)]">
        <Sidebar />
      </div>
      <div className="fixed top-0 h-screen ml-64 w-[calc(100%-16rem)] bg-[#F5F5F5] overflow-auto">
        <div className="w-full h-20 sticky top-0">
          <Navbar />
        </div>
        <main className="px-10">{children}</main>
      </div>
    </section>
  );
}
