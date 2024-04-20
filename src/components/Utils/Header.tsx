import { useContext, useEffect, useState } from "react";
import { IoMdLogIn } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebaseApp";
import { useRecoilState } from "recoil";
import { headerExpandState, searchPageVisibilityState } from "atom";
import SearchPage from "./SearchPage";

export default function Header() {

    const [isSearchOpen, setIsSearchOpen] = useRecoilState(searchPageVisibilityState);

    const [isOpen, setIsOpen] = useState(false);

    const { user } = useContext(AuthContext);
    const auth = getAuth(app);

    console.log(isOpen);

    const [headerExpand, setHeaderExpand] = useRecoilState(headerExpandState);

    return (
        <>
            <div className="headerBox flex flex-col">
                <div id="header" className={headerExpand ? "scrolled-header header" : "normal-header header"}>
                    <div className="header__title">
                        <div className="header__title-name">푸른대로</div>
                        <div className="flex gap-5 items-center">
                            <div className="header__title__menu-item" onClick={() => setIsSearchOpen((val) => !val)}><IoSearch /></div>
                            <div role="presentation" className="header__title__menu-item" onClick={() => setIsOpen((val) => !val)}>
                                {isOpen ? <AiOutlineClose /> : <MdMenu />}
                            </div>
                            <div className="header__title__menu-item">
                                {(user) ? <button className="" onClick={() => signOut(auth)}><IoMdLogIn /></button> : <a href="/login"><IoMdLogIn /></a>}
                            </div>
                        </div>
                    </div>

                    {isSearchOpen &&
                        <SearchPage />
                    }


                    {isOpen &&
                        <div className="bg-primaryBlue z-999 px-4 py-4 leading-10 fixed top-[85px] lg:top-[90px] right-0 bottom-0 left-0">
                            <ul className="flex flex-col justify-center items-left">
                                <li className="transitionYellow px-3 py-1 w-full h-full lg:hover:bg-primaryYellow  rounded-lg">
                                    <a href="/" className="text-lg w-full text-white font-semibold tracking-wide">홈페이지</a>
                                </li>
                                <li className="px-3 py-1 lg:hover:bg-primaryYellow rounded-lg">
                                    <a href="/community" className="text-lg text-white font-semibold tracking-wide">커뮤니티</a>
                                </li>
                                <li className="px-3 py-1 lg:hover:bg-primaryYellow rounded-lg">
                                    <a href="/housing" className="text-lg text-white font-semibold tracking-wide">분양공고</a>
                                </li>
                                <li className="px-3 py-1 lg:hover:bg-primaryYellow rounded-lg">
                                    <a href="/mypage" className="text-lg text-white font-semibold tracking-wide">마이페이지</a>
                                </li>
                                <li className="px-3 py-1 lg:hover:bg-primaryYellow rounded-lg">
                                    <a href="/mypage" className="text-lg text-white font-semibold tracking-wide">공지사항</a>
                                </li>
                            </ul>
                        </div>
                    }


                    <div className="header__nav">
                        <ul className="header__nav-items">
                            <li className="header__nav-items-back">
                                <a href="/" className="header__nav-items-item">홈페이지</a>
                            </li>
                            <li className="header__nav-items-back">
                                <a href="/community" className="header__nav-items-item">커뮤니티</a>
                            </li>
                            <li className="header__nav-items-back">
                                <a href="/housing" className="header__nav-items-item">분양공고</a>
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
            </div>

        </>
    )
}