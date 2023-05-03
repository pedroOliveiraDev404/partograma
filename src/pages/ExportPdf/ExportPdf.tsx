import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PartogramaChart from "../../components/Partograma/PartogramaChart";

import TimelineNaoFarmacologico from "../../components/Partograma/PartogramaTimelines/NaoFarmacologico/TimelineNaoFarmacologico";
import { dataTable } from "../Pacientes/mock";
import TimelineClinicalNotes from "../../components/Partograma/PartogramaTimelines/ClinicalNotes/TimelineClinicalNotes";
import TimelinePosture from "../../components/Partograma/PartogramaTimelines/Posture/TimelinePosture";
import TimelineFluidIntake from "../../components/Partograma/PartogramaTimelines/FluidIntake/TimelineFluidIntake";
import TimelineBleeding from "../../components/Partograma/PartogramaTimelines/Bleeding/TimelineBleeding";
import TimelineCompany from "../../components/Partograma/PartogramaTimelines/Company/TimelineCompany";

import TimelineAmnioticFluid from "../../components/Partograma/PartogramaTimelines/AmnioticFluid/TimelineAmnioticFluid";
import TimelineContraction from "../../components/Partograma/PartogramaTimelines/Contraction/TimelineContraction";
import TimelinePharmacological from "../../components/Partograma/PartogramaTimelines/Pharmacological/TimelinePharmacological";
import TimelineOxytocin from "../../components/Partograma/PartogramaTimelines/Oxytocin/TimelineOxytocin";
import TimelineFetalMonitoring from "../../components/Partograma/PartogramaTimelines/FetalMonitoring/TimelineFetalMonitoring";

import "./ExportPdf.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PartogramaMonitoringChart from "../../components/Partograma/PartogramaTimelines/FetalMonitoring/PartogramaMonitoringChart";
import PartogramaLegend from "../../components/Partograma/PartogramaLegend";
import PdfDilatation from "../../components/Partograma/Pdf/PdfDilatation";
import PdfPosition from "../../components/Partograma/Pdf/PdfPosition";
import PdfContactions from "../../components/Partograma/Pdf/PdfContractions";
import PdfNonPharmacological from "../../components/Partograma/Pdf/PdfNonPharmacological";
import PdfClinicalNotes from "../../components/Partograma/Pdf/PdfClinicalNotes";
import PdfPosture from "../../components/Partograma/Pdf/PdfPosture";
import PdfFluidIntake from "../../components/Partograma/Pdf/PdfFluidIntake";
import PdfBleeding from "../../components/Partograma/Pdf/PdfBleeding";
import PdfFluidAmniotic from "../../components/Partograma/Pdf/PdfFluidAmniotic";
import PdfOxytocin from "../../components/Partograma/Pdf/PdfOxytocin";
import PdfFetalBlood from "../../components/Partograma/Pdf/PdfFetalBlood";
import PdfCompany from "../../components/Partograma/Pdf/PdfCompany";
import PdfPharmacological from "../../components/Partograma/Pdf/PdfPharmacological";

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
const handleExport = () => {
  const input = document.getElementById("my-html-element");
  html2canvas(input as any).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf: any = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("download.pdf");
  });
};

