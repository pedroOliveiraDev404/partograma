import { useState } from "react";
import { MenuItem, Modal } from "@mui/material";
import Select from "@mui/material/Select";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";


import "../Pacientes/modais.css";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

const PartogramaTypeOfDelivery = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const [typeOfDelivery, setTypeOfDelivery] = useState("Parto Vaginal Não Obrigatório");

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Tipo de Parto
        </span>

        <Select
          className="tab-dilatacao__dilatacao-input-select"
          value={typeOfDelivery}
          style={{ width: "100%", marginTop: "8px" }}
          onChange={(e: any) => setTypeOfDelivery(e.target.value)}
        >
          <MenuItem value="Parto Vaginal Não Obrigatório">Parto Vaginal Não Obrigatório</MenuItem>
          <MenuItem value="Parto Fórceps">Parto Fórceps</MenuItem>
          <MenuItem value="Parto por Vácuo Extração">
            Parto por Vácuo Extração
          </MenuItem>
          <MenuItem value="Parto Cesariano">Parto Cesariano</MenuItem>
        </Select>
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginTop: "8px" }}
        >
          Observações
        </span>
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

export default PartogramaTypeOfDelivery;
