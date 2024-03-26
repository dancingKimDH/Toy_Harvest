import PostDetail from "components/PostBox/PostDetail";
import Header from "components/Utils/Header"
import AuthContext from "context/AuthContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "interface";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function CommunityPostDetail() {

    const people = [
        {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            role: 'Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
        {
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            role: 'Director of Product',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
    ]



    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [post, setPost] = useState<PostProps | null>(null);
    const [comment, setComment] = useState<string>("");

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

    const handleCommentSubmit = async (e: any) => {
        e.preventDefault();
        if (post && user && comment?.length > 1) {
            try {
                const postRef = doc(db, "posts", post?.id);
                const commentObj = {
                    comment: comment,
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

            } catch (error) {
                toast.error("에러가 발생하였습니다")
                console.log(error);
            }
        }
    }

    const commentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { target: { name, value } } = e;
        if (name === "comment") {
            setComment(value);
        }
    }

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
            <div className="mx-auto lg:w[1600px] md:w-[1000px] w-[300px] box-border">
                <ul role="list" className="divide-y divide-gray-100">
                    {people.map((person) => (
                        <li key={person.email} className="flex justify-between gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900">{person.role}</p>
                                {person.lastSeen ? (
                                    <p className="mt-1 text-xs leading-5 text-gray-500">
                                        Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                                    </p>
                                ) : (
                                    <div className="mt-1 flex items-center gap-x-1.5">
                                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500">Online</p>
                                    </div>
                                )}
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

