import { useState } from "react";
import { MenuItem, Modal } from "@mui/material";
import Select from "@mui/material/Select";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

import "../Pacientes/modais.css";
import { useDispatch } from "react-redux";
import { addCarePlan } from "../../store/modules/header/actions";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaCarePlan = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const [carePlan, setCarePlan] = useState("Trabalho de Parto Espontâneo");

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-care-plan");
    dispatch(
      addCarePlan({
        carePlan,
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
        <span className="tab-dilatacao__notes-input-label">
          Plano de Cuidado
        </span>

        <Select
          className="tab-dilatacao__dilatacao-input-select"
          value={carePlan}
          style={{ width: "100%", marginTop: "8px" }}
          onChange={(e: any) => setCarePlan(e.target.value)}
        >
          <MenuItem value="Trabalho de Parto Espontâneo">
            Trabalho de Parto Espontâneo
          </MenuItem>
          <MenuItem value="Parto Induzido">Parto Induzido</MenuItem>
          <MenuItem value="Cesárea Antes do Trabalho de Parto">
            Cesárea Antes do Trabalho de Parto
          </MenuItem>
        </Select>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-care-plan"
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

export default PartogramaCarePlan;
