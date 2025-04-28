// "use client"
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import logo from "../../public/assets/logo/logo.png";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  linkText?: string;
  linkHref?: string;
  backHref?: string;
  linkName?: string;
  image: StaticImageData;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
  linkText,
  linkHref,
  image,
  backHref,
  linkName,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side Image & Text */}
      <div className="hidden lg:flex w-1/2 bg-blue-50 justify-center items-center">
        <div className="text-center">
          <Image
            src={image}
            priority
            alt="Sign illustration"
            className="mx-auto w-2/3"
          />
          {linkText && linkHref && linkName && (
            <p className="mt-4 text_size_10 flex justify-evenly text-medium_gray">
              {linkText}{" "}
              <Link href={linkHref} className="text-primary font-semibold ml-1">
                {linkName}
              </Link>
            </p>
          )}

          {backHref && linkHref && (
            <p className="mt-4 text_size_10 flex items-center justify-start gap-3 px-20">
              <MdOutlineKeyboardArrowLeft className="text-[24px] text-medium_gray font-extralight" />
              <Link
                href={linkHref}
                className="text-medium_gray font-semibold ml-1"
              >
                {backHref}
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full  lg:w-1/2 flex flex-col bg-white justify-center items-center px-6 py-12">
        <div className="text-center mb-24">
          <Image src={logo} priority alt="Logo" className="mx-auto w-36 mb-4" />
          <h2 className="text_size_9 text-gray">{title}</h2>
          <p className="text_size_10 mt-3 text-medium_gray">{subtitle}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
