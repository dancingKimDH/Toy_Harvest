import { useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";

export default function Ads() {

    const [activeImage, setActiveImage] = useState(1);
    const handleClickNext = () => { setActiveImage(prev => prev + 1 % totalImages) };
    const handleClickPrev = () => { setActiveImage(prev => (prev - 1 + totalImages) % totalImages) }
    const totalImages = 3;

    return (
        <div className="carousel">
            <ul className="carousel__slides">
                <input type="radio" name="radio-buttons" id="img-0" checked={activeImage === 0} readOnly />
                <li className="carousel__slides-container">
                    <div className="image">
                        <img src="/images/2.jpg" alt="ad1" />
                    </div>
                    <div className="carousel__controls">
                        <label htmlFor="" onClick={handleClickPrev}> <span> <GrFormPrevious /> </span> </label>
                        <label htmlFor="" onClick={handleClickNext}> <span> <GrFormNext /> </span> </label>
                    </div>
                </li>
                <input type="radio" name="radio-buttons" id="img-1" checked={activeImage === 1} readOnly />
                <li className="carousel__slides-container">
                    <div className="carousel__slides-container-img">
                        <img src="/images/0.jpg" alt="ad1" />
                    </div>
                    <div className="carousel__controls">
                        <label htmlFor="" onClick={handleClickPrev}> <span> <GrFormPrevious /> </span> </label>
                        <label htmlFor="" onClick={handleClickNext}> <span> <GrFormNext /> </span> </label>
                    </div>
                </li>
                <input type="radio" name="radio-buttons" id="img-2" checked={activeImage === 2} readOnly />
                <li className="carousel__slides-container">
                    <div className="carousel__slides-container-img">
                        <img src="/images/4.jpg" alt="ad1" />
                    </div>
                    <div className="carousel__controls">
                        <label htmlFor="" onClick={handleClickPrev}> <span> <GrFormPrevious /> </span> </label>
                        <label htmlFor="" onClick={handleClickNext}> <span> <GrFormNext /> </span> </label>
                    </div>
                </li>
                <div className="carousel__dots">
                    <label htmlFor="" onClick={() => setActiveImage(0)} className="carousel__dot" id="img-dot-0"></label>
                    <label htmlFor="" onClick={() => setActiveImage(1)} className="carousel__dot" id="img-dot-1"></label>
                    <label htmlFor="" onClick={() => setActiveImage(2)} className="carousel__dot" id="img-dot-2"></label>
                </div>
                
            </ul>

        </div>

    )

}