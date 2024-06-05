import { useModal } from "@/hooks/useModal";
import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";

export default function CategoryAdd() {
    const [modal, setModal] = useModal();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        try {
            await axios.post(serverURL + "/category/add", form, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            alert("Category added successfully!");
            setModal(null);
            location.search = "";
        } catch (error) {
            console.log(error)
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
            setModal(null);
        }
    }
  return (
    <div className="bg-white rounded-md shadow overflow-auto max-w-2xl w-full">
        <h1 className="text-center bg-red-500 font-semibold text-white p-4 text-2xl">ADD Category</h1>
        <form onSubmit={submit} className="p-4">
        <input type="name" name="name" id="name" placeholder="Category Name" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border-2" />
        <div className="text-center">
                <button className="px-4 py-2 bg-red-500 rounded-md text-white text-center">Add</button>
            </div>
        </form>

    </div>
  )
}
