import { FC, useState} from 'react';
import { FaFileDownload } from "react-icons/fa";
import { FaEye, FaTrash } from 'react-icons/fa';
import DeleteBillDialogBox from "./DeleteBillDialogBox"
import { useModal } from '@/hooks/useModal';
import Modal from './Modal';
import ViewBill from './ViewBill';
import axios from 'axios';
import { serverURL } from '@/libs/const';

export interface BillItemProps {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  paymentMethod: string;
  productDetails: string;
  total: number;
  uuid: string;
}

const BillItem: FC<BillItemProps> = (props:BillItemProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [modal, setModal] = useModal();

  const download = async() => {
    try {
      const response = await fetch(serverURL+'/bill/getPdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify(props),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${props.uuid}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
    }
  const handleDeleteClick = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };


  return (
    <div className="flex justify-between items-center p-4 border-b border-gray-200">
      <span className="flex-1">{props.name}</span>
      <span className="flex-1">{props.email}</span>
      <span className="flex-1">{props.contactNumber}</span>
      <span className="flex-1">{props.paymentMethod}</span>
      <span className="flex-1">{props.total}</span>
      <div className="flex space-x-2 gap-4">
        <button onClick={() => setModal("view-bill")} className="text-red-600 hover:text-red-800">
          <FaEye />
        </button>
        <button onClick={download} className="text-red-600 hover:text-red-800">
          <FaFileDownload />
        </button>
        <button onClick = {handleDeleteClick} className="text-red-600 hover:text-red-800">
          
          <FaTrash />
        </button>
      </div>
      <DeleteBillDialogBox
        isOpen={isDialogOpen}
        onClose={closeDialog}
        name={props.name}
        id={props.id}
      />
      {
        modal == "view-bill" && (
          <Modal><ViewBill {...props} /></Modal>

        )
      }
    </div>
  );
};

export default BillItem;
