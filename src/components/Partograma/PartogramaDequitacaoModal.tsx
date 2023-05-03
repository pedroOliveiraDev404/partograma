import { useState, SyntheticEvent, useEffect } from "react";
import { Modal, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { formatDatetimeAxis } from "../../utils/formatting";
import { addPosition } from "../../store/modules/partogramaChart/actions";
import { TabPanel } from "./PartogramaModalTabs/utils";
import "../Pacientes/modais.css";
import { addDischargeTime } from "../../store/modules/header/actions";

interface TabTitleProps {
  title: string;
}

function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography className="partograma-modal__tab-title">{title}</Typography>
  );
}

interface PartogramaDequitacaoModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}
const PartogramaDequitacaoModal = ({
  isModalOpen,
  handleCloseModal,
}: PartogramaDequitacaoModalProps) => {
  const dispatch = useDispatch();

  const { positionData, placenta } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [dequitacaoDateTime, setDequitacaoDateTime] = useState<number | null>(
    Date.now()
  );
  const [errorForm, setErrorForm] = useState(false);
  const [time, setTime] = useState("");
  const [index, setIndex] = useState(0);
  const [firstBaby, setFirstBaby] = useState(false);

  const handleDequitacaoDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setDequitacaoDateTime(newValue.valueOf());
    }
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    if (firstBaby) {
      setIndex(newValue);
    }
  };

  const onSubmit = () => {
    const textArea: any = document.getElementById("textarea-dequitacao");
    if (index) {
      const find = positionData.find((item) => item?.dischargeTwo);
      const aux = positionData.map((item) => {
        if (
          find &&
          find?.dischargeTwo &&
          item.timeLegend === find?.timeLegend
        ) {
          return {
            ...item,
            dischargeTwo: null,
            dischargeTwoObservation: null,
          };
        }
        if (item.timeLegend === time) {
          return {
            ...item,
            dischargeTwo: 2.5,
            dischargeTwoObservation: textArea?.value,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
      dispatch(
        addDischargeTime({
          dischargeTime: dequitacaoDateTime,
          observation: textArea.value,
          index: 1,
        })
      );
    } else {
      const find = positionData.find((item) => item?.dischargeOne);
      const aux = positionData.map((item) => {
        if (
          find &&
          find?.dischargeOne &&
          item.timeLegend === find?.timeLegend
        ) {
          return {
            ...item,
            dischargeOne: null,
            dischargeOneObservation: null,
          };
        }
        if (item.timeLegend === time) {
          return {
            ...item,
            dischargeOne: 2.5,
            dischargeOneObservation: textArea?.value,
          };
        } else {
          return item;
        }
      });
      setFirstBaby(true);
      dispatch(addPosition(aux));
      dispatch(
        addDischargeTime({
          dischargeTime: dequitacaoDateTime,
          observation: textArea.value,
          index: 0,
        })
      );
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (firstBaby) {
      setIndex(1);
    }
  }, [firstBaby]);

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div className="timeline-liquido-amniotico__modal-container">
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span className="timeline-liquido-amniotico__modal-title">
          Dequitação
        </span>

        {placenta === "Diamniótica" && (
          <Tabs
            aria-label="partograma tabs"
            style={{ marginBottom: "16px" }}
            value={index}
            onChange={handleTabChange}
          >
            <Tab label={<TabTitle title="1° Gemelar" />} id="tab-ruptura" />
            <Tab
              label={<TabTitle title="2° Gemelar" />}
              id="tab-dilatacao"
              style={{ cursor: !firstBaby ? "not-allowed" : "pointer" }}
            />
          </Tabs>
        )}

        <TabPanel value={index} index={0}>
          <div style={{ marginTop: "8px" }}>
            <DateTimePicker
              value={dequitacaoDateTime}
              onChange={handleDequitacaoDateTimeChange}
              renderInput={(params: any) => <TextField {...params} />}
              className={`timeline-liquido-amniotico__datetime-input${
                errorForm ? "-error" : ""
              }`}
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
            id="textarea-dequitacao"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={onSubmit}
          >
            Salvar
          </button>
        </TabPanel>

        <TabPanel value={index} index={1}>
          <div style={{ marginTop: "8px" }}>
            <DateTimePicker
              value={dequitacaoDateTime}
              onChange={handleDequitacaoDateTimeChange}
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
            id="textarea-dequitacao"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={onSubmit}
          >
            Salvar
          </button>
        </TabPanel>
      </div>
    </Modal>
  );
};

export default PartogramaDequitacaoModal;
