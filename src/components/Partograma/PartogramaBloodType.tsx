import { useState } from "react";
import { MenuItem, Modal } from "@mui/material";
import Select from "@mui/material/Select";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import "../Pacientes/modais.css";
import { addBloodType } from "../../store/modules/header/actions";
import { useDispatch } from "react-redux";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaBloodType = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();

  const [bloodType, setBloodType] = useState("A");
  const [rhFactor, setRhFactor] = useState("Positivo");

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-blood-type");
    dispatch(
      addBloodType({
        bloodType,
        rhFactor,
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
        <span className="tab-dilatacao__notes-input-label">Tipo Sanguíneo</span>

        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginBottom: "12px", marginTop: "24px" }}
        >
          Grupo ABO
        </span>
        <Select
          className="tab-dilatacao__dilatacao-input-select"
          onChange={(e: any) => setBloodType(e.target.value)}
          value={bloodType}
        >
          <MenuItem value="A">A</MenuItem>
          <MenuItem value="B">B</MenuItem>
          <MenuItem value="AB">AB</MenuItem>
          <MenuItem value="O">O</MenuItem>
          <MenuItem value="Desconhecido">Desconhecido</MenuItem>
        </Select>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginBottom: "8px", marginTop: "8px" }}
        >
          Fator RH
        </span>
        <Select
          className="tab-dilatacao__dilatacao-input-select"
          onChange={(e: any) => setRhFactor(e.target.value)}
          value={rhFactor}
        >
          <MenuItem value="Positivo">Positivo</MenuItem>
          <MenuItem value="Negativo">Negativo</MenuItem>
          <MenuItem value="Desconhecido">Desconhecido</MenuItem>
          <MenuItem value="Desconhecido">D - Fraco</MenuItem>
        </Select>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
        <textarea
          className="paciente-add-modal__notes-input-textarea"
          id="textarea-blood-type"
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

export default PartogramaBloodType;
