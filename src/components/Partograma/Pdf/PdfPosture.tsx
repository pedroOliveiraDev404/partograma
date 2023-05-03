import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfPosture = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { postureData } = useSelector(
    (state: Store.State) => state.posture.data
  );

  useEffect(() => {
    if (postureData) {
      setEvents(postureData.filter((item: any) => item.point));
    }
  }, [postureData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Postura
      </strong>
      {events.map((item) => (
        <div className="row-container">
          <div className="column-container">
            {item.observation && (
              <span> {`Observação: ${item.observation}.`}</span>
            )}
            <span>{`Data e hora da observação: ${new Date(item.time as Date)
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
          </div>
        </div>
      ))}
    </>
  );
};

export default PdfPosture;
