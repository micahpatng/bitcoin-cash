import React, { useState } from "react";
import { FC } from "react";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import styled from "styled-components";
import {
  convertToDollar,
  filterBchListByTimeFrame,
  getTimeFrameRange,
} from "../utils/functions";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BchTimeFrame } from "../state/types";
import { Subtitle } from "../templates/StyledComponents";
import { Button } from "./Button";

const Root = styled.div`
  height: 100%;
  flex-grow: 2;
  margin-right: 16px;
  margin-left: 16px;
  background-color: #1a202c;
  border-radius: 2px;
  padding: 8px;
`;

const ChartBody = styled.div`
  margin-top: 24px;
`;

const TimeFrame = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
  margin: 16px;
`;

const TooltipBox = styled.div`
  background-color: #293244;
  color: #ffffff;
  min-height: 40px;
  min-width: 80px;
  fontsize: 10px;
  padding: 8px;
  text-align: center;
  margin: 8px;
  border-radius: 4px;
`;

const Label = styled.div`
  font-size: 18px;
  margin-top: 4px;
  font-weight: bold;
`;

const Value = styled.div`
  margin-top: 4px;
  color: #9d9c9c;
  line-height: 24px;
`;

const FaCalendar = styled(FaRegCalendarAlt)`
  margin-right: 4px;
`;

export const Dashboard: FC<{ bchList: [] }> = ({ bchList }) => {
  const timeFrameList: BchTimeFrame[] = ["1D", "7D", "1M", "ALL"];
  const [timeFrame, setTimeFrame] = useState<BchTimeFrame>("1M");
  const [activeTimeFrame, setActiveTimeFrame] = useState<{
    timeFrame: BchTimeFrame;
    active: boolean;
  }>({ timeFrame: "1M", active: true });

  const data = filterBchListByTimeFrame(bchList, timeFrame);

  return (
    <Root>
      {data.length !== 0 && (
        <>
          <TimeFrame>
            <div>
              <Subtitle>Range: </Subtitle>
              {getTimeFrameRange(timeFrame, data[0])}
            </div>
            <div>
              {timeFrameList.map((tFrame) => (
                <Button
                  key={tFrame}
                  timeFrame={tFrame}
                  setTimeFrame={setTimeFrame}
                  setActiveTimeFrame={setActiveTimeFrame}
                  active={
                    activeTimeFrame.active &&
                    activeTimeFrame.timeFrame === tFrame
                      ? true
                      : false
                  }
                />
              ))}
            </div>
          </TimeFrame>
          <ChartBody>
            <ResponsiveContainer width="100%" height={500}>
              <AreaChart
                data={data}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <defs>
                  <linearGradient id="linear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#07c58a" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="#07c58a" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#07c58a" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <Area dataKey="price" stroke="#07c58a" fill="url(#linear)" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  minTickGap={1}
                  tickFormatter={(date) => {
                    if (timeFrame === "ALL") {
                      return format(new Date(date), "MMM yyyy");
                    } else return format(new Date(date), "MMM d");
                  }}
                />
                <YAxis
                  dataKey="price"
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                  interval="preserveStartEnd"
                  domain={["dataMin", "auto"]}
                  tickFormatter={(price) => `${Math.round(price / 1000) * 10}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <CartesianGrid opacity={0.1} vertical={false} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartBody>
        </>
      )}
    </Root>
  );
};

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <TooltipBox>
        <Label>{convertToDollar(payload[0].value)}</Label>
        <Value>
          <FaCalendar />
          {format(new Date(label), "PP p")}
        </Value>
      </TooltipBox>
    );
  }
  return null;
}
