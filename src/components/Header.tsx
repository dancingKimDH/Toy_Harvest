import { IoMdLogIn } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdMenu } from "react-icons/md";


export default function Header() {
    return (
        <>
            <div className="header">
                <div className="header__title">
                    <div className="header__title-name">푸른대로</div>
                    <div className="header__title__menu">
                        <div className="header__title__menu-item"><IoSearch /></div>
                        <div className="header__title__menu-item"><MdMenu /></div>
                        <div className="header__title__menu-item"><IoMdLogIn /></div>
                    </div>
                </div>
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
                    </ul>
                </div>
            </div>

        </>
    )
}