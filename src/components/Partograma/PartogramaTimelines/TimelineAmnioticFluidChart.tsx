import { useEffect } from "react";
import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../utils/formatting";
import {
  addAmniotic,
  addAmnioticGemelar,
} from "../../../store/modules/amnioticFluid/actions";

interface TimelineCompanyProps {
  onEdit: (e: any) => void;
  gemelar?: string;
}

const TimelineAmnioticFluidChart = ({
  onEdit,
  gemelar,
}: TimelineCompanyProps) => {
  const dispatch = useDispatch();

  const {
    amnioticData,
    init,
    positionInit,
    amnioticGemelarData,
    initGemelar,
    positionInitGemelar,
  } = useSelector((state: Store.State) => state.amnioticFluid.data);

  const CompanyDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g onClick={() => onEdit(payload)}>
          <svg
            width="1.5"
            height="12"
            x={cx || 0}
            y={(cy || 0) - 1.8}
            fill={
              payload?.aspecto === "Claro"
                ? "#2BB6D5"
                : payload?.aspecto === "Hemoamnio"
                ? "#FF0000"
                : payload?.aspecto === "Meconio1" ||
                  "Meconio2" ||
                  "Meconio3" ||
                  "Meconio4"
                ? "#2CDC52"
                : "#fff"
            }
          >
            <rect width="1.5" height="12" />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const FirstPointDot = ({ cx, cy, payload }: any) => {
    if (payload?.firstPoint) {
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
            <rect
              x="0.199219"
              width="10"
              height="10"
              rx="5"
              fill={
                payload?.aspecto === "Claro"
                  ? "#2BB6D5"
                  : payload?.aspecto === "Hemoamnio"
                  ? "#FF0000"
                  : payload?.aspecto === "Meconio1" ||
                    "Meconio2" ||
                    "Meconio3" ||
                    "Meconio4"
                  ? "#2CDC52"
                  : "#fff"
              }
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (gemelar === "2") {
      if (initGemelar) {
        const upatedInterval = setInterval(() => {
          const find: any = amnioticGemelarData?.find(
            (e: any, index: number) =>
              e?.point === undefined && index > Number(positionInitGemelar)
          );
          let aspecto = "";
          const newDataChart = amnioticGemelarData?.map((item: any) => {
            if (item.position === find.position - 1 && item.aspecto) {
              aspecto = item.aspecto;
            }
            if (item.position === find.position) {
              return {
                ...item,
                point: 0.5,
                aspecto,
              };
            } else {
              return { ...item };
            }
          });
          dispatch(addAmnioticGemelar(newDataChart));
        }, 5000);

        return () => {
          clearInterval(upatedInterval);
        };
      }
    } else {
      if (init) {
        const upatedInterval = setInterval(() => {
          const find: any = amnioticData?.find(
            (e: any, index: number) =>
              e?.point === undefined && index > Number(positionInit)
          );
          let aspecto = "";
          const newDataChart = amnioticData?.map((item: any) => {
            if (item.position === find.position - 1 && item.aspecto) {
              aspecto = item.aspecto;
            }
            if (item.position === find.position) {
              return {
                ...item,
                point: 0.5,
                aspecto,
              };
            } else {
              return { ...item };
            }
          });
          dispatch(addAmniotic(newDataChart));
        }, 5000);

        return () => {
          clearInterval(upatedInterval);
        };
      }
    }

    // eslint-disable-next-line
  }, [amnioticData, init, amnioticGemelarData, initGemelar]);

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;
    if (gemelar === "2") {
      const newDataChart = amnioticGemelarData?.map(
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
      dispatch(addAmnioticGemelar(newDataChart));
    } else {
      const newDataChart = amnioticData?.map((item: any, index: number) => {
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
      });
      /*
      if (newDataChart.length < 722)
        for (let i = 0; i < 121; i++) {
          newDataChart.push({
            time: new Date(
              mockPatientEntryDatetime + HOUR_IN_MILISECONDS * (i + 720)
            ),
            timeLegend: formatDatetimeAxis(
              mockPatientEntryDatetime + HOUR_IN_MILISECONDS * (i + 720)
            ),
            position: 720 + i,
          });
        }
        */
      dispatch(addAmniotic(newDataChart));
    }
  };

  useEffect(() => {
    updateTime();
  }, []);

  const CustomTooltip = (props: any) => {
    const { active } = props;

    if (active) {
      const { payload } = props;
      if (Array.isArray(payload)) {
        return (
          <div
            className="custom-tooltip"
            style={{
              height: "120px",
              width: "220px",
              transform: "translate(0, -48px)",
            }}
          >
            <p className="label">{payload[0]?.payload?.timeLegend}</p>
            <p
              className="desc"
              style={{
                color:
                  payload[0]?.payload?.aspecto === "Claro"
                    ? "#2BB6D5"
                    : payload[0]?.payload?.aspecto === "Hemoamnio"
                    ? "#FF0000"
                    : payload[0]?.payload?.aspecto === "Meconio1" ||
                      "Meconio2" ||
                      "Meconio3" ||
                      "Meconio4"
                    ? "#2CDC52"
                    : "#fff",
              }}
            >
              {payload[0]?.payload?.aspecto}
            </p>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <LineChart
      width={550}
      height={54}
      data={gemelar === "2" ? amnioticGemelarData : amnioticData}
      style={{ transform: "translate(0px, 0px)" }}
    >
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
        dot={<CompanyDot />}
        activeDot={{ r: 2 }}
      />

      <Line
        dataKey="firstPoint"
        isAnimationActive={false}
        stroke="#582D8F"
        strokeWidth={0}
        dot={<FirstPointDot />}
        activeDot={{ r: 2 }}
      />
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineAmnioticFluidChart;
