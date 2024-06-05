import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import Order from "@/components/Order";

const inter = Inter({ subsets: ["latin"] });

export default function Orders() {
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <Navbar/>
        <div className="grid grid-cols-4 min-h-no-nav bg-gray-100">
            <div className="col-span-1 shadow bg-white pt-5">
                <DashboardSidebar/>
            </div>
            <div className="col-span-3 p-4">
              <Order />
            </div>
        </div>
    </main>
  );
}
