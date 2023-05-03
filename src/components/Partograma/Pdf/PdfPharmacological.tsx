import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeEventsInterval } from "../../../utils/formatting";

const PdfPharmacological = () => {
  const [events, setEvents] = useState<any[]>([]);

  const { pharmacologicalData } = useSelector(
    (state: Store.State) => state.pharmacological.data
  );

  useEffect(() => {
    if (pharmacologicalData) {
      const response = makeEventsInterval(
        pharmacologicalData,
        "pharmacologicalPoint",
        "id"
      );
      setEvents(response);
    }
  }, [pharmacologicalData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Farmacológico
      </strong>

      {events.map((item) => (
        <>
          {item && item[0]?.point && (
            <div className="row-container">
              <div className="column-container">
                <span>{`Tipo de aplicação: ${item[item.length - 1].pharmacological || item[0].pharmacological}`}</span>
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

export default PdfPharmacological;
