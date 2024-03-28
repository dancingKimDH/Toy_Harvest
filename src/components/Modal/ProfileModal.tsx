import Modal from "react-modal";
import { useState } from "react";

interface ProfileModalProps {
    name: string,
    email: string,
    createdAt: string,
    modal: string,
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProfileModal({ name, email, createdAt, modal, setModal }: ProfileModalProps) {

    const isOpen = !!modal;

    return (
        <Modal isOpen={isOpen} onRequestClose={() => setModal("")}>
            <h1>프로필</h1>
            <h2>{name}</h2>
            <h3>{email}</h3>
            <h3>{createdAt}</h3>
            <button type="button" onClick={() => setModal("")}>Close</button>
        </ Modal>


    )
}