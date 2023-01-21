import { IconProps } from 'phosphor-react';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  flipIcon?: string;
  icon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;
  fillIcon?: boolean;
}

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  cursor: pointer;

  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;

  padding: 12px 16px;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.35);
  border-radius: 12px;
  border: 0px;
  letter-spacing: 0.5px;

  transition: 150ms;

  text-transform: uppercase;

  &:hover {
    background: #d1d4de;
    color: #373c40;
  }
`;

const Button = ({
  label,
  icon,
  flipIcon,
  fillIcon = false,
  ...props
}: Props) => {
  const Icon = icon;
  return (
    <StyledButton {...props}>
      <Icon
        size={16}
        style={flipIcon ? { transform: `rotate(${flipIcon})` } : {}}
        weight={fillIcon ? 'fill' : 'light'}
      />
      {label}
    </StyledButton>
  );
};

export default Button;
