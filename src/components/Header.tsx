import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Chip, Img, Title } from "../templates/StyledComponents";
import { convertToDollar } from "../utils/functions";

const StyledHeader = styled.div`
  min-height: 48px;
  display: flex;
  align-items: center;
  margin: 16px 24px;
`;

const Name = styled.span`
  flex-grow: 1;
  align-items: center;
`;

export const Header: FC<{ currentBch: number; pricePercentage: number }> = ({
  currentBch,
  pricePercentage,
}) => {
  const isUp = pricePercentage > 0 ? true : false;

  return (
    <StyledHeader>
      <Img src="images/bch.png" height="40" width="40" />
      <Name>
        <Title>Bitcoin Cash</Title>
        <Chip>BCH</Chip>
      </Name>
      <Title>{convertToDollar(currentBch)}</Title>
      <Chip
        style={{
          backgroundColor: isUp ? "#16c784" : "#ea3943",
          color: "#ffffff",
        }}
      >
        {pricePercentage.toFixed(2)}%
      </Chip>
    </StyledHeader>
  );
};
