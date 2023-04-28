import { useState } from "react";
import { TextField } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReactComponent as IconeTrash } from "../../../../assets/Icone_Trash.svg";
import { TabPanel } from "../../PartogramaModalTabs/utils";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";

import "../../../Pacientes/modais.css";

interface PacienteAddModalProps {
  handleCloseModal: () => void;
  edit?: any;
  placentaDateTime: number | null;
  handlePlacentaDateTimeChange: any | null;
  setFrequencyTwo: (frequency: number) => void;
  frequencyTwo: number;
  observationTwo: string;
  index: number;
  editSubmit: () => void;
  onSubmit: () => void;
  onDelete: () => void;
}

const AbaBabyTwo = ({
  handleCloseModal,
  edit,
  placentaDateTime,
  handlePlacentaDateTimeChange,
  setFrequencyTwo,
  frequencyTwo,
  observationTwo,
  index,
  editSubmit,
  onSubmit,
  onDelete,
}: PacienteAddModalProps) => {
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const DatePicker = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <DateTimePicker
        value={placentaDateTime}
        onChange={handlePlacentaDateTimeChange}
        renderInput={(params: any) => <TextField {...params} />}
        className="timeline-liquido-amniotico__datetime-input"
      />
      {edit && (
        <div
          style={{
            marginTop: "-6px",
          }}
        >
          <IconeTrash onClick={() => setIsModalDeleteOpen(true)} />
        </div>
      )}
    </div>
  );

  return (
    <div className="timeline-liquido-amniotico__modal-container">
      <TabPanel value={index} index={2}>
        <div style={{ marginTop: "8px" }}>
          <DatePicker />
        </div>
        <div style={{ marginBottom: "24px" }}>
          <span className="tab-dilatacao__notes-input-label">
            Frequência Cardíaca Fetal (bpm)
          </span>
          <input
            className={`paciente-add-modal__input-textarea`}
            maxLength={210}
            id="textarea-ph"
            value={frequencyTwo}
            onChange={(e: any) => setFrequencyTwo(Number(e.target.value))}
            type="number"
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
          id="textarea-fetalMonitoringTwo"
          defaultValue={observationTwo}
        />
        <button
          className="paciente-add-modal__button-submit"
          onClick={handleCloseModal}
        >
          Importar do Cardiotocógrafo
        </button>
        <button
          className="paciente-add-modal__button-submit"
          onClick={edit ? editSubmit : onSubmit}
          style={{ marginTop: "12px" }}
        >
          {edit ? "Atualizar" : "Salvar"}
        </button>
      </TabPanel>

      <PartogramaConfirmDelete
        isModalOpen={isModalDeleteOpen}
        handleCloseModal={() => setIsModalDeleteOpen(false)}
        handleSubmit={onDelete}
      />
    </div>
  );
};

export default AbaBabyTwo;
