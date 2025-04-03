const EmpTSOtherDetails: React.FC = () => {
  return (
    <section className="flex justify-between items-center m-10 w-full min-w-xl max-w-5xl">
      <div className="flex-col center gap-3">
        <p className="text-base font-semibold text-gray">Employee id Number</p>
        <p className="border-b-1 pb-2  w-full text-center border-gray ">
          signature
        </p>
      </div>
      <div className="flex-col center gap-3">
        <p className="text-base font-semibold text-gray">Employee id Number</p>
        <p className="border-b-1 pb-2  w-full text-center border-gray">ID</p>
      </div>
      <div className="flex-col center gap-3">
        <p className="text-base font-semibold text-gray">Reportees</p>
        <p className="border-b-1 pb-2  w-full text-center border-gray">
          select
        </p>
      </div>
    </section>
  );
};
export default EmpTSOtherDetails;
