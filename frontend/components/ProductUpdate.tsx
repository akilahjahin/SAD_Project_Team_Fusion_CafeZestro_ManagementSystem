import { useModal } from "@/hooks/useModal";
import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import { Dispatch, FormEvent, useEffect, useState } from "react";
import { CategoryProps } from "./Category";
import { Product } from "./ProductItem";
import { SetStateAction } from "jotai";


export default function ProductUpdate({product, setProduct}:{product:Product, setProduct: Dispatch<SetStateAction<Product>>}) {
    const [modal, setModal] = useModal();
    const [categories, setCategories] = useState<CategoryProps[]>([]);

    useEffect(() => {
        axios.get(serverURL + "/category/get", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setCategories(response.data);
            console.log(response.data)
        }).catch((error) => {
            console.error(error);
        });
    }, []);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        try {
            const data = Object.fromEntries(new FormData(form));
            await axios.patch(serverURL + "/product/update", {...data, id: product.id, status: data.status == "on" ? "true" : "false"}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Product Updated.");
            setProduct(p => ({...p, ...data, status: data.status == "on" ? "true" : "false"}));
            setModal(null);
        } catch (error) {
            console.log(error)
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
            setModal(null);
        }
    }
    return (
        <div className="bg-white rounded-md shadow overflow-auto max-w-2xl w-full">
            <h1 className="text-center bg-red-500 font-semibold text-white p-4 text-2xl">ADD PRODUCT</h1>
            <form onSubmit={submit} className="p-4">
                <input defaultValue={product.name} type="name" name="name" id="name" placeholder="Name" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border" />
                <textarea defaultValue={product.description} name="description" id="description" placeholder="Description" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border"></textarea>
                <input defaultValue={product.price} type="number" name="price" id="price" placeholder="Price" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border" />
                <label htmlFor="status" className="flex items-center my-2">
                    Status: {" "}
                    <input defaultChecked={product.status == "true" ? true : false} className="w-5 h-5 accent-red-500" type="checkbox" name="status" id="status" />
                </label>
                <select name="categoryId" id="categoryId" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border">
                    <option value="">Select Category</option>
                    {
                        categories.map((category) => (
                            <option selected={category.id == product.categoryId} key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
                <div className="text-center">
                    <button className="px-4 py-2 bg-red-500 rounded-md text-white text-center">ADD</button>
                </div>
            </form>
        </div>
    )
}
