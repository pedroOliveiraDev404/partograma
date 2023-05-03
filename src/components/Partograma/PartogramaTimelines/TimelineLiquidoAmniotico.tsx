import React, { Dispatch, useState } from "react";
import { Modal, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import { ReactComponent as IconeClose } from "../../../assets/IconeClose.svg";

import { ReactComponent as IconeTimelinePlusSign } from "../../../assets/IconeTimelinePlusSign.svg";
import TimelineChart from "./TimelineChart/TimelineChart";
import { GraficoLiquidoAmniotico } from "../../../types/partograma";

import "./TimelineLiquidoAmniotico.css";

interface TimelineLiquidoAmnioticoProps {
  chartData: GraficoLiquidoAmniotico[];
  chartDomain: number[];
  liquidoAmnioticoData: any;
  setLiquidoAmnioticoData: Dispatch<any>;
  newLiquidoAmnioticoEntry: [number, string];
  setNewLiquidoAmnioticoEntry: Dispatch<any>;
}

const TimelineLiquidoAmniotico = ({
  chartData,
  chartDomain,
  liquidoAmnioticoData,
  setLiquidoAmnioticoData,
  newLiquidoAmnioticoEntry,
  setNewLiquidoAmnioticoEntry,
}: TimelineLiquidoAmnioticoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [liquidoAmnioticoDateTime, setLiquidoAmnioticoDateTime] = useState<
    number | null
  >(Date.now());
  const handleLiquidoAmnioticoDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setLiquidoAmnioticoDateTime(newValue.valueOf());
    }
  };

  const [aspecto, setAspecto] = useState<string>("claro");
  const handleAspectoChange = (event: SelectChangeEvent<string>) => {
    setAspecto(String(event.target.value));
  };

  const handleStart = () => {
    const isEntryEmpty = newLiquidoAmnioticoEntry[0] === 0;

    if (isEntryEmpty) {
      setNewLiquidoAmnioticoEntry([liquidoAmnioticoDateTime, aspecto]);
    } else {
      const now = Date.now();
      // Encerra o anterior
      setLiquidoAmnioticoData({
        ...liquidoAmnioticoData,
        [`${newLiquidoAmnioticoEntry[1]}-${newLiquidoAmnioticoEntry[0]}`]: [
          newLiquidoAmnioticoEntry[0],
          now,
        ],
      });
      setNewLiquidoAmnioticoEntry([now, aspecto]);
    }
    handleCloseModal();
  };

  const handleStop = () => {
    if (newLiquidoAmnioticoEntry[0] !== 0) {
      setLiquidoAmnioticoData({
        ...liquidoAmnioticoData,
        [`${newLiquidoAmnioticoEntry[1]}-${newLiquidoAmnioticoEntry[0]}`]: [
          newLiquidoAmnioticoEntry[0],
          liquidoAmnioticoDateTime,
        ],
      });
      setNewLiquidoAmnioticoEntry([0, ""]);
    }
    handleCloseModal();
  };

  return (
    <div className="timeline-liquido-amniotico__container">
      <div className="timeline-liquido-amniotico__label-container">
        <span className="timeline-liquido-amniotico__label">
          Líquido Amniótico
        </span>
        <IconeTimelinePlusSign
          onClick={handleOpenModal}
        />
      </div>
      <TimelineChart
        parameterLabel="Líquido Amniótico"
        chartDomain={chartDomain}
        chartData={chartData}
      />
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <div className="timeline-liquido-amniotico__modal-container">
          <IconeClose
            className="paciente-add-modal__icone-close"
            onClick={handleCloseModal}
          />
          <span className="timeline-liquido-amniotico__modal-title">
            Líquido Amniótico
          </span>
          <div>
            <DateTimePicker
              value={liquidoAmnioticoDateTime}
              onChange={handleLiquidoAmnioticoDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="timeline-liquido-amniotico__datetime-input"
            />
          </div>
          <div className="timeline-liquido-amniotico__input-group">
            <span className="timeline-liquido-amniotico__input-label">
              Aspecto do Líquido
            </span>
            <Select
              value={aspecto}
              onChange={handleAspectoChange}
              className="timeline-liquido-amniotico__select-input"
            >
              <MenuItem value="claro">Claro</MenuItem>
              <MenuItem value="hemoamnio">Hemoâmnio</MenuItem>
              <MenuItem value="meconio1">Meconial +1/+4</MenuItem>
              <MenuItem value="meconio2">Meconial +2/+4</MenuItem>
              <MenuItem value="meconio3">Meconial +3/+4</MenuItem>
              <MenuItem value="meconio4">Meconial +4/+4</MenuItem>
            </Select>
          </div>
          <div className="timeline-liquido-amniotico__buttons-container">
            <button
              onClick={handleStop}
              className="timeline-liquido-amniotico__stop-button"
            >
              Parar
            </button>
            <button
              onClick={handleStart}
              className="timeline-liquido-amniotico__start-button"
            >
              Iniciar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TimelineLiquidoAmniotico;
