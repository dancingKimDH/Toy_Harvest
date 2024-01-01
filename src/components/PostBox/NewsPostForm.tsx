import { useState } from "react"
import { CiImageOn } from "react-icons/ci";
import Header from "../Header";

export default function NewsPostForm() {

    const onSubmit = () => { }

    const [title, setTitle] = useState<string>("");
    const [summary, setSummary] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [hashTag, setHashTag] = useState<string>("");

    return (
        <>
            <Header />

            <form action="" onSubmit={onSubmit} className="form">
                <div className="form__block form__block-first">
                    <div className="form__block-title">
                        <label htmlFor="title" className="form__block-label">제목</label>
                        <input type="text" name="title" id="title" className="form__block-text" required value={title} />
                    </div>
                    <div className="form__block-category">
                        <label htmlFor="category">카테고리</label>
                        <select name="category" id="category"></select>
                    </div>
                </div>
                <div className="form__block">
                    <label htmlFor="summary">요약</label>
                    <input type="text" name="summary" id="summary" className="input__summary" required value={summary} />
                </div>

                <div className="form__block">
                    <label htmlFor="content">내용</label>
                </div>

                <div className="form__block">
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