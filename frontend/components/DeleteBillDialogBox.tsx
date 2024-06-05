import { FC, Fragment } from 'react';
import { Dialog, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import axios from 'axios';
import { serverURL } from '@/libs/const';

interface DeleteBillDialogBoxProps {
  isOpen: boolean;

  onClose: () => void;
  name: string;
  id: string;
}

const DeleteBillDialogBox: FC<DeleteBillDialogBoxProps> = ({ isOpen, onClose, name, id }) => {

  function onDelete() {
    axios.delete(`${serverURL}/bill/delete/${id}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    }).then(() => {
      alert("Bill deleted successfully!")
      onClose();
      location.reload();
    }).catch(error => {
      console.error(error);
      alert(error.message);
      onClose();
    }
    )
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
          </TransitionChild>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <DialogTitle as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Delete Bill
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete the bill for {name}?
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={onDelete}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={onClose}
                >
                  No
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteBillDialogBox;
