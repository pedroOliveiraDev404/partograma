import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
} from "recharts";

import { formatDatetimeAxis } from "../../../../utils/formatting";

import { addFetalMonitoring } from "../../../../store/modules/fetalMonitoring/actions";

interface MonitoringChartProps {
  onEdit: (e: any, index: number) => void;
  handleOffChartBeats: (e: any) => void;
}

const PartogramaMonitoringChart = ({
  onEdit,
  handleOffChartBeats,
}: MonitoringChartProps) => {
  const dispatch = useDispatch();

  const { fetalMonitoringData } = useSelector(
    (state: Store.State) => state.fetalMonitoring.data
  );

  const { typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const FrequencyDotOne = ({ cx, cy, payload }: any) => {
    if (payload.frequencyOne > 59 && payload.frequencyOne < 211) {
      return (
        <g onClick={() => onEdit(payload, 1)}>
          <svg
            fill={typePregnancy === "Múltipla" ? "#B874C6" : "red"}
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 10}
            y={(cy || 0) - 10}
          >
            <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const FrequencyAboveDotOne = ({ cx, cy, payload }: any) => {
    if (payload.frequencyAboveOne) {
      return (
        <g
          onClick={handleOffChartBeats}
          style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
        >
          <svg
            fill="red"
            width="16px"
            height="16px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 10}
            y={(cy || 0) - 10}
          >
            <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            x={(cx || 0) + 4}
            y={(cy || 0) - 10}
            fill="red"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };
  const FrequencyBelowDotOne = ({ cx, cy, payload }: any) => {
    if (payload.frequencyBelowOne) {
      return (
        <g
          onClick={handleOffChartBeats}
          style={{ display: "flex", flexDirection: "row", cursor: "pointer" }}
        >
          <svg
            fill="red"
            width="16px"
            height="16px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 10}
            y={(cy || 0) - 10}
          >
            <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="red"
            viewBox="0 0 16 16"
            x={(cx || 0) + 4}
            y={(cy || 0) - 10}
          >
            <path
              fill-rule="evenodd"
              d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const FrequencyMotherDot = ({ cx, cy, payload }: any) => {
    if (payload.frequencyMother > 59 && payload.frequencyMother < 211) {
      return (
        <g onClick={() => onEdit(payload, 0)}>
          <svg
            width="13"
            height="12"
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 5}
            y={(cy || 0) - 2}
          >
            <rect x="0.199219" width="10" height="10" rx="5" fill="red" />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const FrequencyDotTwo = ({ cx, cy, payload }: any) => {
    if (
      payload.frequencyTwo > 59 &&
      payload.frequencyTwo < 211 &&
      typePregnancy === "Múltipla"
    ) {
      return (
        <g onClick={() => onEdit(payload, 2)}>
          <svg
            onClick={() => onEdit(payload, 2)}
            fill="#002471"
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 10}
            y={(cy || 0) - 10}
          >
            <title>heart</title>
            <path d="M0.256 12.16q0.544 2.080 2.080 3.616l13.664 14.144 13.664-14.144q1.536-1.536 2.080-3.616t0-4.128-2.080-3.584-3.584-2.080-4.16 0-3.584 2.080l-2.336 2.816-2.336-2.816q-1.536-1.536-3.584-2.080t-4.128 0-3.616 2.080-2.080 3.584 0 4.128z"></path>
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const PadDot = ({ cx, cy, payload }: any) => {
    if (payload.pad > 59 && payload.pad < 211) {
      return (
        <g onClick={() => onEdit(payload, 0)}>
          <svg
            x={(cx || 0) - 8}
            y={(cy || 0) - 10}
            width="16"
            height="16"
            viewBox="0 0 1000 1000"
          >
            <rect x="0" y="0" width="100%" height="100%" fill="#ffffff" />
            <g
              transform="matrix(-7.3332 0 0 -7.3332 500.003 500.0019)"
              id="513909"
            >
              <path
                vector-effect="non-scaling-stroke"
                transform=" translate(-61.9852, -61.9856)"
                d="M 51.802 96.062 c 2.801 2.801 6.5 4.2 10.2 4.2 s 7.4 -1.399 10.2 -4.2 l 47.3 -47.3 c 5.5 -5.5 6.101 -14.6 0.8 -20.3 c -5.6 -6.1 -15.1 -6.3 -20.899 -0.5 l -30.4 30.3 c -3.899 3.9 -10.2 3.9 -14.1 0 l -30.3 -30.3 c -5.801 -5.8 -15.301 -5.7 -20.9 0.5 c -5.3 5.7 -4.8 14.8 0.8 20.3 L 51.802 96.062 z"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const PasDot = ({ cx, cy, payload }: any) => {
    if (payload.pas > 59 && payload.pas < 211) {
      return (
        <g onClick={() => onEdit(payload, 0)}>
          <svg
            fill="#000000"
            x={(cx || 0) - 8}
            y={(cy || 0) - 10}
            width="16px"
            height="16px"
            viewBox="0 0 123.97 123.97"
          >
            <g>
              <path
                d="M51.802,96.062c2.801,2.801,6.5,4.2,10.2,4.2s7.4-1.399,10.2-4.2l47.3-47.3c5.5-5.5,6.101-14.6,0.8-20.3
		c-5.6-6.1-15.1-6.3-20.899-0.5l-30.4,30.3c-3.899,3.9-10.2,3.9-14.1,0l-30.3-30.3c-5.801-5.8-15.301-5.7-20.9,0.5
		c-5.3,5.7-4.8,14.8,0.8,20.3L51.802,96.062z"
              />
            </g>
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const SaturationDot = ({ cx, cy, payload }: any) => {
    if (payload.saturation > 59 && payload.saturation < 211) {
      return (
        <g onClick={() => onEdit(payload, 0)}>
          <svg
            version="1.1"
            width="80"
            height="60"
            viewBox="0 0 640 480"
            x={(cx || 0) - 36}
            y={(cy || 0) - 10}
          >
            <desc>Created with Fabric.js 3.6.6</desc>
            <defs></defs>
            <g transform="matrix(1 0 0 1 300.5 204.5)">
              <circle
                vector-effect="non-scaling-stroke"
                x={(cx || 0) - 8}
                y={(cy || 0) - 10}
                fill="white"
                stroke="black"
                r="65"
              />
            </g>
            <g transform="matrix(1 0 0 1 296 199.05)">
              <text
                font-family="'Open Sans', sans-serif"
                font-size="70"
                font-style="normal"
                font-weight="normal"
                fill="black"
              >
                <tspan x="-40" y="21.99">
                  O
                </tspan>
              </text>
            </g>
            <g transform="matrix(1 0 0 1 347 216.97)">
              <text
                font-family="'Open Sans', sans-serif"
                font-size="50"
                font-style="normal"
                font-weight="normal"
                fill="black"
              >
                <tspan x="-40" y="11.94">
                  2
                </tspan>
              </text>
            </g>
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

    const newDataChart = fetalMonitoringData.map((item: any, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
        position: index,
      };
    });
    dispatch(addFetalMonitoring(newDataChart));
  };

  useEffect(() => {
    updateTime();
  }, []);

  const CustomTooltip = (props: any) => {
    const { active } = props;
    if (active) {
      const { payload } = props;
      if (payload) {
        return (
          <div className="custom-tooltip">
            <p className="label">{payload[0]?.payload?.timeLegend}</p>
            <p
              className="desc"
              style={{
                color: typePregnancy === "Múltipla" ? "#B874C6" : "red",
              }}
            >
              {payload[0]?.payload?.frequencyOne && typePregnancy === "Múltipla"
                ? `Frequência Cardíaca 1° Gemelar: ${payload[0]?.payload?.frequencyOne} bpm`
                : payload[0]?.payload?.frequencyOne
                ? `Frequência Cardíaca: ${payload[0]?.payload?.frequencyOne} bpm`
                : ""}
            </p>
            <p className="desc" style={{ color: "#002471" }}>
              {payload[0]?.payload?.frequencyTwo
                ? `Frequência Cardíaca 2° Gemelar: ${payload[0]?.payload?.frequencyTwo} bpm`
                : ""}
            </p>
          </div>
        );
      }
    }

    return null;
  };

  return (
    <LineChart width={608} height={600} data={fetalMonitoringData}>
      <CartesianGrid strokeDasharray="3 3" strokeWidth={2} fillOpacity={0.4} />
      <XAxis dataKey="timeLegend" interval={59} />
      <YAxis
        ticks={[
          60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
          210,
        ]}
        domain={[50, 220]}
      />

      <Tooltip content={CustomTooltip} />

      <Line
        dataKey="frequencyOne"
        stroke={typePregnancy === "Múltipla" ? "#B874C6" : "red"}
        dot={<FrequencyDotOne />}
        isAnimationActive={false}
        activeDot={{ r: 6 }}
        strokeWidth={4}
      />

      <Line
        dataKey="frequencyAboveOne"
        stroke={typePregnancy === "Múltipla" ? "#B874C6" : "red"}
        dot={<FrequencyAboveDotOne />}
        isAnimationActive={false}
        activeDot={{ r: 0 }}
        strokeWidth={4}
      />

      <Line
        dataKey="frequencyBelowOne"
        stroke={typePregnancy === "Múltipla" ? "#B874C6" : "red"}
        dot={<FrequencyBelowDotOne />}
        isAnimationActive={false}
        activeDot={{ r: 0 }}
        strokeWidth={4}
      />

      <Line
        dataKey="frequencyTwo"
        stroke="#002471"
        dot={<FrequencyDotTwo />}
        isAnimationActive={false}
        activeDot={{ r: 6 }}
        strokeWidth={4}
      />

      <Line
        dataKey="frequencyMother"
        stroke="#002471"
        dot={<FrequencyMotherDot />}
        isAnimationActive={false}
        activeDot={{ r: 6 }}
        strokeWidth={4}
      />

      <Line
        dataKey="pas"
        stroke="#002471"
        dot={<PasDot />}
        isAnimationActive={false}
        activeDot={{ r: 6 }}
        strokeWidth={4}
      />

      <Line
        dataKey="pad"
        stroke="#002471"
        dot={<PadDot />}
        isAnimationActive={false}
        activeDot={{ r: 6 }}
        strokeWidth={4}
      />

      <Line
        dataKey="saturation"
        stroke="#002471"
        dot={<SaturationDot />}
        isAnimationActive={false}
        activeDot={{ r: 6 }}
        strokeWidth={4}
      />

      <ReferenceArea
        y1={160}
        y2={110}
        fill="#FFF2CC"
        ifOverflow="discard"
        isFront={false}
        style={{ zIndex: "-20000px" }}
      />
    </LineChart>
  );
};

export default PartogramaMonitoringChart;
