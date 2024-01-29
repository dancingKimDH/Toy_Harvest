import React, { useContext, useEffect, useState } from "react"
import { CiImageOn } from "react-icons/ci";
import AuthContext from "../../context/AuthContext";
import { FaAngleDown } from "react-icons/fa";
import { v4 as uuidv4, v4 } from 'uuid';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Bold } from '@ckeditor/ckeditor5-basic-styles';
// yarn add --dev @types/uuid

export default function NewsPostForm() {

    useEffect(() => {
        const editorPlaceholder = document.querySelector( '#content' ) as HTMLElement;
        ClassicEditor.create( editorPlaceholder ).catch( error => {
            console.error( error );
        } );
    }, [])

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [hashTag, setHashTag] = useState<string>("");
    const { user } = useContext(AuthContext);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const key = `${user?.uid}-${v4()}`;
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target: { name, value }
        } = e;

        if (name === "title") {
            setTitle(value);
        }
        if (name === "summary") {
            setSummary(value);
        }
        if (name === "category") {
            setCategory(value);
        }
        if (name === "content") {
            setContent(value);
        }
    }

    return (
        <>

            <div className="py-8 max-w-[800px] mx-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form action="" className="w-full" onSubmit={onSubmit}>
                                <div className="flex w-full">
                                    <div className="mb-4">
                                        <label htmlFor="" className="text-xl font-semibold block mb-3 text-gray-600">제목</label>
                                        <div className="flex gap-5 w-full">
                                            <input type="text" className="border-2 border-gray-300 p-2" value="" name="title" id="title" placeholder="15자 내로 입력해 주세요" required />
                                            <select name="" id="" className="border-2 border-gray-300 p-2">
                                                <option value="">카테고리</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="" className="text-xl block mb-3 text-gray-600 font-semibold">요약</label>
                                    <input type="text" className="border-2 border-gray-300 p-2 w-full" value="" name="title" id="title" placeholder="15자 내로 입력해 주세요" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="text-xl block mb-3 text-gray-600 font-semibold">내용</label>
                                    <textarea name="content" id="content" className="border-2 border-gray-500 w-full h-[300px]"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}