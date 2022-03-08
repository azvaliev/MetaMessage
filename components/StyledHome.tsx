import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
`;

export const Bar = styled.div`
  right: 4%;
  min-width: 6vw;
  @media screen and (max-width: 767px) {
    min-width: 19vw;
  }
`;

export const OptionHolder = styled.div`
  min-width: 6vw;
  height: 6vw;
  @media screen and (max-width: 767px) {
    min-width: 19vw;
    min-height: 19vw;
  }
  margin-bottom: 1.25vh;
  cursor: pointer;
`;

export const OptionInnerHolder = styled.div`
  min-width: 5vw;
  height: 5vw;
  @media screen and (max-width: 767px) {
    min-width: 14vw;
    min-height: 14vw;
  }
  @media (min-width: 660px) {
    bottom: 1.5vw;
  }
`;
