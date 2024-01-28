import { Link, useNavigate } from "react-router-dom"
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";
import React, { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../../firebaseApp";
import { toast } from "react-toastify";

export default function LoginForm() {

    const auth = getAuth(app);

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = async (e: any) => {
        try {
            e.preventDefault();
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            toast.success("로그인에 성공하였습니다");
        } catch (error: any) {
            toast.error(error?.code);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;

        if (name === "email") {
            setEmail(value);
            const validRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
            if (!value?.match(validRegex)) {
                setError("이메일 형식이 올바르지 않습니다");
            } else {
                setError("");
            }
        }

        if (name === "password") {
            setPassword(value);
            if (value?.length < 8) {
                setError("비밀번호는 8자리 이상 입력해 주세요");
            } else {
                setError("");
            }
        }
    }

    const onClickSocialLogIn = async (e: any) => {
        let provider;
        provider = new GoogleAuthProvider;
        await signInWithPopup(auth, provider as GoogleAuthProvider)
            .then((result) => {
                toast.success("로그인 성공하였습니다")
                navigate("/")
            })
    }

    const [error, setError] = useState<string>("");

    return (
        <>

            <div className="container w-full h-full">
                <div className="background-blue h-screen w-[200px] md:w-[250px] lg:w-[300px]">
                    <div className="button-prev">
                        <button className="text-lg" type="button" onClick={() => { navigate(-1) }}><GrFormPrevious /></button>
                    </div>
                    <form action="" onSubmit={onSubmit} className="form__signup form__login">
                        <h1 className="form__signup__title">
                            <span className="font-semibold"> 푸른대로와 </span> <br />
                            <span className="font-semibold text-highlight">함께 시작해 볼까요?</span>
                        </h1>
                        <div className="form__signup__block">
                            <label htmlFor="email"><MdOutlineMail /></label>
                            <input type="email" name="email" id="email" required onChange={onChange} placeholder="이메일" />
                        </div>
                        <div className="form__signup__block">
                            <label htmlFor="password"><RiLockPasswordFill /></label>
                            <input type="password" name="password" id="password" required onChange={onChange} placeholder="비밀번호 입력" />
                        </div>

                        {error && error?.length > 0 && (
                            <div className="form__signup__block error__msg">
                                {error}
                            </div>
                        )}

                        <div className="form__signup__btn">
                            <input type="submit" value="로그인" className="form__signup__btn-submit" disabled={error?.length > 0} />
                        </div>

                        {/* error 수정! */}
                        <div className="form__signup__btn google">
                            <input type="submit" value="Sign In with Google" onClick={onClickSocialLogIn} className="form__signup__btn-submit" disabled={error?.length > 0} />
                        </div>

                        <div className="form__signup__block-login text-[10px]">
                            계정이 없으신가요?
                            <Link to="/signup" className="form__signup__block-login-link text-[10px]">회원가입</Link>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}