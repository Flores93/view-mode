import { Copy, Heart, Share } from 'phosphor-react';
import { Fade } from 'react-awesome-reveal';
import { CustomPhoto } from '../../context';
import useAppContext from '../../hooks/useAppContext';
import Button from '../Button';
import Image from '../Image';
import {
  ButtonsContainer,
  Caption,
  DescriptionWrapper,
  ImageWrapper,
  ItemWrapper,
  StyledTimesIcon,
  TagsAndTitleContainer,
} from './styles';

type Props = {
  photo: CustomPhoto;
  index: number;
  activeImage: number;
  showTagAndTitle: boolean;
  swiper: any;
};

const CarouselItem = ({
  photo,
  index,
  activeImage,
  showTagAndTitle,
  swiper,
}: Props) => {
  const { state, dispatch } = useAppContext();
  const isFavorite = state.favorites.includes(photo.id);

  const handleFavorite = () => {
    dispatch({
      favorites: !isFavorite
        ? [...state.favorites, photo.id]
        : state.favorites.filter((favoriteId) => favoriteId !== photo.id),
    });
  };

  const handleDuplicate = () => {
    const newDuplicate = {
      ...photo,
      id: `${photo.id}${photo.id}`,
      parentId: photo.parentId ? photo.parentId : photo.id,
      newPhoto: true,
    };

    let newImages = state.images.slice(0, index === 0 ? index : index + 1);
    const imagesRest = state.images.slice(index + 1);
    if (index === 0) {
      newImages = [photo];
    }

    newImages = [...newImages, newDuplicate, ...imagesRest];

    dispatch({
      images: newImages,
    });
    setTimeout(() => {
      if (swiper) {
        const currentImage = newImages.findIndex(
          (element) => element.id === newDuplicate.id
        );
        swiper.slideTo(currentImage);
      }
    }, 100);
  };

  const handleDelete = () =>
    dispatch({
      images: state.images.filter((image) => image.id !== photo.id),
    });

  return (
    <ItemWrapper id={`img-${state.selectedImg?.id}`}>
      <ImageWrapper>
        <Image
          src={photo.urls.regular}
          alt={photo.alt_description || 'no description'}
          viewMode={state.viewMode}
          className={`${activeImage === index ? '' : 'notActive'} sliderItem`}
        />
        {state.viewMode && activeImage === index && photo.newPhoto && (
          <StyledTimesIcon size={32} weight="light" onClick={handleDelete} />
        )}
      </ImageWrapper>
      {state.viewMode && (
        <Caption>
          <DescriptionWrapper>
            <p>{photo.alt_description || 'LIVING ROOM'}</p>
            {showTagAndTitle && photo.id === state.selectedImg?.id && (
              <Fade duration={300}>
                <TagsAndTitleContainer>
                  <span>Floor - Dark forest hardwood </span>
                  <span>Wall - Pearl while</span>
                </TagsAndTitleContainer>
              </Fade>
            )}
          </DescriptionWrapper>
          {showTagAndTitle && photo.id === state.selectedImg?.id && (
            <Fade duration={300}>
              <ButtonsContainer>
                <Button label="SHARE" icon={Share} />
                <Button
                  label="FAVORITE"
                  icon={Heart}
                  fillIcon={isFavorite}
                  onClick={handleFavorite}
                />
                <Button
                  label="DUPLICATE"
                  icon={Copy}
                  onClick={handleDuplicate}
                />
              </ButtonsContainer>
            </Fade>
          )}
        </Caption>
      )}
    </ItemWrapper>
  );
};

export default CarouselItem;
