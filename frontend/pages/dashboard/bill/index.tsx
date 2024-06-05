import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import BillItem, { BillItemProps } from "@/components/Bill";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "@/libs/const";

const inter = Inter({ subsets: ["latin"] });

export default function Bills() {
  const [bills, setBills] = useState([] as BillItemProps[]);
  useEffect(() => {
    document.title = "Bill";
    axios.get(serverURL + "/bill/getBills", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })
      .then(({ data }) => {
        console.log(data);
        setBills(data);
      })
      .catch((error) => {
        console.log(error);
      }
    )
  }, []);

  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <Navbar />
      <div className="grid grid-cols-4 min-h-no-nav bg-gray-100">
        <div className="col-span-1 shadow bg-white pt-5">
          <DashboardSidebar />
        </div>
        <div className="col-span-3 p-4">
          <div className="bg-white p-4 rounded-md shadow">
          {
            bills.map((bill, index) => (
              <BillItem key={index} {...bill} />
            ))
          }
          </div>
        </div>
      </div>
    </main>
  );
}
