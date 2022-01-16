import { formatDistance } from "date-fns/esm";
import React from "react";
import { FC } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import styled from "styled-components";
import { INewsListResource } from "../state/state";
import { Divider, Subtitle, Title } from "../templates/StyledComponents";
import { decodeXml } from "../utils/functions";

const Root = styled.div`
  margin-right: 16px;
  border-radius: 2px;
  background-color: #1a202c;
  padding: 12px;
`;

const NewsBox = styled.button`
  width: 100%;
  box-shadow: 2px 2px 2px rgba(26, 32, 45, 0.2);
  background-color: #1a202c;
  margin-bottom: 8px;
  padding: 8px;
  color: #ffffff;
  text-align: initial;
`;

const NewsTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 4px;
`;

const FaExternalLink = styled(FaExternalLinkAlt)`
  margin-left: 4px;
`;

export const News: FC<{ newsList: INewsListResource[] }> = ({ newsList }) => {
  const handleClick = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <Root>
      <Title>Latest News</Title>
      <Divider />
      {newsList.map((news, i) => (
        <NewsBox key={i} onClick={() => handleClick(news.link)}>
          <NewsTitle>{decodeXml(news.title)}</NewsTitle>
          <Subtitle>
            {formatDistance(new Date(news.pubDate), new Date())}
            <FaExternalLink />
          </Subtitle>
        </NewsBox>
      ))}
    </Root>
  );
};
