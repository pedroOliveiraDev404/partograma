import { MenuItem, Modal, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

import "../Pacientes/modais.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStatusGbs } from "../../store/modules/header/actions";
import { formatDateAxis } from "../../utils/formatting";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaStatusGbs = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const [statusGbsDateTime, setStatusGbsDateTime] = useState<number | null>(
    Date.now()
  );
  const [statusGbs, setStatusGbs] = useState("Positivo");
  const [dateFormatted, setDateFormatted] = useState("");

  const handleStatusGbsDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDateAxis(newValue);
      setDateFormatted(timeString);
      setStatusGbsDateTime(newValue.valueOf());
    }
  };

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-status-gbs");
    dispatch(
      addStatusGbs({
        statusGbs,
        statusGbsDateTime: dateFormatted,
        observation: textArea.value,
        responsible: "Médico Responsável",
        dateOfSystem: new Date().toLocaleString("pt-BR").slice(0, 17),
      })
    );
    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">Status GBS</span>

        <div style={{ marginTop: "8px" }}>
          <span className="partograma-page__label-select">
            Data de realização do exame
          </span>
          <DateTimePicker
            value={statusGbsDateTime}
            onChange={handleStatusGbsDateTimeChange}
            renderInput={(params: any) => {
              const newParams = {
                ...params,
                inputProps: {
                  ...params.inputProps,
                  value: params.inputProps.value.slice(0, 11),
                },
              };
              return <TextField {...newParams} />;
            }}
            className="timeline-liquido-amniotico__datetime-input"
          />
        </div>
        <Select
          className="tab-dilatacao__dilatacao-input-select"
          value={statusGbs}
          onChange={(e: any) => setStatusGbs(e.target.value)}
        >
          <MenuItem value="Positivo">Positivo</MenuItem>
          <MenuItem value="Negativo">Negativo</MenuItem>
          <MenuItem value="Desconhecido">Desconhecido</MenuItem>
        </Select>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-status-gbs"
        />
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

export default PartogramaStatusGbs;
