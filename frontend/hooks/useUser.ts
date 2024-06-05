import {atom, useAtom} from "jotai";

interface User {
    name: string;
    email: string;
    contactNumber: string;
}

const userAtom = atom<User | null>(null);

export const useUser = () => {
    return useAtom(userAtom);
}