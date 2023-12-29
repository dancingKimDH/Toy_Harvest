import { useState } from "react"
import { CiImageOn } from "react-icons/ci";
import Header from "../Header";

export default function NewsPostNew() {

    const onSubmit = () => { }

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [hashTag, setHashTag] = useState<string>("");

    return (
        <>
            <Header />

            <form action="" onSubmit={onSubmit} className="form">
                <div className="form__block">
                    <label htmlFor="title">제목</label>
                    <input type="text" name="title" id="title" required value={title} />
                </div>

                <div className="form__block">
                    <label htmlFor="category">카테고리를 선택해 주세요</label>
                    <select name="category" id="category"></select>
                </div>

                <div className="form__block">
                    <label htmlFor="summary">요약</label>
                    <input type="text" name="summary" id="summary" required value={summary} />
                </div>

                <div className="form__block">
                    <label htmlFor="content">내용</label>
                    <textarea name="content" id="content" required value={content}></textarea>
                </div>

                <div className="form__hashtag-area">
                    <input type="text" name="hashtag" id="hashtag" placeholder="입력 후 스페이스 바" value={hashTag} />
                </div>

                <div className="form__submit-area">
                    <div className="form__block">
                        <label htmlFor="file-input"><CiImageOn /></label>
                        <input type="file" name="file-input" id="file-input" accept="image/*" className="hidden" />
                    </div>
                </div>



            </form>
        </>
    )
}