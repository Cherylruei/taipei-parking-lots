import styled from 'styled-components';

export const StyledSearch = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 20px;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey);
  border-radius: 1rem;
  .icon {
    margin: 1rem;
  }
  input {
    flex-grow: 1;
    border: none;
    width: 100%;
    height: 40px;
    font-size: var(--fs-h2);
    border: none;
    outline: none;
  }

  @media screen and (max-width: 1023px) {
    input {
      max-width: 723px;
    }
  }
`;
