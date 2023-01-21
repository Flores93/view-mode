import { ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  children: ReactNode;
};

const Container = styled.div`
  position: relative;
  display: flex;

  /* min-width: 1024px; */
`;

const PrimaryLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default PrimaryLayout;
