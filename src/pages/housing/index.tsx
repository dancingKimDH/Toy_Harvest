import axios from "axios";
import Header from "../../components/Utils/Header";
import convert from "xml-js";
import { useEffect, useState } from "react";

interface RowData {
    BIZ_NM: any;
    LC_NM: any;
    PLAN_HSCNT: any;
    TOT_PLOT_AR: any;
    LTTOT_PBLANC_DE: any;
    CHARGER_NM: any;
    CHARGER_TELNO: any;
}


export default function Housing() {

    const [rowData, setRowData] = useState<RowData[]>([]);

    useEffect(
        () => {
            const fetchData = async () => {
                const { data: response } = await axios.get('/fetch-housing-data');
                const result: any = convert.xml2json(response, {
                    compact: true,
                    spaces: 4
                })
                const jsonResult = JSON.parse(result);
                const rows = jsonResult.Grid_20151214000000000336_1.row;
                console.log(rows);
                setRowData(rows);
            }
            fetchData();
        }, []
    )

    return (
        <>
            <Header />
            <div className="flex mt-[50px] justify-center">
                <table className="border border-solid border-black-900 p-5">
                    <thead className="">
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

                    {rowData ? (
                        Object.keys(rowData).map((key: any, index) => (
                            <tbody>
                                <tr key={index}>
                                    <td className="p-5 text-center">{rowData[key].BIZ_NM._text}</td>
                                    <td className="p-5 text-center">{rowData[key].LC_NM._text}</td>
                                    <td className="p-5 text-center">{rowData[key].PLAN_HSCNT._text}</td>
                                    <td className="p-5 text-center">{rowData[key].TOT_PLOT_AR._text}</td>
                                    <td className="p-5 text-center">{rowData[key].LTTOT_PBLANC_DE._text}</td>
                                    <td className="p-5 text-center">{rowData[key].CHARGER_NM._text}</td>
                                    <td className="p-5 text-center">{rowData[key].CHARGER_TELNO._text}</td>
                                </tr>
                            </tbody>
                        ))
                    ) : (
                        <tbody>
                            <tr key="no-data">
                                <td colSpan={7}>데이터가 존재하지 않습니다</td>
                            </tr>
                        </tbody>
                    )}






                    <tbody>

                    </tbody>
                </table >
            </div >
        </>

    )
}