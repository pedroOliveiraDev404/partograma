import { useState, SyntheticEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, TextField, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Select from "@mui/material/Select";

import { TabPanel } from "./PartogramaModalTabs/utils";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import {
  addPosition,
  selectBirth,
  selectFirstBabyBirth,
} from "../../store/modules/partogramaChart/actions";

import { formatDatetimeAxis } from "../../utils/formatting";
import "../Pacientes/modais.css";
import { ObjData } from "../../store/modules/partogramaChart/types";
import {
  addBirthTime,
  addDeliveryTime,
} from "../../store/modules/header/actions";

interface PacienteAddModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  typePregnancy: string;
}

interface TabTitleProps {
  title: string;
}

function TabTitle({ title }: TabTitleProps) {
  return (
    <Typography className="partograma-modal__tab-title">{title}</Typography>
  );
}

const PartogramaDeliveryTime = ({
  isModalOpen,
  handleCloseModal,
  typePregnancy,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();

  const { positionData, birth } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [deliveryDateTime, setDeliveryDateTime] = useState<number | null>(
    Date.now()
  );
  const [typeOfDelivery, setTypeOfDelivery] = useState(
    "Parto Vaginal Não Obrigatório"
  );
  const [index, setIndex] = useState(0);
  const [firstBaby, setFirstBaby] = useState(false);
  const [errorForm, setErrorForm] = useState(false);

  const [time, setTime] = useState("");

  const handleDeliveryDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setDeliveryDateTime(newValue.valueOf());
    }
  };

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    if (firstBaby) {
      setIndex(newValue);
    }
  };

  const onSubmit = async () => {
    let newData: any[] = [];
    if (index) {
      const aux = await positionData.find((item) => item.timeLegend === time);
      const find = await positionData.find((item) => item.birthIconTwo);
      newData = await positionData.map((item) => {
        if (aux && item.position === aux.position) {
          return {
            ...item,
            birthIconTwo: 0.25,
          };
        } else if (find?.position === item.position) {
          return {
            ...item,
            birthIconTwo: null,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(newData));
    } else {
      const aux = await positionData.find((item) => item.timeLegend === time);
      const find = await positionData.find((item) => item.birthIconOne);
      newData = await positionData.map((item) => {
        if (aux && item.position === aux.position) {
          return {
            ...item,
            birthIconOne: 0.25,
          };
        } else if (find?.position === item.position) {
          return {
            ...item,
            birthIconOne: null,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(newData));
    }
    if (!birth) {
      if (typePregnancy !== "Múltipla" || firstBaby) {
        const aux = await positionData.find((item) => item.timeLegend === time);

        if (aux) {
          dispatch(selectBirth(aux));
          const textArea: any = document.getElementById(
            "textarea-delivery-one"
          );

          dispatch(
            addBirthTime({
              birthTime: aux.time,
              birthType: typeOfDelivery,
              observation: textArea.value,
              index: 0,
            })
          );
          handleCloseModal();
        } else {
          setErrorForm(true);
        }
      } else {
        handleCloseModal();
        setFirstBaby(true);
      }
    } else {
      if (typePregnancy !== "Múltipla") {
        const find = newData.find((item) => item.birthIconOne);
        if (find) {
          dispatch(selectBirth(find));
          const textArea: any = document.getElementById(
            "textarea-delivery-one"
          );

          dispatch(
            addBirthTime({
              birthTime: find.time,
              birthType: typeOfDelivery,
              observation: textArea.value,
              index: 0,
            })
          );
        }
      } else {
        const dataReverse: ObjData[] = newData?.reduceRight(function (
          previous,
          current
        ) {
          previous.push(current);
          return previous;
        },
        []);

        const find = dataReverse.find(
          (item) => item.birthIconOne || item.birthIconTwo
        );
        if (find) {
          dispatch(selectBirth(find));
          const textArea: any = document.getElementById(
            "textarea-delivery-two"
          );
          dispatch(
            addBirthTime({
              birthTime: find.time,
              birthType: typeOfDelivery,
              observation: textArea?.value,
              index: 1,
            })
          );
        }
      }
      handleCloseModal();
    }
    setFirstBaby(true);
    dispatch(selectFirstBabyBirth(true));
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
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginBottom: "48px", fontSize: "18px" }}
        >
          Nascimento
        </span>
        <span className="tab-dilatacao__notes-input-label">
          Data e Hora do Parto
        </span>
        {typePregnancy === "Múltipla" && (
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
              value={deliveryDateTime}
              onChange={handleDeliveryDateTimeChange}
              renderInput={(params: any) => <TextField {...params} />}
              className={`timeline-liquido-amniotico__datetime-input${
                errorForm ? "-error" : ""
              }`}
            />
          </div>
          <span className="tab-dilatacao__notes-input-label">
            Tipo de Parto
          </span>

          <Select
            className="tab-dilatacao__dilatacao-input-select"
            value={typeOfDelivery}
            style={{ width: "100%", marginTop: "8px", marginBottom: "16px" }}
            onChange={(e: any) => setTypeOfDelivery(e.target.value)}
          >
            <MenuItem value="Parto Vaginal Não Obrigatório">
              Parto Vaginal Não Operatório
            </MenuItem>
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
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            id="textarea-delivery-one"
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
              value={deliveryDateTime}
              onChange={handleDeliveryDateTimeChange}
              renderInput={(params: any) => <TextField {...params} />}
              className="timeline-liquido-amniotico__datetime-input"
            />
          </div>
          <span className="tab-dilatacao__notes-input-label">
            Tipo de Parto
          </span>

          <Select
            className="tab-dilatacao__dilatacao-input-select"
            value={typeOfDelivery}
            style={{ width: "100%", marginTop: "8px" }}
            onChange={(e: any) => setTypeOfDelivery(e.target.value)}
          >
            <MenuItem value="Parto Vaginal Não Obrigatório">
              Parto Vaginal Não Obrigatório
            </MenuItem>
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
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            id="textarea-delivery-two"
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

export default PartogramaDeliveryTime;
