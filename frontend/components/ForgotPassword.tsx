import { useModal } from "@/hooks/useModal";
import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";

export default function ForgotPassword() {
    const [modal, setModal] = useModal();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        try {
            await axios.post(serverURL + "/user/forgotPassword", form, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert("Check your email. The password reset link. has been sent.");
            setModal(null);
        } catch (error) {
            console.log(error)
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
            setModal(null);
        }
    }
  return (
    <div className="bg-white rounded-md shadow overflow-auto max-w-2xl w-full">
        <h1 className="text-center bg-red-500 font-semibold text-white p-4 text-2xl">FORGOT PASSWORD</h1>
        <form onSubmit={submit} className="p-4">
        <input type="email" name="email" id="email" placeholder="Email" className="p-3 my-3 rounded-md border-red-400 outline-none w-full border-2" />
        <div className="text-center">
                <button className="px-4 py-2 bg-red-500 rounded-md text-white text-center">Send reset link</button>
            </div>
        </form>
    </div>
  )
}
