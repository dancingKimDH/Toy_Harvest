import axios from "axios";
import Header from "../../components/Utils/Header";
import convert from "xml-js";
import { useEffect, useState } from "react";

import React from 'react';

import { toast } from "react-toastify";

import { RowData } from "../../interface";
import HousingTable from "components/Housing/HousingTable";


class App extends React.Component {
    state = {
        value: '',
        copied: false,
    }
}

export default function Housing() {

    const [rowData, setRowData] = useState<RowData[]>([]);
    const [selectedYear, setYear] = useState<Number>(2015);

    useEffect(
        () => {
            const fetchData = async () => {
                const { data: response } = await axios.get(`/fetch-housing-data/${selectedYear}`);
                const result: any = convert.xml2json(response, {
                    compact: true,
                    spaces: 4
                })
                const jsonResult = JSON.parse(result);
                const rows = jsonResult.Grid_20151214000000000336_1.row;
                setRowData(rows);
            }
            fetchData();
        }, [selectedYear]
    )

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { target: { value } } = event;
        setYear(parseInt(value));
    }

    const handleTelephoneClick = () => {
        toast.success('클립보드에 복사하였습니다');
    }

    return (
        <>
            <Header />
            <HousingTable rowData={rowData} handleYearChange={handleYearChange} handleTelephoneClick={handleTelephoneClick}/>
        </>
    )
}