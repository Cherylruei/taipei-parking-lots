import styled from 'styled-components';

export const StyledLocation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  background: var(--color-white);
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

export const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 15em;
  height: 5em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
  color: var(--color-theme);
  background: var(--color-secondary);
  border-radius: 5px;
  border: 3px solid var(--color-theme);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;
