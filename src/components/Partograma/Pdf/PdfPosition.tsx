import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ObjData } from "../../../store/modules/partogramaChart/types";

const PdfPosition = () => {
  const [events, setEvents] = useState<ObjData[]>([]);
  const [eventsTwo, setEventsTwo] = useState<ObjData[]>([]);
  const { positionData, typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  useEffect(() => {
    if (positionData) {
      setEvents(positionData.filter((item) => item.valuePosition));
      setEventsTwo(positionData.filter((item) => item.valuePositionTwo));
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
        Posição Fetal
      </strong>
      {typePregnancy === "Múltipla" && (
        <strong className="subTitle">1° Gemelar</strong>
      )}

      {events.map((item) => (
        <div className="row-container">
          <div className="column-container">
            <span>{`Data e hora: ${new Date(item.time as Date)
              .toLocaleString("pt-BR")
              .slice(0, 17)}`}</span>
            <span> {`Apresentação fetal: ${item.apresentation}.`}</span>
            <span> {`Variedade da posição fetal: ${item.variety}.`}</span>
            <span> {`Altura da apresentação fetal: ${item.posicao}.`}</span>
          </div>
          <div className="column-container">
            <span>
              {`Data e horário de registro: ${new Date()
                .toLocaleString("pt-BR")
                .slice(0, 17)}.`}
            </span>
            <span>Registrado por X.</span>
            {item.observation && (
              <span> {`Observação: ${item.observation}.`}</span>
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
            <span>{`Data e hora: ${new Date(item.time as Date)
              .toLocaleString("pt-BR")
              .slice(0, 17)}.`}</span>
            <span> {`Apresentação fetal: ${item.apresentation}.`}</span>
            <span> {`Variedade da posição fetal: ${item.variety}.`}</span>
            <span> {`Altura da apresentação fetal: ${item.posicao}.`}</span>
          </div>
          <div className="column-container">
            <span>
              {`Data e horário de registro: ${new Date()
                .toLocaleString("pt-BR")
                .slice(0, 17)}.`}
            </span>
            <span>Registrado por X.</span>
            {item.observation && (
              <span> {`Observação: ${item.observation}.`}</span>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PdfPosition;
