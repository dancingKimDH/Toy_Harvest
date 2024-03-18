import axios from "axios";
import Header from "../../components/Utils/Header";

// import { parseString } from 'xml2js';


const fetchHousing = async () => {

    try {
        const { data: response } = await axios.get('/fetch-housing-data');
        // parseString(response.data, (err, result) => {
        //     if (err) {
        //         throw err;
        //     }

        //     const jsonData = result.Grid_20151214000000000336_1.row;

        //     console.log(jsonData);
        // })

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