const ExportPdf = () => {
  const { placenta } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  
  const {
    gestacionalAge,
    obstetricHistory,
    carePlan,
    bloodType,
    statusGbs,
    pregnancyType,
    ruptureOne,
    ruptureTwo,
    deliveryTime,
    birthTimeOne,
    birthTimeTwo,
    dischargeTimeOne,
    dischargeTimeTwo,
    customizableTitleOne,
    customizableTitleTwo,
    customizableTitleThree,
  } = useSelector((state: Store.State) => state.header.data);

  const params: any = useParams();

  const paciente = dataTable[Number(params.idPaciente)];

  return (
    <div
      className="partograma-page__container"
      id="my-html-element"
      style={{ padding: "16px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "710px",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <div className="partograma-page__pacient-data-item">
          <strong className="export-pdf-strong">Parturiente</strong>
          <span>{paciente.name}</span>
        </div>
        <div className="partograma-page__pacient-data-item">
          <strong>Data de Nascimento</strong>
          <span>{paciente.birth}</span>
        </div>
        <div className="partograma-page__pacient-data-item">
          <strong>Idade</strong>
          <span>22 anos</span>
        </div>
        <div className="partograma-page__pacient-data-item">
          <strong>CPF</strong>
          <span>XXX.XXX.XXX-XX </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "75px",
          marginBottom: "12px",
        }}
      >
        <div className="partograma-page__pacient-data-item">
          <strong>Código Paciente</strong>
          <span>415762</span>
        </div>
        <div className="partograma-page__pacient-data-item">
          <strong>Código do Atendimento</strong>
          <span>2075156</span>
        </div>
      </div>
      <div className="partograma-page__pacient-data-item">
        <strong>Partograma</strong>
        <span>Criado em 17/04/2023 22:00h por enfermeiro José</span>
        <span>Finalizado em 18/04/2023 00:00h por enfermeira Maria</span>
      </div>
      {gestacionalAge && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "6px" }}
          >
            Idade Gestacional
          </strong>
          <span>
            {`Data da Verificação: ${gestacionalAge.dateOfRegistration}`}
          </span>
          <span>
            {`Dum: ${gestacionalAge.weeksDum} semanas ${gestacionalAge.daysDum} dias`}
          </span>

          <span>{`Ultrassom: ${gestacionalAge.weeksUltrasound} semanas ${gestacionalAge.daysUltrasound} dias`}</span>

          <span>{`Observação: ${gestacionalAge.observation}`}</span>
        </>
      )}

      {obstetricHistory && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "6px" }}
          >
            Histórico Obstétrico
          </strong>

          <span>{`Gestações: ${obstetricHistory.numberOfGestations},  Partos: ${obstetricHistory.numberOfBirths},  Cesáreas: ${obstetricHistory.cesareanChildbirth},  Perdas precoce: ${obstetricHistory.numberOfAbortions}.`}</span>

          <span>{`Observação: ${obstetricHistory.observation}`}</span>
        </>
      )}

      {carePlan && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "6px" }}
          >
            Plano de Cuidado
          </strong>

          <span>{`Plano de cuidado: ${carePlan.carePlan}`}</span>

          <span>{`Observação: ${carePlan.observation}`}</span>
        </>
      )}

      {bloodType && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "6px" }}
          >
            Tipo Sanguíneo
          </strong>

          <span>{`Grupo ABO: ${bloodType.bloodType}`}</span>

          <span>{`Fator RH: ${bloodType.rhFactor}`}</span>

          <span>{`Observação: ${bloodType.observation}`}</span>
        </>
      )}

      {statusGbs && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "6px" }}
          >
            Status GBS
          </strong>

          <span>{`Data de realização do exame: ${statusGbs.statusGbsDateTime}`}</span>

          <span>{`Resultado: ${statusGbs.statusGbs}`}</span>

          <span>{`Observação: ${statusGbs.observation}`}</span>
        </>
      )}

      {pregnancyType && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "6px" }}
          >
            Tipo de Gravidez
          </strong>

          <span>{`Gravidez ${pregnancyType.pregnancyType}`}</span>
          {pregnancyType.babyNumbers && (
            <span>{`Número de fetos: ${pregnancyType.babyNumbers}`}</span>
          )}

          <span>{`Observação: ${pregnancyType.observation}`}</span>
        </>
      )}

      {ruptureOne && (
        <>
          <strong className="export-pdf-strong" style={{ marginTop: "24px" }}>
            Ruptura da Bolsa
          </strong>

          <span style={{ marginBottom: "12px" }}>
            {`Amnicidade: ${ruptureTwo ? "Diamniótica" : "Amniótica"}`}
          </span>
          {pregnancyType?.pregnancyType === "Múltipla" && (
            <strong className="subTitle">1° Gemelar</strong>
          )}

          <span>{`Momento da Ruptura ${ruptureOne.dateTimeRupture}`}</span>
          <span>{`Modo da Ruptura ${ruptureOne.ruptureMode}`}</span>
          <span>{`Indicação da Amniotomia ${ruptureOne.ruptureIndication}`}</span>
          <span>{`Volume do Líquido ${ruptureOne.ruptureIndication}`}</span>
          <span>{`Aspecto do Líquido ${ruptureOne.ruptureIndication}`}</span>

          <span>{`Observação: ${ruptureOne.observation}`}</span>
        </>
      )}

      {ruptureTwo && pregnancyType?.pregnancyType === "Múltipla" && (
        <>
          <strong style={{ marginTop: "24px" }} className="subTitle">
            2° Gemelar
          </strong>

          <span>{`Momento da Ruptura ${ruptureTwo.dateTimeRupture}`}</span>
          <span>{`Modo da Ruptura ${ruptureTwo.ruptureMode}`}</span>
          <span>{`Indicação da Amniotomia ${ruptureTwo.ruptureIndication}`}</span>
          <span>{`Volume do Líquido ${ruptureTwo.ruptureIndication}`}</span>
          <span>{`Aspecto do Líquido ${ruptureTwo.ruptureIndication}`}</span>

          <span>{`Observação: ${ruptureTwo.observation}`}</span>
        </>
      )}

      {deliveryTime && (
        <>
          <strong className="export-pdf-strong" style={{ marginTop: "24px" }}>
            Inicio do trabalho de parto
          </strong>

          <span>{`Data e hora: ${new Date(deliveryTime.deliveryTime)
            .toLocaleString("pt-BR")
            .slice(0, 17)}`}</span>

          <span>{`Observação: ${deliveryTime.observation}`}</span>
        </>
      )}
      {birthTimeOne && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "12px" }}
          >
            Nascimento
          </strong>

          {pregnancyType?.pregnancyType === "Múltipla" && (
            <strong className="subTitle">1° Gemelar</strong>
          )}
          <span>{`Data e hora: ${new Date(birthTimeOne.birthTime)
            .toLocaleString("pt-BR")
            .slice(0, 17)}`}</span>
          <span>{`Tipo de parto: ${birthTimeOne.birthType}`}</span>

          <span
            style={{ marginBottom: "24px" }}
          >{`Observação: ${birthTimeOne.observation}`}</span>
        </>
      )}

      {birthTimeTwo && pregnancyType?.pregnancyType === "Múltipla" && (
        <>
          {pregnancyType?.pregnancyType === "Múltipla" && (
            <strong className="subTitle">2° Gemelar</strong>
          )}
          <span>{`Data e hora: ${new Date(birthTimeTwo.birthTime)
            .toLocaleString("pt-BR")
            .slice(0, 17)}`}</span>
          <span>{`Tipo de parto: ${birthTimeTwo.birthType}`}</span>

          <span>{`Observação: ${birthTimeTwo.observation}`}</span>
        </>
      )}

      {dischargeTimeOne && (
        <>
          <strong
            className="export-pdf-strong"
            style={{ marginTop: "24px", marginBottom: "12px" }}
          >
            Dequitação
          </strong>

          {pregnancyType?.pregnancyType === "Múltipla" && (
            <strong className="subTitle">1° Gemelar</strong>
          )}
          <span>{`Data e hora: ${new Date(
            dischargeTimeOne.dischargeTime as Date
          )
            .toLocaleString("pt-BR")
            .slice(0, 17)}`}</span>

          <span
            style={{ marginBottom: "24px" }}
          >{`Observação: ${dischargeTimeOne.observation}`}</span>
        </>
      )}

      {dischargeTimeTwo && pregnancyType?.pregnancyType === "Múltipla" && (
        <>
          {pregnancyType?.pregnancyType === "Múltipla" && (
            <strong className="subTitle">2° Gemelar</strong>
          )}
          <span>{`Data e hora: ${new Date(
            dischargeTimeTwo.dischargeTime as Date
          )
            .toLocaleString("pt-BR")
            .slice(0, 17)}`}</span>

          <span>{`Observação: ${dischargeTimeTwo.observation}`}</span>
        </>
      )}

      {customizableTitleOne && (
        <>
          <strong className="export-pdf-strong" style={{ marginTop: "24px" }}>
            {customizableTitleOne.title}
          </strong>

          <span>{`Observação: ${customizableTitleOne.observation}`}</span>
        </>
      )}

      {customizableTitleTwo && (
        <>
          <strong className="export-pdf-strong" style={{ marginTop: "24px" }}>
            {customizableTitleTwo.title}
          </strong>

          <span>{`Observação: ${customizableTitleTwo.observation}`}</span>
        </>
      )}

      {customizableTitleThree && (
        <>
          <strong className="export-pdf-strong" style={{ marginTop: "24px" }}>
            {customizableTitleThree.title}
          </strong>

          <span>{`Observação: ${customizableTitleThree.observation}`}</span>
        </>
      )}
      <PartogramaLegend />
      <div className="partograma-page__upper-content">
        <div className="partograma-page__chart-container">
          <div style={{ marginLeft: "100px", marginTop: "48px" }}>
            <PartogramaChart
              setToggle={function (e: boolean): void {
                throw new Error("Function not implemented.");
              }}
              toggle
            />
          </div>
        </div>
      </div>

      <div className="partograma-page__bottom-content">
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
            marginLeft: "93.25px",
            marginBottom: "24px",
          }}
        >
          <PartogramaMonitoringChart
            onEdit={console.log}
            handleOffChartBeats={console.log}
          />
        </div>
      </div>
      <>
        <strong className="export-pdf-strong">Detalhamento de Eventos</strong>
        <PdfDilatation />
        <PdfPosition />
        <PdfFetalBlood />
        <PdfContactions />
        <PdfOxytocin />
        <PdfPharmacological />
        <PdfNonPharmacological />
        <PdfFluidAmniotic />
        <PdfClinicalNotes />
        <PdfBleeding />
        <PdfPosture />
        <PdfCompany />
        <PdfFluidIntake />
      </>
    </div>
  );
};

export default ExportPdf;
