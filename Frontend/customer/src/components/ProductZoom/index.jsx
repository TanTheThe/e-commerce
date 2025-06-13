import React, { useRef, useState } from "react";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ProductZoom = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const zoomSliderBig = useRef()
    const zoomSliderSmall = useRef()

    const goto = (index) => {
        setSlideIndex(index)
        zoomSliderSmall.current.swiper.slideTo(index)
        zoomSliderBig.current.swiper.slideTo(index)
    }

    return (
        <>
            <div className="flex gap-3">
                <div className="slider w-[15%]">
                    <Swiper ref={zoomSliderSmall} direction={"vertical"} slidesPerView={4} spaceBetween={10} navigation={true} modules={[Navigation]} className="zoomProductSliderThumbs h-[500px] overflow-hidden">
                        <SwiperSlide>
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 0 ? 'opacity-100' : 'opacity-30'}`} onClick={() => goto(0)}>
                                <img src="https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"
                                    className="w-full transition-all group-hover:scale-105" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 1 ? 'opacity-100' : 'opacity-30'}`} onClick={() => goto(1)}>
                                <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                                    className="w-full transition-all group-hover:scale-105" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={`item rounded-md overflow-hidden cursor-pointer group ${slideIndex === 2 ? 'opacity-100' : 'opacity-30'}`} onClick={() => goto(2)}>
                                <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"
                                    className="w-full transition-all group-hover:scale-105" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
                    <Swiper ref={zoomSliderBig} slidesPerView={1} spaceBetween={0} navigation={false}>
                        <SwiperSlide>
                            <InnerImageZoom zoomType="hover" zoomScale={1} src={"https://api.spicezgold.com/download/file_1734529297929_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-0-202307260626.jpg"} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom zoomType="hover" zoomScale={1} src={"https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <InnerImageZoom zoomType="hover" zoomScale={1} src={"https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-2-202307260626.jpg"} />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default ProductZoom