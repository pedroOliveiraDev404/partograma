import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PdfFluidIntake = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { fluidIntakeData } = useSelector(
    (state: Store.State) => state.fluidintake.data
  );

  useEffect(() => {
    if (fluidIntakeData) {
      setEvents(fluidIntakeData.filter((item: any) => item.point));
    }
  }, [fluidIntakeData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Ingestão de Liquidos
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

export default PdfFluidIntake;
