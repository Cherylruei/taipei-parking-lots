import styled from 'styled-components';

const breakpoint = {
  md: '768px',
  lg: '1024px',
};

const device = {
  md: `min-width: ${breakpoint.md}`,
  lg: `min-width: ${breakpoint.lg}`,
};

export const GlobalContainer = styled.div`
  /* 設置 max-width:100% 可確保適應任何寬度的device */
  max-width: 100%;
  height: 100vh;
  overflow: hidden;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr 9fr;

  @media screen and (${device.lg}) {
    grid-template-columns: 1.5fr 8fr;
  }
`;

export const NavbarWrapper = styled.div`
  position: absolute;
  top: 0.1em;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 30vh;
  margin: 0px;
  z-index: 10;

  @media screen and (${device.lg}) {
    position: static;
    transform: none;
    top: auto;
    left: auto;
    max-height: 100vh;
  }
`;

export const MapWrapper = styled.div`
  max-height: 100vh;

  .infoWindow {
    background: #f0f6fa;
    border: 5px solid #f0f6fa;
    border-radius: 5%;
    box-shadow: 0 0 15px 10px #fff;
  }
  .gm-style {
    font: 700 12px Noto Sans TC, Arial, sans-serif;
    color: var(--color-theme);
  }
  .lotsNumber {
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
  }
  .gm-style-iw-d {
    h2 {
      font-weight: 600;
    }
    .number {
      font-weight: 600;
    }
  }

  @media screen and (${device.lg}) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;
