import React, { Component } from "react";

import Ads from "components/Utils/Ads";

import { FullPage, Slide } from "react-full-page";

import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { IoRadioButtonOff } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

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
            slidesNumbers.push(<button type="button" {...buttonProps}><IoRadioButtonOff /></button>);
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
                <FullPage controls={(props) => <CustomControls {...props} showControls={showControls} />}>
                    {/*  controlsProps={{className: "slide-navigation"}} */}
                    <Slide>
                        <Ads />
                    </Slide>
                    <Slide>
                        <div className="onepage_container flex flex-col text-white p-5">
                            <span className="font-semibold text-[36px]">안녕하세요!</span>
                            <span className="pb-1 font-semibold text-[22px]">React & Typescript 연습프로젝트</span>
                            <div>
                                <span className="font-semibold text-[22px]">푸른대로</span>
                                <span className="font-semibold text-[22px]">입니다</span>
                            </div>
                        </div>
                    </Slide>
                    <Slide>
                        <Swiper>
                            <SwiperSlide>
                                <div className="onepage_container flex flex-col">
                                    <div className="flex justify-end">
                                        <span className="max-w-[500px] w-[60%] text-right bg-primaryGrey rounded-lg  font-semibold text-[36px] text-white">1. CRUD 구현</span>
                                    </div>
                                    <div className="flex flex-wrap relative justify-between">
                                        <div className="flex flex-col absolute bottom-0 right-0 z-999 bg-primaryDark rounded-lg text-white font-semibold p-4 text-[20px] hover:cursor-pointer">
                                            <span>자유롭게 글과 댓글을 남겨 보세요!</span>
                                            <span>언제든지 수정 및 삭제를 할 수 있습니다</span>
                                        </div>
                                        <img width={300} src="/images/intro/new_post.png" alt="포스트" />
                                        <img width={300} src="/images/intro/new_comment.png" alt="코멘트" />
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                    <div className="onepage_container flex flex-col">
                                        Hello World!
                                    </div>
                            </SwiperSlide>
                        </Swiper>
                    </Slide>
                </FullPage >
            </div>

        )
    }
}