import { useModal } from "@/hooks/useModal";
import SignUp from "./SignUp"
import { FaUserCircle } from "react-icons/fa";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import Modal from "./Modal";
import CategoryAdd from "./CategoryAdd";
import CategoryUpdate from "./CategoryUpdate";

function Navbar() {
    const [user, setUser] = useUser();
    const [modal, setModal] = useModal();

    return (
        <nav className="py-2 px-4 bg-red-500 flex justify-between items-center">
            <Link href={"/"}><h1 className="text-white text-3xl font-bold">CaféZestro</h1></Link>
            <div className="flex gap-4 text-white font-semibold">
                {
                    user != null ? (
                        <Link href="/dashboard">
                            <FaUserCircle size={36} />
                        </Link>
                    ) :

                    (
                        <>
                            <button onClick={() => setModal("signup")}>Sign up</button>
                            <button onClick={() => setModal("login")}>Login</button>
                        </>
                    )
                }
            </div>
            <Modal>
                {
                    modal === "signup" ? (<SignUp />)
                    : modal === "login" ? (<Login />)
                    : modal === "forgotPassword" ? (<ForgotPassword />)
                    : modal ==="category-add" ? (<CategoryAdd />)
                    : modal == "category-update" ? (<CategoryUpdate/>)
                    : ""

                }
            </Modal>
        </nav>
    )
}

export default Navbar
