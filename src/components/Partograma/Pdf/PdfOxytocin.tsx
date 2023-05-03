import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeEventsInterval } from "../../../utils/formatting";

const PdfOxytocin = () => {
  const [events, setEvents] = useState<any[]>([]);

  const { oxytocinData } = useSelector(
    (state: Store.State) => state.oxytocin.data
  );

  useEffect(() => {
    if (oxytocinData) {
      const response = makeEventsInterval(
        oxytocinData,
        "administeredDose",
        "id"
      );
      setEvents(response);
    }
  }, [oxytocinData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Ocitocina
      </strong>

      {events.map((item) => (
        <>
          {item && item[0]?.administeredDose && (
            <div className="row-container">
              <div className="column-container">
                <span>
                  {`Dose Administrada em mUI/min: ${item[0]?.administeredDose}.`}
                </span>
                <span>{`Data e hora inicio da admnistração: ${new Date(
                  item[item.length - 1]?.time as Date
                )
                  .toLocaleString("pt-BR")
                  .slice(0, 17)}.`}</span>
                <span>{`Data e hora fim da admnistração: ${new Date(
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

export default PdfOxytocin;
