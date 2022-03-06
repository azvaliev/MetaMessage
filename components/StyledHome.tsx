import styled from "styled-components";

export const Main = styled.div`
  width: 100%;
`;

export const ProfileHolder = styled.div`
  min-width: 4vw;
  height: 4vw;
  margin-right: 1%;
  @media screen and (max-width: 767px) {
    min-width: 11vw;
    height: 11vw;
  }
`;

export const Bar = styled.div`
  right: 4%;
  min-width: 6vw;
  @media screen and (max-width: 767px) {
    min-width: 19vw;
  }
`;

export const OptionHolder = styled.div`
  filter: invert(1);
  min-width: 6vw;
  height: 6vw;
  @media screen and (max-width: 767px) {
    min-width: 19vw;
    min-height: 19vw;
  }
  margin-bottom: 1.25vh;
`;

export const OptionInnerHolder = styled.div`
  filter: invert(1);
  min-width: 5vw;
  height: 5vw;
  @media screen and (max-width: 767px) {
    min-width: 14vw;
    min-height: 14vw;
  }
  @media (min-width: 660px) {
    bottom: auto !important;
  }
`;

export const AddressHolder = styled.h1`
  width: 91vw;
`;
