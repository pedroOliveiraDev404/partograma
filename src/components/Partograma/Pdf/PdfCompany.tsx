import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeEventsInterval } from "../../../utils/formatting";

const PdfCompany = () => {
  const [events, setEvents] = useState<any[]>([]);

  const { companyData } = useSelector(
    (state: Store.State) => state.company.data
  );

  useEffect(() => {
    if (companyData) {
      const response = makeEventsInterval(companyData, "point", "point");
      setEvents(response);
    }
  }, [companyData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Companhia
      </strong>

      {events.map((item) => (
        <>
          {item && item[0]?.point && (
            <div className="row-container">
              <div className="column-container">
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
                {item.observation && (
                  <span> {`Observação: ${item.observation}.`}</span>
                )}
              </div>
              <div className="column-container">
                <span>
                  {`Data e horário de registro: ${new Date()
                    .toLocaleString("pt-BR")
                    .slice(0, 17)}.`}
                </span>
                <span>Registrado por X.</span>
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default PdfCompany;
