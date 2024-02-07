import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "../Utils/Pagination";
import { NEWS_CATEGORY_ARR } from "../data/data";
import AuthContext from "../../context/AuthContext";
import { db } from "../../firebaseApp";


// const posts = [
//     { name: "DH", createdAt: "2024", likes: 5, title: "wow the farm looks nice!" },
//     { name: "John", createdAt: "2024", likes: 3, title: "The farm looks amazing!" },
//     { name: "Peter", createdAt: "2024", likes: 3, title: "That's such a nice farm!" },
//     { name: "James", createdAt: "2024", likes: 3, title: "Absolutely!" },
//     { name: "Ashley", createdAt: "2024", likes: 3, title: "How to enjoy your oats!" },
//     { name: "Kevin", createdAt: "2024", likes: 3, title: "Oats not on my table!" },
//     { name: "Ashley", createdAt: "2024", likes: 3, title: "I love oats!" },
//     { name: "DH", createdAt: "2024", likes: 3, title: "That's such a nice farm!" },
//     { name: "Peter", createdAt: "2024", likes: 6, title: "Best crops of the season" },
//     { name: "DH", createdAt: "2024", likes: 10, title: "I love oats!" },
//     { name: "Linda", createdAt: "2024", likes: 1, title: "I love oats!" },
//     { name: "Linda", createdAt: "2024", likes: 4, title: "Oats not on my table!" },
//     { name: "Emily", createdAt: "2024", likes: 5, title: "Best crops of the season" },
//     { name: "Maria", createdAt: "2024", likes: 8, title: "Best crops of the season" },
//     { name: "Emily", createdAt: "2024", likes: 4, title: "Stunning views of the countryside!" },
//     { name: "Linda", createdAt: "2024", likes: 8, title: "Farming techniques explained" },
//     { name: "Kevin", createdAt: "2024", likes: 4, title: "I love oats!" }
// ]

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    uid: string;
    profileUrl?: string;
    likes?: string;
    likeCount?: string;
    comments: string[];
    hashTags?: string[];
    imageUrl?: string;
    title?: string;
    name?: string;

}

export default function NewsBox() {


    const [posts, setPosts] = useState<PostProps[]>([]);

    const user = useContext(AuthContext);

    const [limit, setLimit] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(posts.length);


    const offset = (page - 1) * limit;

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            let postRef = collection(db, "posts");
            let postQuery = query(postRef, orderBy("createdAt", "desc"));

            onSnapshot(postQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setPosts(dataObj as PostProps[]);
            })

        }
    })

    return (
        <>
            <div className="">
                <div>
                    <form action="">
                        <input type="text" name="" id="" placeholder="검색하기" />
                        <select name="" id="">
                            <option value="">카테고리 선택</option>
                            {NEWS_CATEGORY_ARR.map((data) => (
                                <option className="">{data.slice(0, -2)}</option>
                            ))}

                        </select>
                    </form>
                </div>

                <div className="grid grid-cols-1 gap-8 px-10 my-5 mx-auto md:grid-cols-3">
                    {posts.slice(offset, offset + limit).map((post, index) => (
                        <div className="" key={index}>
                            <div className="flex justify-center mx-auto">
                                <img className="rounded-lg shadow-sm" src="/images/3.jpg" alt="" />
                            </div>
                            <div className="flex justify-center font-semibold py-1">
                                {post.title}
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <FaRegUserCircle />{post.name}</div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <MdDateRange /> {post.createdAt}</div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <CiHeart /> {post.likes}</div>
                            </div>
                        </div>
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