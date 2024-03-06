import axios from "axios";
import Header from "../../components/Utils/Header";

const fetchHousing = async () => {
    const { data: response } = await axios.get(`https://cors-anywhere.herokuapp.com/http://211.237.50.150:7080/openapi/${process.env.HOUSING_PUBLIC_DATA}/xml/Grid_20151214000000000336_1/1/5?SLCTN_YEAR=2015`)
    const data = JSON.stringify(response);
    console.log(data)
}

export default function Housing() {
    return (
        <>
            <Header />
            <div>
                <button type="button" onClick={fetchHousing}>FetchHousing</button>
            </div>
        </>

    )
}