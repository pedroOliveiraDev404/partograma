import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { useEffect } from "react";
import { addFluidIntake } from "../../../../store/modules/fluidIntake/actions";

interface TimelineFluidIntakeProps {
  onEdit: (e: any) => void;
}

const TimelineFluidIntakeChart = ({ onEdit }: TimelineFluidIntakeProps) => {
  const dispatch = useDispatch();

  const { fluidIntakeData } = useSelector(
    (state: Store.State) => state.fluidintake.data
  );

  const FluidIntakeDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g onClick={() => onEdit(payload)}>
          <svg
            width="13"
            height="13"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 6}
            y={(cy || 0) - 2}
          >
            <path
              d="M3.82443 0.854102C4.5254 0.344814 5.4746 0.344814 6.17557 0.854102L8.57971 2.60081C9.28069 3.1101 9.574 4.01284 9.30625 4.83688L8.38795 7.66312C8.12021 8.48716 7.35229 9.04508 6.48584 9.04508H3.51416C2.64771 9.04508 1.87979 8.48716 1.61205 7.66312L0.693745 4.83688C0.425997 4.01284 0.719313 3.1101 1.42029 2.60081L3.82443 0.854102Z"
              fill="#407E01"
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

    const newDataChart = fluidIntakeData.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
      };
    });
    dispatch(addFluidIntake(newDataChart));
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
          <p className="desc" style={{ color: "#407E01" }}>
            {payload[0]?.payload.point
              ? `Ingestão de Líquido: ${payload[0]?.payload?.observation}`
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
    <LineChart width={550} height={54} data={fluidIntakeData}>
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
        dot={<FluidIntakeDot />}
        activeDot={{ r: 2 }}
        isAnimationActive={false}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineFluidIntakeChart;
