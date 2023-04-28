import { useState } from "react";

import { Modal, TextField } from "@mui/material";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReactComponent as IconeTrash } from "../../../../assets/Icone_Trash.svg";

import { TabPanel } from "../../PartogramaModalTabs/utils";

import "../../../Pacientes/modais.css";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";

interface PacienteAddModalProps {
  handleCloseModal: () => void;
  edit?: any;
  placentaDateTime: number | null;
  handlePlacentaDateTimeChange: any | null;
  setFrequencyMother: (frequency: number) => void;
  frequencyMother: number;
  observationTree: string;
  index: number;
  editSubmit: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  saturation: number;
  setSaturation: (e: number) => void;
  pas: number;
  setPas: (e: number) => void;
  pad: number;
  setPad: (e: number) => void;
}

const AbaPacient = ({
  handleCloseModal,
  edit,
  placentaDateTime,
  handlePlacentaDateTimeChange,
  setFrequencyMother,
  frequencyMother,
  observationTree,
  index,
  editSubmit,
  onSubmit,
  onDelete,
  saturation,
  setSaturation,
  pas,
  setPas,
  pad,
  setPad,
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
    <div>
      <TabPanel value={index} index={0}>
        <div style={{ marginTop: "8px" }}>
          <DatePicker />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <span className="tab-dilatacao__notes-input-label">
            Frequência Cardíaca (bpm)
          </span>
          <input
            className={`paciente-add-modal__input-textarea`}
            maxLength={210}
            id="textarea-ph"
            value={frequencyMother}
            onChange={(e: any) => setFrequencyMother(Number(e.target.value))}
            type="number"
          />
        </div>
        <div
          style={{
            marginBottom: "50px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span className="tab-dilatacao__notes-input-label">
              Pressão Arterial Sistólica (mmHg)
            </span>
            <input
              className={`paciente-add-modal__input-textarea`}
              maxLength={100}
              id="textarea-ph"
              value={pas}
              onChange={(e: any) => setPas(Number(e.target.value))}
              type="number"
            />
          </div>
          <div>
            <span className="tab-dilatacao__notes-input-label">
              Pressão Arterial Diastólica (mmHg)
            </span>
            <input
              className={`paciente-add-modal__input-textarea`}
              maxLength={100}
              id="textarea-ph"
              value={pad}
              onChange={(e: any) => setPad(Number(e.target.value))}
              type="number"
            />
          </div>
        </div>
        <div style={{ marginBottom: "8px" }}>
          <span className="tab-dilatacao__notes-input-label">
            Saturação de O2 Materna (%)
          </span>
          <input
            className={`paciente-add-modal__input-textarea`}
            maxLength={100}
            id="textarea-ph"
            value={saturation}
            onChange={(e: any) => setSaturation(Number(e.target.value))}
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
          id="textarea-fetalMonitoringMother"
          defaultValue={observationTree}
        />
        <button
          className="paciente-add-modal__button-submit"
          onClick={handleCloseModal}
        >
          Importar dados do monitor multiparamétrico
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

export default AbaPacient;
