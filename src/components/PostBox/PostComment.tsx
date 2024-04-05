import { QuerySnapshot, collection, doc, getDocs, query, where } from "firebase/firestore";
import firebase, { db } from "firebaseApp";
import { CommentProps, PostProps, UserProps } from "interface";
import { useEffect, useState } from "react";


interface PostCommentProps {
    post: PostProps | null,
}


export default function PostComment({ post }: PostCommentProps) {

    return (
        <>
            <div className=" border-primaryGrey mx-auto lg:w[1600px] md:w-[1000px] w-[300px] box-border">
                <div className="border-b-2 p-2 my-5 border-primaryGrey bg-primaryBrown rounded-lg text-primaryDark font-semibold">
                    댓글
                </div>
                <ul className="divide-y divide-gray-100">
                    {post?.comments?.map((comment: CommentProps, index: number) => (
                        <li key={index} className="gap-x-6 py-5">
                            <div className="flex min-w-0 gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{comment?.userName ? comment?.userName : '익명'}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{comment.email}</p>
                                </div>
                            </div>
                            <div className="mt-3 sm:flex sm:flex-col sm:items-end border-b-2 border-primaryBrown pb-3">
                                <p className="text-sm leading-6 text-gray-900">{comment.comment}</p>
                                <span className="text-sm">{comment?.createdAt}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}