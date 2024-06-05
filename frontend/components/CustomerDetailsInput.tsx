import React, { ChangeEvent, FC, useState } from 'react';

interface CustomerDetails {
    name: string;
    email: string;
    contactNumber: string;
    paymentMethod: string;
}

interface CustomerDetailsInputProps {
    onChange: (details: CustomerDetails) => void;
}

const CustomerDetailsInput: FC<CustomerDetailsInputProps> = ({ onChange }) => {
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
        name: '',
        email: '',
        contactNumber: '',
        paymentMethod: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedDetails = { ...customerDetails, [name]: value };
        setCustomerDetails(updatedDetails);
        onChange(updatedDetails);
    };

    return (
        <div className='flex flex-wrap gap-4 justify-between items-center'>
            <div>
                <input
                    className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'
                    type="text" 
                    name="name" 
                    placeholder="Name" 
                    value={customerDetails.name} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <input
                    className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={customerDetails.email} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <input
                    className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'
                    type="text" 
                    name="contactNumber" 
                    placeholder="Contact Number" 
                    value={customerDetails.contactNumber} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <select
                    className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'
                    name="paymentMethod" 
                    value={customerDetails.paymentMethod} 
                    onChange={handleChange}
                >
                    <option value="">Select Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                </select>
            </div>
        </div>
    );
};

export default CustomerDetailsInput;
