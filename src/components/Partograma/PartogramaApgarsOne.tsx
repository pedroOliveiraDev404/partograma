import { useState } from "react";
import { Modal } from "@mui/material";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "../Pacientes/modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaApgarsOne = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const [oneMinute, setOneMinute] = useState(0);
  const [twoMinute, setTwoMinute] = useState(0);

  const [errorForm, setErrorForm] = useState({
    oneMinute: false,
    twoMinute: false,
  });

  const onSubmit = () => {
    let error = {
      oneMinute: false,
      twoMinute: false,
    };
    error.oneMinute = oneMinute > -1 && oneMinute < 11 ? false : true;
    error.twoMinute = twoMinute > -1 && twoMinute < 11 ? false : true;

    setErrorForm(error);

    if (!error.oneMinute && !error.twoMinute) {
      handleCloseModal();
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div
        className="timeline-liquido-amniotico__modal-container"
        style={{ width: "400px" }}
      >
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">APGAR</span>
        <div style={{ width: "50%", marginTop: "16px" }}>
          <strong className="partograma-page__label-select">1 - Minuto</strong>
          <input
            className={`paciente-add-modal__input-textarea${
              errorForm.oneMinute ? "-error" : ""
            }`}
            type="number"
            style={{ textAlign: "center" }}
            min={0}
            max={10}
            value={oneMinute}
            onChange={(e: any) => setOneMinute(e.target.value)}
          />
        </div>
        <div style={{ width: "50%" }}>
          <strong className="partograma-page__label-select">5 - Minutos</strong>
          <input
            className={`paciente-add-modal__input-textarea${
              errorForm.twoMinute ? "-error" : ""
            }`}
            type="number"
            style={{ textAlign: "center" }}
            min={0}
            max={10}
            value={twoMinute}
            onChange={(e: any) => setTwoMinute(e.target.value)}
          />
        </div>

        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea className="paciente-add-modal__notes-input-textarea" />
        <button
          className="paciente-add-modal__button-submit"
          onClick={onSubmit}
        >
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default PartogramaApgarsOne;
