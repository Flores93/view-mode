import { Plus, X } from 'phosphor-react';
import styled, { css, keyframes } from 'styled-components';
import { SwiperSlide } from 'swiper/react';

const Rotation = keyframes`
    from {
        transform: rotate(0deg) scale(1);
        background: #d1d4de;
        color: #373c40;
    }
    to {
        transform: rotate(360deg) scale(1.5);
        color: #818c98;
    }
`;

export const Caption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    align-self: flex-start;
    text-transform: uppercase;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;

    letter-spacing: 0.5px;

    color: #ffffff;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const TagsAndTitleContainer = styled.div`
  transition: all 300ms ease-out;
  display: flex;
  flex-direction: row;
  gap: 40px;

  span {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;

    letter-spacing: 0.5px;

    color: #ffffff;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 42px;
  width: fit-content;
  margin: auto;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

export const StyledTimesIcon = styled(X)`
  cursor: pointer;

  top: 24px;
  right: 24px;
  position: absolute;

  background: #d1d4de;
  color: #373c40;

  border-radius: 50px;
  transition: 300ms;

  &:hover {
    background: #e9ecf7;
    color: #373c40;
  }
`;

export const StyledSwiperSlide = styled(SwiperSlide)<{
  viewmode: string;
  index: number;
  arraylength: number;
}>`
  transition: 1000ms;
  width: ${(props) => (props.viewmode === 'true' ? 'fit-content' : '100%')};
  margin: 0;
  ${(props) =>
    props.viewmode === 'true' && props.index === props.arraylength - 1
      ? `
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
      `
      : ''}
`;

export const StyledPlusIcon = styled(Plus)<{ isloading?: any }>`
  top: 50%;
  right: 25px;
  position: absolute;
  cursor: pointer;
  color: #818c98;
  border-radius: 50px;
  width: 55px !important;
  height: 55px !important;
  transition: 300ms;
  margin-right: 40px;

  z-index: 3;

  ${(props) =>
    props.isloading === 'true'
      ? css`
          animation: ${Rotation} 700ms infinite;
        `
      : ''}

  &:hover {
    background: #d1d4de;
    color: #373c40;
  }
`;
