import { useState, SyntheticEvent } from "react";
import { Modal } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";

import "../TimelineLiquidoAmniotico.css";

import TimelineCompanyChart from "../TimelineCompanyChart";
import AbaFetalMonitoring from "./AbaFetalMonitoring";
import AbaBeats from "./AbaBeats";

interface TabTitleProps {
  title: string;
}

function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography className="partograma-modal__tab-title">{title}</Typography>
  );
}

const TimelineFetalMonitoring = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [index, setIndex] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };

  return (
    <div
      className="timeline-liquido-amniotico__container"
      style={{ marginTop: "-8px" }}
    >
      <div
        className="timeline-liquido-amniotico__label-container"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">
          Monitoramento Fetal
        </span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineCompanyChart onEdit={console.log} />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        disableAutoFocus
        disableRestoreFocus
        disableEnforceFocus
      >
        <div
          className="timeline-liquido-amniotico__modal-container"
          style={{ width: "700px" }}
        >
          <IconeClose
            className="paciente-add-modal__icone-close"
            onClick={handleCloseModal}
          />
          <span className="timeline-liquido-amniotico__modal-title">
          Monitoramento Cardíaco
          </span>
          <div
            style={{
              width: "545px",
              transform: "translate(59px, 0px)",
            }}
          >
            <Tabs
              aria-label="partograma tabs"
              style={{ marginBottom: "16px", width: "99.25%" }}
              value={index}
              onChange={handleTabChange}
            >
              <Tab
                label={<TabTitle title="Frequência Cardíaca Fetal" />}
                id="tab-monitoring"
              />
              <Tab
                label={<TabTitle title="Gráfico de batimentos" />}
                id="tab-beats"
              />
            </Tabs>
            <AbaFetalMonitoring index={index} />
            <AbaBeats index={index} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TimelineFetalMonitoring;
