import axios from "axios";
import Header from "../../components/Utils/Header";

import { xml2json } from 'xml-js'

const fetchHousing = async () => {
    const { data: response } = await axios.get('http://localhost:5000/fetch-housing-data')
    const xmlData = `
<Grid_20151214000000000336_1>
    <totalCnt>8</totalCnt>
    <startRow>1</startRow>
    <endRow>5</endRow>
    <result>
        <message>정상 처리되었습니다.</message>
        <code>INFO-000</code>
    </result>
    <row>
        <ROW_NUM>1</ROW_NUM>
        <!-- More row data -->
    </row>
    <!-- More rows -->
</Grid_20151214000000000336_1>
`;
    const jsonResult = xml2json(response, {compact: true, spaces: 4})
    return response;
}





export default function Housing() {
    return (
        <>
            <Header />
            <div>
                <button type="button" onClick={fetchHousing}>FetchHousing</button>            </div>
        </>

    )
}