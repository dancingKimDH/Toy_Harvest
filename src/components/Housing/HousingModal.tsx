import { Dispatch, SetStateAction, useState } from "react";
import ReactModal from "react-modal";

interface HousingModalProps {
    open: boolean,
    isOpen: Dispatch<SetStateAction<boolean>>,
    rowData: any,
}

export default function HousingModal({ open, isOpen, rowData }: HousingModalProps) {

    const modalStyle = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        }
    }

    return (
        <ReactModal appElement={document.getElementById('modal') || undefined} className="rounded-lg absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] flex justify-center outline-none"
            isOpen={open} onRequestClose={() => !open} ariaHideApp={false} shouldCloseOnEsc={true} style={modalStyle}>
            <div className="w-[80%]">
                <h1 className="mt-[30px] mb-[40px] text-[25px] font-semibold text-center">상세정보</h1>
                <div className="flex flex-col justify-around w-[80%]">
                    <span className="py-3">
                        <span className="font-semibold">이름:</span> {rowData.BIZ_NM._text}</span>
                    <span className="py-3">
                        <span className="font-semibold">계획 세대 수: </span> {rowData.PLAN_HSCNT._text} 세대</span>
                    <span className="py-3">
                        <span className="font-semibold">총 부지 면적(제곱미터): </span> {rowData.TOT_PLOT_AR._text}</span>
                </div>
            </div>
            <button className="lg:text-[20px] hover:bg-blue-700 text-sm text-white bg-primaryBlue p-3 mx-auto fixed text-center rounded-lg w-full bottom-0" type="button" onClick={() => isOpen(!open)}>닫기</button>
        </ReactModal>
    )
}