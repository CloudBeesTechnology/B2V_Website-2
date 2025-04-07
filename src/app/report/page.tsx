import ReportDetails from "./reportDetails/page";
import ReportTails from "./reportTails";

const Report: React.FC = () => {
  return (
    <main>
      <ReportTails />
      <ReportDetails />
    </main>
  );
};
export default Report;
