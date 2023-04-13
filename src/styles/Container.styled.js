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
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr 9fr;

  @media screen and (${device.lg}) {
    grid-template-columns: 2fr 8fr;
  }
`;

export const NavbarWrapper = styled.div`
  @media screen and (${device.lg}) {
    grid-column-start: 1;
    grid-column-end: 2;
    grid-row-start: 1;
    grid-row-end: 3;
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
