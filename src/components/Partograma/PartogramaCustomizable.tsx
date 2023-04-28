import { Modal } from "@mui/material";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

import "../Pacientes/modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  setTitle: (title: string) => void;
  title: string;
}

const PartogramaCustomizable = ({
  isModalOpen,
  handleCloseModal,
  title,
  setTitle,
}: PacienteAddModalProps) => {
  const onSubmit = () => {
    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={onSubmit}
        />
        <span className="tab-dilatacao__notes-input-label">
          <input
            className="partograma-page__input-pacient-data"
            defaultValue={title}
            style={{
              fontWeight: 700,
              fontSize: "16px",
              lineHeight: "20px",
              color: title !== "Título Customizável" ?  "#4e4e4e" : "gray",
            }}
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </span>

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

export default PartogramaCustomizable;
