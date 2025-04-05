import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import signImg from "../../assets/sign/signInImg.png";
import logo from "../../assets/logo/logo.png";
import Image from "next/image";

export default function SignIn () {
    return (
        <div className="flex min-h-screen border">
          <div className="hidden lg:flex w-1/2 bg-blue-50 justify-center items-center">
            <div className="text-center">
              <Image src={signImg} alt="Illustration" className="max-w-[65%] mx-auto" />
              <p className="mt-4 text-gray-600">Don’t have an account? <a href="#" className="text-blue-500 font-semibold">Sign up</a></p>
            </div>
          </div>
    
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6">
            <Image src={logo} alt="Logo" className="max-w-[25%] mb-4" />
            <h2 className="text-2xl font-semibold">SIGN IN</h2>
            <p className="text-gray-500 mb-6">Welcome back! Please enter your details</p>
    
            <form className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700">Email Address</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <FaEnvelope className="text-gray-400 mr-2" />
                  <input type="email" placeholder="Enter your email" className="w-full focus:outline-none" />
                </div>
              </div>
    
              <div className="mb-4">
                <label className="block text-gray-700">Select Type</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <FaUser className="text-gray-400 mr-2" />
                  <select className="w-full focus:outline-none">
                    <option>Select role</option>
                    <option>Admin</option>
                    <option>User</option>
                  </select>
                </div>
              </div>
    
             
              <div className="mb-4">
                <label className="block text-gray-700">Your Password</label>
                <div className="flex items-center border rounded-md px-3 py-2">
                  <FaLock className="text-gray-400 mr-2" />
                  <input type="password" placeholder="Enter your password" className="w-full focus:outline-none" />
                </div>
                <a href="#" className="text-sm text-blue-500 float-right mt-1">Forgot password?</a>
              </div>
    
              <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600">
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      );
}




