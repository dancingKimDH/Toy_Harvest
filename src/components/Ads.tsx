import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function Ads() {

    const [activeImage, setActiveImage] = useState(0);
    const handleClickNext = () => { setActiveImage(prev => (prev + 1) % totalImages) };
    const handleClickPrev = () => { setActiveImage(prev => (prev - 1 + totalImages) % totalImages) }
    const totalImages = 3;

    return (

        <div className="carousel">
            <ul className="carousel__slides">
                <input type="radio" name="radio-buttons" id="img-1" checked={activeImage === 1} readOnly />
                <li className="carousel__slides-container" >
                    <div className="carousel__slides-container-img">
                        <img src="/images/4.jpg" alt="image 1" />
                    </div>
                    <div className="carousel__slides-container-controls">
                        <label htmlFor="" onClick={() => setActiveImage(3)} className="carousel__slides-container-controls-prev"><span><GrFormPrevious /></span></label>
                        <label htmlFor="" onClick={() => setActiveImage(2)} className="carousel__slides-container-controls-next"><span><GrFormNext /></span></label>
                    </div>
                </li>
                <input type="radio" name="radio-buttons" id="img-2" checked={activeImage === 2} readOnly />
                <li className="carousel__slides-container" >
                    <div className="carousel__slides-container-img">
                        <img src="/images/3.jpg" alt="image 2" />
                    </div>
                    <div className="carousel__slides-container-controls">
                        <label htmlFor="" onClick={() => setActiveImage(1)} className="carousel__slides-container-controls-prev"><span><GrFormPrevious /></span></label>
                        <label htmlFor="" onClick={() => setActiveImage(3)} className="carousel__slides-container-controls-next"><span><GrFormNext /></span></label>
                    </div>
                </li>
                <input type="radio" name="radio-buttons" id="img-3" checked={activeImage === 3} readOnly />
                <li className="carousel__slides-container" >
                    <div className="carousel__slides-container-img">
                        <img src="/images/1.jpg" alt="image 3" />
                    </div>
                    <div className="carousel__slides-container-controls">
                        <label htmlFor="" onClick={() => setActiveImage(2)} className="carousel__slides-container-controls-prev"><span><GrFormPrevious /></span></label>
                        <label htmlFor="" onClick={() => setActiveImage(1)} className="carousel__slides-container-controls-next"><span><GrFormNext /></span></label>
                    </div>
                </li>
            </ul>
        </div>

    )

}