import { useModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react"

export default function Login() {
    const [modal, setModal] = useModal();
    const [user, setUser] = useUser();

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        try {
            const { data } = await axios.post(serverURL + "/user/login", form, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert("Login successful.");
            localStorage.setItem("token", (data as any).token);
            setUser((data as any).user);
            setModal(null);
        } catch (error) {
            console.log(error)
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
            setModal(null);
        }
    }
  return (
    <div className="bg-white rounded-md shadow overflow-auto max-w-xl w-full">
        <h1 className="text-center bg-red-500 font-semibold text-white p-4 text-2xl">LOGIN</h1>
        <form className="p-4" onSubmit={submit}>
            <input type="email" name="email" id="email" placeholder="Email" className=" p-3 my-3 rounded-md border-red-400 outline-none w-full border-2" />
            <input type="password" name="password" id="password" placeholder="Password" className=" p-3 my-3 rounded-md border-red-400 outline-none w-full border-2" />
            <div className="text-center">
                <button className="px-4 py-2 bg-red-500 rounded-md text-white text-center">Login</button>
            </div>
            <div className="py-4">
                <button onClick={()=>setModal("forgotPassword")} className="text-red-500">Forgot password?</button>
            </div>
        </form>
    </div>
  )
}
