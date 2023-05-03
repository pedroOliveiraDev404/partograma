import React, { useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
} from "recharts";
import { data01 } from "../../../../pages/Pacientes/mock";

import {
  GraficoLiquidoAmniotico,
  LiquidoAmnioticoAspecto,
} from "../../../../types/partograma";

import "./TimelineChart.css";

interface TimelineChartProps {
  chartData: GraficoLiquidoAmniotico[];
  chartDomain: number[];
  parameterLabel: string;
}

const DictLiquidoAmnioticoCores = {
  claro: "#2BB6D4",
  meconio1: "#2CDC52",
  meconio2: "#2CDC52",
  meconio3: "#2CDC52",
  meconio4: "#2CDC52",
  hemoamnio: "#FF0000",
};

const renderLegend = () => {
  return (
    <ul
      className="recharts-default-legend"
      style={{ transform: "translate(-140px, -12px)" }}
    >
      <li
        className="recharts-legend-item legend-item"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#2BB6D4"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Claro
        </span>
      </li>

      <li
        className="recharts-legend-item legend-item"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#2CDC52"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Meconial
        </span>
      </li>

      <li
        className="recharts-legend-item legend-item"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#FF0000"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Hemático
        </span>
      </li>
    </ul>
  );
};

const TimelineChart = ({ chartDomain, parameterLabel }: TimelineChartProps) => {
  const [chartData, setChartData] = useState(data01);

  return (
    <ScatterChart
      className="line-chart"
      width={600}
      height={80}
      data={chartData}
      syncId="partograma-charts"
      layout="vertical"
    >
      <XAxis
        type="number"

        tickFormatter={() => ""}

        interval={0}
      />
      <Legend verticalAlign="top" align="center" content={renderLegend} />
      <YAxis
        type="number"
        dataKey="index"
        name="sunday"
        height={10}
        width={80}
        tick={false}
        tickLine={false}
        axisLine={false}
      />
      <Scatter
        data={chartData}
        activeIndex={0}
        shape={
          <svg
            width="11"
            height="10"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.79289 0.707106C5.18342 0.316582 5.81658 0.316583 6.20711 0.707107L9.79289 4.29289C10.1834 4.68342 10.1834 5.31658 9.79289 5.70711L6.20711 9.29289C5.81658 9.68342 5.18342 9.68342 4.79289 9.29289L1.20711 5.70711C0.816582 5.31658 0.816583 4.68342 1.20711 4.29289L4.79289 0.707106Z"
              fill="#B874C6"
            />
          </svg>
        }
      >
        {chartData.map((item: any, index) => (
          <Cell>{item.icon}</Cell>
        ))}
      </Scatter>
    </ScatterChart>
  );
};

export default TimelineChart;
