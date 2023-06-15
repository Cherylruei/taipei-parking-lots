import styled from 'styled-components';

export const Modal = styled.div`
  position: fixed;
  left: 50%;
  bottom: -1rem;
  transform: translate(-50%);
  padding: 1rem;
  width: 100%;
  height: 10rem;
  background-color: white;
  z-index: 100;
  border-radius: 20% 20% 0 0;
  border: 0.5rem solid var(--color-sb);
  animation-duration: 1s;
  animation-name: slideIn;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  text-align: center;
  line-height: 1.5rem;
  color: var(--color-theme);

  @keyframes slideIn {
    from {
      bottom: -20rem;
    }

    to {
      bottom: -1rem;
    }
  }

  .title {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    .iconLot {
      width: 1.5rem;
      height: 1.5rem;
    }

    h2 {
      font-size: 1rem;
    }
  }

  .address {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 1rem;
  }
  .text {
    font-size: 0.8rem;
  }
  .payment {
    padding: 0.2rem 0.5rem 0rem;
    font-size: 0.7rem;
  }
  .smInfo {
    padding: 0.5rem 2rem 0rem;
  }

  @media screen and (min-width: 1024px) {
    left: 25rem;
    width: 20rem;
    height: 10rem;
  }
`;
