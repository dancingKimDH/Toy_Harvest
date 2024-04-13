export default function IntroCommunity() {
    return (
        <>
            <div className="pt-8 flex flex-col max-w-[800px] ">
                <span className="font-semibold text-[36px]">안녕하세요!</span>
                <span className="pb-1 font-semibold text-[22px]">React & Typescript 연습프로젝트</span>
                <div>
                    <span className="font-semibold text-[22px]">푸른대로</span>
                    <span className="font-semibold text-[22px]">입니다</span>
                </div>
            </div>
            <div className="flex flex-col  pt-5">
                <span className="bg-primaryYellow font-semibold text-[36px] text-primaryBlue">1. CRUD 구현</span>
                <span className="font-semibold texta-[22px]">1) 커뮤니티 페이지</span>
                <span className="font-semibold text-[22px]">본문 및 댓글 CRUD 구현</span>
            </div>
        </>
    )
}