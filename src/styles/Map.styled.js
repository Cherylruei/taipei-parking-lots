import styled from 'styled-components';

export const StyledLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2em;
  height: 2em;
  background: var(--color-white);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const StyledLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .loading {
    width: 8em;
    aspect-ratio: 1 / 1;
    background: radial-gradient(
      closest-side circle,
      #64bee1 99%,
      transparent 100%
    );
    background: conic-gradient(transparent 10%, #64bee1 90%);
    background-position: center top, center;
    background-size: 25% 25% 100%; // multiple background
    background-repeat: no-repeat;
    -webkit-mask: radial-gradient(
      closest-side circle,
      transparent 50%,
      black 51% 99%,
      transparent 100%
    );

    animation: rotate 1s linear infinite;

    @keyframes rotate {
      to {
        rotate: 1turn;
      }
    }
  }
`;
