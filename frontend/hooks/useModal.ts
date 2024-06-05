import {atom, useAtom} from "jotai";

type Modal = "login" | "signup" | "forgotPassword" | "category-add" | "category-update" | "product-add" | "product-update" | "view-bill" | null;

const modalAtom = atom<Modal>(null);

export const useModal = () => {
    return useAtom(modalAtom);
}