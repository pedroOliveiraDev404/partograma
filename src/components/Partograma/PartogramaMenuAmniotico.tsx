import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { formatDatetimeAxis } from "../../utils/formatting";
import {
  addAmniotic,
  addAmnioticGemelar,
} from "../../store/modules/amnioticFluid/actions";

import "./PartogramaTimelines/TimelineLiquidoAmniotico.css";

interface PartogramaMenu {
  onFinish: (
    aspecto: string,
    volume: string,
    observation: string
  ) => void;
  gemelar: number;
}

const PartogramaMenuAmniotico = ({
  gemelar,
  onFinish,
}: PartogramaMenu) => {
  const dispatch = useDispatch();
  const { amnioticData, amnioticGemelarData } = useSelector(
    (state: Store.State) => state.amnioticFluid.data
  );
  const [liquidoAmnioticoDateTime, setLiquidoAmnioticoDateTime] = useState<
    number | null
  >(Date.now());

  const handleLiquidoAmnioticoDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setLiquidoAmnioticoDateTime(newValue.valueOf());
    }
  };

  const [aspecto, setAspecto] = useState<string>("Claro");
  const [time, setTime] = useState<string>("Ausente");
  const [volume, setVolume] = useState<string>("Ausente");
  const handleAspectoChange = (event: SelectChangeEvent<string>) => {
    setAspecto(String(event.target.value));
  };

  const handleVolumeChange = (event: SelectChangeEvent<string>) => {
    setVolume(String(event.target.value));
  };

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-menuAmniotico");
    if (gemelar) {
      const find: any = amnioticGemelarData.find(
        (item: any) => item?.firstPoint
      );
      const aux = await amnioticGemelarData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            firstPoint: 0.5,
            observation: textArea?.value,
            aspecto,
            volume,
          };
        } else if (item.timeLegend === find?.timeLegend) {
          return {
            ...item,
            firstPoint: null,
            observation: null,
            aspecto: null,
            volume: null,
          };
        } else {
          return item;
        }
      });
      dispatch(addAmnioticGemelar(aux));
    } else {
      const find: any = amnioticData.find((item: any) => item?.firstPoint);
      const aux = await amnioticData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            firstPoint: 0.5,
            observation: textArea?.value,
            aspecto,
            volume,
          };
        } else if (item.timeLegend === find?.timeLegend) {
          return {
            ...item,
            firstPoint: null,
            observation: null,
            aspecto: null,
            volume: null,
          };
        } else {
          return item;
        }
      });
      dispatch(addAmniotic(aux));
    }
    onFinish(aspecto, volume, textArea.value);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <span className="timeline-liquido-amniotico__modal-title">
        Líquido Amniótico
      </span>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "24px" }}
      >
        <DateTimePicker
          value={liquidoAmnioticoDateTime}
          onChange={handleLiquidoAmnioticoDateTimeChange}
          renderInput={(params) => <TextField {...params} />}
          className="timeline-liquido-amniotico__datetime-input"
        />
      </div>
      <div className="timeline-liquido-amniotico__input-group">
        <span className="timeline-liquido-amniotico__input-label">
          Volume do Líquido
        </span>
        <Select
          value={volume}
          onChange={handleVolumeChange}
          className="timeline-liquido-amniotico__select-input"
        >
          <MenuItem value="Ausente">Ausente</MenuItem>
          <MenuItem value="Escasso">Escasso</MenuItem>
          <MenuItem value="Moderado">Moderado</MenuItem>
          <MenuItem value="Excessivo">Excessivo</MenuItem>
        </Select>
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
          <MenuItem value="Claro">Claro</MenuItem>
          <MenuItem value="Hemoamnio">Hemoâmnio</MenuItem>
          <MenuItem value="Meconio1">Meconial +1/+4</MenuItem>
          <MenuItem value="Meconio2">Meconial +2/+4</MenuItem>
          <MenuItem value="Meconio3">Meconial +3/+4</MenuItem>
          <MenuItem value="Meconio4">Meconial +4/+4</MenuItem>
        </Select>
      </div>
      <div
        className="tab-dilatacao__notes-input-group"
        style={{ marginTop: "16px" }}
      >
        <span className="tab-dilatacao__notes-input-label">Observações</span>
        <textarea
          className="tab-dilatacao__notes-input-textarea"
          id="textarea-menuAmniotico"
        />
      </div>
      <div className="timeline-liquido-amniotico__buttons-container">
        <button
          className="timeline-liquido-amniotico__start-button"
          style={{ width: "100%" }}
          onClick={onSubmit}
        >
          Iniciar
        </button>
      </div>
    </div>
  );
};

export default PartogramaMenuAmniotico;
