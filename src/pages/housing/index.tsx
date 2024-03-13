import axios from "axios";
import Header from "../../components/Utils/Header";

const fetchHousing = async () => {
    const { data: response } = await axios.get('http://localhost:5000/fetch-housing-data',
    {
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    console.log(response);
    return response;
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