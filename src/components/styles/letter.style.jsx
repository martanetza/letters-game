import styled from 'styled-components';

const Letter = styled.div`
  background: ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  left: ${(props) => props.left}px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  animation-name: ${(props) => (props.animation ? 'slideDown' : 'none')};
  bottom: ${(props) => (!props.animation ? '0px' : ' ')};
  animation-duration: 10s;
  animation-fill-mode: forwards;

  @keyframes slideDown {
    from {
      bottom: 500px;
    }
    to {
      bottom: 120px;
    }
  }
`;

export default Letter;
