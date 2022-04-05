import styled from "styled-components";

export const Bar = styled.div`
  right: 17.5%;
  min-width: 6vw;
  @media screen and (max-width: 767px) {
    min-width: 19vw;
  }
`;

export const OptionHolder = styled.div`
  display: flex;
  width: 6vw;
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
  margin: auto;
  @media screen and (max-width: 767px) {
    min-width: 14vw;
    min-height: 14vw;
  }
`;
export const CloseConvBtn = styled.h5`
  color: rgb(37, 99, 235);
  font-size: 3.5rem;
	z-index: 20;
	position: absolute;
	right: 3%;
	top: -1.8vh;
  @media (min-width: 450px) {
    top: -2.5vh;
  }
  @media (min-width: 1024px) {
    right: 17%;
  }
`;
