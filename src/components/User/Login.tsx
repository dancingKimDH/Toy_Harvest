import { Link, useNavigate } from "react-router-dom"
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md"; 
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";

export default function LoginForm() {
    
    const navigate = useNavigate();
    
    const onSubmit = () => {}    

    const onChange = () => {}

    const onClickSocialLogIn = () => {}

    const [error, setError] = useState<string>("");

    return (
        <>                
        <div className="button-prev">
            <button type="button" onClick={() => { navigate(-1) }}><GrFormPrevious /></button>
        </div>
            <div className="container">
                <div className="background-blue">
                    <form action="" onSubmit={onSubmit} className="form__signup">
                        <h1 className="form__signup__title">
                            <span> 푸른대로와 </span> <br/> 
                            <span className="text-highlight">함께 시작해 볼까요?</span>
                        </h1>
                        <div className="form__signup__block">
                            <label htmlFor="email"><MdOutlineMail /></label>
                            <input type="email" name="email" id="email" required onChange={onChange} placeholder="이메일" />
                        </div>
                        <div className="form__signup__block">
                            <label htmlFor="password"><RiLockPasswordFill /></label>
                            <input type="password" name="password" id="password" required onChange={onChange} placeholder="비밀번호 입력" />
                        </div>
                        <div className="form__signup__block">
                            <label htmlFor="password_confirm"><FaCheck /></label>
                            <input type="password" name="password_confirm" id="password_confirm" required onChange={onChange} placeholder="비밀번호 확인" />

                        </div>
                        {error && error?.length > 0 && (
                            <div className="form__signup__block error__msg">
                                {error}
                            </div>
                        )}

                        <div className="form__signup__btn">
                            <input type="submit" value="회원가입" className="form__signup__btn-submit" disabled={error?.length > 0} />
                        </div>

                            {/* error 수정! */}
                        <div className="form__signup__btn google">
                            <input type="submit" value="Sign Up with Google" onClick={onClickSocialLogIn} className="form__signup__btn-submit" disabled={error?.length > 0} />
                        </div>

                        <div className="form__signup__block-login">
                            계정이 있으신가요?
                            <Link to="/login" className="form__signup__block-login-link">로그인하기</Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}