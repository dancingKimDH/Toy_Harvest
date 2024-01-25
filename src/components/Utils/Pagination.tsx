import { Dispatch, SetStateAction, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface PaginationProps {
    total: number;
    limit: number;
    page: number;
    setPage: Dispatch<SetStateAction<any>>
}

export default function Pagination({total, limit, setPage, page}: PaginationProps) {

    // const offset = (page - 1) * limit;
    const numPages = Math.ceil(total / limit);
    const numArray = new Array(numPages).fill(0);

    return (
        <>
            <div className="flex gap-5">
                <button type="button" onClick={() => { setPage(page - 1) }} disabled={page === 1}> <GrFormPrevious /> </button>
                {numArray.map((item, index) => (
                    <button type="button" key={index + 1} onClick={() => { setPage(index + 1) }} className={index + 1 === page ? "text-primaryYellow font-semibold" : "text-gray-500"}>
                        {index + 1}
                    </button>
                ))}
                <button type="button" onClick={() => { setPage(page + 1) }} disabled={page === numPages}> <GrFormNext /> </button>
            </div>
        </>

    )
}