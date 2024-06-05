import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Product", path: "/dashboard/product" },
    { title: "Category", path: "/dashboard/category" },
    { title: "Order", path: "/dashboard/order" },
    { title: "Bill", path: "/dashboard/bill" },
    { title: "Users", path: "/dashboard/users" },
];

export default function DashboardSidebar() {
    const router = useRouter();
    const [user, setUser] = useUser();

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/");
    }
  return (
    <div>
        {
            navLinks.map((link, index) => (
                <Link href={link.path} key={index + link.title} className={`${ router.pathname === link.path ? "bg-red-500 text-white" : "" } block text-center w-full px-2 py-3 my-1 shadow-sm`}>{link.title}</Link>
            ))
        }
        <button onClick={logout} className="text-center w-full px-2 py-3 my-1 shadow-sm">Log out</button>
    </div>
  )
}
