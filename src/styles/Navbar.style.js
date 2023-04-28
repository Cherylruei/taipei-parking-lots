import styled from 'styled-components';

export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 3em;
  margin: 10px 5px;
  background-color: var(--color-white);
  border: none;
  border-radius: 1rem;
  .icon {
    margin: 1rem;
  }
  input {
    flex-grow: 1;
    border: none;
    max-width: 100%;
    height: 2em;
    font-size: var(--fs-basic);
    background: var(--color-white);
    border: none;
    border-radius: 1rem;
    outline: none;
  }

  @media screen and (max-width: 1023px) {
    input {
      max-width: 723px;
    }
  }
`;

export const StyledList = styled.ul`
  overflow-y: scroll;
  div {
    margin: 16px 16px;
    padding: 5px 16px;
    line-height: 1.5rem;
    background: var(--color-secondary);
    border: 2px solid var(--color-white-grey);
    border-radius: 10px;
    color: var(--color-theme);
    box-shadow: rgba(0, 0, 0, 0.24) 0px 2px 5px;
    h2 {
      font-weight: 500;
    }
  }
`;