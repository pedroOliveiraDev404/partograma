import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfNonPharmacological = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { nonPharmacologicalData } = useSelector(
    (state: Store.State) => state.nonPharmacological.data
  );

  useEffect(() => {
    if (nonPharmacologicalData) {
      setEvents(nonPharmacologicalData.filter((item: any) => item.point));
    }
  }, [nonPharmacologicalData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Não Farmacológico
      </strong>
      {events.map((item) => (
        <div className="row-container">
          <div className="column-container">
            <span> {`Analgesia: ${item.nonPharmacologic.join(", ")}.`}</span>
            <span>{`Data e hora da realização: ${new Date(item.time as Date)
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
      ))}
    </>
  );
};

export default PdfNonPharmacological;
