import { ReactComponent as IconePauseStatus } from "../../assets/IconePauseStatus.svg";
import { ReactComponent as IconeAlertaStatus } from "../../assets/IconeAlertaStatus.svg";
import { ReactComponent as IconePlayStatus } from "../../assets/IconePlayStatus.svg";
import { ReactComponent as IconeFinishStatus } from "../../assets/IconeFinishStatus.svg";
import PacienteStartFollowUp from "./PacienteStartFollowUp";
import { useState } from "react";

interface PacienteStatusInterface {
  status: string;
  statusId: string;
  id: number;
}

const PacienteStatus = ({ status, statusId, id }: PacienteStatusInterface) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const componentMapIcone = [
    IconeAlertaStatus,
    IconePauseStatus,
    IconePlayStatus,
    IconeFinishStatus,
  ];

  const componentMapContainer = ["no-interaction", "pause", "play", "finish"];

  const Icone = componentMapIcone[Number(statusId)];

  const Container = componentMapContainer[Number(statusId)];

  const ContainerIcone = componentMapContainer[Number(statusId)];
  return (
    <div
      className={`pacientes-page__status-container-${Container}`}
      onClick={() => (statusId === "1" ? setIsModalOpen(true) : null)}
    >
      <div className={`pacientes-page__status-${ContainerIcone}`}>
        <Icone />
      </div>
      <p style={{ marginTop: "14px" }}>{status}</p>
      {isModalOpen && (
        <PacienteStartFollowUp
          isModalOpen={isModalOpen}
          handleCloseModal={() => setIsModalOpen(false)}
          id={id}
        />
      )}
    </div>
  );
};

export default PacienteStatus;
