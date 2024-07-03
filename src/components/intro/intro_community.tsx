import React, { Component, useState } from "react";

import Ads from "components/Utils/Ads";

import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { IoRadioButtonOff } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "../../scss/fireworks.scss";

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
        
        return (
            <div className="w-full h-full">
                <div className="w-full bg-slate-400">
                    <div className="pyro">
                        <div className="before"></div>
                    </div>
                    <div className="intro__container lg:px-[100px]">
                        <div className="box-border px-3 pt-3 text-white font-semibold text-[50px]">
                            안녕하세요
                        </div>
                        <div className="box-border px-3 py-1 text-white font-semibold text-[30px]">
                            React / Typescript
                        </div>
                        <div className="box-border px-3 py-2 pb-4 text-white font-semibold text-[30px]">
                            연습프로젝트인
                            <span className="sm:text-right md:text-right block lg:inline-block px-4">
                                <span className="whitespace-nowrap text-primaryYellow">
                                    푸른대로
                                </span>
                                입니다
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}