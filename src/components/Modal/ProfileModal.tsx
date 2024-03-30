import { useEffect, useState } from "react";
import ReactModal from "react-modal";

interface ProfileModalProps {
    postUid: string,
    modal: string,
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProfileModal({ postUid, modal, setModal }: ProfileModalProps) {

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");

    useEffect(() => {

        fetchUser();
    }, [postUid]);

    const fetchUser = () => {

    }

    const isOpen = !!modal;
    console.log(postUid);

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
    }

    return ( 
        <ReactModal  appElement={document.getElementById('modal') || undefined} className="rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] flex justify-center" 
        isOpen={isOpen} onRequestClose={() => setModal("")} ariaHideApp={false} shouldCloseOnEsc={true} style={modalStyle}>
            <div className="flex flex-col items-center">
                <img className="lg:m-[30px] mt-[25px] mb-[10px] w-[150px] h-[150px] rounded-full" src="/images/2.jpg" alt="" />
                <h2 className="lg:text-[30px] text-center text-lg font-semibold">{name}</h2>
                <h3 className="lg:text-[20px] text-center text-gray-600">{email}</h3>
                <h3 className="lg:text-[20px] mb-3 text-center text-gray-600">{createdAt}</h3>
            </div>
            <button className="lg:text-[20px] hover:bg-blue-700 text-sm text-white bg-primaryBlue p-3 mx-auto fixed text-center rounded-lg w-full bottom-0" type="button" onClick={() => setModal("")}>닫기</button>
        </ ReactModal>


    )
}