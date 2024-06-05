import { useModal } from "@/hooks/useModal";
import { useUser } from "@/hooks/useUser";
import { serverURL } from "@/libs/const";
import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react"
import { BillItemProps } from "./Bill";

interface ProductDetailsProps{
    id: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
}
export default function ViewBill(props: BillItemProps) {
    const [modal, setModal] = useModal();
    const [bill, setBill] = useState<BillItemProps>(props);
    const [productDetails, setProductDetails] = useState<ProductDetailsProps[]>([]);

    useEffect(() => {
        try {
            setProductDetails(JSON.parse(bill.productDetails));
        } catch (error) {
            console.log(error)
        }
    }, [props]);

    return (
        <div className="bg-white rounded-md shadow overflow-auto w-full">
            <h1 className="text-center bg-red-500 font-semibold text-white p-4 text-2xl">VIEW BILL</h1>
            <div className="py-4 text-sm p-4">
                <div className="flex gap-4 justify-between">
                    <p>Name: <b>{bill.name}</b></p>
                    <p>Email: <b>{bill.email}</b></p>
                </div>
                <div className="flex gap-4 justify-between py-2">
                    <p>Payment Method: <b>{bill.paymentMethod}</b></p>
                    <p>Total Amount: <b>{bill.total}</b></p>
                </div>
                <p>Phone No.: <b>{bill.contactNumber}</b></p>
            </div>
            <div className="border rounded-md p-4">
                <p className="py-2 font-semibold">Products:</p>
                {
                    productDetails.map((product, index) => (
                        <div key={index} className="flex gap-4 justify-between py-2 border-b">
                            <p>{product.name} x {product.quantity}</p>
                            <p>{product.total}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
