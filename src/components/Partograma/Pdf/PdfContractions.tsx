import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfContactions = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { contractionData } = useSelector(
    (state: Store.State) => state.contraction.data
  );

  useEffect(() => {
    if (contractionData) {
      setEvents(contractionData.filter((item: any) => item.contractions));
    }
  }, [contractionData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Contrações/15min
      </strong>
      {events.map((item) => (
        <div className="row-container">
          <div className="column-container">
            <span>{`Data e hora da contração: ${new Date(item.time as Date)
              .toLocaleString("pt-BR")
              .slice(0, 17)}.`}</span>
            <span> {`Número de contrações: ${item.contractions}.`}</span>
            <span>
              {item.contractionTime === "30s<"
                ? "Menor que 30 segundos."
                : "Maior que 30 segundos."}
            </span>
          </div>
          <div className="column-container">
            <span>
              {`Data e horário de registro: ${new Date()
                .toLocaleString("pt-BR")
                .slice(0, 17)}`}
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

export default PdfContactions;
