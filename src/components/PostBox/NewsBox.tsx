import { limit } from "firebase/firestore";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdDateRange } from "react-icons/md";

export interface PostProps {
    photoURL: string;
    name: string;
    createdAt: string;
    likes: string;
}

const posts = [
    { name: "DH", createdAt: "2024", likes: 5, title: "wow the farm looks nice!" },
    { name: "John", createdAt: "2024", likes: 3, title: "The farm looks amazing!" },
    { name: "Peter", createdAt: "2024", likes: 3, title: "That's such a nice farm!" },
    { name: "James", createdAt: "2024", likes: 3, title: "Absolutely!" },
    { name: "Ashley", createdAt: "2024", likes: 3, title: "How to enjoy your oats!" },
    { name: "Kevin", createdAt: "2024", likes: 3, title: "Oats not on my table!" },
    { name: "Ashley", createdAt: "2024", likes: 3, title: "I love oats!" },
    { name: "DH", createdAt: "2024", likes: 3, title: "That's such a nice farm!" },
    { name: "Peter", createdAt: "2024", likes: 6, title: "Best crops of the season" },
    { name: "DH", createdAt: "2024", likes: 10, title: "I love oats!" },
    { name: "Linda", createdAt: "2024", likes: 1, title: "I love oats!" },
    { name: "Linda", createdAt: "2024", likes: 4, title: "Oats not on my table!" },
    { name: "Emily", createdAt: "2024", likes: 5, title: "Best crops of the season" },
    { name: "Maria", createdAt: "2024", likes: 8, title: "Best crops of the season" },
    { name: "Emily", createdAt: "2024", likes: 4, title: "Stunning views of the countryside!" },
    { name: "Linda", createdAt: "2024", likes: 8, title: "Farming techniques explained" },
    { name: "Kevin", createdAt: "2024", likes: 4, title: "I love oats!" }
]

export default function PostBox() {
    
    const [limit, setLimit] = useState<number>(6);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(posts.length);
    
    const offset = (page - 1) * limit;
    const numPages = Math.ceil(total / limit);

    const numArray = new Array(numPages).fill(0);

    return (
        <>
            <div className="newsPost">
                {posts.slice(offset, offset + limit).map((post, index) => (
                    <div className="post__box" key={index}>
                        <div className="post__box-postImage">
                            <img src="/images/3.jpg" alt=""/>
                        </div>
                        <div className="post__box-user-title">
                            {post.title}
                        </div>
                        <div className="post__box-user">
                            <div className="post__box-user-name">
                                <FaRegUserCircle />{post.name}</div>
                            <div className="post__box-user-likes">
                                <CiHeart /> {post.likes}</div>
                        </div>
                        <div className="post__box-user">
                            <div className="post__box-user-createdAt">
                                <MdDateRange /> {post.createdAt}</div>
                        </div>
                    </div>
                ))}
            </div>

{/* pagination buttons */}
                    <div className="pagination__btns">
                    <button type="button" onClick={() => {setPage(page - 1)}} disabled={page === 1}> <GrFormPrevious /> </button>
                    {numArray.map((item, index) => (
                        <button type="button" key={index + 1} onClick={() => {setPage(index + 1)}} className={index + 1 === page ? "numBtnClicked" : "numberBtn"}>
                            {index + 1}
                        </button>
                    ))}
                    <button type="button" onClick={() => {setPage(page + 1)}} disabled={page === numPages}> <GrFormNext /> </button>
                    </div>
        </>
    )
}