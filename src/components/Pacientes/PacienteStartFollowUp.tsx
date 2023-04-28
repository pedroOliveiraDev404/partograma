import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "./modais.css";
import PacienteConfirmStart from "./PartogramaConfirmStart";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  id: number;
}
const PacienteStartFollowUp = ({
  isModalOpen,
  handleCloseModal,
  id,
}: PacienteAddModalProps) => {
  const [onOpen, setOnOpen] = useState(false);
  const [addPacientDateTime, setAddPacientDateTime] = useState<number | null>(
    Date.now()
  );

  const handleAddPacientDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      setAddPacientDateTime(newValue.valueOf());
    }
  };

  const submit = () => {
    setOnOpen(true);
  };

  const onCancel = () => {
    setOnOpen(false);
    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box className="paciente-add-modal__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={() => handleCloseModal()}
        />
        <div className="partograma-modal__tab-sangue-fetal">
          <strong
            className="paciente-add-modal__tab-title"
            style={{ marginBottom: "36px" }}
          >
            Inicio do acompanhamento da paciente
          </strong>
        </div>

        <div style={{ marginTop: "16px" }}>
          <DateTimePicker
            value={addPacientDateTime}
            onChange={handleAddPacientDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
            className="tab-dilatacao__datetime-input"
          />
        </div>

        <span className="tab-dilatacao__notes-input-label">Observações</span>
        <textarea className="paciente-add-modal__notes-input-textarea" />
        <button className="paciente-add-modal__button-submit" onClick={submit}>
          Salvar
        </button>
        {onOpen && (
          <PacienteConfirmStart
            handleCancel={onCancel}
            handleCloseModal={() => setOnOpen(false)}
            id={id}
            isModalOpen={onOpen}
            time={addPacientDateTime}
          />
        )}
      </Box>
    </Modal>
  );
};

export default PacienteStartFollowUp;
