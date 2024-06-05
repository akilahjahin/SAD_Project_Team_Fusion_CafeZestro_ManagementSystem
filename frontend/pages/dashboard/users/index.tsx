import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import User, { UserProps } from "@/components/User";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverURL } from "@/libs/const";

const inter = Inter({ subsets: ["latin"] });

export default function Users() {
  const [initialUsers, setInitialUsers] = useState<UserProps[]>([]);
  const [users, setUsers] = useState<UserProps[]>([]);

  useEffect(() => {
    axios.get(serverURL + '/user/get', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data)
        setInitialUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function filterUsers(e: any) {
    const search = e.target.value;
    if(!search) return setUsers(initialUsers);
    setUsers(users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.contactNumber.toLowerCase().includes(search)
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
          <div className="p-3 bg-white rounded-md">
            <input type="search" name="search" id="search" placeholder="Filter" className="w-full bg-black bg-opacity-10 p-3 rounded-sm shadow border-b border-black outline-none" onChange={filterUsers} />
          </div>

          <div className="py-6 overflow-auto">
            <div className="p-4 bg-white overflow-auto">
              <table className="table-fixed w-full overflow-auto text-center">
                <thead>
                  <tr className="p-4 border-b border-gray-200 text-sm text-gray-500">
                    <td className="">Name</td>
                    <td className="">Email</td>
                    <td className="">Contact Number</td>
                    <td className="">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user, index) => (
                      <User key={index} id={user.id} name={user.name} email={user.email} contactNumber={user.contactNumber} status={user.status} />
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
