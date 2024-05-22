import { User } from "firebase/auth";
import { deleteDoc, doc } from "firebase/firestore";
import { PostProps } from "interface";
import { RiDeleteBin5Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "firebaseApp";
import { deleteObject, ref } from "firebase/storage";
import { GrUpdate } from "react-icons/gr";

interface PostDetailProp {
    post: PostProps;
    user: User | null;
}

export default function PostDetail({ post, user }: PostDetailProp) {

    const navigate = useNavigate();

    const { id } = useParams();

    const handleDelete = async () => {
        const confirm = window.confirm("게시글을 삭제하시겠습니까?");
        if (confirm && id) {
            try {
                const imageRef = ref(storage, post?.imageUrl);
                if (post?.imageUrl) {
                    deleteObject(imageRef).catch((error) => {
                        console.log(error);
                    })
                }
                await deleteDoc(doc(db, "posts", id));
                toast.success("성공적으로 삭제하였습니다");
                await navigate("/community");
            } catch (error) {
                toast.error("삭제 중 오류가 발생하였습니다")
                console.log(error);
            }

        } else {
            toast.warn("삭제를 취소하였습니다");
        }
    }

    return (
        <div className="px-5">
            {post ? (
                <div className="mt-[110px] lg:mt-[180px] flex justify-center">
                    <div className="mx-auto lg:w[1600px] md:w-[1000px] w-[300px] box-border">
                        <div className="flex left-0 right-0 mt-8 px-2 sm:px-0">
                            <h3 className="w-full bg-gray-100 rounded-lg p-3 text-lg underline font-semibold leading-7 text-gray-900">{post?.title}</h3>
                            {user?.uid === post?.uid && (
                                <>
                                    <button className="p-4 w-4 h-4" type="button" onClick={handleDelete}><RiDeleteBin5Line /></button>
                                    <button className="p-4 w-2 h-2" type="button" onClick={() => navigate(`/community/edit/${id}`)}><GrUpdate /></button>
                                </>
                            )}
                        </div>
                        <div className="px-4 py-6">
                            {post?.imageUrl && post?.imageUrl.length > 0 && (
                                <div className="flex justify-center">
                                    <img className="object-cover" src={post?.imageUrl} alt="이미지" />
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center">
                            <div className="grow mt-3 border-t border-gray-300">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">작성 날짜</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{post?.createdAt}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">해시태그</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {post?.hashTags?.map((hashTag, index) => (
                                                <span key={index} className="text-blue-500 font-semibold">#{hashTag}{' '}</span>
                                            ))}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">작성자</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {user?.displayName ? user?.displayName : '익명'}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">이메일 주소</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{post?.email}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">작성 글</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {post?.content}
                                        </dd>
                                    </div>

                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>웹페이지가 존재하지 않습니다</div>
            )}

        </div>
    )
}