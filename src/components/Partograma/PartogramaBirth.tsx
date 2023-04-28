import { Modal, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import "../Pacientes/modais.css";
import { useState } from "react";
import {
  selectEarlyPosition,
  selectEarlyDelivery,
} from "../../store/modules/partogramaChart/actions";
import { formatDatetimeAxis } from "../../utils/formatting";
import { addDeliveryTime } from "../../store/modules/header/actions";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaBirth = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const { positionData } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  const [time, setTime] = useState("");
  const [birthDateTime, setBirthDateTime] = useState<number | null>(Date.now());

  const handleBirthDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setBirthDateTime(newValue.valueOf());
    }
  };
  const onSubmit = async () => {
    const aux = await positionData.find((item) => item.timeLegend === time);
    const textArea: any = document.getElementById("textarea-start-birth");
    if (aux) {
      dispatch(selectEarlyPosition(String(aux.position)));
      dispatch(selectEarlyDelivery(aux.timeLegend));
      dispatch(
        addDeliveryTime({
          deliveryTime: aux.time,
          observation: textArea.value,
        })
      );
    }

    handleCloseModal();
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Início do Trabalho de Parto
        </span>

        <div style={{ marginTop: "8px" }}>
          <DateTimePicker
            value={birthDateTime}
            onChange={handleBirthDateTimeChange}
            renderInput={(params: any) => <TextField {...params} />}
            className="timeline-liquido-amniotico__datetime-input"
          />
        </div>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-start-birth"
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

export default PartogramaBirth;
