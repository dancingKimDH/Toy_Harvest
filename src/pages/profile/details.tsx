import { FullPage, Slide } from "react-full-page";

export default function ProfileDetail () {
    return (
        <FullPage>
            <Slide>
                <div className="w-full h-full bg-black text-white font-semibold text-[36px]">
                Hello World!
                </div>
            </Slide>
            <Slide>
                <div className="w-full h-full bg-primaryYellow text-white font-semibold text-[36px]">
                Nice to Meet you!
                </div>
            </Slide>
            <Slide>
                <div className="w-full h-full bg-primaryBlue text-white font-semibold text-[36px]">
                Welcome Aboard!s
                </div>
            </Slide>
        </FullPage>
    )
}