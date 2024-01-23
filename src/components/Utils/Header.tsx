import { useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";


export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="header">
                <div className="header__title">
                    <div className="header__title-name">푸른대로</div>
                    <div className="header__title__menu">
                        <div className="header__title__menu-item"><IoSearch /></div>
                        <div role="presentation" className="header__title__menu-item" onClick={() => setIsOpen((val) => !val)}>
                            {isOpen ? <AiOutlineClose /> : <MdMenu />}
                        </div>
                        <div className="header__title__menu-item"><IoMdLogIn /></div>
                    </div>
                </div>

                {isOpen && (
                    <div className="bg-blue-500 w-screen h-screen z-50 px-4 py-4 leading-10 transition duration-300 ease-in-out
                    fixed top-[90px] right-0 bottom-0 left-0">
                        <ul className="">
                            <li className="">
                                <a href="/" className="text-lg text-white font-semibold tracking-wide">홈페이지</a>
                            </li>
                            <li className="">
                                <a href="/news" className="text-lg text-white font-semibold tracking-wide">귀농뉴스</a>
                            </li>
                            <li className="">
                                <a href="/community" className="text-lg text-white font-semibold tracking-wide">커뮤니티</a>
                            </li>
                            <li className="">
                                <a href="#" className="text-lg text-white font-semibold tracking-wide">QnA</a>
                            </li>
                            <li className="">
                                <a href="/mypage" className="text-lg text-white font-semibold tracking-wide">마이페이지</a>
                            </li>
                            <li className="">
                                <a href="/mypage" className="text-lg text-white font-semibold tracking-wide">공지사항</a>
                            </li>
                        </ul>
                    </div>
                )}

                <div className="header__nav">
                    <ul className="header__nav-items">
                        <li className="header__nav-items-back">
                            <a href="/" className="header__nav-items-item">홈페이지</a>
                        </li>
                        <li className="header__nav-items-back">
                            <a href="/news" className="header__nav-items-item">귀농뉴스</a>
                        </li>
                        <li className="header__nav-items-back">
                            <a href="/community" className="header__nav-items-item">커뮤니티</a>
                        </li>
                        <li className="header__nav-items-back">
                            <a href="#" className="header__nav-items-item">QnA</a>
                        </li>
                        <li className="header__nav-items-back">
                            <a href="/mypage" className="header__nav-items-item">마이페이지</a>
                        </li>
                        <li className="header__nav-items-back">
                            <a href="/mypage" className="header__nav-items-item">공지사항</a>
                        </li>
                    </ul>
                </div>
            </div>

        </>
    )
}