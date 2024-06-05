import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`min-h-screen ${inter.className}`}
    >
      <Navbar/>
      <div className="bg-[url(/assets/img/food1.jpg)] min-h-no-nav bg-center bg-cover" />
    </main>
  );
}
