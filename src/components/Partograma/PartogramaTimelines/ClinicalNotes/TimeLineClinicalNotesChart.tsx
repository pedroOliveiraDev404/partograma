import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { useEffect } from "react";
import { addClinicalNotes } from "../../../../store/modules/clinicalNotes/actions";

interface TimelineClinicalNotesProps {
  onEdit: (e: any) => void;
}


const TimelineClinicalNotesChart = ({ onEdit }: TimelineClinicalNotesProps) => {
  const dispatch = useDispatch();

  const { clinicalNotesData } = useSelector(
    (state: Store.State) => state.clinicalNotes.data
  );

  const DilatacaoDot = ({ cx, cy, payload }: any) => {
    if (payload.point) {
      return (
        <g onClick={() => onEdit(payload)}>
          <svg
            width="14"
            height="11"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 4}
            y={(cy || 0 ) - 1}
          >
            <path
              d="M4.33319 0.5C4.71809 -0.166667 5.68034 -0.166666 6.06524 0.5L9.52935 6.5C9.91425 7.16667 9.43312 8 8.66332 8H1.73512C0.965317 8 0.484192 7.16667 0.869092 6.5L4.33319 0.5Z"
              fill="#582D8F"
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

    const newDataChart = clinicalNotesData.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
      };
    });
    dispatch(addClinicalNotes(newDataChart));
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
          <p className="desc" style={{ color: "#582D8F" }}>
            {payload[0]?.payload.point
              ? `Nota Clínica: ${payload[0]?.payload?.observation}`
              : ""}
          </p>
          <p className="desc" style={{ color: "#B874C6" }}>
            Usuário:
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <LineChart width={550} height={54} data={clinicalNotesData}>
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
        dot={<DilatacaoDot  />}
        activeDot={{ r: 2 }}
        isAnimationActive={false}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineClinicalNotesChart;
