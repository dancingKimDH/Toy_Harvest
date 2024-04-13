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


    window.addEventListener("scroll", headerFunction);

    const headerBox = document.getElementById("headerBox");
    const sticky = headerBox ? headerBox.offsetTop : 0;

    function headerFunction() {
        if (headerBox && sticky && window.screenY >= sticky) {
            headerBox.classList.add("sticky")
        } else {
            headerBox?.classList.remove("sticky")
        }
    }

    return (
        <>
            <div className="h-[100vh] relative">
                <Header />
                <div className="w-full h-[100vh] mt-[100px] md:mt-[130px] lg:mt-[180px] mx-auto">
                    <Ads />
                    <div className="p-3 flex flex-col justify-center">
                        <IntroCommunity />
                    </div>
                </div>
                <Footer />
            </div>

        </>
    )
}