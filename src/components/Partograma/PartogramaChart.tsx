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
  ReferenceLine,
  Brush,
} from "recharts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ReactComponent as IconeSidebarAtualizar } from "../../assets/IconeSidebarAtualizar.svg";

import {
  addPosition,
  onEditDilatation,
  onEditPosition,
  selectBirth,
  selectTab,
} from "../../store/modules/partogramaChart/actions";
import { formatDatetimeAxis, labelPosition } from "../../utils/formatting";

interface PartogramaChartProps {
  setToggle: (e: boolean) => void;
  toggle: boolean;
}

const PartogramaChart = ({ setToggle, toggle }: PartogramaChartProps) => {
  const dispatch = useDispatch();

  const {
    positionData,
    backgroundColorChart,
    birth,
    earlyDelivery,
    typePregnancy,
    openLines,
    earlyPosition,
    numberOfDeliveries,
    placenta,
  } = useSelector((state: Store.State) => state.partogramaChart.data);

  const PositionDotOne = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload?.valuePosition) {
      return (
        <g
          transform={`translate(${cx - 22},${cy - 20})`}
          fill="#FFFBF9"
          cursor="pointer"
          onClick={() => {
            dispatch(selectTab(2));
            dispatch(onEditPosition(payload));
          }}
        >
          {payload?.icon}
        </g>
      );
    } else {
      return null;
    }
  };

  const PositionDotTwo = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload?.valuePositionTwo) {
      return (
        <g
          transform={`translate(${cx - 22},${cy - 20})`}
          fill="#FFFBF9"
          onClick={() => {
            dispatch(selectTab(2));
            dispatch(onEditPosition(payload));
          }}
          cursor="pointer"
        >
          {payload?.icon}
        </g>
      );
    } else {
      return null;
    }
  };

  const RuptureDotOne = ({ cx, cy, payload }: any) => {
    if (payload.ruptureOne) {
      return (
        <g>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            x={(cx || 0) - 12}
            y={(cy || 0) - 12}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66667 24C1.93333 24 1.30533 23.7391 0.782667 23.2173C0.260889 22.6947 0 22.0667 0 21.3333V12.5333C0 12.5333 1.81306 16.2209 4 16.5333C6.91591 16.9499 6.38781 11.2 9.33333 11.2C12.2789 11.2 11.7211 16.5333 14.6667 16.5333C17.6122 16.5333 17.0841 10.7834 20 11.2C22.1869 11.5124 24 15.2 24 15.2V21.3333C24 22.0667 23.7391 22.6947 23.2173 23.2173C22.6947 23.7391 22.0667 24 21.3333 24H2.66667ZM2.66667 0H21.3333C22.0667 0 22.6947 0.260889 23.2173 0.782667C23.7391 1.30533 24 1.93333 24 2.66667V11.4333C24 11.4333 22.1869 7.74575 20 7.43333C17.0841 7.01677 17.6122 12.7667 14.6667 12.7667C11.7211 12.7667 12.2789 7.43333 9.33333 7.43333C6.38781 7.43333 6.91592 13.1832 4 12.7667C1.81306 12.4542 0 8.76667 0 8.76667V2.66667C0 1.93333 0.260889 1.30533 0.782667 0.782667C1.30533 0.260889 1.93333 0 2.66667 0Z"
              fill={placenta === "Diamniótica" ? "#B874C6" : "#4E4E4E"}
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const DischargeDotOne = ({ cx, cy, payload }: any) => {
    if (payload.dischargeOne) {
      return (
        <g>
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 17"
            fill="none"
            x={(cx || 0) - 12}
            y={(cy || 0) - 12}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2.29395"
              width="12"
              height="12"
              stroke={placenta === "Diamniótica" ? "#B874C6" : "#4E4E4E"}
              stroke-width="4"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const DischargeDotTwo = ({ cx, cy, payload }: any) => {
    if (payload.dischargeTwo && placenta === "Diamniótica") {
      return (
        <g>
          <svg
            width="24"
            height="24"
            viewBox="0 0 16 17"
            fill="none"
            x={(cx || 0) - 12}
            y={(cy || 0) - 12}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2.29395"
              width="12"
              height="12"
              stroke="#002471"
              stroke-width="4"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const BloodDotTwo = ({ cx, cy, payload }: any) => {
    if (payload.bloodTwo && typePregnancy === "Múltipla") {
      return (
        <g>
          <svg
            width="24"
            height="24"
            viewBox="0 0 12 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 12}
            y={(cy || 0) - 12}
            cursor="pointer"
          >
            <path
              d="M7.4534 1.1196C6.81188 0.0187271 5.18787 0.0187271 4.54636 1.1196L0.808727 7.53603C0.315841 8.38408 2.26041e-07 9.36441 2.26041e-07 10.4344C-0.000240551 11.2907 0.191876 12.1367 0.562818 12.9127C0.933761 13.6888 1.47451 14.376 2.14697 14.926C2.81944 15.476 3.60727 15.8754 4.45498 16.0961C5.30269 16.3168 6.18965 16.3534 7.05341 16.2033C9.25337 15.8374 11.0643 14.2277 11.7233 12.1673C12.2653 10.4738 11.961 8.91692 11.2446 7.63523L11.2424 7.63096L7.45285 1.1196H7.4534Z"
              fill="#002471"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const BloodDotOne = ({ cx, cy, payload }: any) => {
    if (payload.bloodOne) {
      return (
        <g>
          <svg
            width="24"
            height="24"
            viewBox="0 0 12 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 12}
            y={(cy || 0) - 12}
            cursor="pointer"
          >
            <path
              d="M7.4534 1.1196C6.81188 0.0187271 5.18787 0.0187271 4.54636 1.1196L0.808727 7.53603C0.315841 8.38408 2.26041e-07 9.36441 2.26041e-07 10.4344C-0.000240551 11.2907 0.191876 12.1367 0.562818 12.9127C0.933761 13.6888 1.47451 14.376 2.14697 14.926C2.81944 15.476 3.60727 15.8754 4.45498 16.0961C5.30269 16.3168 6.18965 16.3534 7.05341 16.2033C9.25337 15.8374 11.0643 14.2277 11.7233 12.1673C12.2653 10.4738 11.961 8.91692 11.2446 7.63523L11.2424 7.63096L7.45285 1.1196H7.4534Z"
              fill={typePregnancy === "Múltipla" ? "#B874C6" : "red"}
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const BirthDotOne = ({ cx, cy, payload }: any) => {
    if (payload.birthIconOne) {
      return (
        <g>
          <svg
            width="17"
            height="26"
            viewBox="0 0 8 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 9}
            y={(cy || 0) - 12}
          >
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M0.107422 5.24409V12.8521C0.107422 14.3272 1.32389 16.2939 3.99944 16.2939C6.67541 16.2939 7.89145 14.5728 7.89145 12.8521V12.4824C7.267 10.8953 5.97355 9.30692 4.42583 7.97022C3.5719 7.23204 2.64933 6.57722 1.67071 6.0147C1.58836 5.96987 1.50648 5.92418 1.42509 5.87762C0.99778 5.64251 0.557898 5.43101 0.107422 5.24409ZM4.44572 6.86316C4.63037 7.0102 4.812 7.16155 4.99103 7.31637C6.11539 8.28721 7.13986 9.40897 7.89145 10.5995V5.48323C6.57595 6.4251 5.50867 6.861 4.44572 6.86316Z"
              fill="#E7EBFD"
            />
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M0.107422 5.24409V12.8521C0.107422 14.3272 1.32389 16.2939 3.99944 16.2939C6.67541 16.2939 7.89145 14.5728 7.89145 12.8521V12.4824C7.267 10.8953 5.97355 9.30692 4.42583 7.97022C3.5719 7.23204 2.64933 6.57722 1.67071 6.0147C1.58836 5.96987 1.50648 5.92418 1.42509 5.87762C0.99778 5.64251 0.557898 5.43101 0.107422 5.24409ZM4.44572 6.86316C4.63037 7.0102 4.812 7.16155 4.99103 7.31637C6.11539 8.28721 7.13986 9.40897 7.89145 10.5995V5.48323C6.57595 6.4251 5.50867 6.861 4.44572 6.86316Z"
              fill={
                typePregnancy === "Múltipla"
                  ? "#B874C6"
                  : "url(#paint0_linear_1097_1348)"
              }
            />
            <path
              d="M3.99944 5.4832C4.68759 5.4832 5.34755 5.20983 5.83415 4.72324C6.32074 4.23664 6.59411 3.57668 6.59411 2.88852C6.59411 2.20037 6.32074 1.54041 5.83415 1.05381C5.34755 0.567216 4.68759 0.293849 3.99944 0.293849C3.31128 0.293849 2.65132 0.567216 2.16472 1.05381C1.67813 1.54041 1.40476 2.20037 1.40476 2.88852C1.40476 3.57668 1.67813 4.23664 2.16472 4.72324C2.65132 5.20983 3.31128 5.4832 3.99944 5.4832Z"
              fill="#E7EBFD"
            />
            <path
              d="M3.99944 5.4832C4.68759 5.4832 5.34755 5.20983 5.83415 4.72324C6.32074 4.23664 6.59411 3.57668 6.59411 2.88852C6.59411 2.20037 6.32074 1.54041 5.83415 1.05381C5.34755 0.567216 4.68759 0.293849 3.99944 0.293849C3.31128 0.293849 2.65132 0.567216 2.16472 1.05381C1.67813 1.54041 1.40476 2.20037 1.40476 2.88852C1.40476 3.57668 1.67813 4.23664 2.16472 4.72324C2.65132 5.20983 3.31128 5.4832 3.99944 5.4832Z"
              fill={
                typePregnancy === "Múltipla"
                  ? "#B874C6"
                  : "url(#paint0_linear_1097_1348)"
              }
            />
            <defs>
              <linearGradient
                id="paint0_linear_1097_1348"
                x1="0.107422"
                y1="0.293945"
                x2="12.696"
                y2="6.4183"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F4AF73" />
                <stop offset="1" stopColor="#DF6969" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1097_1348"
                x1="0.107422"
                y1="0.293945"
                x2="12.696"
                y2="6.4183"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F4AF73" />
                <stop offset="1" stopColor="#DF6969" />
              </linearGradient>
            </defs>
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const BirthDotTwo = ({ cx, cy, payload }: any) => {
    if (payload.birthIconTwo && typePregnancy === "Múltipla") {
      return (
        <g>
          <svg
            width="17"
            height="26"
            viewBox="0 0 8 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 9}
            y={(cy || 0) - 12}
          >
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M0.107422 5.24409V12.8521C0.107422 14.3272 1.32389 16.2939 3.99944 16.2939C6.67541 16.2939 7.89145 14.5728 7.89145 12.8521V12.4824C7.267 10.8953 5.97355 9.30692 4.42583 7.97022C3.5719 7.23204 2.64933 6.57722 1.67071 6.0147C1.58836 5.96987 1.50648 5.92418 1.42509 5.87762C0.99778 5.64251 0.557898 5.43101 0.107422 5.24409ZM4.44572 6.86316C4.63037 7.0102 4.812 7.16155 4.99103 7.31637C6.11539 8.28721 7.13986 9.40897 7.89145 10.5995V5.48323C6.57595 6.4251 5.50867 6.861 4.44572 6.86316Z"
              fill="#E7EBFD"
            />
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M0.107422 5.24409V12.8521C0.107422 14.3272 1.32389 16.2939 3.99944 16.2939C6.67541 16.2939 7.89145 14.5728 7.89145 12.8521V12.4824C7.267 10.8953 5.97355 9.30692 4.42583 7.97022C3.5719 7.23204 2.64933 6.57722 1.67071 6.0147C1.58836 5.96987 1.50648 5.92418 1.42509 5.87762C0.99778 5.64251 0.557898 5.43101 0.107422 5.24409ZM4.44572 6.86316C4.63037 7.0102 4.812 7.16155 4.99103 7.31637C6.11539 8.28721 7.13986 9.40897 7.89145 10.5995V5.48323C6.57595 6.4251 5.50867 6.861 4.44572 6.86316Z"
              fill="#002471"
            />
            <path
              d="M3.99944 5.4832C4.68759 5.4832 5.34755 5.20983 5.83415 4.72324C6.32074 4.23664 6.59411 3.57668 6.59411 2.88852C6.59411 2.20037 6.32074 1.54041 5.83415 1.05381C5.34755 0.567216 4.68759 0.293849 3.99944 0.293849C3.31128 0.293849 2.65132 0.567216 2.16472 1.05381C1.67813 1.54041 1.40476 2.20037 1.40476 2.88852C1.40476 3.57668 1.67813 4.23664 2.16472 4.72324C2.65132 5.20983 3.31128 5.4832 3.99944 5.4832Z"
              fill="#E7EBFD"
            />
            <path
              d="M3.99944 5.4832C4.68759 5.4832 5.34755 5.20983 5.83415 4.72324C6.32074 4.23664 6.59411 3.57668 6.59411 2.88852C6.59411 2.20037 6.32074 1.54041 5.83415 1.05381C5.34755 0.567216 4.68759 0.293849 3.99944 0.293849C3.31128 0.293849 2.65132 0.567216 2.16472 1.05381C1.67813 1.54041 1.40476 2.20037 1.40476 2.88852C1.40476 3.57668 1.67813 4.23664 2.16472 4.72324C2.65132 5.20983 3.31128 5.4832 3.99944 5.4832Z"
              fill="#002471"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1097_1348"
                x1="0.107422"
                y1="0.293945"
                x2="12.696"
                y2="6.4183"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F4AF73" />
                <stop offset="1" stopColor="#DF6969" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_1097_1348"
                x1="0.107422"
                y1="0.293945"
                x2="12.696"
                y2="6.4183"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F4AF73" />
                <stop offset="1" stopColor="#DF6969" />
              </linearGradient>
            </defs>
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const RuptureDotTwo = ({ cx, cy, payload }: any) => {
    if (payload.ruptureTwo && placenta === "Diamniótica") {
      return (
        <g>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            x={(cx || 0) - 12}
            y={(cy || 0) - 12}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.66667 24C1.93333 24 1.30533 23.7391 0.782667 23.2173C0.260889 22.6947 0 22.0667 0 21.3333V12.5333C0 12.5333 1.81306 16.2209 4 16.5333C6.91591 16.9499 6.38781 11.2 9.33333 11.2C12.2789 11.2 11.7211 16.5333 14.6667 16.5333C17.6122 16.5333 17.0841 10.7834 20 11.2C22.1869 11.5124 24 15.2 24 15.2V21.3333C24 22.0667 23.7391 22.6947 23.2173 23.2173C22.6947 23.7391 22.0667 24 21.3333 24H2.66667ZM2.66667 0H21.3333C22.0667 0 22.6947 0.260889 23.2173 0.782667C23.7391 1.30533 24 1.93333 24 2.66667V11.4333C24 11.4333 22.1869 7.74575 20 7.43333C17.0841 7.01677 17.6122 12.7667 14.6667 12.7667C11.7211 12.7667 12.2789 7.43333 9.33333 7.43333C6.38781 7.43333 6.91592 13.1832 4 12.7667C1.81306 12.4542 0 8.76667 0 8.76667V2.66667C0 1.93333 0.260889 1.30533 0.782667 0.782667C1.30533 0.260889 1.93333 0 2.66667 0Z"
              fill="#002471"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const DilatacaoDot = ({ cx, cy, payload }: any) => {
    if (payload.dilatacao) {
      return (
        <g>
          <svg
            width="20"
            height="20"
            cursor="pointer"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={(cx || 0) - 10}
            y={(cy || 0) - 10}
            onClick={() => {
              dispatch(selectTab(1));
              dispatch(onEditDilatation(payload));
            }}
          >
            <rect
              x="10.3145"
              y="-1"
              width="16"
              height="16"
              rx="4"
              transform="rotate(45 10.3145 -1)"
              fill="#2BB6D5"
            />
          </svg>
        </g>
      );
    } else {
      return null;
    }
  };

  const linesCoordenates = [
    {
      redLine: 4.0625,
      blueLine: 4.0688,
      yellowLine: 4.0218,
    },
    {
      redLine: 4.4564,
      blueLine: 4.5818,
      yellowLine: 4.6116,
    },
    {
      redLine: 5.15,
      blueLine: 5.2618,
      yellowLine: 5.341,
    },
    {
      redLine: 5.85,
      blueLine: 6.117,
      yellowLine: 6.3188,
    },
    {
      redLine: 6.67,
      blueLine: 7.1258,
      yellowLine: 7.2499,
    },
    {
      redLine: 7.52,
      blueLine: 8.057,
      yellowLine: 8.2122,
    },
    {
      redLine: 8.24,
      blueLine: 8.8174,
      yellowLine: 8.9571,
    },
    {
      redLine: 8.92,
      blueLine: 9.4538,
      yellowLine: 9.5779,
    },
    {
      redLine: 9.45,
      blueLine: 9.9038,
      yellowLine: 9.99,
    },
    {
      redLine: 9.88,
    },
  ];

  useEffect(() => {
    if (earlyPosition && numberOfDeliveries !== null) {
      let counter = Number(earlyPosition);
      let index = 0;
      const aux = positionData.map((item) => {
        if (item.position === counter) {
          counter = counter + 60;
          index = index + 1;
          return {
            ...item,
            referenceLine:
              numberOfDeliveries === 0
                ? linesCoordenates[index - 1]?.redLine
                : numberOfDeliveries === 1
                ? linesCoordenates[index - 1]?.blueLine
                : numberOfDeliveries >= 2
                ? linesCoordenates[index - 1]?.yellowLine
                : null,
          };
        } else {
          return {
            ...item,
            referenceLine: null,
          };
        }
      });
      dispatch(addPosition(aux));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [earlyPosition, numberOfDeliveries, dispatch]);

  const updateTime = () => {
    const mockPatientEntryDatetime = Date.now();
    const HOUR_IN_MILISECONDS = 60000;

    const newDataChart = positionData.map((item, index: number) => {
      return {
        ...item,
        time: new Date(mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index),
        timeLegend: formatDatetimeAxis(
          mockPatientEntryDatetime + HOUR_IN_MILISECONDS * index
        ),
        position: index,
      };
    });
    /*
    if (newDataChart.length < 722)
      for (let i = 0; i < 120; i++) {
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
    dispatch(addPosition(newDataChart));
  };

  useEffect(() => {
    updateTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const CustomTooltip = (props: any) => {
    const { active } = props;
    if (active) {
      const { payload } = props;
      if (Array.isArray(payload)) {
        return (
          <div className="custom-tooltip">
            <p className="label">{payload[0]?.payload?.timeLegend}</p>
            <p className="desc" style={{ color: "#2BB6D4" }}>
              {payload[0]?.payload?.fading
                ? `Esvaecimento: ${payload[0]?.payload?.fading}`
                : ""}
            </p>
            <p className="desc" style={{ color: "#2BB6D4" }}>
              {payload[0]?.payload?.consistency
                ? `Consistência: ${payload[0]?.payload?.consistency}`
                : ""}
            </p>
            <p className="desc" style={{ color: "#2BB6D4" }}>
              {payload[0]?.payload?.positionDilatation
                ? `Posição: ${payload[0]?.payload?.positionDilatation}`
                : ""}
            </p>
            <p
              className="desc"
              style={{
                color: payload[0]?.payload?.valuePositionTwo
                  ? "#002471"
                  : "#B874C6",
              }}
            >
              {payload[0]?.payload?.posicao
                ? `Altura: ${payload[0]?.payload?.posicao}`
                : ""}
            </p>
            <p
              className="desc"
              style={{
                color: payload[0]?.payload?.valuePositionTwo
                  ? "#002471"
                  : "#B874C6",
              }}
            >
              {payload[0]?.payload?.posicao
                ? `Variedade de posição: ${payload[0]?.payload?.variety}`
                : ""}
            </p>
            <p className="desc">
              {payload[0]?.payload?.dischargeOne && typePregnancy === "Múltipla"
                ? `Dequitação 1° Gemelar: ${payload[0]?.payload?.dischargeOneObservation}`
                : payload[0]?.payload?.dischargeOne
                ? `Dequitação: ${payload[0]?.payload?.dischargeOneObservation}`
                : ""}
            </p>
            <p className="desc">
              {payload[0]?.payload?.dischargeTwo
                ? `Dequitação 2° Gemelar: ${payload[0]?.payload?.dischargeTwoObservation}`
                : ""}
            </p>
            <p className="desc" style={{ color: "red" }}>
              {payload[0]?.payload?.bloodOne && typePregnancy === "Múltipla"
                ? `Amostra sangue fetal 1° Gemelar: ${payload[0]?.payload?.bloodOnePh}`
                : payload[0]?.payload?.bloodOne
                ? `Amostra sangue fetal: ${payload[0]?.payload?.bloodOnePh}`
                : ""}
            </p>
            <p className="desc" style={{ color: "red" }}>
              {payload[0]?.payload?.bloodTwo
                ? `Amostra sangue fetal 2° Gemelar: ${payload[0]?.payload?.bloodTwoPh}`
                : ""}
            </p>
            <p className="desc">
              {payload[0]?.payload?.ruptureOne && placenta === "Diamniótica"
                ? `Ruptura 1° Gemelar: ${payload[0]?.payload?.ruptureTypeOne}`
                : payload[0]?.payload?.ruptureOne
                ? `Ruptura: ${payload[0]?.payload?.ruptureTypeOne}`
                : ""}
            </p>
            <p className="desc">
              {payload[0]?.payload?.ruptureTwo
                ? `Ruptura 2° Gemelar: ${payload[0]?.payload?.ruptureTypeTwo}`
                : ""}
            </p>
            <p className="desc">
              {payload[0]?.payload?.birthIconOne && typePregnancy === "Múltipla"
                ? `Nascimento 1° Gemelar`
                : payload[0]?.payload?.birthIconOne
                ? "Nascimento do bebê"
                : ""}
            </p>
            <p className="desc">
              {payload[0]?.payload?.birthIconTwo && typePregnancy === "Múltipla"
                ? `Nascimento 2° Gemelar`
                : ""}
            </p>
          </div>
        );
      }
    }

    return null;
  };

  useEffect(() => {
    if (typePregnancy !== "Múltipla") {
      const find = positionData.find((item) => item?.birthIconOne);

      if (find) dispatch(selectBirth(find));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typePregnancy]);

  return (
    <>
      {toggle ? (
        <>
          <LineChart width={669} height={600} data={positionData}>
            <CartesianGrid
              strokeDasharray="3 3"
              fill={backgroundColorChart}
              strokeWidth={2}
              fillOpacity={0.4}
              stroke={
                backgroundColorChart === "#FFFF81"
                  ? "#CCCCCC"
                  : backgroundColorChart === "#C1FEFF"
                  ? "#CCCCCC"
                  : backgroundColorChart === "#FFC0C0"
                  ? "white"
                  : "#CCCCCC"
              }
            />
            <XAxis dataKey="timeLegend" interval={59} />
            <YAxis
              ticks={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
              yAxisId="left_dilatacao"
              domain={[-0.5, 10.5]}
            />
            <YAxis
              orientation="right"
              tickFormatter={labelPosition}
              domain={[-0.5, 10.5]}
              ticks={[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]}
            />

            <Tooltip content={CustomTooltip} />
            {/* <Brush
              dataKey="timeLegend"
              height={30}
              stroke="#f4af73"
              startIndex={120}
            />*/}

            <Line
              dataKey="dilatacao"
              stroke="#2BB6D4"
              dot={<DilatacaoDot />}
              isAnimationActive={false}
              activeDot={{ r: 3 }}
              strokeWidth={4}
              connectNulls
            />

            <Line
              dataKey="ruptureOne"
              stroke="black"
              dot={<RuptureDotOne />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />
            {earlyDelivery &&
              typePregnancy !== "Múltipla" &&
              openLines &&
              numberOfDeliveries !== null && (
                <>
                  <Line
                    dataKey="referenceLine"
                    stroke="black"
                    isAnimationActive={false}
                    activeDot={{ r: 0 }}
                    dot={{ r: 0 }}
                    connectNulls
                    strokeWidth={3}
                    strokeDasharray="4 4"
                  />
                </>
              )}

            <Line
              dataKey="ruptureTwo"
              stroke="black"
              dot={<RuptureDotTwo />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />

            <Line
              dataKey="dischargeOne"
              stroke="black"
              dot={<DischargeDotOne />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />
            <Line
              dataKey="dischargeTwo"
              stroke="black"
              dot={<DischargeDotTwo />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />

            <Line
              dataKey="bloodOne"
              stroke="red"
              dot={<BloodDotOne />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />

            <Line
              dataKey="birthIconOne"
              stroke="red"
              dot={<BirthDotOne />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />
            <Line
              dataKey="birthIconTwo"
              stroke="red"
              dot={<BirthDotTwo />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />
            <Line
              dataKey="bloodTwo"
              stroke="red"
              dot={<BloodDotTwo />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
            />

            <Line
              dataKey="valuePosition"
              stroke={"#B874C6"}
              dot={<PositionDotOne />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
              connectNulls
            />

            <Line
              dataKey="valuePositionTwo"
              stroke={"#002471"}
              dot={<PositionDotTwo />}
              isAnimationActive={false}
              activeDot={{ r: 6 }}
              strokeWidth={4}
              connectNulls
            />

            {earlyDelivery && (
              <ReferenceLine
                x={earlyDelivery}
                stroke="#42b883"
                label={{
                  position: "top",
                  value: "Início do Trabalho de Parto",
                  fill: "#42b883",
                  textDecoration: "underline #42b883",
                  fontSize: 14,
                }}
              />
            )}

            {birth && (
              <ReferenceArea
                y1={-0.5}
                y2={10.5}
                x1={positionData[positionData.length - 1].timeLegend}
                x2={birth.timeLegend}
                fillOpacity={0.6}
                ifOverflow="extendDomain"
              />
            )}
          </LineChart>
          {/*  <div
            style={{
              transform: "translate(34px, -28px)",
              cursor: "pointer",
              width: "fit-content",
              marginBottom: "-40px",
            }}
            onClick={() => {
              setToggle(false);
              setTimeout(() => {
                setToggle(true);
              }, 500);
            }}
          >
            <IconeSidebarAtualizar />
          </div>*/}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "605px",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default PartogramaChart;
