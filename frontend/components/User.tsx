import { serverURL } from '@/libs/const';
import axios, { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';
// import { FaFileDownload, FaEye, FaTrash } from 'react-icons/fa';
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

export interface UserProps {
    id: string,
    name: string,
    email: string,
    contactNumber: string,
    status: string
}

const User: FC<UserProps> = (props: UserProps) => {
    const [status, setStatus] = useState<boolean>(props.status == "true");

    const updateStatus = (status:boolean) => {
        axios.patch(serverURL + '/user/update', {
            id: props.id, status: status ? "true" : "false" }, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }).then((response) => {
            console.log(response.data);
            setStatus(status);
        }).catch((error) => {
            console.log(error);
            alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
        });
    };

    return (
        <tr className="p-4 border-b border-gray-200">
            <td className="text-left min-w-56 text-ellipsis overflow-hidden py-3">{props.name}</td>
            <td className="min-w-56 text-ellipsis overflow-hidden py-3">{props.email}</td>
            <td className="min-w-56 text-ellipsis overflow-hidden py-3">{props.contactNumber}</td>

            <td className="space-x-2">
                <button onClick={() => updateStatus(!status)} className="text-red-600 hover:text-red-800">
                    {
                        status ? <BsToggle2On size={28} /> : <BsToggle2Off color='gray' size={28} />
                    }
                </button>
            </td>
        </tr>
    );
};

export default User;
