import React, { useContext, useEffect, useState } from "react"
import { CiImageOn } from "react-icons/ci";
import AuthContext from "../../context/AuthContext";
import { FaAngleDown } from "react-icons/fa";
import { v4 as uuidv4, v4 } from 'uuid';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Bold } from '@ckeditor/ckeditor5-basic-styles';
import { NEWS_CATEGORY_ARR } from "../data/data";
import { toast } from "react-toastify";
// yarn add --dev @types/uuid

export default function NewsPostForm() {

    useEffect(() => {
        const editorPlaceholder = document.querySelector('#content') as HTMLElement;
        ClassicEditor.create(editorPlaceholder).catch(error => {
            console.error(error);
        });
    }, [])

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const [hashTag, setHashTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

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

    const onChangeHashTag = (e: any) => {
        setHashTag(e?.target.value?.trim());
    }

    const handleKeyUp = (e: any) => {
        if (e.keyCode === 32 && e.target.value.trim() !== "") {
            if (tags?.includes(e.target.value.trim())) {
                toast.error("동일한 태그가 있습니다");
            } else {
                setTags((prev) => (prev.length > 0 ? [...prev, hashTag] : [hashTag]));
                setHashTag("");
            }
        }
    }

    const removeHashTag = (tag: string) => {
        setTags(tags?.filter((val) => val !== tag));
    }

    return (
        <>

            <div className="py-8 max-w-[800px] mx-auto">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg ">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form action="" className="w-full" onSubmit={onSubmit}>
                                <div className="flex w-full">
                                    <div className="mb-4 w-full">
                                        <label htmlFor="" className="text-xl font-semibold block mb-3 text-gray-600">제목</label>
                                        <div className="flex gap-5 w-full">
                                            <input onChange={onChange} type="text" className="border-2 border-gray-300 p-2 w-full" value={title} name="title" id="title" maxLength={10} placeholder="10자 내로 입력해 주세요" required />
                                            <select onChange={onChange} name="" id="" className="border-2 border-gray-300 p-2">
                                                <option value="">카테고리</option>
                                                {NEWS_CATEGORY_ARR?.map((category) => (
                                                    <option value={category} key={category}>{category}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="" className="text-xl block mb-3 text-gray-600 font-semibold">요약</label>
                                    <input onChange={onChange} type="text" className="border-2 border-gray-300 p-2 w-full" value={summary} name="summary" id="summary" maxLength={15} placeholder="15자 내로 입력해 주세요" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="hashTag" className="text-xl block mb-3 text-gray-600 font-semibold">#태그</label>
                                    <div className="flex items-center border-2 border-gray-300 p-2 flex-wrap">
                                        {tags?.map((tag) => (
                                            <span onClick={() => removeHashTag(tag)} 
                                            className="bg-primaryBlue rounded-xl font-semibold hover:cursor-pointer text-white gap-2 px-2 mx-2 my-1 flex-nowrap" key={tag}> {tag} </span>
                                        ))}
                                        <input onChange={onChangeHashTag} onKeyUp={handleKeyUp} type="text" className="outline-none px-2 my-1" value={hashTag} name="hashTag" id="hashTag" maxLength={15} placeholder="입력 후 스페이스" required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="text-xl block mb-3 text-gray-600 font-semibold">내용</label>
                                    <textarea onChange={onChange} name="content" id="content" value={content} className="border-2 border-gray-500 w-full h-[300px]"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}