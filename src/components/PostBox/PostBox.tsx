import { arrayRemove, arrayUnion, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Utils/Pagination";
import { NEWS_CATEGORY_ARR } from "../data/data";
import AuthContext from "../../context/AuthContext";
import { db } from "../../firebaseApp";

import { PostProps } from "../../interface";


import ProfileModal from "components/Modal/ProfileModal";
import { reload } from "firebase/auth";
import { AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";

interface PostBoxProps {
    keyword?: string
}

export default function PostBox(keyword: PostBoxProps) {

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [displayPosts, setDisplayPosts] = useState<PostProps[]>([]);

    const { user } = useContext(AuthContext);

    const [postUid, setPostUid] = useState<string>("");

    const [limit, setLimit] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(posts.length);

    const [subject, setSubject] = useState<string>("title");
    const [searchWord, setSearchWord] = useState<string>("");

    const [modal, setModal] = useState<string>("");

    const offset = (page - 1) * limit;

    const navigate = useNavigate();

    const search = (searchWord: string, dataObj: any) => {
        const keywords = searchWord.trim().split(/\s+/);
        const filteredPosts = dataObj.filter((post: any) => {
            return keywords.some(keyword => post.title?.toLowerCase().includes(keyword.toLowerCase()));
        })
        setDisplayPosts(filteredPosts as PostProps[]);
    }

    useEffect(() => {
        let keywords = keyword.keyword;
        if (user) {
            const fetchData = async () => {
                try {
                    let postRef = collection(db, "posts");
                    let postQuery = query(postRef, orderBy("createdAt", "desc"));
                    const snapshot = await getDocs(postQuery);
                    let dataObj = snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc?.id,
                    }));
                    setPosts(dataObj as PostProps[]);
                    if (keywords) {
                        search(keywords, dataObj);
                    } else {
                        setDisplayPosts(dataObj as PostProps[]);
                    }
                } catch (error) {
                    console.error("Error fetching posts:", error);
                }
            };
            fetchData();
        }
    }, [user, keyword]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { target: { name, value } } = e;
        if (name === "subject") {
            setSubject(value);
        } else if (name === "searchWord") {
            setSearchWord(value);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keywords = searchWord.trim().split(/\s+/);
        const filteredPosts = posts.filter((post) => {
            if (subject === "title") {
                return keywords.some(keyword => post.title?.toLowerCase().includes(keyword.toLowerCase()));
            } else if (subject === "content") {
                return keywords.some(keyword => post.content?.toLowerCase().includes(keyword.toLowerCase()));
            } else {
                return keywords.some(keyword => post.hashTags?.includes(keyword.toLowerCase()));
            }

        })
        setDisplayPosts(filteredPosts as PostProps[]);
    }

    const activateModal = (postId: string) => {
        setModal(postId);
        setPostUid(postId);
    }

    const toggleLike = async (post: PostProps) => {
        const postRef = doc(db, "posts", post?.id);
        if (user?.uid && post?.likes?.includes(user?.uid)) {
            await updateDoc(postRef, {
                likes: arrayRemove(user?.uid),
                likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
            })
            toast.success("좋아요를 취소하였습니다");
        } else {
            await updateDoc(postRef, {
                likes: arrayUnion(user?.uid),
                likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
            })
            toast.success("해당 게시물을 좋아요하였습니다");
        }
    }

    return (
        <>
            <div className="lg:w-[1000px] mt-[110px] lg:mt-[200px] mx-auto">
                <div id="modal"></div>
                <div className="search__bar--newsbox">
                    <form action="" onSubmit={handleSubmit}>
                        <div className="px-3 mt-3 flex items-center justify-between">
                            <select onChange={onChange} name="subject" id="" className="outline-none">
                                <option value="title">제목</option>
                                <option value="content">내용</option>
                                <option value="hashtag">해시태그</option>
                            </select>
                            <input onChange={onChange} type="text" name="searchWord" className="text-sm w-full outline-none p-1" id="" placeholder="제목..." />
                            <select name="" id="" className="outline-none">
                                <option value="" className="text-sm">카테고리 선택</option>
                                {NEWS_CATEGORY_ARR.map((data) => (
                                    <option className="" key={data}>{data.slice(0, -2)}</option>
                                ))}
                            </select>
                            <button onClick={(post) => toggleLike} type="submit" className="text-sm search__btn text-white font-semibold">검색하기</button>
                        </div>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-8 px-10 my-5 mx-auto md:grid-cols-3 ">
                    {displayPosts.slice(offset, offset + limit).map((post, index) => (
                        <>
                            <div className="" key={index} >
                                <div onClick={() => navigate(`/community/${post?.id}`)} className="flex justify-center mx-auto">
                                    <img className="w-full md:h-[200px] hover:cursor-pointer rounded-lg shadow-sm" src={post?.imageUrl && post?.imageUrl.length > 1 ? post?.imageUrl : "/images/4.jpg"} alt="" />
                                </div>
                                <div onClick={() => navigate(`/community/${post?.id}`)} className="flex justify-center font-semibold py-1 hover:cursor-pointer">
                                    {post.title}
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <FaRegUserCircle onClick={() => activateModal(post?.uid)} className="text-blue-600 hover:cursor-pointer" />{post.name}</div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <MdDateRange /> {post.createdAt}</div>
                                    <button onClick={() => toggleLike(post)} className="flex items-center gap-2 text-gray-500">
                                        {user && post?.likes?.includes(user.uid) ? (<AiFillHeart />) : <CiHeart />}
                                        {post.likeCount || 0}</button>
                                </div>
                            </div>
                            {modal &&
                                <ProfileModal postUid={postUid} modal={modal} setModal={setModal} />
                            }
                        </>

                    ))}
                </div>

                <div className="flex justify-center mt-5">
                    <Pagination total={posts.length} limit={limit} setPage={setPage} page={page} />
                </div>

                <div className="flex justify-end p-3">
                    <button type="button" className="bg-primaryYellow rounded-lg p-1 text-sm flex" onClick={() => { navigate("/news/new") }}>새 글 작성하기</button>
                </div>

            </div>
        </>
    )
}