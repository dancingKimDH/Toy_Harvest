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
            <div className=" border-primaryGrey mx-auto lg:w[1600px] md:w-[1000px] w-[300px] box-border">
                <div className="border-y-4 p-2 my-5 border-primaryGrey">
                    댓글
                </div>
                <ul role="list" className="divide-y divide-gray-100">
                    {post?.comments?.map((comment, index) => (
                        <li key={index} className="gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{comment?.userName ? comment?.userName : '익명'}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.email}</p>
                                </div>
                            </div>
                            <div className="mt-3 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{comment.comment}</p>
                                <span className="text-sm">{comment?.createdAt}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>


            <div className="mt-5 mx-auto lg:w[1600px] md:w-[1000px] w-[300px] box-border">
                <form action="" onSubmit={handleCommentSubmit}>
                    <div className="py-2 border-y-4 border-solid border-primaryGrey">
                        <span className="font-semibold">{user?.displayName ? user?.displayName : '사용자'}</span>
                    </div>
                    <div className="py-2 my-5">
                        <textarea name="comment" onChange={commentChange} className="w-full outline-none" placeholder="의견을 남겨보세요"></textarea>
                    </div>
                    <button className="hover:bg-gray-300 rounded-lg bg-gray-100 p-2 w-full my-4" type="submit">작성하기</button>
                </form>
            </div>
        </>
    )
}

