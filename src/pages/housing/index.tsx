import axios from "axios";
import Header from "../../components/Utils/Header";
import convert from "xml-js";
import { useEffect } from "react";

// import { parseString } from 'xml2js';




export default function Housing() {

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
                        <tr className="">
                            <th className="p-5">사업 명</th>
                            <th className="p-5">위치</th>
                            <th className="p-5">계획 세대 수</th>
                            <th className="p-5">총 부지 면적(제곱미터)</th>
                            <th className="p-5">분양공고일</th>
                            <th className="p-5">담당자 성명</th>
                            <th className="p-5">담당자 전화번호</th>

                        </tr>
                    </thead>
                </table>
            </div>
        </>

    )
}