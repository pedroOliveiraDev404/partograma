import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { MenuItem, Modal } from "@mui/material";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "../Pacientes/modais.css";
import PartogramaConfirmFinish from "./PartogramaConfirmFinish";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  cause?: string;
  observation?: string;
}
const PartogramaFinishModal = ({
  isModalOpen,
  handleCloseModal,
  cause,
  observation,
}: PacienteAddModalProps) => {
  const [addPacientDateTime, setAddPacientDateTime] = useState<number | null>(
    Date.now()
  );
  const [reason, setReason] = useState("Nascimento do bebê");
  const [onOpenFinish, setOnOpenFinish] = useState(false);

  const handleAddPacientDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      setAddPacientDateTime(newValue.valueOf());
    }
  };

  useEffect(() => {
    if (cause) setReason(cause);
  }, [cause]);

  const submit = () => {
    setOnOpenFinish(true);
    /*
    let error = {
      pacientName: false,
    };
    error.pacientName = !pacientName ? true : false;
    setErrorForm(error);

    if (!error.pacientName) {
      handleCloseModal();
    }
    */
  };

  const onCancel = () => {
    setOnOpenFinish(false);
    handleCloseModal();
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
            Finalizar Partograma
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
        <span className="tab-dilatacao__notes-input-label">Motivos</span>
        <Select
          className="tab-dilatacao__dilatacao-input-select"
          value={reason}
          disabled={cause ? true : false}
          style={{ width: "100%", marginTop: "16px" }}
          onChange={(e: any) => setReason(e.target.value)}
        >
          <MenuItem value="Nascimento do bebê">Nascimento do bebê</MenuItem>
          <MenuItem value="Falecimento do bebê">Falecimento do bebê</MenuItem>
          <MenuItem value="Falecimento da Mãe">Falecimento da Mãe</MenuItem>
          <MenuItem value="Evoluiu para um parto cesáreo">
            Evoluiu para um parto cesáreo
          </MenuItem>
        </Select>

        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "16px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          defaultValue={observation}
        />
        <button className="paciente-add-modal__button-submit" onClick={submit}>
          Salvar
        </button>
        <PartogramaConfirmFinish
          handleCloseModal={() => setOnOpenFinish(false)}
          handleCancel={onCancel}
          isModalOpen={onOpenFinish}
        />
      </Box>
    </Modal>
  );
};

export default PartogramaFinishModal;
