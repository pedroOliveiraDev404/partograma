import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { Line, LineChart, XAxis, Tooltip } from "recharts";
import { addNonPharmacological } from "../../../../store/modules/nonPharmacological/actions";
import { formatDatetimeAxis } from "../../../../utils/formatting";

import "../TimelineChart/TimelineChart.css";

interface TimelineChartNonPharmacologicalProps {
  onEdit: (e: any) => void;
}

const TimelineChartNonPharmacological = ({
  onEdit,
}: TimelineChartNonPharmacologicalProps) => {
  const dispatch = useDispatch()
  const { nonPharmacologicalData } = useSelector(
    (state: Store.State) => state.nonPharmacological.data
  );

  const CustomTooltip = (props: any) => {
    const { active } = props;
    if (active) {
      const { payload } = props;
      return (
        <div className="custom-tooltip" style={{ marginTop: "-140px" }}>
          <p className="label">{`${payload[0]?.payload.timeLegend}`}</p>
          <div className="partograma-page__grid-tooltip">
            {payload[0]?.payload?.nonPharmacologic?.map((item: string) => (
              <p className="desc" style={{ color: "#B874C6" }}>
                {item}
              </p>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const DilatacaoDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g onClick={() => onEdit(payload)}>
          <svg
            width="14"
            height="13"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 7}
            y={(cy || 0) - 2}
          >
            <path
              d="M4.79289 0.707106C5.18342 0.316582 5.81658 0.316583 6.20711 0.707107L9.79289 4.29289C10.1834 4.68342 10.1834 5.31658 9.79289 5.70711L6.20711 9.29289C5.81658 9.68342 5.18342 9.68342 4.79289 9.29289L1.20711 5.70711C0.816582 5.31658 0.816583 4.68342 1.20711 4.29289L4.79289 0.707106Z"
              fill="#B874C6"
            />
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

    const newDataChart = nonPharmacologicalData.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
      };
    });
    dispatch(addNonPharmacological(newDataChart));
  };

  useEffect(() => {
    updateTime();
  }, []);

  return (
    <LineChart width={550} height={54} data={nonPharmacologicalData}>
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
        dot={<DilatacaoDot />}
        activeDot={{ r: 2 }}
        isAnimationActive={false}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineChartNonPharmacological;
