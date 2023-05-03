import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeEventsInterval } from "../../../utils/formatting";

const PdfFluidAmniotic = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [eventsTwo, setEventsTwo] = useState<any[]>([]);
  const { typePregnancy } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  const { amnioticData, amnioticGemelarData } = useSelector(
    (state: Store.State) => state.amnioticFluid.data
  );

  useEffect(() => {
    if (amnioticData) {
      const response = makeEventsInterval(amnioticData, "aspecto", "aspecto");
      setEvents(response);
    }
  }, [amnioticData]);

  useEffect(() => {
    if (amnioticGemelarData) {
      const response = makeEventsInterval(
        amnioticGemelarData,
        "aspecto",
        "aspecto"
      );
      setEventsTwo(response);
    }
  }, [amnioticGemelarData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Liquido Amniótico
      </strong>
      {typePregnancy === "Múltipla" && (
        <strong className="subTitle">1° Gemelar</strong>
      )}
      {events.map((item) => (
        <>
          {item && item[0]?.aspecto && (
            <div className="row-container">
              <div className="column-container">
                <span> {`Aspecto do Líquido: ${item[0]?.aspecto}.`}</span>
                <span>{`Data e hora inicio da observação: ${new Date(
                  item[item.length - 1]?.time as Date
                )
                  .toLocaleString("pt-BR")
                  .slice(0, 17)}.`}</span>
                <span>{`Data e hora fim da observação: ${new Date(
                  item[0]?.time as Date
                )
                  .toLocaleString("pt-BR")
                  .slice(0, 17)}.`}</span>
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
          )}
        </>
      ))}

      {typePregnancy === "Múltipla" && (
        <strong className="subTitle" style={{ marginTop: "24px" }}>
          2° Gemelar
        </strong>
      )}
      {eventsTwo.map((item) => (
        <>
          {item && item[0]?.aspecto && (
            <div className="row-container">
              <div className="column-container">
                <span> {`Aspecto do Líquido: ${item[0]?.aspecto}.`}</span>
                <span>{`Data e hora inicio da observação: ${new Date(
                  item[item.length - 1]?.time as Date
                )
                  .toLocaleString("pt-BR")
                  .slice(0, 17)}.`}</span>
                <span>{`Data e hora fim da observação: ${new Date(
                  item[0]?.time as Date
                )
                  .toLocaleString("pt-BR")
                  .slice(0, 17)}.`}</span>
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
          )}
        </>
      ))}
    </>
  );
};

export default PdfFluidAmniotic;
