import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function housing (
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {data} = await axios.get(
        `http://211.237.50.150:7080/openapi/${process.env.HOUSING_PUBLIC_DATA}/xml/Grid_20151214000000000336_1/1/5?SLCTN_YEAR=2021`
    )
    
    return res.status(200).json(data)
}

