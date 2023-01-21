import { memo } from 'react';
import styled from 'styled-components';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  viewMode: boolean;
  alt: string;
}

type StylesProps = Pick<Props, 'src' | 'viewMode'>;

const StyledImage = styled.img<StylesProps>`
  ${(props) =>
    props.viewMode
      ? `
  max-width: 100%;
  max-height: 57.25%;
  width: auto;
  border-radius: 32px;
`
      : `
  width: 100vw;
  height: 100vh;
  `}
  object-fit: cover;

  transition: 1000ms;
`;

const Image = ({ src, alt, viewMode, ...props }: Props) => (
  <StyledImage viewMode={viewMode} src={src} alt={alt} {...props} />
);

export default memo(Image);
