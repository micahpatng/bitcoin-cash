import React, { FC } from "react";
import { BchTimeFrame } from "../state/types";

export const Button: FC<{
  timeFrame: BchTimeFrame;
  setTimeFrame: (timeFrame: BchTimeFrame) => void;
  setActiveTimeFrame: (activeTimeFrame: {
    timeFrame: BchTimeFrame;
    active: boolean;
  }) => void;
  active: boolean;
}> = ({ timeFrame, setTimeFrame, setActiveTimeFrame, active }) => {
  return (
    <button
      name={timeFrame}
      style={{
        backgroundColor: active ? "#333546" : "#0f1624",
      }}
      onClick={() => {
        setTimeFrame(timeFrame);
        setActiveTimeFrame({ timeFrame, active: true });
      }}
    >
      {timeFrame}
    </button>
  );
};
