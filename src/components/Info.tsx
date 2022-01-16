import React from "react";
import { FC } from "react";
import styled from "styled-components";
import { Divider, Title } from "../templates/StyledComponents";

const Root = styled.div`
  margin: 0px 16px 8px 0px;
  border-radius: 2px;
  background-color: #1a202c;
  padding: 12px;
`;

const Box = styled.div`
  box-shadow: 2px 2px 2px rgba(26, 32, 45, 0.2);
  background-color: #1a202c;
  padding: 8px;
  color: #ffffff;
  text-align: initial;
`;

export const Info: FC = () => {
  return (
    <Root>
      <Title>About</Title>
      <Divider />
      <Box>
        <span>
          Bitcoin Cash (BCH) is an altcoin version of the popular Bitcoin
          cryptocurrency. The asset was created via a hard fork of the Bitcoin
          blockchain network and has since developed its own community. It is a
          decentralized peer-to-peer electronic cash system that does not rely
          on any central authority like a government or financial institution.
        </span>
      </Box>
    </Root>
  );
};
