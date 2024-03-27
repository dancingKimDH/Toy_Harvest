import NewsPostForm from "components/PostBox/NewsPostForm";
import { useParams } from "react-router-dom";

export default function CommunityPostEdit () {
    
    const id = useParams();
    const idParams = id.id;

    return (
        <NewsPostForm id={idParams} />
    )
}