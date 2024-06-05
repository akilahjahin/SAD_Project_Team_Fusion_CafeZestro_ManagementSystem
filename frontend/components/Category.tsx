import { useModal } from '@/hooks/useModal';
import { serverURL } from '@/libs/const';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { FaPen } from "react-icons/fa";
import Modal from './Modal';
import CategoryUpdate from './CategoryUpdate';

export interface CategoryProps {
    id: string,
    name: string
}

const CategoryItem: FC<CategoryProps> = (props: CategoryProps) => {
    const [_, setModal] = useModal();
    const router = useRouter();

    function showCategoryUpdateModal() {
        router.push({
            pathname: router.pathname,
            query: { ...props },
        },
            undefined,
            { shallow: true }
        )
        setModal("category-update");
    }

    return (
        <>
            <tr className="p-4 border-b border-gray-200">
                <td className="min-w-56 text-ellipsis overflow-hidden py-3">{props.name}</td>

                <td className="space-x-2">
                    <button onClick={showCategoryUpdateModal} className="text-red-600 hover:text-red-800">
                        <FaPen size={28} />
                    </button>
                </td>
            </tr>
        </>
    );
};

export default CategoryItem;
