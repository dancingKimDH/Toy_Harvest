import { useState } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function Ads () {

    const[activeIamge, setActiveImage] = useState(1);

    return (
        <div className="carousel">
            <ul className="carousel__slides">
                <li className="carousel__slide-img">
                    <div className="carousel__slide-img">
                    <img src="" alt="ad1" />
                    </div>
                    <div className="carousel__controls">
        <label htmlFor="" onClick={() => {setActiveImage(3)}}> <GrFormPrevious/> </label>
                    </div>
                </li>
            </ul>

        </div>

    )

}