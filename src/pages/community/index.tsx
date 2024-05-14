import Header from "../../components/Utils/Header";
import PostBox from "../../components/PostBox/PostBox";
import { useLocation } from "react-router-dom";

export default function CommunityPost () {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword') || "";

    return (
        <>
        <Header/>
        <PostBox keyword={keyword}/>
        </>
    )
}