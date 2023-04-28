import { MenuItem, Modal, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

import "../Pacientes/modais.css";
import { useState } from "react";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaTypeOfPregnancy = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const [liquidoAmnioticoDateTime, setLiquidoAmnioticoDateTime] = useState<
    number | null
  >(Date.now());
  const handleLiquidoAmnioticoDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setLiquidoAmnioticoDateTime(newValue.valueOf());
    }
  };
  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Tipo da Gravidez
        </span>

        <div style={{ marginTop: "8px" }}>
          <DateTimePicker
            value={liquidoAmnioticoDateTime}
            onChange={handleLiquidoAmnioticoDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
            className="timeline-liquido-amniotico__datetime-input"
          />
        </div>
        <Select className="tab-dilatacao__dilatacao-input-select" defaultValue={0}>
          <MenuItem value={0}>Única Cefálica</MenuItem>
          <MenuItem>Única Pélvica</MenuItem>
          <MenuItem>Única Córmica</MenuItem>
          <MenuItem>Única Múltipla</MenuItem>
        </Select>
        <span className="tab-dilatacao__notes-input-label"  style={{marginTop: '8px'}}>Observações</span>
        <textarea className="paciente-add-modal__notes-input-textarea" />
        <button
          className="paciente-add-modal__button-submit"
          onClick={handleCloseModal}
        >
          Salvar
        </button>
      </div>
    </Modal>
  );
};

export default PartogramaTypeOfPregnancy;
