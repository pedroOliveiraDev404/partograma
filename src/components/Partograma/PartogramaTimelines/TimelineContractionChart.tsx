import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../utils/formatting";
import { useEffect } from "react";
import { addContraction } from "../../../store/modules/contraction/actions";

interface TimelinePostureProps {
  onEdit: (e: any) => void;
}

const TimelineContractionChart = ({ onEdit }: TimelinePostureProps) => {
  const dispatch = useDispatch();

  const { contractionData } = useSelector(
    (state: Store.State) => state.contraction.data
  );

  const PostureDot = ({ cx, cy, payload }: any) => {
    if (payload?.iconContraction) {
      return (
        <g
          transform={`translate(${cx - 4},${cy - 0})`}
          onClick={() => onEdit(payload)}
        >
          {payload.iconContraction}
        </g>
      );
    } else {
      return null;
    }
  };

  const ContractionDot = ({ cx, cy, payload }: any) => {
    if (payload?.iconContrationTime) {
      return (
        <g
          transform={`translate(${cx - 11},${cy - 0})`}
          onClick={() => onEdit(payload)}
        >
          {payload.iconContrationTime}
        </g>
      );
    } else {
      return null;
    }
  };

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;

    const newDataChart = contractionData.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
        position: index,
      };
    });
    dispatch(addContraction(newDataChart));
  };

  useEffect(() => {
    updateTime();
  }, []);

  const CustomTickLine = ({ x, y, payload }: any) => (
    <g
      transform={`translate(${x},${y})`}
      style={{ border: "1px dashed #D9D9D9" }}
    >
      <line
        x1={0}
        y1={-50}
        x2={0}
        y2={-33}
        stroke={"#333"}
        strokeDasharray={payload.index % 60 === 0 ? "" : "3 3"}
        strokeWidth={0.8}
      />
      <line
        x1={0}
        y1={-33}
        x2={0}
        y2={-18}
        stroke="#D9D9D9"
        strokeDasharray={payload.index % 60 === 0 ? "" : "3 3"}
        strokeWidth={0.8}
      />
    </g>
  );
  const CustomTooltip = (props: any) => {
    const { active } = props;

    if (active) {
      const { payload } = props;
      return (
        <div
          className="custom-tooltip"
          style={{
            height: "150px",
            width: "220px",
            transform: "translate(0, -48px)",
          }}
        >
          <p className="label">{payload[0]?.payload?.timeLegend}</p>
          <p className="desc" style={{ color: "#803C02" }}>
            {payload[0]?.payload.point
              ? `Número de contrações: ${payload[0]?.payload?.contractions}`
              : ""}
          </p>
          <p className="desc" style={{ color: "#803C02" }}>
            {payload[0]?.payload.contractionTime
              ? payload[0]?.payload?.contractionTime
              : ""}
          </p>
        </div>
      );
    }

    return null;
  };
  const TickLineStyle = {
    strokeWidth: 0, // set the dash pattern to "5 on, 5 off"
  };

  return (
    <LineChart width={550} height={54} data={contractionData}>
      <XAxis
        dataKey="timeLegend"
        interval={29}
        tickFormatter={() => ""}
        tickSize={32}
        tickLine={TickLineStyle}
        tick={<CustomTickLine />}
        axisLine={false}
      />

      <Line
        dataKey="point"
        stroke="#582D8F"
        dot={<PostureDot />}
        isAnimationActive={false}
        activeDot={{ r: 2 }}
      />

      <Line
        dataKey="point"
        stroke="#582D8F"
        dot={<ContractionDot />}
        isAnimationActive={false}
        activeDot={{ r: 2 }}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineContractionChart;
