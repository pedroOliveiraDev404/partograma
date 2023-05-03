import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { useEffect } from "react";
import { addPosture } from "../../../../store/modules/posture/actions";

interface TimelinePostureProps {
  onEdit: (e: any) => void;
}

const TimelinePostureChart = ({ onEdit }: TimelinePostureProps) => {
  const dispatch = useDispatch();

  const { postureData } = useSelector(
    (state: Store.State) => state.posture.data
  );

  const PostureDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g onClick={() => onEdit(payload)}>
          <svg
            width="13"
            height="12"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 5}
            y={(cy || 0) - 2}
          >
            <rect x="0.199219" width="10" height="10" rx="5" fill="#803C02" />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;

    const newDataChart = postureData.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
      };
    });
    dispatch(addPosture(newDataChart));
  };

  useEffect(() => {
    updateTime();
  }, []);

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
              ? `Postura: ${payload[0]?.payload?.observation}`
              : ""}
          </p>
          <p className="desc" style={{ color: "#803C02" }}>
            Usuário:
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <LineChart width={550} height={54} data={postureData}>
      <XAxis
        dataKey="timeLegend"
        interval={59}
        tickFormatter={() => ""}
        tickSize={15}
        tickLine={{ transform: "translate(0, -15)" }}
        tick={{ fontSize: 0 }}
        axisLine={false}
      />

      <Line
        dataKey="point"
        stroke="#582D8F"
        dot={<PostureDot />}
        isAnimationActive={false}
        activeDot={{ r: 2 }}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelinePostureChart;
