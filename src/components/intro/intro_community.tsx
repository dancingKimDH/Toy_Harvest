import React, { Component } from "react";

import Ads from "components/Utils/Ads";

import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { IoRadioButtonOff } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

interface CustomControlsProps {
    className?: string;
    getCurrentSlideIndex: () => number;
    onNext: () => void;
    onPrev: () => void;
    scrollToSlide: (index: number) => void;
    slidesCount: number;
    style?: React.CSSProperties;
    buttonClassName?: string;
    showControls: boolean;
}

interface CustomControlsProps {
    className?: string;
    getCurrentSlideIndex: () => number;
    onNext: () => void;
    onPrev: () => void;
    scrollToSlide: (index: number) => void;
    slidesCount: number;
    style?: React.CSSProperties;
}

const CustomControls: React.FC<CustomControlsProps> = ({
    className = 'full-page-controls',
    getCurrentSlideIndex,
    onNext,
    onPrev,
    scrollToSlide,
    slidesCount,
    style = {
        top: '50%',
        marginLeft: "3vh",
        marginRight: "1vh",
        position: 'fixed',
        transform: 'translateY(-30%)',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        zIndex: 9,
        opacity: "0.5",
        backgroundColor: "gray",
        padding: "3vh 0",
        transition: "padding-top 0.5s ease-in-out, padding-bottom 0.5s ease-in-out"
    },
    buttonClassName = "custom-button",
    showControls,
}) => {
    const renderSlidesNumbers = (currentSlideIndex: number) => {
        const slidesNumbers = [];
        for (let i = 0; i < slidesCount; i++) {
            const buttonProps = {
                disabled: currentSlideIndex === i,
                key: i,
                onClick: () => scrollToSlide(i),
                className: `${buttonClassName} ${currentSlideIndex === i ? 'activeSlideIndex' : ''} ${showControls ? "show" : "hidden"}`,
            };
            slidesNumbers.push(<button type="button" {...buttonProps}>
                <IoRadioButtonOff />
            </button>);
        }
        return slidesNumbers;
    };

    const currentSlideIndex = getCurrentSlideIndex();

    return (
        <div className={`${className}`} style={style}>
            <button
                type="button"
                disabled={currentSlideIndex === 0}
                onClick={onPrev}
                className={buttonClassName}
            >
                <GoArrowUp />
            </button>
            {renderSlidesNumbers(currentSlideIndex)}
            <button
                type="button"
                disabled={currentSlideIndex === slidesCount - 1}
                onClick={onNext}
                className={buttonClassName}
            >
                <GoArrowDown />
            </button>
        </div>
    );
};

export default class IntroCommunity extends Component {

    state = {
        showControls: false
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.handleMouseMove);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove", this.handleMouseMove);
    }

    handleMouseMove = (e: MouseEvent) => {
        if (e.pageX <= 70) {
            this.setState({ showControls: true });
        } else {
            this.setState({ showControls: false });
        }
    }

    render() {

        const { showControls } = this.state;

        return (
            <div className="w-full h-full">
                메인화면
            </div>

        )
    }
}