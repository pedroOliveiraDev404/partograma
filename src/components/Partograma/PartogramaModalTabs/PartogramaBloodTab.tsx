import React, { useState, SyntheticEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { TabPanel } from "./utils";
import { DadosPartograma } from "../../../types/partograma";

import "./PartogramaDilatacaoTab.css";
import { addPosition } from "../../../store/modules/partogramaChart/actions";
import { formatDatetimeAxis } from "../../../utils/formatting";

interface PartogramaDilatacaoTabProps {
  selectedTabIndex: number;
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

const PartogramaBloodTab = ({
  selectedTabIndex,
  handleCloseModal,
}: PartogramaDilatacaoTabProps) => {
  const dispatch = useDispatch();
  const { typePregnancy, positionData } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [index, setIndex] = useState(0);

  const [time, setTime] = useState("");
  const [bloodDateTime, setBloodDateTime] = useState<number | null>(Date.now());

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setIndex(newValue);
  };

  const handleBloodDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setBloodDateTime(newValue.valueOf());
    }
  };

  const onSubmit = () => {
    const textAreaPh: any = document.getElementById("textarea-ph");
    const textAreaObservation: any = document.getElementById("textarea-blood");
    if (index) {
      const aux = positionData.map((item) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            bloodTwo: 2.5,
            bloodTwoObservation: textAreaObservation?.value,
            bloodTwoPh: textAreaPh?.value,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
    } else {
      const aux = positionData.map((item) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            bloodOne: 2.5,
            bloodOneObservation: textAreaObservation?.value,
            bloodOnePh: textAreaPh?.value,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
    }

    handleCloseModal();
  };

  return (
    <TabPanel value={selectedTabIndex} index={3}>
      <div className="tab-dilatacao__container">
        <h6 className="partograma-modal__tab-title">Amostra do Sangue Fetal</h6>
        {typePregnancy === "Múltipla" && (
          <Tabs
            aria-label="partograma tabs"
            style={{ marginBottom: "16px", width: "50%" }}
            value={index}
            onChange={handleTabChange}
          >
            <Tab label={<TabTitle title="1° Gemelar" />} id="tab-ruptura" />
            <Tab label={<TabTitle title="2° Gemelar" />} id="tab-dilatacao" />
          </Tabs>
        )}
        <TabPanel value={index} index={0}>
          <div style={{ marginTop: "8px" }}>
            <DateTimePicker
              value={bloodDateTime}
              onChange={handleBloodDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="tab-dilatacao__datetime-input"
            />
          </div>
          <div className="tab-blood__input-ph">
            <span className="tab-dilatacao__notes-input-label">pH</span>
            <input
              className={`paciente-add-modal__input-textarea`}
              maxLength={11}
              id="textarea-ph"
              type="number"
            />
          </div>

          <div
            className="tab-dilatacao__notes-input-group"
            style={{ marginTop: "16px" }}
          >
            <span className="tab-dilatacao__notes-input-label">
              Observações
            </span>
            <textarea
              id="textarea-blood"
              className="tab-dilatacao__notes-input-textarea"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onSubmit} className="tab-dilatacao__save-button" style={{cursor: 'pointer'}}>
              Salvar
            </button>
          </div>
        </TabPanel>
        <TabPanel value={index} index={1}>
          <div style={{ marginTop: "8px" }}>
            <DateTimePicker
              value={bloodDateTime}
              onChange={handleBloodDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="tab-dilatacao__datetime-input"
            />
          </div>
          <div className="tab-blood__input-ph">
            <span className="tab-dilatacao__notes-input-label">pH</span>
            <input
              className={`paciente-add-modal__input-textarea`}
              maxLength={11}
              id="textarea-ph"
              type="number"
            />
          </div>

          <div
            className="tab-dilatacao__notes-input-group"
            style={{ marginTop: "16px" }}
          >
            <span className="tab-dilatacao__notes-input-label">
              Observações
            </span>
            <textarea
              className="tab-dilatacao__notes-input-textarea"
              id="textarea-blood"
            />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onSubmit} className="tab-dilatacao__save-button" style={{cursor: 'pointer'}}>
              Salvar
            </button>
          </div>
        </TabPanel>
      </div>
    </TabPanel>
  );
};

export default PartogramaBloodTab;
