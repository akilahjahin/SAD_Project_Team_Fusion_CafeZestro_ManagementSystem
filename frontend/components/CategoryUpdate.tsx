import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { CategoryProps } from "./Category";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/router";

export default function CategoryUpdate() {
    const [modal, setModal] = useModal();
    const router = useRouter();
    const { id, name } = router.query;
    const updateName = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const _name = new FormData(form).get('name') as string;

        axios.patch(serverURL + '/category/update', {
            id, name: _name
        }, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then((response) => {
            console.log(response.data);
            setModal(null);
            alert("Category updated successfully!");
            location.search = "";
        }).catch((error) => {
            console.log(error);
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
        });
    };
    return (
        <div className="bg-white rounded-md shadow overflow-auto max-w-2xl w-full">
            <h1 className="text-center bg-red-500 font-semibold text-white p-4 text-2xl">UPDATE CATEGORY</h1>
            <form onSubmit={updateName} className="p-4">
                <input defaultValue={name} type="name" name="name" id="name" placeholder="Name" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border-2" />
                <div className="text-center">
                    <button className="px-4 py-2 bg-red-500 rounded-md text-white text-center">Update</button>
                </div>
            </form>
        </div>

    )
}
