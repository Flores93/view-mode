import { Fade } from 'react-awesome-reveal';
import styled from 'styled-components';
import useAppContext from '../../hooks/useAppContext';
import Button from '../Button';
import { buttons } from './buttonOptions';

const Container = styled.div<{ viewMode: boolean }>`
  position: absolute;
  padding: 8px;
  height: 44px;
  width: ${(props) => (props.viewMode ? '92px' : '457px')};

  left: 50%;
  transform: translate(-50%);

  -webkit-transition: all 300ms ease-in;
  -moz-transition: all 300ms ease-in;
  transition: all 300ms ease-in;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  background: rgba(48, 52, 56, 0.55);
  backdrop-filter: blur(4px);
  border-radius: 0px 0px 16px 16px;

  z-index: 2;
`;

const Controls = () => {
  const { state, dispatch } = useAppContext();

  const filteredButtons = buttons.filter((item) =>
    state.viewMode ? item.label === 'done' : item.label !== 'done'
  );

  const onClickFunctions = {
    exit: () => {},
    'change room': () => {},
    views: () => {
      dispatch({
        viewMode: true,
      });
    },
    share: () => {},
    done: () => {
      dispatch({
        viewMode: false,
      });
    },
  };

  return (
    <Container viewMode={state.viewMode}>
      <Fade delay={120} direction="down">
        {filteredButtons.map((item) => (
          <Button
            key={item.label}
            label={item.label}
            icon={item.icon}
            flipIcon={item.flipIcon || ''}
            onClick={onClickFunctions[item.label as 'done']}
          />
        ))}
      </Fade>
    </Container>
  );
};

export default Controls;
