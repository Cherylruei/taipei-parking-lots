import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  left: 50%;
  bottom: -1rem;
  transform: translate(-50%);
  padding: 1rem;
  width: 100%;
  height: 8rem;
  background-color: white;
  z-index: 100;
  border-radius: 20% 20% 0 0;
  border: 0.5rem solid var(--color-sb);
  animation-duration: 1s;
  animation-name: slideIn;

  .iconX {
    position: absolute;
    right: 2rem;
    top: 0.5rem;
    padding: 0.3rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  @keyframes slideIn {
    from {
      bottom: -20rem;
    }

    to {
      bottom: -1rem;
    }
  }

  @media screen and (min-width: 1024px) {
    right: 5rem;
    bottom: -1rem;
    width: 20rem;
    height: 10rem;

    .iconX {
      right: 0.5rem;
    }
  }
`;
