import axios from "axios";
import Header from "../../components/Utils/Header";

const fetchHousing = async () => {
    const { data: response } = await axios.get(`/openapi/6de97bd2f04693f272abb104a04c73687caad2061a5cbf20eb6f60dd9c4d6719/xml/Grid_20151214000000000336_1/1/5?SLCTN_YEAR=2015`,
    {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
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