import Image from "next/image"
import ok from "../../public/assets/popup/Animation - 1745910758827.gif"

export const SuccessPopUp = () => {
  return (
    <section className="fixed top-0 left-0 w-full border z-[99999] min-h-screen center">
      <div className="max-w-sm w-full bg-white p-5 rounded-md flex flex-col gap-5 center shadow-2xl">
        <Image src={ok} alt="not found gif" width={70} />
        <p className="text-gray text-center text-lg">
          Successfully Submit Data!
        </p>
        <div className="center">

        <button type="submit" className="bg-primary px-5 py-2 rounded-sm text-white"><a href="/employee">Okay</a> </button>
        </div>
      </div>
    </section>
  );
};
