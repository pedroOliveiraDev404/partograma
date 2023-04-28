import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TabPanel } from "./utils";

import "./PartogramaDilatacaoTab.css";
import PartogramaMenuAmniotico from "../PartogramaMenuAmniotico";
import { formatDatetimeAxis } from "../../../utils/formatting";

import { addPosition } from "../../../store/modules/partogramaChart/actions";
import { addRupture } from "../../../store/modules/header/actions";

interface PartogramaDilatacaoTabProps {
  selectedTabIndex: number;
  index: number;
  handleCloseModal: () => void;
}

const PartogramaRuptureGemelar = ({
  selectedTabIndex,
  handleCloseModal,
  index,
}: PartogramaDilatacaoTabProps) => {
  const dispatch = useDispatch();
  const { positionData } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );

  const [ruptureDateTime, setRuptureDateTime] = useState<number | null>(
    Date.now()
  );
  const [timeOne, setTimeOne] = useState("");
  const [ruptureType, setRuptureType] = useState("Ruptura Espontânea");
  const [indicationOfAmniotomy, setIndicationOfAmniotomy] =
    useState("Aceleração");

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
            ruptureTypeOne: ruptureType,
          };
        } else if (item.ruptureOne) {
          return {
            ...item,
            ruptureOne: null,
            ruptureTypeOne: null,
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
            ruptureTypeTwo: ruptureType,
          };
        } else if (item.ruptureTwo) {
          return {
            ...item,
            ruptureTwo: null,
            ruptureTypeTwo: null,
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

  return (
    <TabPanel value={selectedTabIndex} index={index}>
      <span className="partograma-page__label-select">Momento da ruptura</span>
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
            <MenuItem value="Ruptura Espontânea">Ruptura Espontânea</MenuItem>
            <MenuItem value="Ruptura Artificial">Ruptura Artificial</MenuItem>
            <MenuItem value="Membranas Íntegras">Membranas Íntegras</MenuItem>
            <MenuItem value="Inderteminado">Inderteminado</MenuItem>
          </Select>
        </div>
        <div>
          <span className="partograma-page__label-select">
            Indicação da Amniotomia
          </span>
          <Select
            className="tab-dilatacao__dilatacao-input-select"
            onChange={(e: any) => setIndicationOfAmniotomy(e.target.value)}
            value={indicationOfAmniotomy}
          >
            <MenuItem value="Aceleração">Aceleração</MenuItem>
            <MenuItem value="Indução">Indução</MenuItem>
          </Select>
        </div>
      </div>
      <PartogramaMenuAmniotico
        onFinish={onSubmit}
        gemelar={selectedTabIndex}
      />
    </TabPanel>
  );
};

export default PartogramaRuptureGemelar;
