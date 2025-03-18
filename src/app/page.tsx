import Image from "next/image";
import cloudson from "../assets/CloudSun.png";
import group from "../assets/group.png";
import Award from "../assets/Award.png";
import goal from "../assets/goal.png";
import Ellipse from "../assets/Ellipse-23.png";
import Polygon from "../assets/Polygon.png";
export default function HomePage() {
  return (
    <main className="bg-[#F5F5F5] ">
      {/* <h1 className="text-2xl font-bold">Overview</h1>
      <p>Welcome to the Overview page.</p> */}
      <div className="flex justify-center h-screen w-full space-x-2">
        <div className=" w-2/3">
          <section className="flex w-full">
            <div className="bg-gradient-to-r from-[#FFD370] to-[#E16F7C] h-[100px] w-full flex ">
              <div className=" w-full  ">
                <div className="flex flex-col h-full items-center justify-center space-y-1 border-dotted border-r-1">
                  <Image src={cloudson} alt="logo" width={40} height={40} />
                  <p className="text-[#424242]">Partly cloudy</p>
                </div>
              </div>
              <div className=" w-full">
                <div className="flex flex-col h-full  justify-center space-y-1 pl-2 ">
                  <p className="text-[#424242]">21 September 20222</p>
                  <p className="text-[#424242] font-bold text-[28px] ">Today</p>
                </div>
              </div>
              <div className="w-full flex items-center justify-center relative">
                <div className="absolute bottom-9 left-4/7  transform -translate-x-1/2">
                  <Image src={group} alt="Group Icon" width={100} height={50} />
                </div>
                <p className=" bg-[#73877B] text-white text-xs px-2 mt-2 py-1 rounded-md shadow-md">
                  Present - On Time
                </p>
              </div>
              <div className=" w-full">
                <div className="flex flex-col h-full  justify-center space-y-1">
                  <p className="text-[#D9F0C5]">Entry Time</p>
                  <p className="text-[#D9F0C5] font-bold text-[28px] ">
                    10:11 AM
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="flex       h-[270px] w-full mt-5 space-x-2 ">
            <div className="w-full  h-full bg-white rounded-xl">
              <div className="flex justify-between p-4  border-b-1 border-[#F3F3F3]">
                <p className="text-[23px] font-semibold">Total Employee</p>
                <p>May, 2025</p>
              </div>
              <div className="flex justify-between  space-x-2 mt-5 px-5">
                <div className="flex flex-col items-center justify-center space-y-7 w-full">
                  <div className=" w-full ">
                    <div className="flex space-x-4">
                      <Image src={Award} alt="Award" width={30} height={30} />
                      <small className="">Male</small>
                    </div>
                    <p className="font-bold pl-11">150</p>
                  </div>
                  <div className=" w-full ">
                    <div className="flex space-x-4">
                      <Image src={goal} alt="goal" width={30} height={30} />
                      <small className="">Male</small>
                    </div>
                    <p className="font-bold pl-11">36</p>
                  </div>
                </div>

                <div className=" flex flex-col  w-full items-center justify-center">
                  <Image src={Ellipse} alt="Ellipse" width={100} height={30} />
                  {/* <Image src={Polygon} alt="Polygon" width={30} height={30} /> */}
                  <p className="font-bold">12K</p>
                  <p className="">Gender</p>
                </div>
              </div>
            </div>
            <div className="w-full border h-full"></div>
          </section>
        </div>
        <div className="border w-1/3"></div>
      </div>
    </main>
  );
}

// import Image from "next/image";
// import cloudson from "../assets/CloudSun.png";
// import group from "../assets/group.png";

// export default function HomePage() {
//   return (
//     <main className="h-screen flex justify-center p-4">
//       {/* Main Container */}
//       <div className="flex w-full max-w-6xl space-x-4">
//         {/* Left Section (2/3 Width) */}
//         <div className="w-2/3 border rounded-lg shadow-lg">
//           {/* Top Section with Gradient Background */}
//           <div className="bg-gradient-to-r from-orange-300 to-orange-800 h-28 w-full flex items-center px-4 rounded-t-lg">

//             {/* Weather Section */}
//             <div className="flex flex-col items-center justify-center w-1/4">
//               <Image src={cloudson} alt="Weather Icon" width={30} height={30} />
//               <p className="text-[#424242] text-sm">Partly Cloudy</p>
//             </div>

//             {/* Date Section */}
//             <div className="w-1/3">
//               <p className="text-[#424242] text-sm">21 September 2022</p>
//               <p className="text-[#424242] font-bold text-2xl">Today</p>
//             </div>

//             {/* Attendance Section */}
//             <div className="w-1/3 flex items-center justify-center relative">
//               <Image src={group} alt="Group Icon" width={66} height={50} />
//               <p className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-[#73877B] text-white text-xs px-3 py-1 rounded-md shadow-md">
//                 Present - On Time
//               </p>
//             </div>
//           </div>

//           {/* Additional Sections (if needed) */}
//           <div className="p-4">
//             {/* Add more content here */}
//           </div>
//         </div>

//         {/* Right Section (1/3 Width) */}
//         <div className="w-1/3 border rounded-lg shadow-lg">
//           {/* Additional right-side content */}
//         </div>
//       </div>
//     </main>
//   );
// }
