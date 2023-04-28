import {
  ZAxis,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { data01 } from "../../../pages/Pacientes/mock";

import "./TimelineChart.css";

interface TimelineChartNonPharmacologicalProps {
  chartData: any[];
  onEdit: (e: any) => void;
}

const TimelineChartNonPharmacological = ({
  chartData,
  onEdit,
}: TimelineChartNonPharmacologicalProps) => {
  const parseDomain = () => [
    0,
    Math.max(
      Math.max.apply(
        null,
        data01.map((entry) => entry.value)
      ),
      Math.max.apply(
        null,
        data01.map((entry) => entry.value)
      )
    ),
  ];
  const range = [16, 225];

  const domain = parseDomain();

  const CustomTooltip = (props: any) => {
    const { active } = props;
    if (active) {
      const { payload } = props;

      return (
        <div className="custom-tooltip">
          <p className="label">{`${
            payload[0].payload.initialInterval
          } - Horário atual`}</p>
          <p
            className="desc"
            style={{
              color:
                payload[0].payload.aspecto === "Claro"
                  ? "#2BB6D5"
                  : payload[0].payload.aspecto === "Hemoamnio"
                  ? "#FF0000"
                  : payload[0].payload.aspecto === "Meconio1" ||
                    "Meconio2" ||
                    "Meconio3" ||
                    "Meconio4"
                  ? "#2CDC52"
                  : "#fff",
            }}
          >
            {payload[0].payload.aspecto}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ScatterChart
      width={610}
      height={45}
      style={{ transform: "translate(-24px, 8px)" }}
    >
      <XAxis
        type="category"
        dataKey="hour"
        interval={60}
        tickSize={20}
        tickLine={
          <div
            style={{
              border: "2px solid black",
              height: "100%",
              width: "3px",
              transform: "translate(0, -12px)",
              zIndex: 80,
            }}
          ></div>
        }
        tick={{ fontSize: 0 }}
        axisLine={
          <div style={{ border: "2px solid black", width: "100%" }}></div>
        }
      />
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

      <ZAxis type="number" dataKey="value" domain={domain} range={range} />
      <Tooltip cursor={false} content={CustomTooltip} />

      <Scatter
        data={chartData}
        activeIndex={0}
        shape={
          <svg width="3" height="15">
            <rect width="3" height="15" />
          </svg>
        }
      >
        {chartData.map((item) => (
          <Cell
            onClick={() => onEdit(item)}
            fill={
              item?.aspecto === "Claro"
                ? "#2BB6D5"
                : item?.aspecto === "Hemoamnio"
                ? "#FF0000"
                : item?.aspecto === "Meconio1" ||
                  "Meconio2" ||
                  "Meconio3" ||
                  "Meconio4"
                ? "#2CDC52"
                : "#fff"
            }
          />
        ))}
      </Scatter>
    </ScatterChart>
  );
};

export default TimelineChartNonPharmacological;
