import { useState, useEffect, ChangeEvent, FC, Dispatch } from 'react';
import axios, { AxiosError } from 'axios';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';
import { FaPen, FaTrash } from 'react-icons/fa';
import { CategoryProps } from './Category';
import { serverURL } from '@/libs/const';
import { SetStateAction } from 'jotai';
import Modal from './Modal';
import { useModal } from '@/hooks/useModal';
import ProductUpdate from './ProductUpdate';

export interface Product {
  id: number;
  name: string;
  category: string;  // corrected type for category
  categoryId: string;  // corrected type for category
  description: string;
  price: number;
  status: string;
}


const ProductItem = ({product, setProducts}:{product:Product, setProducts:Dispatch<SetStateAction<Product[]>>}) => {
  const [modal, setModal] = useModal();
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [_product, setProduct] = useState<Product>(product);


  const handleStatusChange = (product: Product) => {
    axios.patch(`${serverURL}/product/update`, {
      ...product,
      status: product.status == "true" ? 'false' : 'true',
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(() => {
      setProduct(p => ({...p, status: product.status == "true" ? 'false' : 'true'}));
    });
  }

  const handleEditShow = () => {
    setModal("product-update");
  }


  const handleDelete = () => {
    axios.delete(`${serverURL}/product/delete/${_product.id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(() => {
      setProducts(products => products.filter(p => p.id !== _product.id));
      alert("Product deleted successfully!")
    })
    .catch(error => {
      console.error(error);
      alert(((error as AxiosError).response?.data as any)?.message || (error as AxiosError).message || JSON.stringify(error));
    })

  }

  return (
            <tr>
              <td className='min-w-52 text-ellipsis overflow-hidden py-3'>{_product.name}</td>
              <td className='min-w-52 text-ellipsis overflow-hidden py-3'>{_product.category}</td>
              <td className='min-w-52 text-ellipsis my-3 line-clamp-4'>{_product.description}</td>
              <td className='min-w-52 text-ellipsis overflow-hidden py-3'>{_product.price}</td>
              <td className='min-w-52 text-ellipsis overflow-hidden py-3'>
                <button onClick={() => handleStatusChange(_product)} className="text-red-600 hover:text-red-800">
                  {
                    _product.status == "true" ? <BsToggle2On size={28} /> : <BsToggle2Off color='gray' size={28} />
                  }
                </button>
                </td>
                <td className='min-w-52 text-ellipsis overflow-hidden py-3 space-x-4'>
                <button className="text-red-600 hover:text-red-800" onClick={handleEditShow}><FaPen size={28} /></button>
                <button className="text-red-600 hover:text-red-800" onClick={handleDelete}><FaTrash size={28} /></button>
                {
                  modal == "product-update" &&
                  (<Modal>
                    <ProductUpdate product={_product} setProduct={setProduct} />
                  </Modal>)
                }
              </td>
            </tr>
  );
};

export default ProductItem;
