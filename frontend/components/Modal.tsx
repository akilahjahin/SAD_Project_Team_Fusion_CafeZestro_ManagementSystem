import { useModal } from "@/hooks/useModal";
import { PropsWithChildren } from "react";

export default function Modal({children}: PropsWithChildren) {
    const [modal, setModal] = useModal();

    if (modal === null) {
        return <></>;
    }
    return (
    <div className="fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center">
        <div onClick={() => setModal(null)} className="bg-black bg-opacity-40 absolute top-0 left-0 right-0 bottom-0" />
        <div className="z-10">
            {children}
        </div>
    </div>
  )
}
