import Modal from "react-modal";
import { useState } from "react";

interface ProfileModalProps {
    name: string,
    email: string,
    createdAt: string,
    modal: string,
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProfileModal ({name, email, createdAt, modal, setModal}: ProfileModalProps) {
    
    return(
        <div className="">
            <div className="">
                <img className="" src="" alt="" />
            </div>
            <div>
                <p>{name}</p>
                <p>{email}</p>
                <p>{createdAt}</p>
            </div>
            <button type="button" onClick={() => setModal("")}>Close</button>
        </div>
    )
}