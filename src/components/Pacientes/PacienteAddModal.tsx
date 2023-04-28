import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "./modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}
const PacienteAddModal = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const [addPacientDateTime, setAddPacientDateTime] = useState<number | null>(
    Date.now()
  );
  const [pacientName, setPacienteName] = useState("");
  const [pacientCpf, setPacientCpf] = useState("");
  const [errorForm, setErrorForm] = useState({
    pacientName: false,
  });

  const handleAddPacientDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      setAddPacientDateTime(newValue.valueOf());
    }
  };

  const submit = () => {
    let error = {
      pacientName: false,
    };
    error.pacientName = !pacientName ? true : false;
    setErrorForm(error);

    if (!error.pacientName) {
      handleCloseModal();
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <Box className="paciente-add-modal__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <div className="partograma-modal__tab-sangue-fetal">
          <strong
            className="paciente-add-modal__tab-title"
            style={{ marginBottom: "36px" }}
          >
            Dados da Paciente
          </strong>
        </div>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "16px" }}
        >
          Inicio do acompanhamento da paciente
        </span>
        <div style={{ marginTop: "16px" }}>
          <DateTimePicker
            value={addPacientDateTime}
            onChange={handleAddPacientDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
            className="tab-dilatacao__datetime-input"
          />
        </div>
        <div style={{ marginTop: "18px" }}>
          <span className="tab-dilatacao__notes-input-label">
            Nome da paciente
          </span>
          <span className="paciente-add-modal__input-require">*</span>
        </div>

        <input
          className={`paciente-add-modal__input-textarea${
            errorForm.pacientName ? "-error" : ""
          }`}
          onChange={(e) => setPacienteName(e.target.value)}
          value={pacientName}
        />
        <div
          className="paciente-add-modal__container-input"
          style={{ width: "100%" }}
        >
          <div style={{ width: "50%" }}>
            <div>
              <span className="tab-dilatacao__notes-input-label">C.P.F.</span>
            </div>
            <input
              className={`paciente-add-modal__input-textarea`}
              onChange={(e) => setPacientCpf(e.target.value)}
              value={pacientCpf}
              maxLength={11}
            />
          </div>
        </div>

        <span className="tab-dilatacao__notes-input-label">Observações</span>
        <textarea className="paciente-add-modal__notes-input-textarea" />
        <button className="paciente-add-modal__button-submit" onClick={submit}>
          Salvar
        </button>
      </Box>
    </Modal>
  );
};

export default PacienteAddModal;
