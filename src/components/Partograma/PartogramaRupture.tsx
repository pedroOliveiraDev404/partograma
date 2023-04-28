import { useState, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuItem, Modal, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ReactComponent as IconeClose } from "../../assets/IconeClose.svg";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PartogramaRuptureGemelar from "./PartogramaModalTabs/PartogramaRuptureGemelar";
import PartogramaMenuAmniotico from "./PartogramaMenuAmniotico";

import "../Pacientes/modais.css";
import { formatDatetimeAxis } from "../../utils/formatting";
import {
  addPosition,
  selectPlacenta,
} from "../../store/modules/partogramaChart/actions";
import { addRupture } from "../../store/modules/header/actions";

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

const PartogramaRupture = ({
  isModalOpen,
  handleCloseModal,
}: PacienteAddModalProps) => {
  const dispatch = useDispatch();
  const { positionData, typePregnancy, placenta } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [errorForm, setErrorForm] = useState(false);

  const [ruptureDateTime, setRuptureDateTime] = useState<number | null>(
    Date.now()
  );
  const [timeOne, setTimeOne] = useState("");

  const [ruptureType, setRuptureType] = useState("Ruptura Espontânea");
  const [indicationOfAmniotomy, setIndicationOfAmniotomy] =
    useState("Aceleração");

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setSelectedTabIndex(newValue);
  };

  const handleRuptureDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTimeOne(timeString);
      setRuptureDateTime(newValue.valueOf());
    }
  };

  const onSubmit = async (
    aspecto: string,
    volume: string,
    observation: string
  ) => {
    if (selectedTabIndex === 0) {
      const aux = await positionData.map((item) => {
        if (item.timeLegend === timeOne) {
          return {
            ...item,
            ruptureOne: 2.5,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
      dispatch(
        addRupture({
          dateTimeRupture: timeOne,
          ruptureMode: ruptureType,
          ruptureIndication: indicationOfAmniotomy,
          liquidVolume: volume,
          liquidAspect: aspecto,
          observation: observation,
          index: 0,
        })
      );
    } else {
      const aux = await positionData.map((item) => {
        if (item.timeLegend === timeOne) {
          return {
            ...item,
            ruptureTwo: 2.5,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
      dispatch(
        addRupture({
          dateTimeRupture: timeOne,
          ruptureMode: ruptureType,
          ruptureIndication: indicationOfAmniotomy,
          liquidVolume: volume,
          liquidAspect: aspecto,
          observation: observation,
          index: 1,
        })
      );
    }

    handleCloseModal();
  };

  const handlePlacenta = (e: any) => {
    dispatch(selectPlacenta(e.target.value));
  };

  return (
    <Modal open={isModalOpen} onClose={handleCloseModal}>
      <div
        className="timeline-liquido-amniotico__modal-container"
        style={{ width: "max-content" }}
      >
        <IconeClose
          className="paciente-add-modal__icone-close"
          onClick={handleCloseModal}
        />
        <span
          className="tab-dilatacao__notes-input-label"
          style={{ marginBottom: "24px" }}
        >
          Ruptura da bolsa
        </span>
        {typePregnancy === "Múltipla" && (
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Monoamniótica"
              control={<Radio />}
              onChange={handlePlacenta}
              label="Monoamniótica"
              checked={placenta === "Monoamniótica"}
            />
            <FormControlLabel
              value="Diamniótica"
              control={<Radio />}
              onChange={handlePlacenta}
              label="Diamniótica"
              checked={placenta === "Diamniótica"}
            />
          </RadioGroup>
        )}

        {placenta === "Diamniótica" && typePregnancy === "Múltipla" && (
          <Tabs
            aria-label="partograma tabs"
            style={{ marginBottom: "16px" }}
            value={selectedTabIndex}
            onChange={handleTabChange}
          >
            <Tab label={<TabTitle title="1° Gemelar" />} id="tab-ruptura" />
            <Tab label={<TabTitle title="2° Gemelar" />} id="tab-dilatacao" />
          </Tabs>
        )}
        {placenta === "Diamniótica" && typePregnancy === "Múltipla" ? (
          <>
            <PartogramaRuptureGemelar
              selectedTabIndex={selectedTabIndex}
              handleCloseModal={handleCloseModal}
              index={0}
            />
            <PartogramaRuptureGemelar
              selectedTabIndex={selectedTabIndex}
              handleCloseModal={handleCloseModal}
              index={1}
            />
          </>
        ) : (
          <>
            <span className="partograma-page__label-select">
              Momento da ruptura
            </span>
            <DateTimePicker
              value={ruptureDateTime}
              onChange={handleRuptureDateTimeChange}
              renderInput={(params) => <TextField {...params} />}
              className="tab-dilatacao__datetime-input"
            />

            <div className="tab-rupture__input-container">
              <div>
                <span className="partograma-page__label-select">
                  Status da ruptura da membrana
                </span>
                <Select
                  className="tab-dilatacao__dilatacao-input-select"
                  onChange={(e: any) => setRuptureType(e.target.value)}
                  value={ruptureType}
                >
                  <MenuItem value="Ruptura Espontânea">
                    Ruptura Espontânea
                  </MenuItem>
                  <MenuItem value="Ruptura Artificial">
                    Ruptura Artificial
                  </MenuItem>
                  <MenuItem value="Membranas Íntegras">
                    Membranas Íntegras
                  </MenuItem>
                  <MenuItem value="Inderteminado">Inderteminado</MenuItem>
                </Select>
              </div>
              <div>
                <span className="partograma-page__label-select">
                  Indicação da Amniotomia
                </span>
                <Select
                  className="tab-dilatacao__dilatacao-input-select"
                  onChange={(e: any) =>
                    setIndicationOfAmniotomy(e.target.value)
                  }
                  value={indicationOfAmniotomy}
                >
                  <MenuItem value="Aceleração">Aceleração</MenuItem>
                  <MenuItem value="Indução">Indução</MenuItem>
                </Select>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <PartogramaMenuAmniotico onFinish={onSubmit} gemelar={0} />
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PartogramaRupture;
