import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

import "../Pacientes/modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleSubmit: () => void;
}
const PartogramaConfirmDelete = ({
  isModalOpen,
  handleCloseModal,
  handleSubmit,
}: PacienteAddModalProps) => {
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box
        className="paciente-add-modal__modal-container"
        style={{ width: "600px" }}
      >
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <div className="partograma-modal__tab-sangue-fetal">
          <strong
            className="paciente-add-modal__tab-title"
            style={{ marginBottom: "36px" }}
          >
            Apagar evento
          </strong>
        </div>
        <span style={{ marginBottom: "36px", marginTop: "36px" }}>
          Deseja realmente apagar o evento?
        </span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "8px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <button
            className="paciente-add-modal__button-submit"
            onClick={handleCloseModal}
          >
            Não
          </button>
          <button
            className="paciente-add-modal__button-submit"
            onClick={handleSubmit}
          >
            Sim
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default PartogramaConfirmDelete;
