import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useEffect, useState } from "react";
import CategoryItem, { CategoryProps } from "@/components/Category";
import { useModal } from "@/hooks/useModal";
import { serverURL } from "@/libs/const";
import axios from "axios";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Category() {
  const [modal, setModal] = useModal();
  const [initialCs, setInitialCs] = useState<CategoryProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    const id = router.query?.id;
    if(!id) return;
    setCategories(c => c.map(cat => cat.id == id ? { ...cat, name: router.query?.name as string } : cat));
  }, [router.query?.name])

  useEffect(() => {
    axios.get(serverURL + '/category/get', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((response) => {
        console.log(response.data);
        setCategories(response.data)
        setInitialCs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function filterCategory(e: any) {
    const search = e.target.value;
    if (!search) return setCategories(initialCs);
    setCategories(categories.filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase())
    ));
  }
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
          <div className="my-4 p-4 flex justify-between items-center bg-white">
            <span className="font-bold">Manage Categories</span>
            <button onClick={() => setModal("category-add")} className="px-4 py-2 rounded-md text-white bg-red-500">Add</button>
          </div>

          <div className="p-3 bg-white rounded-md">
            <input type="search" name="search" id="search" placeholder="Filter" className="w-full bg-black bg-opacity-10 p-3 rounded-sm shadow border-b border-black outline-none" onChange={filterCategory} />
          </div>

          <div className="py-6 overflow-auto">
            <div className="p-4 bg-white overflow-auto">
              <table className="table-fixed w-full overflow-auto text-center">
                <thead>
                  <tr className="p-4 border-b border-gray-200 text-sm text-gray-500">
                    <td className="">Name</td>
                    <td className="">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    categories.map((c, index) => (
                      <CategoryItem id={c.id} name={c.name} key={"Categry" + index} />
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
