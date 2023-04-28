import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../utils/formatting";
import { useEffect } from "react";
import { addOxytocin } from "../../../store/modules/oxytocin/actions";

interface TimelineCompanyProps {
  onEdit: (e: any) => void;
}

const TimelineOxytocinChart = ({ onEdit }: TimelineCompanyProps) => {
  const dispatch = useDispatch();

  const { oxytocinData, init, positionInit } = useSelector(
    (state: Store.State) => state.oxytocin.data
  );

  const PeriodDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g>
          <svg
            width="1.6"
            height="12"
            x={cx || 0}
            y={(cy || 0) - 1.8}
            fill="#DBC8DA"
          >
            <rect width="1.6" height="12" />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const onClickPharmacological = (e: any) => {
    onEdit(e);
  };

  const PharmacologicalDot = ({ cx, cy, payload }: any) => {
    if (payload?.iconDose) {
      return (
        <g
          onClick={() => onClickPharmacological(payload)}
          transform={`translate(${cx + 1},${cy + 5})`}
        >
          {payload.iconDose}
        </g>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (init) {
      const upatedInterval = setInterval(() => {
        const dataReverse = oxytocinData?.reduceRight(function (
          previous: any,
          current: any
        ) {
          previous.push(current);
          return previous;
        },
        []);
        const find: any = dataReverse.find((e: any, index: number) => e?.id);
        let administeredDose = 0;
        let id = 0;
        const newDataChart = oxytocinData.map((item: any) => {
          if (item.position === find.position && item.id) {
            administeredDose = item.administeredDose;
            id = item.id;
          }
          if (item.position === find.position + 1) {
            return {
              ...item,
              point: 0.5,
              administeredDose,
              id,
            };
          } else {
            return { ...item };
          }
        });
        dispatch(addOxytocin(newDataChart));
      }, 500);

      return () => {
        clearInterval(upatedInterval);
      };
    }

    // eslint-disable-next-line
  }, [oxytocinData, init, positionInit]);

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;

    const newDataChart = oxytocinData?.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
        position: index,
      };
    });
    dispatch(addOxytocin(newDataChart));
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
          <p className="label">{payload[0]?.payload?.timeStop}</p>
          <p className="desc" style={{ color: "#407E01" }}>
            {payload[0]?.payload.pharmacological
              ? `Farmacológico: ${payload[0]?.payload?.pharmacological}`
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
    <LineChart width={550} height={54} data={oxytocinData}>
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
        isAnimationActive={false}
        stroke="#582D8F"
        strokeWidth={0}
        dot={<PeriodDot />}
        activeDot={{ r: 2 }}
      />

      <Line
        dataKey="pharmacologicalPoint"
        isAnimationActive={false}
        stroke="#582D8F"
        strokeWidth={0}
        dot={<PharmacologicalDot />}
        activeDot={{ r: 2 }}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineOxytocinChart;
