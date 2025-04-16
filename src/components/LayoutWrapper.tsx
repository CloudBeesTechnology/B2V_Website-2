'use client';

import { usePathname, useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';

const pathList = [
  "/signIn",
  "/signUp",
  "/emailVerify",
  "/emailOtp",
  "/passwordSet",
];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router=useRouter()

  const isAuthPage = pathList.includes(pathname);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const signInStatus = localStorage.getItem('SignIn');
      setIsSignedIn(!!signInStatus);

      // If not signed in and not already on an auth page, redirect
      if (!signInStatus && !isAuthPage) {
        router.replace('/signIn');
      }
    }
  }, [pathname]);
  if (isSignedIn === null && !isAuthPage) return null;

  return isAuthPage  ? (
    <main >{children}</main>
  ) : isSignedIn && (
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
