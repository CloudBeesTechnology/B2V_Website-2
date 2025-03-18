import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
