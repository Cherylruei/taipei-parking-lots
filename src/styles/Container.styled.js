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
    grid-template-columns: 2.5fr 5.5fr;
  }
`;

export const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  height: 100vh;
  margin: 0px;
  background-color: var(--color-grey);
  @media screen and (${device.lg}) {
    height: 100%;
  }
`;

export const MapWrapper = styled.div`
  @media screen and (${device.lg}) {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;
