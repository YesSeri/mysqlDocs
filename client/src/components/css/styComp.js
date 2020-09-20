import styled from 'styled-components';
export const LinkGrid = styled.div`
  .linkContainer > div {
    display: grid;
    grid-template-columns: 3fr 1fr 2fr;
    grid-column-gap: 0.5em;
    justify-content: space-around;
  }
  .linkContainer {
    visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
    background-color: #fff;
    display: grid;
    grid-row-gap: 0.5em;
    margin: auto;
    max-width: 40%;
    border-radius: 20px;
    padding: 10px;
    @media (max-width: 768px) {
      max-width: 100%;
    }
  }
`;

export const StyledResults = styled.div`
  .topResult {
    font-size: 36px;
    border-radius: 20px;
    &:hover {
      color: #22e;
    }
  }
  .bottomRow {
    border-radius: 5px;
  }
  .otherResult {
    min-height: 100%;
    height: 100%;
    &:hover {
      color: #22e;
    }
  }
`;
export const StyledLinks = styled.div`
  a {
    font-size: 2em;
  }
  span {
    font-size: 2em;
  }
`;

export const StyledHeading = styled.div`
  div {
    background-color: 'black';
    color: 'white';
    border-bottom-left-radius: '20px';
    border-bottom-right-radius: '20px';
  }
`;
export const StyledIframe = styled.div`
  object {
    height: 100vh;
    width: 100%;
  }
  iframe {
    height: 100vh;
    width: 100%;
  }
`;
export const StyledBanner = styled.div`
  .bannerContainer {
    justify-content: center;
    background-color: #303273;
    color: #fff;
    margin: 20px;
  }
  .centered {
    float: none;
    margin: 0 auto;
  }

  .topRow {
    max-width: 800px;
    margin: 0 auto;
    padding-bottom: 5px;
    font-size: 1.5rem;
  }
  .bottomRow {
    max-width: 800px;
    margin: 0 auto;
    align-content: center;
    font-size: 1.1rem;
  }
`;

export const StyledImage = styled.div`
  img {
    border-radius: '11px';
    width: '100%';
    height: 'auto';
    max-width: '36rem';
  }
`;
