import React from 'react';
import styled from 'styled-components';

const Btn = styled.button.attrs(props => ({type: props.type}))`
  background-color: var(--deep-blue);
  border: none;
  padding: 10px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    filter: brightness(1.2);
  }
`;

const CancelButton = styled(Btn)`
  background-color: #6e6e6e;
  color: var(--white);
`;

const SubButton = styled(Btn)`
  background-color: var(--beige);
  color: var(--black);
`;

const Button = ({children, onClick, type}) => {
  return (
    <Btn type={type} onClick={onClick}>
      {children}
    </Btn>
  );
};

export {CancelButton, SubButton};
export default Button;
