"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { personalInfoSchema } from "@/validation/Schema";
import profileIcon from "../../../../public/assets/employee/profileIcon.png";
import { LiaUploadSolid } from "react-icons/lia";
import { UseEmployeeList } from "@/app/utils/EmpContext";
import { DateFormat } from "@/components/DateFormate";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { app, db } from "@/lib/firebaseConfig";
import { FaUser } from "react-icons/fa";

interface PersonalInfoFormData {
  name: string;
  dob: string;
  gender: string;
  nationality: string;
  address: string;
  contact: string;
  doj: string;
  alternateNo?: string;
  email: string;
  lang: string;
  religion?: string;
  proof?: string | null;
  department?: string;
  position?: string;
  role: string;
  totalLeave?: string;
  manager?: string;
  leadEmpID?: string;
  effectiveDate?: string;
  profilePhoto?: string | null;
}

export const PersonalInfoForm = () => {
  const router = useRouter();
  const { storedEmpData } = UseEmployeeList();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImageProof, setPreviewImageProof] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofFileName, setProofFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const profileFileInputRef = useRef<HTMLInputElement>(null);
  
  const storage = getStorage(app);

  const extractFileNameFromUrl = (url: string): string => {
    if (!url) return "";
    try {
      const decodedUrl = decodeURIComponent(url);
      const lastSegment = decodedUrl.split('/').pop() || '';
      const fileNameWithParams = lastSegment.split('?')[0];
      const fileName = fileNameWithParams.replace(/^\d+_/, '');
      return fileName;
    } catch (e) {
      console.error("Error parsing URL:", e);
      return url.split('/').pop() || url;
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const triggerProfileFileInput = () => {
    profileFileInputRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("personalInfo");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        reset(parsedData);

        if (parsedData.profilePhoto) {
          setPreviewImage(parsedData.profilePhoto);
        }
        if (parsedData.proof) {
          setPreviewImageProof(parsedData.proof);
          setProofFileName(extractFileNameFromUrl(parsedData.proof));
        }
      }
    }
  }, [reset]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        alert("Please select an image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size should be less than 5MB");
        return;
      }
      if (type === "profilePhoto") {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (type === "proof") {
        setProofFile(file);
        setProofFileName(file.name);
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewImageProof(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const uploadFileToFirebase = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const updateUserRole = async (email: string, role: string) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          await updateDoc(docSnapshot.ref, {
            role: role
          });
        });
      } else {
        console.warn(`No user found with email: ${email}`);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      throw error;
    }
  };

  const onSubmit = async (data: PersonalInfoFormData) => {
    setIsUploading(true);
    try {
      let profilePhotoUrl = data.profilePhoto || null;
      let proofUrl = data.proof || null;
      const sanitizedName = data.name
        ? data.name.replace(/[^a-zA-Z0-9]/g, '_')
        : 'unknown';

      if (selectedFile) {
        const profilePath = `employee-profile/${sanitizedName}/${Date.now()}_${selectedFile.name}`;
        profilePhotoUrl = await uploadFileToFirebase(selectedFile, profilePath);
      }

      if (proofFile) {
        const proofPath = `employee-proofs/${sanitizedName}/${Date.now()}_${proofFile.name}`;
        proofUrl = await uploadFileToFirebase(proofFile, proofPath);
      }

      const dataToStore = {
        ...data,
        profilePhoto: profilePhotoUrl,
        proof: proofUrl,
      };

      // Update user role in the users collection
      await updateUserRole(data.email, data.role);

      localStorage.setItem("personalInfo", JSON.stringify(dataToStore));
      router.push("/employeeDetails?tab=educationInfo");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (storedEmpData) {
      reset(storedEmpData);

      if (storedEmpData.profilePhoto) {
        setPreviewImage(storedEmpData.profilePhoto);
      }
      if (storedEmpData.proof) {
        setPreviewImageProof(storedEmpData.proof);
        setProofFileName(extractFileNameFromUrl(storedEmpData.proof));
      }
    }
  }, [storedEmpData, reset]);

  return (
    <section className="bg-white py-5 px-10 rounded-xl">
      <div>
        <h3 className="text-mediumlite_grey text-[22px]">Personal Info</h3>
      </div>
      <form
        className="flex justify-between my-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="flex flex-col gap-4 w-[70%]">
          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="name" className="text-[15px] text-gray">
                Name<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="name"
                  className="outline-none py-1 w-full"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <span className="text-red text-sm">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="dob" className="text-[15px] text-gray">
                DOB<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="dob"
                  type="date"
                  className="outline-none py-1 w-full"
                  {...register("dob")}
                />
              </div>
              {errors.dob && (
                <span className="text-red text-sm">{errors.dob.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="alternateNo" className="text-[15px] text-gray">
                Gender
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <select
                  className=" outline-none w-full"
                  {...register("gender")}
                >
                  <option>Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="nationality" className="text-[15px] text-gray">
                Nationality<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="nationality"
                  className="outline-none py-1 w-full"
                  {...register("nationality")}
                />
              </div>
              {errors.nationality && (
                <span className="text-red text-sm">
                  {errors.nationality.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="address" className="text-[15px] text-gray">
                Address<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="address"
                  className="outline-none py-1 w-full"
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <span className="text-red text-sm">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="contact" className="text-[15px] text-gray">
                Contact<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="contact"
                  className="outline-none py-1 w-full"
                  {...register("contact")}
                />
              </div>
              {errors.contact && (
                <span className="text-red text-sm">
                  {errors.contact.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="doj" className="text-[15px] text-gray">
                Date of Join <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="doj"
                  type="date"
                  className="outline-none py-1 w-full"
                  {...register("doj")}
                />
              </div>
              {errors.doj && (
                <span className="text-red text-sm">{errors.doj.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="alternateNo" className="text-[15px] text-gray">
                Alternate Phone No
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="alternateNo"
                  className="outline-none py-1 w-full"
                  {...register("alternateNo")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="email" className="text-[15px] text-gray">
                Email ID<sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="email"
                  type="email"
                  className="outline-none py-1 w-full"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <span className="text-red text-sm">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="lang" className="text-[15px] text-gray">
                Language <sup className="text-red">*</sup>
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="lang"
                  type="lang"
                  className="outline-none py-1 w-full"
                  {...register("lang")}
                />
              </div>
              {errors.lang && (
                <span className="text-red text-sm">{errors.lang.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="religion" className="text-[15px] text-gray">
                Religion
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="religion"
                  className="outline-none py-1 w-full"
                  {...register("religion")}
                />
              </div>
            </div>

              <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="proof" className="text-[15px] text-gray">
                Proof
              </label>
              <div className="border border-[#D9D9D9] px-4 py-3 rounded-sm flex items-center">
                <input
                  id="proof"
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, "proof")}
                  accept="image/*"
                  className="outline-none py-1 w-full hidden"
                />
                <span
                  onClick={triggerFileInput}
                  className="w-full flex justify-end"
                >
                  <LiaUploadSolid className="text-medium_gray" />
                </span>
              </div>
              <span className="text-xs text-medium_gray truncate">
                {proofFile ? proofFile.name : proofFileName}
              </span>
              {errors.proof && (
                <span className="text-red text-sm">{errors.proof.message}</span>
              )}
            </div>
          </div>
         

          <div className="flex  justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="department" className="text-[15px] text-gray">
                Department
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="department"
                  className="outline-none py-1 w-full"
                  {...register("department")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="position" className="text-[15px] text-gray">
                Position
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="position"
                  type="tel"
                  className="outline-none py-1 w-full"
                  {...register("position")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="leave" className="text-[15px] text-gray">
                Total Leave
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="leave"
                  className="outline-none py-1 w-full"
                  {...register("totalLeave")}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="manager" className="text-[15px] text-gray">
               Role
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <select
                  {...register("role")}
                  className="outline-none py-1 w-full"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Employee</option>
                  <option value="Lead">Lead</option>
                  <option value="Manager">Manager</option>
                  <option value="Intern">Intern</option>
                </select>
              </div>
              {errors.role && (
                <span className="text-red text-sm">{errors.role.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="manager" className="text-[15px] text-gray">
                Assign Manager
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="manager"
                  type="tel"
                  className="outline-none py-1 w-full"
                  {...register("manager")}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="lead" className="text-[15px] text-gray">
                Assign Lead
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="lead"
                  type="tel"
                  className="outline-none py-1 w-full"
                  {...register("leadEmpID")}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-[30%]">
              <label htmlFor="effectiveDate" className="text-[15px] text-gray">
               Effective Date
              </label>
              <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
                <input
                  id="effectiveDate"
                 type="date"
                  className="outline-none py-1 w-full"
                  {...register("effectiveDate")}
                />
              </div>
            </div>
          </div>

          <div className="mb-20 pt-10 center">
            <button
              type="submit"
              className="text-[15px] cursor-pointer text-white bg-primary px-5 py-3 w-[20%] rounded-md disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Next"}
            </button>
          </div>
        </section>

        <section className="w-[30%] flex items-center flex-col gap-4">
          <div
            className="max-w-[150px] w-full h-[150px] rounded-full overflow-hidden cursor-pointer relative border border-gray-200"
            onClick={triggerProfileFileInput}
          >
            {previewImage ? (
              <Image
                src={previewImage}
                alt="Profile preview"
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            ) : (
              <Image
                src={profileIcon}
                alt="Default profile"
                width={150}
                height={150}
                className="object-cover w-full h-full"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <span className="text-white text-sm">Change Photo</span>
            </div>
          </div>

          <input
            type="file"
            ref={profileFileInputRef}
            onChange={(e) => handleFileChange(e, "profilePhoto")}
            accept="image/*"
            className="hidden"
          />

          <p className="text-[15px] text-gray">Click to upload</p>
          {selectedFile && (
            <p className="text-sm text-gray-500 text-center">
              Selected: {selectedFile.name}
            </p>
          )}
        </section>
      </form>
    </section>
  );
};

// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useState, useRef, ChangeEvent, useEffect } from "react";
// import { personalInfoSchema } from "@/validation/Schema";
// import profileIcon from "../../../../public/assets/employee/profileIcon.png";
// import { LiaUploadSolid } from "react-icons/lia";
// import { UseEmployeeList } from "@/app/utils/EmpContext";
// import { DateFormat } from "@/components/DateFormate";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// import { app, db } from "@/lib/firebaseConfig";
// import { FaUser } from "react-icons/fa";

// interface PersonalInfoFormData {
//   name: string;
//   dob: string;
//   gender: string;
//   nationality: string;
//   address: string;
//   contact: string;
//   doj: string;
//   alternateNo?: string;
//   email: string;
//   lang: string;
//   religion?: string;
//   proof?: string | null;
//   department?: string;
//   position?: string;
//   role: string;
//   totalLeave?: string;
//   manager?: string;
//   leadEmpID?: string;
//   profilePhoto?: string | null;
// }

// export const PersonalInfoForm = () => {
//   const router = useRouter();
//   const { storedEmpData } = UseEmployeeList();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [previewImageProof, setPreviewImageProof] = useState<string | null>(null);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [proofFile, setProofFile] = useState<File | null>(null);
//   const [proofFileName, setProofFileName] = useState<string>("");
//   const [isUploading, setIsUploading] = useState(false);
//   const profileFileInputRef = useRef<HTMLInputElement>(null);
  
//   const storage = getStorage(app);

//   const extractFileNameFromUrl = (url: string): string => {
//     if (!url) return "";
//     try {
//       const decodedUrl = decodeURIComponent(url);
//       const lastSegment = decodedUrl.split('/').pop() || '';
//       const fileNameWithParams = lastSegment.split('?')[0];
//       // Remove timestamp prefix (numbers followed by underscore)
//       const fileName = fileNameWithParams.replace(/^\d+_/, '');
//       return fileName;
//     } catch (e) {
//       console.error("Error parsing URL:", e);
//       return url.split('/').pop() || url;
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };
  
//   const triggerProfileFileInput = () => {
//     profileFileInputRef.current?.click();
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm<PersonalInfoFormData>({
//     resolver: zodResolver(personalInfoSchema),
//   });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedData = localStorage.getItem("personalInfo");
//       if (savedData) {
//         const parsedData = JSON.parse(savedData);
//         reset(parsedData);

//         if (parsedData.profilePhoto) {
//           setPreviewImage(parsedData.profilePhoto);
//         }
//         if (parsedData.proof) {
//           setPreviewImageProof(parsedData.proof);
//           setProofFileName(extractFileNameFromUrl(parsedData.proof));
//         }
//       }
//     }
//   }, [reset]);

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (!file.type.match("image.*")) {
//         alert("Please select an image file");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert("File size should be less than 5MB");
//         return;
//       }
//       if (type === "profilePhoto") {
//         setSelectedFile(file);
//         const reader = new FileReader();
//         reader.onload = () => {
//           setPreviewImage(reader.result as string);
//         };
//         reader.readAsDataURL(file);
//       } else if (type === "proof") {
//         setProofFile(file);
//         setProofFileName(file.name);
//         const reader = new FileReader();
//         reader.onload = () => {
//           setPreviewImageProof(reader.result as string);
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   };

//   const uploadFileToFirebase = async (file: File, path: string): Promise<string> => {
//     const storageRef = ref(storage, path);
//     await uploadBytes(storageRef, file);
//     return await getDownloadURL(storageRef);
//   };

//   const onSubmit = async (data: PersonalInfoFormData) => {
//     setIsUploading(true);
//     try {
//       let profilePhotoUrl = data.profilePhoto || null;
//       let proofUrl = data.proof || null;
//       const sanitizedName = data.name
//         ? data.name.replace(/[^a-zA-Z0-9]/g, '_')
//         : 'unknown';

//       if (selectedFile) {
//         const profilePath = `employee-profile/${sanitizedName}/${Date.now()}_${selectedFile.name}`;
//         profilePhotoUrl = await uploadFileToFirebase(selectedFile, profilePath);
//       }

//       if (proofFile) {
//         const proofPath = `employee-proofs/${sanitizedName}/${Date.now()}_${proofFile.name}`;
//         proofUrl = await uploadFileToFirebase(proofFile, proofPath);
//       }

//       const dataToStore = {
//         ...data,
//         profilePhoto: profilePhotoUrl,
//         proof: proofUrl,
//       };

//       localStorage.setItem("personalInfo", JSON.stringify(dataToStore));
//       router.push("/employeeDetails?tab=educationInfo");
//     } catch (error) {
//       console.error("Error uploading files:", error);
//       alert("Error uploading files. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };


//   useEffect(() => {
//     if (storedEmpData) {
//       reset(storedEmpData);

//       if (storedEmpData.profilePhoto) {
//         setPreviewImage(storedEmpData.profilePhoto);
//       }
//       if (storedEmpData.proof) {
//         setPreviewImageProof(storedEmpData.proof);
//         setProofFileName(extractFileNameFromUrl(storedEmpData.proof));
//       }
//     }
//   }, [storedEmpData, reset]);

//   return (
//     <section className="bg-white py-5 px-10 rounded-xl">
//       <div>
//         <h3 className="text-mediumlite_grey text-[22px]">Personal Info</h3>
//       </div>
//       <form
//         className="flex justify-between my-5"
//         onSubmit={handleSubmit(onSubmit)}
//       >
//         <section className="flex flex-col gap-4 w-[70%]">
//           <div className="flex justify-between mt-5">
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="name" className="text-[15px] text-gray">
//                 Name<sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="name"
//                   className="outline-none py-1 w-full"
//                   {...register("name")}
//                 />
//               </div>
//               {errors.name && (
//                 <span className="text-red text-sm">{errors.name.message}</span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="dob" className="text-[15px] text-gray">
//                 DOB<sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="dob"
//                   type="date"
//                   className="outline-none py-1 w-full"
//                   {...register("dob")}
//                 />
//               </div>
//               {errors.dob && (
//                 <span className="text-red text-sm">{errors.dob.message}</span>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="alternateNo" className="text-[15px] text-gray">
//                 Gender
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <select
//                   className=" outline-none w-full"
//                   {...register("gender")}
//                 >
//                   <option>Select</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between mt-5">
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="nationality" className="text-[15px] text-gray">
//                 Nationality<sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="nationality"
//                   className="outline-none py-1 w-full"
//                   {...register("nationality")}
//                 />
//               </div>
//               {errors.nationality && (
//                 <span className="text-red text-sm">
//                   {errors.nationality.message}
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="address" className="text-[15px] text-gray">
//                 Address<sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="address"
//                   className="outline-none py-1 w-full"
//                   {...register("address")}
//                 />
//               </div>
//               {errors.address && (
//                 <span className="text-red text-sm">
//                   {errors.address.message}
//                 </span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="contact" className="text-[15px] text-gray">
//                 Contact<sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="contact"
//                   className="outline-none py-1 w-full"
//                   {...register("contact")}
//                 />
//               </div>
//               {errors.contact && (
//                 <span className="text-red text-sm">
//                   {errors.contact.message}
//                 </span>
//               )}
//             </div>
//           </div>
//           <div className="flex justify-between mt-5">
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="doj" className="text-[15px] text-gray">
//                 Date of Join <sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="doj"
//                   type="date"
//                   className="outline-none py-1 w-full"
//                   {...register("doj")}
//                 />
//               </div>
//               {errors.doj && (
//                 <span className="text-red text-sm">{errors.doj.message}</span>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="alternateNo" className="text-[15px] text-gray">
//                 Alternate Phone No
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="alternateNo"
//                   className="outline-none py-1 w-full"
//                   {...register("alternateNo")}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="email" className="text-[15px] text-gray">
//                 Email ID<sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="email"
//                   type="email"
//                   className="outline-none py-1 w-full"
//                   {...register("email")}
//                 />
//               </div>
//               {errors.email && (
//                 <span className="text-red text-sm">{errors.email.message}</span>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-between mt-5">
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="lang" className="text-[15px] text-gray">
//                 Language <sup className="text-red">*</sup>
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="lang"
//                   type="lang"
//                   className="outline-none py-1 w-full"
//                   {...register("lang")}
//                 />
//               </div>
//               {errors.lang && (
//                 <span className="text-red text-sm">{errors.lang.message}</span>
//               )}
//             </div>
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="religion" className="text-[15px] text-gray">
//                 Religion
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="religion"
//                   className="outline-none py-1 w-full"
//                   {...register("religion")}
//                 />
//               </div>
//             </div>

//               <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="proof" className="text-[15px] text-gray">
//                 Proof
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-3 rounded-sm flex items-center">
//                 <input
//                   id="proof"
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={(e) => handleFileChange(e, "proof")}
//                   accept="image/*"
//                   className="outline-none py-1 w-full hidden"
//                 />
//                 <span
//                   onClick={triggerFileInput}
//                   className="w-full flex justify-end"
//                 >
//                   <LiaUploadSolid className="text-medium_gray" />
//                 </span>
//               </div>
//               <span className="text-xs text-medium_gray truncate">
//                 {proofFile ? proofFile.name : proofFileName}
//               </span>
//               {errors.proof && (
//                 <span className="text-red text-sm">{errors.proof.message}</span>
//               )}
//             </div>
//           </div>
         

//           <div className="flex  justify-between mt-5">
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="department" className="text-[15px] text-gray">
//                 Department
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="department"
//                   className="outline-none py-1 w-full"
//                   {...register("department")}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="position" className="text-[15px] text-gray">
//                 Position
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="position"
//                   type="tel"
//                   className="outline-none py-1 w-full"
//                   {...register("position")}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="leave" className="text-[15px] text-gray">
//                 Total Leave
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="leave"
//                   className="outline-none py-1 w-full"
//                   {...register("totalLeave")}
//                 />
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between mt-5">
//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="manager" className="text-[15px] text-gray">
//                Role
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <select
//                           {...register("role")}
//                           className="outline-none py-1 w-full"
//                         >
//                           <option value="">Select Role</option>
//                           <option value="Admin">Admin</option>
//                           <option value="Employee">Employee</option>
//                           <option value="Lead">Lead</option>
//                           <option value="Manager">Manager</option>
//                           <option value="Intern">Intern</option>
//                         </select>
//               </div>
//               {errors.role && (
//                 <span className="text-red text-sm">{errors.role.message}</span>
//               )}
//             </div>

//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="manager" className="text-[15px] text-gray">
//                 Assign Manager
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="manager"
//                   type="tel"
//                   className="outline-none py-1 w-full"
//                   {...register("manager")}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-2 w-[30%]">
//               <label htmlFor="lead" className="text-[15px] text-gray">
//                 Assign Lead
//               </label>
//               <div className="border border-[#D9D9D9] px-4 py-1 rounded-sm">
//                 <input
//                   id="lead"
//                   type="tel"
//                   className="outline-none py-1 w-full"
//                   {...register("leadEmpID")}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="mb-20 pt-10 center">
//             <button
//               type="submit"
//               className="text-[15px] cursor-pointer text-white bg-primary px-5 py-3 w-[20%] rounded-md disabled:opacity-50"
//               disabled={isUploading}
//             >
//               {isUploading ? "Uploading..." : "Next"}
//             </button>
//           </div>
//         </section>

//         <section className="w-[30%] flex items-center flex-col gap-4">
//           <div
//             className="max-w-[150px] w-full h-[150px] rounded-full overflow-hidden cursor-pointer relative border border-gray-200"
//             onClick={triggerProfileFileInput}
//           >
//             {previewImage ? (
//               <Image
//                 src={previewImage}
//                 alt="Profile preview"
//                 width={150}
//                 height={150}
//                 className="object-cover w-full h-full"
//               />
//             ) : (
//               <Image
//                 src={profileIcon}
//                 alt="Default profile"
//                 width={150}
//                 height={150}
//                 className="object-cover w-full h-full"
//               />
//             )}
//             <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
//               <span className="text-white text-sm">Change Photo</span>
//             </div>
//           </div>

//           <input
//             type="file"
//             ref={profileFileInputRef}
//             onChange={(e) => handleFileChange(e, "profilePhoto")}
//             accept="image/*"
//             className="hidden"
//           />

//           <p className="text-[15px] text-gray">Click to upload</p>
//           {selectedFile && (
//             <p className="text-sm text-gray-500 text-center">
//               Selected: {selectedFile.name}
//               {/* <br />({(selectedFile.size / 1024).toFixed(1)} KB) */}
//             </p>
//           )}
//         </section>
//       </form>
//     </section>
//   );
// };