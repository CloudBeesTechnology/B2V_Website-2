import Image from "next/image";
import birth from "../../assets/home/image 7.svg";

export const Birthday = () => {
  return (
    <section className="rounded-xl px-5 py-8 shadow-xl h-full">
      <div className=" pb-1">
        <p className="text-gray text-text_size_3">Birthdays</p>
      </div>
      <div className="space-y-2 mt-2 px-8">
        <p className="text-gray text_size_5 flex items-center justify-between">
          April 3 - Arthi{" "}
          <span>
            <Image src={birth} alt="birthdays icon not found" />
          </span>
        </p>
        <p className="text-gray text_size_5 flex items-center justify-between">
          April 3 - Arthi <Image src={birth} alt="birthdays icon not found" />
        </p>
        <p className="text-gray text_size_5 flex items-center justify-between">
          April 3 - Arthi <Image src={birth} alt="birthdays icon not found" />
        </p>
        <p className="text-gray text_size_5 flex items-center justify-between">
          April 3 - Arthi <Image src={birth} alt="birthdays icon not found" />
        </p>
      </div>
    </section>
  );
};
