import { useRouter } from 'next/router';
import { createContext, ReactNode } from "react";
import { useToasts } from "react-toast-notifications";
import api from "../service/api";

export interface FriendInterface {
    name: String;
    cellphone: String;
    email: String;
    photo: File;
}

interface FriendContextData {
    deleteFriend: ({ id }) => void;
    addFriend: (f: FriendInterface) => void;
}

interface FriendProviderDataProps {
    children: ReactNode;
}

export const FriendContext = createContext({} as FriendContextData);

export function FriendProvider({ children }: FriendProviderDataProps) {
    const { addToast } = useToasts();
    const router = useRouter();

    function deleteFriend(id) {
        api.delete(`/friends/${id}`)
            .then(() => {
                router.push('/');
            })
            .catch((err) => {
                addToast(err, { appearance: 'error', autoDismiss: true });
            });
    }

    function addFriend(f: FriendInterface) {
        const formData = new FormData();
        formData.append('name', String(f.name));
        formData.append('cellphone', String(f.cellphone));
        formData.append('email', String(f.email));
        formData.append('fphoto', f.photo);

        api.post('/friends', formData).then(() => {
            router.push('/');
        }).catch((err) => {
            addToast(err, { appearance: 'error', autoDismiss: true });
        })

    }

    return (
        <FriendContext.Provider value={{
            deleteFriend,
            addFriend
        }} >
            {children}
        </FriendContext.Provider>
    )
}