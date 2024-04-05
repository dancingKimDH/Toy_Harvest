import { useRecoilState } from "recoil";
import Ads from "../../components/Utils/Ads";
import Footer from "../../components/Utils/Footer";
import Header from "../../components/Utils/Header";
import { headerExpandState } from "atom";
import { useEffect } from "react";

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
        if(headerBox && sticky && window.screenY >= sticky) {
            headerBox.classList.add("sticky")
        } else {
            headerBox?.classList.remove("sticky")
        }
    }

    return (
        <>
                <Header />
                <Ads />
                <Ads />
                <Ads />
                <Ads />
                <Footer />
        </>
    )
}