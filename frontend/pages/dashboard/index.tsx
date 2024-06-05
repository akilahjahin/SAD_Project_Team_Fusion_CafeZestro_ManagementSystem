import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { serverURL } from "@/libs/const";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Dashboard() {
    const [details, setDetails] = useState<{bill: number, category: number, product: number} | null>(null);
    useEffect(() => {
        document.title = "Dashboard";
        axios.get(serverURL+"/dashboard/details", {
            headers: {
                "Authorization": "Bearer "+localStorage.getItem("token")
            }
        }).then(({ data }) => {
            setDetails(data);
        }).catch((error) => {
            console.log(error);
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
        });
    }, []);
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <Navbar/>
        <div className="grid grid-cols-4 min-h-no-nav bg-gray-100">
            <div className="col-span-1 shadow bg-white pt-5">
                <DashboardSidebar/>
            </div>
            <div className="col-span-3 grid justify-center items-start lg:grid-cols-3 md:grid-cols-2 gap-6 px-4 py-6">
                <div className="rounded-md p-4 shadow bg-white">
                    <h2 className="text-lg text-center">Total Categories: <span className="font-bold text-xl">{details?.category ?? "loading"}</span></h2>
                    <Link href="/dashboard/category" className="block w-full px-4 text-center py-2 bg-red-500 text-white mt-4">View Categories</Link>
                </div>
                <div className="rounded-md p-4 shadow bg-white">
                    <h2 className="text-lg text-center">Total Products: <span className="font-bold text-xl">{details?.product ?? "loading"}</span></h2>
                    <Link href="/dashboard/product" className="block w-full px-4 text-center py-2 bg-red-500 text-white mt-4">View Products</Link>
                </div>
                <div className="rounded-md p-4 shadow bg-white">
                    <h2 className="text-lg text-center">Total Bill: <span className="font-bold text-xl">{details?.bill ?? "loading"}</span></h2>
                    <Link href="/dashboard/bill" className="block w-full px-4 text-center py-2 bg-red-500 text-white mt-4">View Bill</Link>
                </div>
            </div>
        </div>
    </main>
  );
}
