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
            <div className="flex flex-col justify-between">
                <div className="w-full h-full relative">
                    <Header />
                    <div className="body flex items-center relative top-[12vh] lg:top-[20vh]">
                        <IntroCommunity />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}