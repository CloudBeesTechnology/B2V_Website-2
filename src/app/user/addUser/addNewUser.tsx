"use client";
import {
  AddUserFormData,
  addUserSchema,
} from "@/app/services/validations/adminPortalValidation/userValidation";
import FormField from "@/app/utils/formField";
import SearchDisplay from "@/app/utils/searchDisplay";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import SetPermissionBox from "./setPermission";
import { useEffect, useRef, useState } from "react";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

// Define types
interface Employee {
  id: string;
  empID: string;
  name: string;
  department: string;
  // Add more employee fields as needed
}

interface Intern {
  id: string;
  intID: string;
  name: string;
  department: string;
  // Add more intern fields as needed
}

interface Access {
  id: string;
  [key: string]: any;
  // Add more access control fields as needed
}

interface MergedUser extends Employee, Intern {
  [key: string]: any; // allow dynamic access fields
}

interface User {
  id: string;
  [key: string]: any;
}

interface Alluser {
  id: string;
  [key: string]: any;
}

type SelectedModules = {
  [submoduleName: string]: string[];
};

const AddNewUser: React.FC = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [selectedModules, setSelectedModules] = useState<SelectedModules>({});
  const [allUser, setAllUser] = useState<Alluser[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<AddUserFormData>({
    resolver: yupResolver(addUserSchema) as any,
    defaultValues: {
      role: "",
    }
  });

  // Create User
  const createUser = async (data: any) => {
    try {
      const filteredModules = Object.fromEntries(
        Object.entries(selectedModules).filter(
          ([_, sections]) => sections.length > 0
        )
      );
      
      const identifierField = data.empID ? { empID: data.empID } : { intID: data.intID };
      
      let finalData = {
        ...identifierField,
        email: data.email,
        role: data.role,
        setPermission: filteredModules,
        createdAt: new Date().toISOString(),
      };
      
      const userRes = await addDoc(collection(db, "accessControl"), {
        ...finalData,
      });

      if (userRes.id) {
        alert("User created successfully!");
        reset({
          name: "",
          empID: "",
          intID: "",
          email: "",
          role: "",
          department: "",
          position: "",
          phone: "",
        });
        router.push("/user");
        setSelectedModules({});
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to create user.");
    }
  };

  // Update User
  const updateUser = async (checkDataIsExistsOrNot: any, data: any) => {
    const existingUser = checkDataIsExistsOrNot as {
      empId?: string;
      intId?: string;
      [key: string]: any;
    };
    
    try {
      if (existingUser.id) {
        const filteredModules = Object.fromEntries(
          Object.entries(selectedModules).filter(([key]) => isNaN(Number(key)))
        );

        const userRef = doc(db, "accessControl", existingUser.id);

        const identifierField = data.empID ? { empID: data.empID } : { intID: data.intID };
        
        let updatedData = {
          ...identifierField,
          email: data.email,
          role: data.role,
          setPermission: filteredModules,
          updatedAt: new Date().toISOString(),
        };

        await updateDoc(userRef, {
          ...updatedData,
        });

        alert("User updated successfully!");
        reset({
          name: "",
          empID: "",
          intID: "",
          email: "",
          role: "",
          department: "",
          position: "",
          phone: "",
        });
        router.push("/user");
        setSelectedModules({});
      } else {
        console.log("No user found with the given ID.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Check user exists or not
  const fetchDataById = async (id: string, isIntern: boolean = false) => {
    const field = isIntern ? "intID" : "empID";
    const fetchQuery = query(
      collection(db, "accessControl"),
      where(field, "==", id)
    );

    const querySnapshot = await getDocs(fetchQuery);

    if (!querySnapshot.empty) {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return results[0];
    } else {
      console.log("No matching documents.");
      return false;
    }
  };

  const onSubmit = async (data: AddUserFormData) => {
    const id = data.empID || data.intID;
    if (!id) {
      alert("Either Employee ID or Intern ID is required");
      return;
    }
    
    const isIntern = !!data.intID;
    const checkDataIsExistsOrNot = await fetchDataById(id, isIntern);
    
    if (checkDataIsExistsOrNot) {
      updateUser(checkDataIsExistsOrNot, data);
    } else {
      createUser(data);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const empSnap = await getDocs(collection(db, "employeeDetails"));
      const internSnap = await getDocs(collection(db, "Internship"));
      const accessSnap = await getDocs(collection(db, "accessControl"));

      const employees: Employee[] = empSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];

      const interns: Intern[] = internSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Intern[];

      const accessControls: Access[] = accessSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Access[];

      // Merge employees with access controls
      const mergedEmployees = employees.map((emp) => {
        const access = accessControls.find((acc) => acc.empID === emp.empID) || null;
        return {
          ...emp,
          ...(access || {}),
        };
      });

      // Merge interns with access controls
      const mergedInterns = interns.map((intern) => {
        const access = accessControls.find((acc) => acc.intID === intern.intID) || null;
        return {
          ...intern,
          ...(access || {}),
        };
      });

      // Combine both arrays
      const mergedData = [...mergedEmployees, ...mergedInterns];
      setAllUser(mergedData);
    };

    getUsers();
  }, []);

  const handleSelect = async (user: User) => {
    try {
      const id = user.empID || user.intID;
      if (!id) return;
      
      const isIntern = !!user.intID;
      const field = isIntern ? "intID" : "empID";
      
      const fetchQuery = query(
        collection(db, "accessControl"),
        where(field, "==", id)
      );

      const querySnapshot = await getDocs(fetchQuery);
      const getUserDetails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const result = getUserDetails[0];
      
      reset({
        name: user.name || "",
        empID: user.empID || "",
        intID: user.intID || "",
        email: user.email || "",
        role: user.role || "",
        department: user.department || "",
        position: user.position || "",
        phone: user.contact || user.phone || "",
      });
      
      setSelectedModules((result as any)?.setPermission || {});
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Something went wrong");
    }
  };

  const role = watch("role");

  return (
    <main ref={parentRef}>
      <section className="flex justify-between items-center my-10">
        <MdOutlineKeyboardBackspace
          onClick={() => router.back()}
          className="text-3xl text-gray cursor-pointer hover:text-blue-600 transition-colors"
        />
        <h2 className="text-2xl font-semibold">ADD NEW USER</h2>

        <SearchDisplay
          allUser={allUser}
          handleSelect={handleSelect}
          parentRef={parentRef}
        />
      </section>
      <section className=" w-full center rounded-xl bg-white my-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full m-15 ">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
            <FormField
              label="Name"
              name="name"
              type="text"
              module="user"
              register={register}
              errors={errors?.name?.message}
            />
            
           <div className=" flex justify-between gap-5 w-full">
             <FormField
              label="Employee ID"
              name="empID"
              type="text"
              module="user"
              register={register}
              errors={errors?.empID?.message}
            />
            <FormField
              label="Intern ID"
              name="intID"
              type="text"
              module="user"
              register={register}
              errors={errors?.intID?.message}
            />
           </div>

            <FormField
              label="Phone Number"
              name="phone"
              type="text"
              module="user"
              register={register}
              errors={errors?.phone?.message}
            />
            <FormField
              label="Email ID"
              name="email"
              type="text"
              module="user"
              register={register}
              errors={errors?.email?.message}
            />
            <FormField
              label="Position"
              name="position"
              type="text"
              module="user"
              register={register}
              errors={errors?.position?.message}
            />
            <FormField
              label="Department"
              name="department"
              type="text"
              module="user"
              register={register}
              errors={errors?.department?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
            <div className="space-y-4 mt-10">
              <p className="font-semibold">Select Role:</p>

              <div className="flex flex-col justify-between space-y-4 border border-lite_gray bg-white py-5">
                <FormField
                  label="Select Role"
                  name="role"
                  type="radio"
                  module="user"
                  register={register}
                  errors={errors?.role?.message}
                  options={["Admin", "Manager", "Lead", "Employee", "Intern"]}
                  value={role ?? undefined} 
                />
              </div>
            </div>
            <SetPermissionBox
              selectedModules={selectedModules}
              setSelectedModules={setSelectedModules}
            />
          </div>

          <div className="center mt-10">
            <button
              type="submit"
              className="text-center text_size_3  px-8 py-2 bg-primary text-white rounded cursor-pointer"
            >
              SAVE
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default AddNewUser;

// "use client";
// import {
//   AddUserFormData,
//   addUserSchema,
// } from "@/app/services/validations/adminPortalValidation/userValidation";
// import FormField from "@/app/utils/formField";
// import SearchDisplay from "@/app/utils/searchDisplay";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import SetPermissionBox from "./setPermission";
// import { useEffect, useRef, useState } from "react";

// import {
//   collection,
//   addDoc,
//   serverTimestamp,
//   getDocs,
//   query,
//   where,
//   doc,
//   getDoc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "@/lib/firebaseConfig";
// import { MdOutlineKeyboardBackspace } from "react-icons/md";


// // merged types
// // Define types
// interface Employee {
//   id: string;
//   empID: string;
//   name: string;
//   department: string;
//   // Add more employee fields as needed
// }

// interface Access {
//   id: string;
//     [key: string]: any;
//   // Add more access control fields as needed
// }

// interface MergedUser extends Employee {
//   [key: string]: any; // allow dynamic access fields
// }
// // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// interface User {
//   id: string;
//   [key: string]: any;
// }

// interface Alluser {
//   id: string;
//   [key: string]: any;
// }

// // type SelectedModules = {
// //   [moduleName: string]: {
// //     name: string;
// //     sections: string[];
// //   }[];
// // };

// type SelectedModules = {
//   [submoduleName: string]: string[];
// };
// const AddNewUser: React.FC = () => {
//   const parentRef = useRef<HTMLDivElement | null>(null);
//   const [selectedModules, setSelectedModules] = useState<SelectedModules>({});
//   const [allUser, setAllUser] = useState<Alluser[]>([]);
//   const router = useRouter();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     reset,
//   } = useForm<AddUserFormData>({
//     resolver: yupResolver(addUserSchema) as any,
//     defaultValues: {
//       role: "", // Set default value here
//     }
//   });

//   // Create User
//   const createUser = async (data: any) => {
//     try {
//       const filteredModules = Object.fromEntries(
//         Object.entries(selectedModules).filter(
//           ([_, sections]) => sections.length > 0
//         )
//       );
//       let finalData = {
//         empID: data.empID,
//         email: data.email,
//         role: data.role,
//         setPermission: filteredModules,
//         createdAt: new Date().toISOString(),
//       };
//       const userRes = await addDoc(collection(db, "accessControl"), {
//         ...finalData,
//       });

//       if (userRes.id) {
//         alert("User created successfully!");
//         reset({
//           name: "",
//           empID: "",
//           email: "",
//           role: "",
//           department: "",
//           position: "",
//           phone: "",
//         });
// router.push("/user")
//         setSelectedModules({});
//       }
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to create user.");
//     }
//   };

//   // Update User
//   const updateUser = async (checkDataIsExistsOrNot: any, data: any) => {
//     console.log(data)
//     const existingUser = checkDataIsExistsOrNot as {
//       empId: string;
//       [key: string]: any;
//     };
//     try {
//       if (existingUser.id) {
//         const filteredModules = Object.fromEntries(
//           Object.entries(selectedModules).filter(([key]) => isNaN(Number(key)))
//         );

//         const userRef = doc(db, "accessControl", existingUser.id);

//         let updatedData = {
//           empID: data.empID,
//           email: data.email,
//           role: data.role,
//           setPermission: filteredModules,
//           createdAt: new Date().toISOString(),
//         };

//         await updateDoc(userRef, {
//           ...updatedData,
//         });

//         alert("User updated successfully!");
//         reset({
//           name: "",
//           empID: "",
//           email: "",
//           role: "",
//           department: "",
//           position: "",
//           phone: "",
//         });
// // window.location.reload();
// router.push("/user")
//         setSelectedModules({});
//       } else {
//         console.log("No user found with the given empId.");
//       }
//     } catch (error) {
//       console.error("Error updating user:", error);
//     }
//   };

//   // Check user exists or not
//   const fetchDataByEmpID = async (empID: any) => {
//     const fetchQuery = query(
//       collection(db, "accessControl"),
//       where("empID", "==", empID)
//     );

//     const querySnapshot = await getDocs(fetchQuery);

//     if (!querySnapshot.empty) {
//       const results = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       return results[0];
//     } else {
//       console.log("No matching documents.");
//       return false;
//     }
//   };

//   const onSubmit = async (data: AddUserFormData) => {
 
//     const checkDataIsExistsOrNot = await fetchDataByEmpID(data.empID);
//     if (checkDataIsExistsOrNot) {
//       updateUser(checkDataIsExistsOrNot, data);
//     } else if (checkDataIsExistsOrNot === false) {
//       createUser(data);
//     }
//   };

//   useEffect(() => {
//     const getUsers = async () => {
//       const empSnap = await getDocs(collection(db, "employeeDetails"));
//       const accessSnap = await getDocs(collection(db, "accessControl"));

//       const employees: Employee[] = empSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Employee[];

//       const accessControls: Access[] = accessSnap.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       })) as Access[];

//       const mergedData: MergedUser[] = employees.map((emp) => {
//         const access = accessControls.find((acc) => acc.empID === emp.empID) || null;
//         return {
//           ...emp,
//            ...(access || {}),
//         };
//       });



//       setAllUser(mergedData);
//       console.log("Merged Data:", mergedData);
//     };

//     getUsers();
//   }, []);

//   const handleSelect = async (user: User) => {
//     // get data by using 'where' clause
//     try {
//       const fetchQuery = query(
//         collection(db, "accessControl"),
//         where("empID", "==", user?.empID)
//       );

//       const querySnapshot = await getDocs(fetchQuery);
//       const getUserDetails = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const result = getUserDetails[0];
      
//       reset({
//         name: user.name || "",
//         empID: user.empID || "",
//         email: user.email || "",
//         role: user.role || "",
//         department: user.department || "",
//         position: user.position || "",
//         phone: user.contact || "",
//       });
//       console.log(result);
//       setSelectedModules((result as any)?.setPermission || []);
//     } catch (error) {
//       console.error("Error fetching users by empId:", error);
//       alert("Something wrong in the code");
//     }
//   };
// const role = watch("role");
// console.log(role,"checkingRole");

//   return (
//     <main ref={parentRef}>
//       <section className="flex justify-between items-center my-10">
//         <MdOutlineKeyboardBackspace
//           onClick={() => router.back()}
//           className="text-3xl text-gray cursor-pointer hover:text-blue-600 transition-colors"
//         />
//         <h2 className="text-2xl font-semibold">ADD NEW USER</h2>

//         <SearchDisplay
//           allUser={allUser}
//           handleSelect={handleSelect}
//           parentRef={parentRef}
//         />
//       </section>
//       <section className=" w-full center rounded-xl bg-white my-10">
//         <form onSubmit={handleSubmit(onSubmit)} className="w-full m-15 ">
//           <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
//             <FormField
//               label="Name"
//               name="name"
//               type="text"
//               module="user"
//               register={register}
//               errors={errors?.name?.message}
//             />
//             <FormField
//               label="Employee ID"
//               name="empID"
//               type="text"
//               module="user"
//               register={register}
//               errors={errors?.empID?.message}
//             />
//             <FormField
//               label="Phone Number"
//               name="phone"
//               type="text"
//               module="user"
//               register={register}
//               errors={errors?.phone?.message}
//             />
//             <FormField
//               label="Email ID"
//               name="email"
//               type="text"
//               module="user"
//               register={register}
//               errors={errors?.email?.message}
//             />
//             <FormField
//               label="Position"
//               name="position"
//               type="text"
//               module="user"
//               register={register}
//               errors={errors?.position?.message}
//             />
//             <FormField
//               label="Department"
//               name="department"
//               type="text"
//               module="user"
//               register={register}
//               errors={errors?.department?.message}
//             />
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
//             <div className="space-y-4 mt-10">
//               <p className="font-semibold">Select Role:</p>

//               <div className="flex flex-col justify-between space-y-4 border border-lite_gray bg-white py-5">
//                 <FormField
//                   label="Select Role"
//                   name="role"
//                   type="radio"
//                   module="user"
//                   register={register}
//                   errors={errors?.role?.message}
//                   options={["Admin", "Manager", "Lead", "Employee", "Intern"]}
//                   value={role ?? undefined} 
//                 />
//               </div>
//             </div>
//             <SetPermissionBox
//               selectedModules={selectedModules}
//               setSelectedModules={setSelectedModules}
//             />
//           </div>

//           <div className="center mt-10">
//             <button
//               type="submit"
//               className="text-center text_size_3  px-8 py-2 bg-primary text-white rounded cursor-pointer"
//             >
//               SAVE
//             </button>
//           </div>
//         </form>
//       </section>
//     </main>
//   );
// };
// export default AddNewUser;
