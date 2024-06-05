import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverURL } from '@/libs/const';

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
}

interface SelectProductInputProps {
    onAddProduct: (product: any) => void;
}

const SelectProductInput: React.FC<SelectProductInputProps> = ({ onAddProduct }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
        axios.get(serverURL + '/category/get',{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            axios.get(`${serverURL}/product/getByCategory/${selectedCategory}`, {
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [selectedCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(Number(e.target.value));
        setSelectedProduct(null);
    };

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const product = products.find(p => p.id === Number(e.target.value));
        setSelectedProduct(product || null);
        setQuantity(1);
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            const productToAdd = {
                ...selectedProduct,
                quantity,
                total: selectedProduct.price * quantity
            };
            onAddProduct(productToAdd);
        }
    };

    return (
        <div>

            <div className='flex flex-wrap gap-4 justify-between items-center'>
                <div>
                    <select onChange={handleCategoryChange} className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select onChange={handleProductChange} disabled={!selectedCategory} className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'>
                        <option value="">Select Product</option>
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <input
                        className='p-3 rounded border border-red-400 outline-none bg-black bg-opacity-5'
                        type="number" 
                        value={quantity} 
                        min="1" 
                        onChange={(e) => setQuantity(Number(e.target.value))} 
                    />
                </div>
            </div>
            
            <div className='pt-4'>
                <button onClick={handleAddProduct} disabled={!selectedProduct} className='px-4 py-2 rounded-md bg-red-500 text-white'>Add</button>
            </div>
        </div>
    );
};

export default SelectProductInput;
