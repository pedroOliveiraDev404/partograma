import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const BleedingItem = ({ item, bleedingData, index }: any) => {
  let soma = 0;
  if (bleedingData.length > 0) {
    bleedingData?.forEach((obj: any) => {
      if (obj?.bleeding && item.position >= obj.position) {
        soma = Number(soma) + Number(obj.bleeding);
      }
    });
  }

  return (
    <div className="row-container">
      <div className="column-container">
        <span> {`Volume: ${item.bleeding}.`}</span>
        <span>{`Data e hora da medição: ${new Date(item.time as Date)
          .toLocaleString("pt-BR")
          .slice(0, 17)}.`}</span>
        {index !== 0 && (
          <span>
            {`${
              item.position === bleedingData[bleedingData.length - 1].position
                ? "Total Final:"
                : "Total parcial:"
            } ${soma}.`}
          </span>
        )}
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
  );
};

const PdfBleeding = () => {
  const [events, setEvents] = useState<any[]>([]);
  const { bleedingData } = useSelector(
    (state: Store.State) => state.bleeding.data
  );

  useEffect(() => {
    if (bleedingData) {
      setEvents(bleedingData.filter((item: any) => item.point));
    }
  }, [bleedingData]);

  return (
    <>
      <strong
        style={{
          marginTop: "24px",
          marginBottom: "24px",
        }}
        className="export-pdf-strong"
      >
        Sangramento
      </strong>

      {events.map((item, index) => (
        <BleedingItem item={item} bleedingData={events} index={index} />
      ))}
    </>
  );
};

export default PdfBleeding;
