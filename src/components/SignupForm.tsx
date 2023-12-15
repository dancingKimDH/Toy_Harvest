import { useState } from "react"
import { Link } from "react-router-dom";

export default function SignUpForm() {

    const onSubmit = () => {}

    const onChange = () => {}

    const onClickSocialLogIn = () => {}
    
    const [error, setError] = useState<string>("");

    return (

        <form action="" onSubmit={onSubmit} className="form">
            <h1 className="form__title">
                회원가입
            </h1>
            <div className="form__block">
                <label htmlFor="email">이메일</label>
                <input type="email" name="email" id="email" required onChange={onChange}/>
            </div>
            <div className="form__block">
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" required onChange={onChange} />
            </div>
            <div className="form__block">
                <label htmlFor="password_confirm">
                    <input type="password" name="password_confirm" id="password_confirm" required onChange={onChange}/>
                </label>
            </div>
            {error && error?.length > 0 && (
                <div className="form__block">
                    {error}
                </div>
            )}

            <div className="form__block">
                계정이 있으신가요?
                <Link to="/login" className="form__block__link">로그인하기</Link>
            </div>

            <div className="form__block">
                <input type="button" value="회원가입" className="form__btn-submit" disabled={error?.length > 0} />
            </div>

            <div className="form__block">
                <button type="button" className="form__block-google" name="google" onClick={onClickSocialLogIn} ></button>
            </div>

        </form>

    )


}