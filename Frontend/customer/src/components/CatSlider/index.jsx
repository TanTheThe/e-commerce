import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const HomeCatSlider = () => {
    return (
        <div className="homeCatSlider py-8 pt-4">
            <div className="container">
                <Swiper slidesPerView={8} spaceBetween={10} navigation={true} modules={[Navigation]} observer={true} observeParents={true} className="mySwiper">
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item py-7 px-3 w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                        <Link to="/">
                            <div className="item w-[170px] h-[150px] bg-white rounded-sm text-center flex items-center justify-center flex-col">
                                <img src="https://api.spicezgold.com/download/file_1734525204708_fash.png" className="w-[70px] transition-all" />
                                <h3 className="text-[15px] font-[500] mt-3">Smart Tablet</h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}

export default HomeCatSlider