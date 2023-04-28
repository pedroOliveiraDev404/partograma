import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

import "../Pacientes/modais.css";

interface PacienteConfirmStartProps {
  isModalOpen: boolean;
  id: number;
  handleCloseModal: () => void;
  handleCancel: () => void;
  time: number | null;
}
const PacienteConfirmStart = ({
  isModalOpen,
  handleCloseModal,
  handleCancel,
  id,
  time,
}: PacienteConfirmStartProps) => {
  const history = useNavigate();
  const [addPacientDateTime, setAddPacientDateTime] = useState(
    new Date(time as any)
  );

  const handleAddPacientDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      setAddPacientDateTime(newValue.valueOf());
    }
  };

  const submit = () => {
    history(`/partograma/${id}`);
  };

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
            Iniciar acompanhamento da paciente
          </strong>
        </div>
        <div style={{ marginTop: "36px" }}>
          <DateTimePicker
            value={addPacientDateTime}
            onChange={handleAddPacientDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
            className="tab-dilatacao__datetime-input"
          />
        </div>
        <span style={{ marginBottom: "36px" }}>
          Não é possível realizar alterações no horário do inicio do partograma
          após iniciado, deseja realmente iniciar?
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
            onClick={handleCancel}
          >
            Não
          </button>
          <button
            className="paciente-add-modal__button-submit"
            onClick={submit}
          >
            Sim
          </button>
        </div>
        <span style={{ marginTop: "36px" }}>
          Observação: Data e hora do inicio do trabalho de parto podem ser
          informados posteriormente.
        </span>
      </Box>
    </Modal>
  );
};

export default PacienteConfirmStart;
