"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig"; // adjust based on your project
import { TableFormate } from "@/components/TableFormate";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { ViewEmpData } from "@/components/ViewEmpData";
import { FloatingActionButton } from "@/app/utils/FloatingActionButton";
import { MdOutlineDownloading } from "react-icons/md";
import DownloadTableToExcel from "@/app/utils/DownloadTableToExcel";
import { DateFormat } from "@/components/DateFormate";
import SearchBox from "@/app/utils/searchbox";

interface empDetailsObj {
  id?: string;
  empID?: string;
  [keys: string]: any;
}
export const EmpDetailsReportTable = () => {
  const router = useRouter();
  const Heading = [
    "EmpID",
    "Name",
    "Position",
    "Department",
    "Contact",
    "Email ID",
    "Date of join",
    "Date of Birth",
    "Gender",
    "Address",
    "Alternate No",
    "Religion",
    "Language",
    "Proof",
    "Total Leave",
    "Assign Manger",
    "Assign Lead",
    "Effective Date",
    "Degree",
    "Field of Study",
    "School",
    "Master Degree",
    "Field of Study",
    "High School",
    "Courses",
    "Experiences",
    "Father Name",
    "Mother Name",
    "Siblings",
    "Status",
    "Husband Name",
    "Wife Name",
    "Child",
    "Contact No",
    "Family Address",
    "ViewForm",
  ];

  const tableHeaders = [
    { header: "EmpID", key: "empID", width: 15 },
    { header: "Name", key: "name", width: 30 },
    { header: "Position", key: "position", width: 30 },
    { header: "Department", key: "department", width: 30 },
    { header: "Contact", key: "contact", width: 20 },
    { header: "Email ID", key: "email", width: 30 },
    { header: "Date of join", key: "doj", width: 15 },
    { header: "Date of Birth", key: "dob", width: 15 },
    { header: "Gender", key: "gender", width: 20 },
    { header: "Address", key: "address", width: 40 },
    { header: "Alternate No", key: "alternateNo", width: 15 },
    { header: "Religion", key: "religion", width: 15 },
    { header: "Language", key: "lang", width: 30 },
    { header: "Proof", key: "proof", width: 30 },
    { header: "Total Leave", key: "totalLeave", width: 15 },
    { header: "Assign Manger", key: "manager", width: 20 },
    { header: "Assign Lead", key: "leadEmpID", width: 20 },
    { header: "Effective Date", key: "effectiveDate", width: 15 },
    { header: "Degree", key: "degree", width: 30 },
    { header: "Field of Study", key: "study", width: 35 },
    { header: "School", key: "school", width: 35 },
    { header: "Master Degree", key: "master", width: 30 },
    { header: "Field of Study", key: "field", width: 30 },
    { header: "High School", key: "highSchool", width: 30 },
    { header: "Courses", key: "coursesData", width: 40 }, //check
    { header: "Experiences", key: "experiencesData", width: 40 }, //check
    { header: "Father Name", key: "father", width: 20 },
    { header: "Mother Name", key: "mother", width: 20 },
    { header: "Siblings", key: "siblings", width: 20 },
    { header: "Status", key: "personalStatus", width: 15 },
    { header: "Husband Name", key: "husbandName", width: 20 },
    { header: "Wife Name", key: "wifeName", width: 20 },
    { header: "Child", key: "child", width: 20 },
    { header: "Contact No", key: "familyPNo", width: 20 },
    { header: "Family Address", key: "familyAddress", width: 80 },
    // Exclude ViewForm from Excel export if it’s a button/UI-only
  ];
  const [allEmp, setAllEmp] = useState<Array<any> | any>([]);
  const [filteredAllEmp, setFilteredAllEmp] = useState<Array<any> | any>([]);
  const [empPopupData, setEmpPopupData] = useState<any | null>(null);
  const [showingPopUp, setShowingPopUp] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "employeeDetails"));
        const employeeList = querySnapshot.docs.map((doc) => ({
          empID: doc.id,
          ...doc.data(),
        }));

        setAllEmp(employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);
  const handleClose = () => {
    setShowingPopUp(!showingPopUp);
  };
  const handleViewData = (data: any) => {
    // console.log(data);
    setEmpPopupData(data);
    handleClose();
  };

  const alignAllEmp = async () => {
    const AddedTwoFieldsForDownload = allEmp?.map((val: any) => {
      const filledVal: any = {};
      for (const key in val) {
        if (Object.hasOwnProperty.call(val, key)) {
          const value = val[key];
          filledVal[key] =
            value === null ||
            value === undefined ||
            value === "" ||
            value === "N/A"
              ? "N/A"
              : value;
        }
      }

      const coursesData = val?.courses?.map((course: any, index: number) => {
        return `${index + 1}.) Course: ${course?.course || "N/A"} ,Academic: ${
          course?.academic || "N/A"
        }`;
      });
      const experiencesData = val?.experiences?.map(
        (exp: any, index: number) => {
          return `${index + 1}.) Company: ${exp?.company || "N/A"}, Department: ${
            exp?.dept || "N/A"
          }, Location: ${exp.location || "N/A"}, Manager: ${
            exp.manager || "N/A"
          }, Work: ${exp.work || "N/A"}, Year: ${exp.year || "N/A"}`;
        }
      );
      return {
        ...filledVal,
        doj: DateFormat(val?.doj) || "N/A",
        dob: DateFormat(val?.dob) || "N/A",
        effectiveDate: DateFormat(val?.effectiveDate) || "N/A",
        leadEmpID: val?.leadEmpID || "N/A",
        coursesData: `${[...coursesData]}`,
        experiencesData: `${[...experiencesData]}`,
      };
    });

    await DownloadTableToExcel(
      AddedTwoFieldsForDownload ?? [],
      "All Employee Details",
      tableHeaders
    );
  };

  const handleFilter = (filteredData: empDetailsObj | any) => {
    if (Array.isArray(filteredData) && filteredData.length > 0) {
      setFilteredAllEmp(filteredData);
    } else {
      // storeFilteredData
      setFilteredAllEmp([]);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-500 my-20 text-lg">Loading...</div>
    );
  return (
    <section>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center text-[22px] text-mediumlite_grey gap-10 my-10">
          <IoArrowBack
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <h1 className="text_size_2">Employee Details</h1>
        </div>
        <SearchBox
          primaryData={allEmp}
          handleFilter={handleFilter}
          identify={"empDetailsReport"}
        />
      </div>
      <h4 className="text-primary border-b-2 border-primary pb-2 px-2 w-9 mt-3 mb-7 text_size_3">
        All
      </h4>
      <div className="bg-white py-5 rounded-lg overflow-x-auto w-full">
        {Array.isArray(filteredAllEmp) && filteredAllEmp.length > 0 ? (
          <TableFormate
            heading={Heading}
            allEmployeeReport={filteredAllEmp ?? []}
            list="AllEmpReport"
            ovla={[]}
            leaveApproval={[]}
            viewData={handleViewData}
          />
        ) : (
          <p className="text-center py-4 text-gray-400">Data not found.</p>
        )}
      </div>
      {showingPopUp && (
        <ViewEmpData allEmp={empPopupData ?? []} close={handleClose} />
      )}
      <div>
        <FloatingActionButton
          icon={<MdOutlineDownloading size={32} />}
          onClick={() => {
            alignAllEmp();
          }}
          backgroundColor="primary"
          iconColor="text-white"
          className="bg-primary"
        />
      </div>
    </section>
  );
};
