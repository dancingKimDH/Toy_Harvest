import axios from "axios";
import Header from "../../components/Utils/Header";
import convert from "xml-js";

// import { parseString } from 'xml2js';


const fetchHousing = async () => {

    try {
        const { data: response } = await axios.get('/fetch-housing-data');
        const result: any = convert.xml2json(response, {
            compact: true,
            spaces: 4
        })

        const jsonResult = JSON.parse(result);

        const rows = jsonResult.Grid_20151214000000000336_1.row;
        console.log(rows);        


    } catch (error) {
        console.log(error);
    }
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