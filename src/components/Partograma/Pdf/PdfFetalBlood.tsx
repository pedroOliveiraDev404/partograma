import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ObjData } from "../../../store/modules/partogramaChart/types";

const PdfFetalBlood = () => {
  const [events, setEvents] = useState<ObjData[]>([]);
  const [eventsTwo, setEventsTwo] = useState<ObjData[]>([]);
  const { positionData, typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  useEffect(() => {
    if (positionData) {
      setEvents(positionData.filter((item) => item.bloodOne));
      setEventsTwo(positionData.filter((item) => item.bloodTwo));
    }
  }, [positionData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Amostra do Sangue Fetal
      </strong>
      {typePregnancy === "Múltipla" && (
        <strong className="subTitle">1° Gemelar</strong>
      )}

      {events.map((item) => (
        <div className="row-container">
          <div className="column-container">
            <span>{`Data e hora da amostra: ${new Date(item.time as Date)
              .toLocaleString("pt-BR")
              .slice(0, 17)}.`}</span>
            <span> {`pH: ${item.bloodOnePh}.`}</span>
          </div>
          <div className="column-container">
            <span>
              {`Data e horário de registro: ${new Date()
                .toLocaleString("pt-BR")
                .slice(0, 17)}.`}
            </span>
            <span>Registrado por X.</span>
            {item.bloodOneObservation && (
              <span> {`Observação: ${item.bloodOneObservation}.`}</span>
            )}
          </div>
        </div>
      ))}

      {typePregnancy === "Múltipla" && (
        <strong className="subTitle">2° Gemelar</strong>
      )}

      {eventsTwo.map((item) => (
        <div className="row-container">
          <div className="column-container">
            <span>{`Data e hora da amostra: ${new Date(item.time as Date)
              .toLocaleString("pt-BR")
              .slice(0, 17)}.`}</span>
            <span> {`pH: ${item.bloodTwoPh}.`}</span>
          </div>
          <div className="column-container">
            <span>
              {`Data e horário de registro: ${new Date()
                .toLocaleString("pt-BR")
                .slice(0, 17)}.`}
            </span>
            <span>Registrado por X.</span>
            {item.bloodTwoObservation && (
              <span> {`Observação: ${item.bloodTwoObservation}.`}</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PdfFetalBlood;
