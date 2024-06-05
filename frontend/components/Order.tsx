import React, { FC, MouseEvent, useMemo, useState } from 'react';
import CustomerDetailsInput from './CustomerDetailsInput';
import SelectProductInput from './SelectProductInput';
import AddProduct from './AddProduct';
import axios from 'axios';
import { serverURL } from '@/libs/const';

interface CustomerDetails {
    name: string;
    email: string;
    contactNumber: string;
    paymentMethod: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    total: number;
}

const Order: FC = () => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        email: '',
        contactNumber: '',
        paymentMethod: ''
    });

    const [products, setProducts] = useState<Product[]>([]);
    const totalAmount = useMemo(() => products.reduce((acc, product) => acc + product.total, 0), [products]);
    const handleCustomerDetailsChange = (details: CustomerDetails) => {
        setCustomerDetails(details);
    };

    const handleAddProduct = (product: Product) => {
        setProducts(ps => {
            const itemIndex = ps.findIndex(item => item.id === product.id);
            if (itemIndex !== -1) {
            // Update existing item
            return ps.map(item => (item.id === product.id ? product : item));
            } else {
            // Add new item
            return [...ps, product];
            }
        });
        // setTotalAmount(totalAmount + product.total);
    };

    const handleDeleteProduct = (index: number) => {
        const productToRemove = products[index];
        setProducts(products.filter((_, i) => i !== index));
    };

    const handleSubmit = (e:MouseEvent) => {
        if(customerDetails.name === '' || customerDetails.email === '' || customerDetails.contactNumber === '' || customerDetails.paymentMethod === '') {
            alert('Please fill all the fields');
            return;
        }
        (e.target as HTMLButtonElement).disabled = true;
        const btnText = (e.target as HTMLButtonElement).textContent;
        (e.target as HTMLButtonElement).textContent = "Loading...";
        const orderDetails = {
            ...customerDetails,
            productDetails: JSON.stringify(products),
            totalAmount
        };

        axios.post(serverURL+'/bill/generateReport', orderDetails, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          }  
        })
            .then(response => {
                // Handle success
                console.log(response.data);
                (e.target as HTMLButtonElement).disabled = false;
                (e.target as HTMLButtonElement).textContent = btnText;
            })
            .catch(error => {
                // Handle error
                console.error(error);
            });
    };

    return (
        <div>
            <div className='bg-white p-4 rounded shadow'>
                <h3 className='font-bold'> Customer Details: </h3>
                <CustomerDetailsInput onChange={handleCustomerDetailsChange} />
            </div>
            <div className='bg-white p-4 my-4 rounded shadow'>
                <h3 className='font-bold'> Select Product: </h3>
                <SelectProductInput onAddProduct={handleAddProduct} />
            </div>
            <div className='flex justify-between items-center p-4 rounded-md bg-white my-4'>
                <h3>Total Amount: {totalAmount}</h3>
                <button className='px-4 py-2 bg-red-500 text-white' onClick={handleSubmit} disabled={products.length === 0}>Submit & Get Bill</button>
            </div>

            <div className='bg-white p-4 rounded shadow'>
            {
                products.map((product, index) => (
                    <div key={product.id} className='flex justify-between items-center border-b border-gray-300 py-2'>
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.category}</p>
                        </div>
                        <div>
                            <h3>Price: {product.price}</h3>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                        <div>
                            <h3>Total: {product.total}</h3>
                            <button onClick={() => handleDeleteProduct(index)} className='px-4 py-2 bg-red-500 text-white'>Delete</button>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default Order;
