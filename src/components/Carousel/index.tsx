import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Swiper, useSwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper';

import 'swiper/css';

import CarouselItem from './CarouselItem';
import useAppContext from '../../hooks/useAppContext';
import { StyledPlusIcon, StyledSwiperSlide } from './styles';

const Container = styled.div<{ viewMode: boolean }>`
  position: relative;

  width: 100vw;
  height: 100%;

  ${(props) => (props.viewMode ? 'padding-top: 96px;' : '')}

  transition: all 300ms ease-in;
  z-index: 1;

  .sliderItem {
    cursor: grab;

    &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }

  .notActive {
    filter: blur(5px) brightness(45%);
    -webkit-filter: blur(5px) brightness(45%);
    -moz-filter: blur(5px) brightness(45%);
  }
`;

const Carousel = () => {
  const { state, dispatch } = useAppContext();
  const [activeImage, setActiveImage] = useState(0);
  const [showTagAndTitle, setShowTagAndTitle] = useState(true);
  const [swiper, setSwiper] = useState<any>({});

  const ref = useRef<SwiperRef>(null);
  useSwiperSlide();

  useEffect(() => {
    if (!state.viewMode) {
      ref.current?.swiper.autoplay.stop();
      // ref.current.swiper.disable();
    } else {
      // ref.current?.swiper.autoplay.start();
      ref.current?.swiper.autoplay.stop();
      // ref.current.swiper.enable();
    }
  }, [state.viewMode]);

  return (
    <Container viewMode={state.viewMode}>
      <Swiper
        onSwiper={setSwiper}
        onActiveIndexChange={(e) => {
          setActiveImage(e.activeIndex);
          dispatch({ selectedImg: state.images[e.activeIndex] });
        }}
        onSlideChangeTransitionStart={() => {
          setShowTagAndTitle(false);
        }}
        onSlideChangeTransitionEnd={() => {
          setShowTagAndTitle(true);
        }}
        grabCursor={true}
        ref={ref}
        speed={700}
        modules={[Autoplay]}
        slidesPerView={state.viewMode ? 1.5 : 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {state.images.map((photo, index, self) => (
          <StyledSwiperSlide
            key={index}
            arraylength={self.length}
            index={index}
            viewmode={`${state.viewMode}`}
          >
            <CarouselItem
              key={index}
              activeImage={activeImage}
              index={index}
              photo={photo}
              showTagAndTitle={showTagAndTitle}
              swiper={swiper}
            />
          </StyledSwiperSlide>
        ))}
      </Swiper>
      {state.viewMode && activeImage === state.images.length - 1 && (
        <StyledPlusIcon
          size={55}
          weight="light"
          onClick={() => {
            dispatch({
              imagesPerRequest: state.imagesPerRequest + 1,
            });
            setTimeout(() => {
              if (!state.loading && swiper) {
                swiper.slideTo(activeImage + 1);
              }
            }, 100);
          }}
          isloading={`${state.loading}`}
        />
      )}
    </Container>
  );
};

export default Carousel;
