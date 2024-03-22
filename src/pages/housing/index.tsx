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
    const [year, setYear] = useState<Number>(2015);

    useEffect(
        () => {
            const fetchData = async () => {
                const { data: response } = await axios.get(`/fetch-housing-data/${year}`);
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
        }, [year]
    )

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event;
        setYear(parseInt(value));
    }

    return (
        <>
            <Header />
            <div className="">
                <div className="my-[20px]">
                    <select onChange={handleYearChange} id="spe_year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value="2015" selected>년도 선택</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
                <div className="flex justify-center mt-[50px]">
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
                                    <tr key={index} className="hover:bg-gray-200 border border-solid border-black-200">
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
                </div>
            </div >
        </>

    )
}