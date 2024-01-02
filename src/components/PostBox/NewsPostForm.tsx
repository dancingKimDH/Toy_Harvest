import React, { useState } from "react"
import { CiImageOn } from "react-icons/ci";


export default function NewsPostForm() {

    const onSubmit = () => { }

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [hashTag, setHashTag] = useState<string>("");

    const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {
            target: {name, value}
        } = e;

        if(name === "title") {
            setTitle(value);
        }
        if(name === "summary") {
            setSummary(value);
        }
        if(name === "category") {
            setCategory(value);
        }
        if(name === "content") {
            setContent(value);
        }
    }

    return (
        <>
            <form action="" onSubmit={onSubmit} className="form">
                    <div className="form__block">
                        <label htmlFor="title">제목</label>
                        <input type="text" name="title" id="title" required value={title} onChange={onChange} />
                    </div>
                    <div className="form__block">
                        <label htmlFor="category" className="form__block-category">카테고리를 선택해 주세요</label>
                        <select name="category" id="category" onChange={onChange}></select>
                    </div>
                <div className="form__block">
                    <label htmlFor="summary">요약</label>
                    <input type="text" name="summary" id="summary" maxLength={20} required value={summary} placeholder="20자 내로 적어주세요" onChange={onChange}/>
                </div>

                <div className="form__block">
                    <label htmlFor="content">내용</label>
                </div>

                <div className="form__block">
                    <textarea name="content" id="content" required value={content} onChange={onChange}></textarea>
                </div>

                <div className="form__block">
                    <input type="text" name="hashtag" id="hashtag" placeholder="입력 후 스페이스 바" value={hashTag} onChange={onChange}/>
                </div>

                <div className="form__block">
                        <label htmlFor="file-input"><CiImageOn /></label>
                        <input type="file" name="file-input" id="file-input" accept="image/*" className="hidden" />
                </div>



            </form>
        </>
    )
}