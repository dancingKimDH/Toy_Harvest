import Header from "components/Utils/Header"
import AuthContext from "context/AuthContext";
import { User } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "interface";
import { Context, useContext, useEffect, useState } from "react";
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
    console.log(user);

    return (
        <>
            <Header />
            <div className="px-5">
                {post ? (
                    <div className="flex justify-center">
                        <div className="mx-5 px-3 md:w-[1600px] w-[800px]">
                            <div className="mt-8 px-4 sm:px-0">
                                <h3 className="bg-gray-200 rounded-lg p-3 text-lg shaow-gray-300 underline font-semibold leading-7 text-gray-900">{post?.title}</h3>
                            </div>
                            <div className="mt-3 border-t border-gray-300">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">작성 날짜</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{post?.createdAt}</dd>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">해시태그</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                            {post?.hashTags?.map((hashTag, index) => (
                                                <span className="text-blue-500 font-semibold">#{hashTag}{' '}</span>
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
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    <div className="flex w-0 flex-1 items-center">

                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                            Download
                                                        </a>
                                                    </div>
                                                </li>
                                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                                    <div className="flex w-0 flex-1 items-center">

                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                            <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                                                            <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0">
                                                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                            Download
                                                        </a>
                                                    </div>
                                                </li>
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>웹페이지가 존재하지 않습니다</div>
                )}

            </div>
        </>
    )
}

function usesContext(AuthContext: Context<{ user: User | null; }>) {
    throw new Error("Function not implemented.");
}
