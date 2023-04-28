import { useState, SyntheticEvent } from "react";
import { Modal, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";

import "../Pacientes/modais.css";
import { TabPanel } from "./PartogramaModalTabs/utils";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

interface TabTitleProps {
  title: string;
}

function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography className="partograma-modal__tab-title">{title}</Typography>
  );
}

const PartogramaPlacentaTime = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const [index, setIndex] = useState(0);
  const [placentaDateTime, setPlacentaDateTime] = useState<number | null>(
    Date.now()
  );

  const handlePlacentaDateTimeChange = (newValue: Dayjs | null) => {
    if (newValue !== null) {
      setPlacentaDateTime(newValue.valueOf());
    }
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="tab-dilatacao__notes-input-label">
          Data e Hora da Placenta
        </span>

        <Tabs
          aria-label="partograma tabs"
          style={{ marginBottom: "16px" }}
          value={index}
          onChange={handleTabChange}
        >
          <Tab label={<TabTitle title="1° Gemelar" />} id="tab-one" />
          <Tab label={<TabTitle title="2° Gemelar" />} id="tab-two" />
        </Tabs>

        <TabPanel value={index} index={0}>
          <div style={{ marginTop: "8px" }}>
            <DateTimePicker
              value={placentaDateTime}
              onChange={handlePlacentaDateTimeChange}
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
          <textarea className="paciente-add-modal__notes-input-textarea" />
          <button
            className="paciente-add-modal__button-submit"
            onClick={handleCloseModal}
          >
            Salvar
          </button>
        </TabPanel>

        <TabPanel value={index} index={1}>
          <div style={{ marginTop: "8px" }}>
            <DateTimePicker
              value={placentaDateTime}
              onChange={handlePlacentaDateTimeChange}
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
          <textarea className="paciente-add-modal__notes-input-textarea" />
          <button
            className="paciente-add-modal__button-submit"
            onClick={handleCloseModal}
          >
            Salvar
          </button>
        </TabPanel>
      </div>
    </Modal>
  );
};

export default PartogramaPlacentaTime;
