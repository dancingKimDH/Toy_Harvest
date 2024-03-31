import PostComment from "components/PostBox/PostComment";
import PostDetail from "components/PostBox/PostDetail";
import Header from "components/Utils/Header"
import AuthContext from "context/AuthContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { CommentProps, PostProps } from "interface";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CommunityPostDetail() {

    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState<PostProps | null>(null);
    const [commentValue, setCommentValue] = useState<string>("");
    const [comment, setComment] = useState<CommentProps[]>([]);

    const getPost = async () => {
        if (id) {
            const docRef = doc(db, "posts", id);
            const docSnap = await getDoc(docRef);
            setPost({ ...(docSnap.data() as PostProps) });
        }
    }

    const handleCommentSubmit = async (e: any) => {
        e.preventDefault();
        if (id && post && user && commentValue?.length > 1) {
            try {
                const postRef = doc(db, "posts", id);
                const commentObj = {
                    comment: commentValue,
                    userName: user?.displayName || "익명",
                    uid: user?.uid,
                    email: user?.email,
                    createdAt: new Date()?.toLocaleDateString("ko", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })
                }
                await updateDoc(postRef, {
                    comments: arrayUnion(commentObj)
                })
                setCommentValue("");
                fetchPostAfterComment();
                toast.success("댓글을 성공적으로 등록하였습니다");
            } catch (error) {
                toast.error("에러가 발생하였습니다")
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getPost();
    }, [user, id])

    const fetchPostAfterComment = async () => {
        await getPost();
    }

    const commentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { target: { name, value } } = e;
        if (name === "comment") {
            setCommentValue(value);
        }
    }

    return (
        <>
            <Header />
            <div className="px-5">
                {post ? (
                    <PostDetail post={post} user={user}/>
                ) : (
                    <div>웹페이지가 존재하지 않습니다</div>
                )}

            </div>
            <PostComment post={post}/>
            <div className="mt-5 mx-auto lg:w[1600px] md:w-[1000px] w-[300px] box-border">
                <form action="" onSubmit={handleCommentSubmit}>
                    <div className="py-2 border-y-4 border-solid border-primaryGrey">
                        <span className="font-semibold">{user?.displayName ? user?.displayName : '사용자'}</span>
                    </div>
                    <div className="py-2 my-5">
                        <textarea name="comment" onChange={commentChange} className="w-full outline-none" placeholder="의견을 남겨보세요" value={commentValue}></textarea>
                    </div>
                    <button className="hover:bg-gray-300 rounded-lg bg-gray-100 p-2 w-full my-4" type="submit">작성하기</button>
                </form>
            </div>
        </>
    )
}

