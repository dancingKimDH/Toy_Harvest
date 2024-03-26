import PostDetail from "components/PostBox/PostDetail";
import Header from "components/Utils/Header"
import AuthContext from "context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "interface";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CommunityPostDetail() {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState<PostProps | null>(null);

    const getPost = async () => {
        if (id) {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            setPost({ ...(docSnap.data() as PostProps) });
        }
    }

    useEffect(() => {
        getPost();
    }, [user, id])

    console.log(post);

    return (
        <>
            <Header />
            <div className="px-5">
                {post ? (
                    <PostDetail post={post} user={user} />
                ) : (
                    <div>웹페이지가 존재하지 않습니다</div>
                )}

            </div>
        </>
    )
}

