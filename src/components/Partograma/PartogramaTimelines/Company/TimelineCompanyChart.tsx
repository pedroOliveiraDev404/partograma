import { LineChart, Line, XAxis, Tooltip } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { useEffect } from "react";
import { addCompany } from "../../../../store/modules/company/actions";

interface TimelineCompanyProps {
  onEdit: (e: any) => void;
}

const TimelineCompanyChart = ({ onEdit }: TimelineCompanyProps) => {
  const dispatch = useDispatch();

  const { companyData, init, positionInit } = useSelector(
    (state: Store.State) => state.company.data
  );

  const CompanyDot = ({ cx, cy, payload }: any) => {
    if (payload?.point) {
      return (
        <g onClick={() => onEdit(payload)}>
          <svg
            width="1.6"
            height="12"
            x={cx || 0}
            y={(cy || 0) - 1.8}
            fill="#2CDC52"
          >
            <rect width="1.6" height="12" />
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
        const find: any = companyData.find(
          (e: any, index: number) =>
            e?.point === undefined && index > positionInit
        );
        let observation = "";
        const newDataChart = companyData.map((item: any) => {
          if (item.position === find.position - 1 && item.observation) {
            observation = item.observation;
          }
          if (item.position === find.position) {
            return {
              ...item,
              point: 0.5,
              observation
            };
          } else {
            return { ...item };
          }
        });
        dispatch(addCompany(newDataChart));
      }, 5000);

      return () => {
        clearInterval(upatedInterval);
      };
    }

    // eslint-disable-next-line
  }, [companyData, init]);

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;

    const newDataChart = companyData?.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
        position: index,
      };
    });
    dispatch(addCompany(newDataChart));
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
            {payload[0]?.payload.observation
              ? `Companhia: ${payload[0]?.payload?.observation}`
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
    <LineChart width={550} height={54} data={companyData}>
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
      <Tooltip content={CustomTooltip} />
    </LineChart>
  );
};

export default TimelineCompanyChart;
