import { searchPageVisibilityState } from "atom"
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineCloseFullscreen } from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil"

export default function SearchPage() {

    const navigate = useNavigate();

    const [searchPageVisibility, setSearchPageVisibility] = useRecoilState(searchPageVisibilityState);

    const [keyword, setKeyword] = useState<string>("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {target: {name, value}} = e;
        if(name === "keyword") {
            setKeyword(value);
        }
    }

    const searchHandle = (e: any) => {
        e.preventDefault();
        setSearchPageVisibility(false);
        navigate(`/community?keyword=${keyword}`);
    }

    const [isOpen, setIsOpen] = useRecoilState(searchPageVisibilityState);

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 w-full bg-primaryYellow z-99">
                <button className="text-white float-right pr-[25px] mt-[80px]" type="button" onClick={() => setIsOpen(!isOpen)}><MdOutlineCloseFullscreen className="w-[30px] h-[30px]" /></button>
                <div className="flex w-full h-full justfy-center">
                    <div className="flex justify-center fixed top-[30%] pt-2 w-full mx-auto ">
                        <form action="" onSubmit={searchHandle}>
                            <h1 className="p-5 text-primaryBlue font-semibold text-[20px] md:text-[40px]">커뮤니티에서 글을 검색해 보세요!</h1>
                            <div className="flex items-center justify-center">
                                <input onChange={onChange} className="w-[70%] border-2 border-gray-300 bg-white h-[50px] px-5 pr-16 rounded-lg text-sm focus:outline-none"
                                    type="search" name="keyword" placeholder="검색하기...">
                                </input>
                                <button type="submit" className=" text-white px-3">
                                    <FaSearch className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>


    )
}