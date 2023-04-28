import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PartogramaChart from "../../components/Partograma/PartogramaChart";
import PartogramaModal from "../../components/Partograma/PartogramaModal";
import PartogramaSidebar from "../../components/Partograma/PartogramaSidebar";
import PartogramaUpperBar from "../../components/Partograma/PartogramaUpperBar";

import TimelineNaoFarmacologico from "../../components/Partograma/PartogramaTimelines/TimelineNaoFarmacologico";
import { dataTable } from "../Pacientes/mock";
import TimelineClinicalNotes from "../../components/Partograma/PartogramaTimelines/TimelineClinicalNotes";
import TimelinePosture from "../../components/Partograma/PartogramaTimelines/TimelinePosture";
import TimelineFluidIntake from "../../components/Partograma/PartogramaTimelines/TimelineFluidIntake";
import TimelineBleeding from "../../components/Partograma/PartogramaTimelines/TimelineBleeding";
import TimelineCompany from "../../components/Partograma/PartogramaTimelines/TimelineCompany";

import TimelineAmnioticFluid from "../../components/Partograma/PartogramaTimelines/TimelineAmnioticFluid";
import TimelineContraction from "../../components/Partograma/PartogramaTimelines/TimelineContraction";
import TimelinePharmacological from "../../components/Partograma/PartogramaTimelines/TimelinePharmacological";
import TimelineOxytocin from "../../components/Partograma/PartogramaTimelines/TimelineOxytocin";
import TimelineFetalMonitoring from "../../components/Partograma/PartogramaTimelines/FetalMonitoring/TimelineFetalMonitoring";
import {
  onEditDilatation,
  onEditPosition,
} from "../../store/modules/partogramaChart/actions";

import "./PartogramaPage.css";

// const mockPatientEntryDatetime = new Date('2023-01-30T08:00:00.000-03:00').getTime()
const mockPatientEntryDatetime = Date.now();
const HOUR_IN_MILISECONDS = 3600000;
let chartVerticalPoints: number[] = [];
for (let i = 0; i < 13; i++) {
  let addedHour = mockPatientEntryDatetime + HOUR_IN_MILISECONDS * i; // +1 hour in ms
  chartVerticalPoints.push(addedHour);
}

const renderLegend = () => {
  return (
    <ul className="recharts-default-legend">
      <li
        className="partograma-page__container-legend"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#2BB6D4"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Claro
        </span>
      </li>

      <li
        className="partograma-page__container-legend"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#2CDC52"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Meconial
        </span>
      </li>

      <li
        className="partograma-page__container-legend"
        style={{ display: "inline-block", marginRight: "10px" }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#FF0000"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Hemático
        </span>
      </li>
    </ul>
  );
};

const renderLegendMonitoring = () => {
  return (
    <ul className="recharts-default-legend">
      <li
        className="partograma-page__container-legend"
        style={{
          display: "inline-block",
          marginRight: "10px",
          width: "max-content",
        }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#DF6E0B"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Monitoramento Externo
        </span>
      </li>

      <li
        className="partograma-page__container-legend"
        style={{
          display: "inline-block",
          marginRight: "10px",
          width: "max-content",
        }}
      >
        <svg
          className="recharts-surface"
          width="14"
          height="14"
          viewBox="0 0 32 32"
          style={{
            display: "inline-block",
            verticalAlign: "middle",
            marginRight: "4px",
          }}
        >
          <circle
            cx="14"
            cy="14"
            r="14"
            fill="#FFD900"
            className="recharts-legend-icon"
            stroke="none"
          />
        </svg>
        <span className="recharts-legend-item-text" style={{ color: "#666" }}>
          Monitoramento Interno
        </span>
      </li>
    </ul>
  );
};

const PartogramaPage = () => {
  const dispatch = useDispatch();
  const { placenta } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  const params: any = useParams();
  const [isModalOpen, setOpen] = useState(false);
  const [toggle, setToggle] = useState(true);
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    dispatch(onEditDilatation(null));
    dispatch(onEditPosition(null));
    setOpen(false);
  };

  const paciente = dataTable[Number(params.idPaciente)];

  return (
    <div className="partograma-page__container">
      <div className="partograma-page__upper-content">
        <PartogramaSidebar handleOpenModal={handleOpenModal} />
        <div className="partograma-page__chart-container">
          <PartogramaUpperBar paciente={paciente} />
          <PartogramaChart toggle={toggle} setToggle={setToggle} />
        </div>
      </div>

      <div className="partograma-page__bottom-content">
        {toggle && (
          <>
            {renderLegend()}
            <div
              style={{
                borderBottom: "1px solid #666666",
                width: "541px",
                transform: "translate(156px, -4px)",
              }}
            ></div>
            <TimelineAmnioticFluid
              gemelar={placenta === "Diamniótica" ? "1" : undefined}
            />
            <div
              style={{
                borderTop: "1px solid #666666",
                width: "541px",
                height: "1px",
                transform: "translate(156px, -35px)",
                backgroundColor: "#fff",
              }}
            ></div>
          </>
        )}

        {placenta === "Diamniótica" && (
          <>
            <div
              style={{
                borderBottom: "1px solid #666666",
                width: "541px",
                transform: "translate(156px, -4px)",
              }}
            ></div>
            <TimelineAmnioticFluid gemelar="2" />
            <div
              style={{
                borderTop: "1px solid #666666",
                width: "541px",
                height: "1px",
                transform: "translate(156px, -35px)",
                backgroundColor: "#fff",
              }}
            ></div>
          </>
        )}
        {renderLegendMonitoring()}
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelineFetalMonitoring />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelineContraction />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
          }}
        ></div>
        <div
          style={{
            borderTop: "1px solid #D9D9D9",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -20px)",
            backgroundColor: "#D9D9D9",
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, 4px)",
          }}
        ></div>
        <TimelineOxytocin />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -23px)",
            backgroundColor: "#fff",
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, 4px)",
          }}
        ></div>
        <TimelineNaoFarmacologico />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -6px)",
          }}
        ></div>
        <TimelinePharmacological />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelineClinicalNotes />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelineBleeding />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelinePosture />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelineCompany />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
            zIndex: -1,
          }}
        ></div>
        <div
          style={{
            borderBottom: "1px solid #666666",
            width: "541px",
            transform: "translate(156px, -4px)",
          }}
        ></div>
        <TimelineFluidIntake />
        <div
          style={{
            borderTop: "1px solid #666666",
            width: "541px",
            height: "1px",
            transform: "translate(156px, -35px)",
            backgroundColor: "#fff",
            zIndex: -1,
          }}
        ></div>
      </div>

      <PartogramaModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default PartogramaPage;
