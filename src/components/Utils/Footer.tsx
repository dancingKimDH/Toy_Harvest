import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <div className="flex justify-center relative bottom-0 w-full">
            <div className="mx-auto p-2 w-[95%] bg-primaryBrown m-4 rounded-lg shadow-lg">
                <div className="flex flex-col p-3">
                    <h1 className="text-$primaryDark font-semibold text-lg">(주)푸른대로</h1>
                    <div className="flex text-$primaryDark pt-3 items-center">
                        <span className="pr-2 text-white"><FaPhoneAlt /></span>
                        <span className="pl-2 font-semibold">010-1234-1234</span>
                    </div>
                    <div className="flex text-$primaryDark pt-3 items-center">
                        <span className="pr-2 text-white"><MdEmail /></span>
                        <span className="pl-2 font-semibold">abc@abc.com</span>
                    </div>
                </div>
            </div>

        </div>
    )
}