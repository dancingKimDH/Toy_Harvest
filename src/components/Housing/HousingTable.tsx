import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { CiCalendarDate } from "react-icons/ci";
import { FaMapMarkerAlt, FaThLarge } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { MdLocalPhone, MdOutlineApartment } from "react-icons/md";
import { RowData } from "../../interface";
import HousingModal from "./HousingModal";

interface HousingTableParams {
    rowData: RowData[],
    handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleTelephoneClick: () => void,
}

export default function HousingTable({ rowData, handleYearChange, handleTelephoneClick }: HousingTableParams) {

    const [selectedYear, setYear] = useState<Number>(2015);
    const years = Array.from({ length: 2020 - 2004 }, (_, index) => 2020 - index);

    const [open, isOpen] = useState<boolean>(false);

    const [number, setNumber] = useState<number>(0);

    const rowClick = (index: number) => {
        isOpen(!open);
        setNumber(index);
    }

    return (
        <>

            <div className="mt-[110px] lg:mt-[200px]">
                <h1 className="font-semibold text-center text-[30px] p-[5px] mt-[20px]">전원마을 분양 공고 정보</h1>
                <h2 className="text-center p-[5px]">농림수산식품교육문화정보원 제공 2005 ~ 2020</h2>
            </div>
            <div className="">
                <div className="flex justify-center">
                    <div className="my-[20px] w-[80%]">
                        <select onChange={handleYearChange} id="spe_year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="2015" selected>년도 선택 (2015)</option>
                            {years.map((year) => (
                                <option key={year} value={year} selected={year === selectedYear}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-center my-[25px]">
                    <table className="border border-solid border-black-900 p-5 w-full md:w-[80%]">
                        <thead className="hidden md:table-header-group">
                            <tr className="bg-gray-300">
                                <th className="p-5">사업 명</th>
                                <th className="p-5">위치</th>
                                <th className="p-5">계획 세대 수</th>
                                <th className="p-5">총 부지 면적(제곱미터)</th>
                                <th className="p-5">분양공고일</th>
                                <th className="p-5">담당자 성명</th>
                                <th className="p-5">담당자 전화번호</th>
                            </tr>
                        </thead>
                        <thead>
                            <tr className="bg-gray-300 md:hidden">
                                <th className="p-5 "><FaHouse className="mx-auto" /></th>
                                <th className="p-5"><FaMapMarkerAlt className="mx-auto" /></th>
                                <th className="p-5"><MdOutlineApartment className="mx-auto" /></th>
                                <th className="p-5"><FaThLarge className="mx-auto" /></th>
                                <th className="p-5"><CiCalendarDate className="mx-auto" /></th>
                                <th className="p-5"><IoPerson className="mx-auto" /></th>
                                <th className="p-5"><MdLocalPhone className="mx-auto" /></th>
                            </tr>
                        </thead>

                        {rowData ? (
                            Object.keys(rowData).map((key: any, index) => (
                                <>
                                    <HousingModal open={open} isOpen={isOpen} rowData={rowData[number]} />
                                    <tbody>
                                        <tr key={index} onClick={() => rowClick(index)}
                                            className="hover:bg-gray-200 border border-solid border-black-200 text-[9px] md:text-[20px]">
                                            <td className="p-2 text-center break-all">{rowData[key].BIZ_NM._text}</td>
                                            <td className="p-2 text-center break-all">{rowData[key].LC_NM._text}</td>
                                            <td className="p-2 text-center">{rowData[key].PLAN_HSCNT._text}</td>
                                            <td className="p-2 text-center">{rowData[key].TOT_PLOT_AR._text}</td>
                                            <td className="p-2 text-center">{rowData[key].LTTOT_PBLANC_DE._text}</td>
                                            <td className="p-2 text-center">{rowData[key].CHARGER_NM._text}</td>
                                            <CopyToClipboard text={rowData[key].CHARGER_TELNO._text}>
                                                <td className="p-5 text-center hover:cursor-pointer text-blue-500 font-semibold" onClick={handleTelephoneClick}>{rowData[key].CHARGER_TELNO._text}</td>
                                            </CopyToClipboard>
                                        </tr>
                                    </tbody>
                                </>
                            ))
                        ) : (
                            <tr key={"nodata"}>
                                <th className="p-9" colSpan={7}>
                                    <div className="flex flex-col justify-center items-center">
                                        <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0V0z" fill="none" /><path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" /></svg>
                                        <span>데이터가 존재하지 않습니다</span>
                                    </div>
                                </th>
                            </tr>
                        )}
                        <tbody>

                        </tbody>
                    </table >
                </div>
            </div >
        </>
    )
}