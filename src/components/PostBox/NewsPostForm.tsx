import React, { useContext, useState } from "react"
import { CiImageOn } from "react-icons/ci";
import AuthContext from "../../context/AuthContext";
import { v4 as uuidv4, v4 } from 'uuid';
// yarn add --dev @types/uuid

export default function NewsPostForm() {

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [hashTag, setHashTag] = useState<string>("");
    const { user } = useContext(AuthContext);

    const onSubmit = (e: any) => {
        e.preventDefault();
        const key = `${user?.uid}-${v4()}`;
        console.log(key);
        console.log(user?.uid);
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
            <form action="" onSubmit={onSubmit} className="form">
                <div className="form__block">
                    <label htmlFor="title">제목</label>
                </div>
                <div className="form__block">
                    <input type="text" name="title" id="title" required value={title} onChange={onChange} maxLength={15} placeholder="15자 내로 입력해 주세요" />
                </div>
                <div className="form__block">
                    <label htmlFor="category" className="form__block-category">카테고리 선택</label>
                    <select name="category" id="category" onChange={onChange}></select>
                </div>
                <div className="form__block">
                    <label htmlFor="summary">요약</label>
                </div>
                <div className="form__block">
                    <input type="text" name="summary" id="summary" maxLength={20} required value={summary} placeholder="20자 내로 입력해 주세요" onChange={onChange} />
                </div>
                <div className="form__block">
                    <label htmlFor="content">내용</label>
                </div>

                <div className="form__block">
                    <textarea name="content" id="content" required value={content} onChange={onChange}></textarea>
                </div>

                <div className="form__block form__block-extra">
                    <div className="form__block-hashtag">
                        <input type="text" name="hashtag" id="hashtag" placeholder="# 입력 후 스페이스 바" value={hashTag} onChange={onChange} />
                    </div>
                    <div className="form__block-img">
                        <label className="form__block-img-logo" htmlFor="file-input"><CiImageOn /></label>
                        <input type="file" name="file-input" id="file-input" accept="image/*" className="hidden" />
                    </div>
                </div>

                <div className="form__block form__block-btn">
                    <button className="form__block__submit-btn" type="submit">글 등록하기</button>
                </div>
            </form>
        </>
    )
}