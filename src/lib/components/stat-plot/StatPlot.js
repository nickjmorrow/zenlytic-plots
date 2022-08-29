/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import { BiCaretUp, BiCaretDown } from "react-icons/bi";

import React from "react";
import formatValue from "../../utils/formatValue";
import getD3DataFormatter from "../../utils/getD3DateFormatter";

const getNumberType = (number) => (number >= 0 ? "positive" : "negative");
const getColor = (type) => {
  switch (type) {
    case "positive":
      return "green";
    case "negative":
      return "red";
    default:
      return "black";
  }
};

const getMainStatFontSize = (size) => {
  switch (size) {
    case "lg":
      return "48px";
    case "md":
      return "20px";
    case "sm":
    default:
      return "18px";
  }
};

const getSecondaryStatFontSize = (size) => {
  switch (size) {
    case "lg":
      return "18px";
    case "md":
      return "14px";
    case "sm":
    default:
      return "12px";
  }
};

const getLabelFontSize = (size) => {
  switch (size) {
    case "lg":
      return "18px";
    case "md":
      return "14px";
    case "sm":
    default:
      return "12px";
  }
};

const getStatSize = (numberOfStats) => {
  if (numberOfStats > 6) {
    return "sm";
  }
  if (numberOfStats > 3) {
    return "md";
  }
  return "lg";
};

function Direction({ type }) {
  switch (type) {
    case "positive":
      return <BiCaretUp />;
    case "negative":
      return <BiCaretDown />;
    default:
      return false;
  }
}

function TopStat({ date, value, type, size = "md" }) {
  const topStatFontSize = getMainStatFontSize(size);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "12px",
          color: "#8c8c8c",
          fontWeight: 300,
        }}
      >
        {date}
      </div>
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: topStatFontSize,
          flexShrink: 0,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function BottomStat({ date, value, type, size = "md" }) {
  const bottomStatFontSize = getSecondaryStatFontSize(size);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontSize: "12px",
          color: "#8c8c8c",
          fontWeight: 300,
        }}
      >
        {date}
      </div>
      <div
        style={{ display: "flex", color: getColor(type), alignItems: "center" }}
      >
        <Direction type={type} />
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: bottomStatFontSize,
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function StatItem({
  label,
  mainNumber,
  mainNumberFormatter,
  mainNumberText,
  statSize,
  secondaryNumber,
  secondaryNumberFormatter,
  secondaryNumberText,
  isServerSide,
}) {
  const mainNumberType = getNumberType(mainNumber);
  const secondaryNumberType = getNumberType(secondaryNumber);
  const formattedMainNumber = formatValue(
    getD3DataFormatter(mainNumberFormatter, mainNumber),
    mainNumber
  );
  const formattedSecondaryNumber = formatValue(
    getD3DataFormatter(secondaryNumberFormatter, mainNumber),
    secondaryNumber
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "12px",
        border: isServerSide ? "0" : "1px solid lightgray",
        padding: "16px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: getLabelFontSize(statSize),
            flexShrink: 0,
          }}
        >
          {label}
        </div>
        <TopStat
          date={mainNumberText}
          value={formattedMainNumber}
          size={statSize}
          type={mainNumberType}
        />
        <BottomStat
          date={secondaryNumberText}
          value={formattedSecondaryNumber}
          size={statSize}
          type={secondaryNumberType}
        />
      </div>
    </div>
  );
}

function StatPlot({
  data = [],
  margin = {
    top: "32px",
    left: "32px",
    bottom: "16px",
    right: "32px",
  },
  width = "100%",
  height = "100%",
  isServerSide = false,
}) {
  const statSize = getStatSize(data.length);

  return (
    <div
      style={{
        display: "grid",
        gap: "16px",
        height,
        width,
        gridTemplateColumns: "auto auto auto",
        paddingTop: margin.top,
        paddingBottom: margin.bottom,
        paddingLeft: margin.left,
        paddingRight: margin.right,
      }}
    >
      {data.map((item) => {
        const {
          mainNumber,
          mainNumberFormatter,
          mainNumberText,
          secondaryNumber,
          secondaryNumberFormatter,
          secondaryNumberText,
          label,
        } = item;
        return (
          <StatItem
            label={label}
            mainNumber={mainNumber}
            mainNumberFormatter={mainNumberFormatter}
            mainNumberText={mainNumberText}
            statSize={statSize}
            secondaryNumber={secondaryNumber}
            secondaryNumberFormatter={secondaryNumberFormatter}
            secondaryNumberText={secondaryNumberText}
            isServerSide={isServerSide}
          />
        );
      })}
    </div>
  );
}

StatPlot.propTypes = {};

export default StatPlot;
