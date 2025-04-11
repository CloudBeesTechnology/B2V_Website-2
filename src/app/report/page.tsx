import ReportDetails from "./reportDetails/page";
import ReportTiles from "./reportTiles";

const Report: React.FC = () => {
  return (
    <main>
      <ReportTiles />
      <ReportDetails />
    </main>
  );
};
export default Report;
