import styled from 'styled-components';

// no underline, to use with an emoji rather than text
const ButtonAsLinkNoUL = styled.button`
  background: none;
  color: #0077cc;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  :hover,
  :active {
    color: #004499;
  }
`;

export default ButtonAsLinkNoUL;
