"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import InternshipTable from "../internshipTable";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Link from "next/link";

interface InternshipData {
  intID: string;
  firstName: string;
  role: string;
  category: string;
  courseContent: string;
  email: string;
  status: string;
}

const Intern: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const getURLparam = searchParams.get("tab") || "request";

  const [interns, setInterns] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInterns = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Internship"));
      const fetchedData: InternshipData[] = querySnapshot.docs.map((doc) => ({
        intID: doc.id,
        ...(doc.data() as Omit<InternshipData, "intID">),
      }));
      setInterns(fetchedData);
    } catch (error) {
      console.error("Error fetching interns:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterns();
  }, []);

  const handleClick = () => {
    router.push("/internship/addInternship");
  };

  return (
    <main>
      <h1 className="flex gap-2 items-center text-mediumlite_grey text_size_2 my-5">
        <Link href="/internship" className="text-3xl">
          <MdOutlineKeyboardBackspace />
        </Link>
        Internship
      </h1>

      <section>
        <nav className="relative flex justify-end p-7 text-xl font-semibold text-gray">
          <div>
            <button
              className="center rounded space-x-2 bg-primary text-white px-5 py-2"
              onClick={handleClick}
            >
              <span>Add</span>
              <FaPlus />
            </button>
          </div>
        </nav>
      </section>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <InternshipTable data={interns} />
      )}
    </main>
  );
};

export default Intern;
