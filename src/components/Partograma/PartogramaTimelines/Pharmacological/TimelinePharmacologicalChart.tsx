import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { useEffect } from "react";
import { addPharmacological } from "../../../../store/modules/pharmacological/actions";

interface TimelineCompanyProps {
  onStop: (e: any) => void;
  onEdit: (e: any) => void;
}

const TimelinePharmacologicalChart = ({
  onStop,
  onEdit,
}: TimelineCompanyProps) => {
  const dispatch = useDispatch();

  const { pharmacologicalData, init, positionInit } = useSelector(
    (state: Store.State) => state.pharmacological.data
  );

  const PeriodDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g>
          <svg
            width="14"
            height="14"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 5}
            y={(cy || 0) - 3}
          >
            <rect x="0.199219" width="10" height="10" rx="5" fill="#0A738B" />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const onClickPharmacological = (e: any) => {
    if (e?.timeStop) {
      onEdit(e);
    } else {
      onStop(e);
    }
  };

  const PharmacologicalDot = ({ cx, cy, payload }: any) => {
    if (payload?.pharmacologicalPoint) {
      return (
        <g onClick={() => onClickPharmacological(payload)}>
          <svg
            width="9"
            height="8"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 5}
            y={(cy || 0) - 0.5}
          >
            <rect x="0.199219" width="10" height="10" rx="5" fill="white" />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (init) {
      const upatedInterval = setInterval(() => {
        const find: any = pharmacologicalData.find(
          (e: any, index: number) =>
          (e?.point === undefined || e?.point === null) && index > Number(positionInit)
        );
        let observation = "";
        let pharmacological = "";
        let id = 0;
        const newDataChart = pharmacologicalData.map((item: any) => {
          if (item.position === find.position - 1 && item.id) {
            id = item?.id
            pharmacological = item.pharmacological
          }
          if (item.position === find.position) {
            return {
              ...item,
              point: 0.5,
              observation,
              pharmacological,
              id
            };
          } else {
            return { ...item };
          }
        });
        dispatch(addPharmacological(newDataChart));
      }, 500);

      return () => {
        clearInterval(upatedInterval);
      };
    }

    // eslint-disable-next-line
  }, [pharmacologicalData, init]);

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;

    const newDataChart = pharmacologicalData?.map(
      (item: any, index: number) => {
        return {
          ...item,
          time: new Date(
            mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
          ),
          timeLegend: formatDatetimeAxis(
            mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
          ),
          position: index,
        };
      }
    );
    dispatch(addPharmacological(newDataChart));
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
    <LineChart width={550} height={54} data={pharmacologicalData} style={{alignSelf: "center"}}>
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

export default TimelinePharmacologicalChart;
