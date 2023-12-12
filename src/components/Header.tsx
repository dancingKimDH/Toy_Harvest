import { IoMdLogIn } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdMenu } from "react-icons/md";

export default function Header() {
    return (

        <div className="header">
            <div className="header__title">
                <div className="header__title-name">푸른대로</div>
                <div className="header__title__menu">
                    <div className="header__title__menu-search"><IoSearch /></div>
                    <div className="header__title__menu-menu"><MdMenu /></div>
                    <div className="header__title__menu-signin"><IoMdLogIn /></div>
                </div>
            </div>
            <div className="header__nav">
                <ul className="header__nav-items">
                    <a href="/" className="header__nav-items-item">홈페이지</a>
                    <a className="header__nav-items-item">귀농꿀팁</a>
                    <a className="header__nav-items-item">커뮤니티</a>
                    <a className="header__nav-items-item">자유게시판</a>
                    <a className="header__nav-items-item">나의정보</a>
                </ul>
            </div>
        </div>


    )
}