import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import { useEffect, useState } from "react";
import { MdOutlinePersonOff } from "react-icons/md";
import ReactModal from "react-modal";

interface ProfileModalProps {
    postUid: string,
    modal: string,
    setModal: React.Dispatch<React.SetStateAction<string>>
}

export default function ProfileModal({ postUid, modal, setModal }: ProfileModalProps) {

    const [user, setUser] = useState<any>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [createdAt, setCreatedAt] = useState<string>("");

    const fetchUser = async (postUid: string) => {
        try {
            let postRef = collection(db, "users");
            let userQuery = query(postRef, where("uid", "==", postUid));
            onSnapshot(userQuery, (snapShot) => {
                let dataObj = snapShot.docs.map((doc) => (
                    {
                        ...doc.data(),
                    }
                ))
                setUser(dataObj[0] as any);
                console.log(user);
            })
        } catch (error) {

        }
    }

    useEffect(() => {
        fetchUser(postUid);
    }, [postUid])

    const isOpen = !!modal;

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
    }

    return (
        <ReactModal appElement={document.getElementById('modal') || undefined} className="rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] flex justify-center outline-none"
            isOpen={isOpen} onRequestClose={() => setModal("")} ariaHideApp={false} shouldCloseOnEsc={true} style={modalStyle}>

            {user && user?.email && user?.email.length > 1 ?
                <div className="flex flex-col items-center">
                    <img className="lg:m-[30px] mt-[25px] mb-[10px] w-[150px] h-[150px] rounded-full" src={user?.imageUrl || "/images/3.jpg"} alt="" />
                    <h2 className="lg:text-[30px] lg:p-[15px] text-center text-lg font-semibold">{user?.name || ""}</h2>
                    <h3 className="lg:text-[20px] text-center text-gray-600">{user?.email || ""}</h3>
                    <h3 className="lg:text-[20px] mb-3 text-center text-gray-600">{user?.createdAt || ""}</h3>
                </div> :
                <div className="flex flex-col align-center justify-center mb-[50px]">
                    <MdOutlinePersonOff className="mx-auto w-[150px] h-[150px]" />
                    <div>
                        계정 정보가 존재하지 않습니다
                    </div>
                </div>
            }


            <button className="lg:text-[20px] hover:bg-blue-700 text-sm text-white bg-primaryBlue p-3 mx-auto fixed text-center rounded-lg w-full bottom-0" type="button" onClick={() => setModal("")}>닫기</button>
        </ ReactModal>


    )
}