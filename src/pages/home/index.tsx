import { useRecoilState } from "recoil";
import Ads from "../../components/Utils/Ads";
import Footer from "../../components/Utils/Footer";
import Header from "../../components/Utils/Header";
import { headerExpandState } from "atom";
import { useEffect } from "react";
import IntroCommunity from "components/intro/intro_community";

export default function Home() {

    const [headerExpand, setHeaderExpand] = useRecoilState(headerExpandState);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                setHeaderExpand(true);
            } else {
                setHeaderExpand(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return (
        <>
            <div className="body grid grid-cols-3">
                <Header />
                <div className="col-span-3 w-full h-full">
                    <IntroCommunity />
                </div>
                <div className="col-span-3">
                    <Footer />
                </div>
            </div>
        </>
    )
}