import styled from 'styled-components';

export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  max-width: 100%;
  height: 3em;
  margin: 10px 5px;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
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
