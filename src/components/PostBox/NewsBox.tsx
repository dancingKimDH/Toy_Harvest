import { CiHeart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
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
]

export default function PostBox() {
    return (
        <>
            {posts.map((post, index) => (
                <div className="post__box-container" key={index}>
                    <div className="post__box-postImage">
                        <img src="/images/3.jpg" alt="" width={200} height={200} />
                    </div>
                    <div className="post__box-user-title">
                        {post.title}
                    </div>
                    <div className="post__box-user">
                        <div className="post__box-user-name"><FaRegUserCircle />{post.name}</div>
                        <div className="post__box-user-likes"><CiHeart />: {post.likes}</div>
                    </div>
                    <div className="post__box-user">
                        <div className="post__box-user-createdAt"><MdDateRange />: {post.createdAt}</div>
                    </div>
                </div>
            ))}
        </>
    )
}