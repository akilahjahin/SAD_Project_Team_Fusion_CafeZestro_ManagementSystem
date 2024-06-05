import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useModal } from "@/hooks/useModal";
import { useEffect, useState } from "react";
import ProductItem, { Product } from "@/components/ProductItem";
import axios from "axios";
import { serverURL } from "@/libs/const";
import Modal from "@/components/Modal";
import AddProduct from "@/components/AddProduct";

const inter = Inter({ subsets: ["latin"] });

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [initProducts, setInitProducts] = useState<Product[]>([]);
  const [modal, setModal] = useModal();

  useEffect(() => {
    axios.get(serverURL + '/product/get', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((response) => {
        console.log(response.data);
        setProducts(response.data)
        setInitProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
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
            <div className="text-end rounded-md p-4 bg-white shadow">
              <button className='px-4 py-2 bg-red-500 text-white rounded-md' onClick={() => setModal("product-add")}>Add Product</button>
            </div>
          <div className="overflow-auto">
            <table className='table-fixed overflow-auto text-center rounded-md p-4 bg-white shadow my-4'>
              <thead>
                <tr>
                  <th className="w-52">Name</th>
                  <th className="w-52">Category</th>
                  <th className="w-52">Description</th>
                  <th className="w-52">Price</th>
                  <th className="w-52">Status</th>
                  <th className="w-52">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product) => (
                    <ProductItem product={product} key={product.id} setProducts={setProducts} />
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {
        modal == "product-add" && (
        <Modal>
            <AddProduct />
        </Modal>
        )
      }
    </main>
  );
}
