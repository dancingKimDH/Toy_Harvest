import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function housing (
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {data} = await axios.get(
        `http://211.237.50.150:7080/openapi/6de97bd2f04693f272abb104a04c73687caad2061a5cbf20eb6f60dd9c4d6719/xml/Grid_20151214000000000336_1/1/5?SLCTN_YEAR=2021`
    )
    
    return res.status(200).json(data)
}

