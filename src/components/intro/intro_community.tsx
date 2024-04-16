import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IntroCommunity() {

    const navigate = useNavigate();

    return (
        <>
            <div className="onepage_wrap px-8 mx-auto">
                <div className="onepage_container mt-8 flex flex-col">
                    <span className="font-semibold text-[36px]">안녕하세요!</span>
                    <span className="pb-1 font-semibold text-[22px]">React & Typescript 연습프로젝트</span>
                    <div>
                        <span className="font-semibold text-[22px]">푸른대로</span>
                        <span className="font-semibold text-[22px]">입니다</span>
                    </div>
                </div>
                <div className="onepage_container flex flex-col">
                    <div className="flex justify-end">
                        <span className="my-3 p-2 mr-2 max-w-[500px] w-[60%] text-right bg-primaryGrey rounded-lg  font-semibold text-[36px] text-white">1. CRUD 구현</span>
                    </div>
                    <div className="flex flex-wrap relative justify-between">
                        <div onClick={() => navigate("/community")}
                            className="flex flex-col absolute bottom-0 right-0 z-999 bg-primaryDark rounded-lg text-white font-semibold p-4 text-[20px] hover:cursor-pointer">
                            <span>자유롭게 글과 댓글을 남겨 보세요!</span>
                            <span>언제든지 수정 및 삭제를 할 수 있습니다</span>
                        </div>
                        <img width={300} src="/images/intro/new_post.png" alt="포스트" />
                        <img width={300} src="/images/intro/new_comment.png" alt="코멘트" />
                    </div>
                </div>
            </div>
        </>
    )
}