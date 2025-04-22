"use client";
import {
  AddUserFormData,
  addUserSchema,
} from "@/app/services/validations/adminPortalValidation/userValidation";
import FormField from "@/app/utils/formField";
import Searchbox from "@/app/utils/searchbox";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { IoArrowBack } from "react-icons/io5";
import SetPermissionBox from "./setPermission";
import { useEffect, useState } from "react";

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

interface User {
  id: string;
  [key: string]: any;
}

interface Alluser {
  id: string;
  [key: string]: any;
}

const AddNewUser: React.FC = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [allUser, setAllUser] = useState<Alluser[]>([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUserFormData>({
    resolver: yupResolver(addUserSchema),
  });

  // Create User
  const createUser = async (data: any) => {
    try {
      let finalData = {
        empID: data.empID,
        permission: selectedModules,
        createdAt: new Date().toISOString(),
      };
      const userRes = await addDoc(collection(db, "userDetails"), {
        ...finalData,
      });

      if (userRes.id) {
        alert("User created successfully!");
        reset({
          name: "",
          empID: "",
          email: "",
          department: "",
          position: "",
          phone: "",
        });
        setSelectedModules([]);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to create user.");
    }
  };

  // Update User
  const updateUser = async (checkDataIsExistsOrNot: any, data: any) => {
    const existingUser = checkDataIsExistsOrNot as {
      empId: string;
      [key: string]: any;
    };
    try {
      if (existingUser.id) {
        const userRef = doc(db, "userDetails", existingUser.id);

        let updatedData = {
          empID: data.empID,
          permission: selectedModules,
          createdAt: new Date().toISOString(),
        };
        await updateDoc(userRef, {
          ...updatedData,
        });

        alert("User updated successfully!");
        reset({
          name: "",
          empID: "",
          email: "",
          department: "",
          position: "",
          phone: "",
        });

        setSelectedModules([]);
      } else {
        console.log("No user found with the given empId.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Check user exists or not
  const fetchDataByEmpID = async (empID: string) => {
    const fetchQuery = query(
      collection(db, "userDetails"),
      where("empID", "==", empID)
    );

    const querySnapshot = await getDocs(fetchQuery);

    if (!querySnapshot.empty) {
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Matched data:", results);
      return results[0];
    } else {
      console.log("No matching documents.");
      return false;
    }
  };

  const onSubmit = async (data: AddUserFormData) => {
    const checkDataIsExistsOrNot = await fetchDataByEmpID(data.empID);

    if (checkDataIsExistsOrNot) {
      updateUser(checkDataIsExistsOrNot, data);
    } else if (checkDataIsExistsOrNot === false) {
      createUser(data);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "employeeDetails"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllUser(users);
      console.log(users);
    };
    getUsers();
  }, []);

  const handleSelect = async (user: User) => {
    // get data by using 'where' clause
    try {
      const fetchQuery = query(
        collection(db, "userDetails"),
        where("empID", "==", user?.empID)
      );

      console.log("fetchQuery : ", fetchQuery);
      const querySnapshot = await getDocs(fetchQuery);
      const getUserDetails = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const result = getUserDetails[0];

      reset({
        name: user.name || "",
        empID: user.empID || "",
        email: user.email || "",
        department: user.department || "",
        position: user.position || "",
        phone: user.contact || "",
      });

      setSelectedModules((result as any)?.permission || []);
    } catch (error) {
      console.error("Error fetching users by empId:", error);
      alert("Something wrong in the code");
    }
  };

  return (
    <main>
      <section className="flex justify-between items-center my-10 ">
        <IoArrowBack
          onClick={() => router.back()}
          className="text-[22px] text-gray cursor-pointer"
        />
        <h2 className="text-2xl font-semibold">ADD NEW USER</h2>
        <Searchbox allUser={allUser} handleSelect={handleSelect} />
      </section>
      <section className=" w-full center rounded-xl bg-white my-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full m-15 ">
          <div className="grid grid-cols-1 sm:grid-cols-2  gap-10">
            <FormField
              label="Name"
              name="name"
              type="text"
              register={register}
              errors={errors?.name?.message}
            />
            <FormField
              label="Employee ID"
              name="empID"
              type="text"
              register={register}
              errors={errors?.empID?.message}
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="text"
              register={register}
              errors={errors?.phone?.message}
            />
            <FormField
              label="Email ID"
              name="email"
              type="text"
              register={register}
              errors={errors?.email?.message}
            />
            <FormField
              label="Position"
              name="position"
              type="text"
              register={register}
              errors={errors?.position?.message}
            />
            <FormField
              label="Department"
              name="department"
              type="text"
              register={register}
              errors={errors?.department?.message}
            />

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
