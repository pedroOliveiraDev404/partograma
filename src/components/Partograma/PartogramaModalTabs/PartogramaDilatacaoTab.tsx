import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { TabPanel } from "./utils";
import { ReactComponent as IconeGraficoDilatacao } from "../../../assets/IconeGraficoDilatacao.svg";
import { ReactComponent as IconeTrash } from "../../../assets/Icone_Trash.svg";
import { formatDatetimeAxis } from "../../../utils/formatting";
import { addPosition } from "../../../store/modules/partogramaChart/actions";

import "./PartogramaDilatacaoTab.css";
import PartogramaConfirmDelete from "../PartogramaConfirmDelete";

interface PartogramaDilatacaoTabProps {
  selectedTabIndex: number;
  handleCloseModal: () => void;
}

const PartogramaDilatacaoTab = ({
  selectedTabIndex,
  handleCloseModal,
}: PartogramaDilatacaoTabProps) => {
  const dispatch = useDispatch();
  const { positionData, editDilatation } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  const [time, setTime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [dilatacaoDateTime, setDilatacaoDateTime] = useState<
    number | null | string | Date
  >(Date.now());

  const [dilatacao, setDilatacao] = useState<number>(0);
  const [fading, setFading] = useState<string>("0%");
  const [consistency, setConsistency] = useState<string>("Firme");
  const [positionDilatation, setPositionDilatation] =
    useState<string>("Posterior");
  const handleDilatacaoChange = (event: SelectChangeEvent<number>) => {
    setDilatacao(Number(event.target.value));
  };

  const handleFadingChange = (event: SelectChangeEvent<string>) => {
    setFading(event.target.value);
  };

  const handleConsistencyChange = (event: SelectChangeEvent<string>) => {
    setConsistency(event.target.value);
  };

  const handlePositionChange = (event: SelectChangeEvent<string>) => {
    setPositionDilatation(event.target.value);
  };

  const handleDilatationDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setDilatacaoDateTime(newValue.valueOf());
    }
  };

  const onSubmit = () => {
    const textArea: any = document.querySelector("textarea");

    const newDataChart = positionData.map((item, index: number) => {
      if (item.timeLegend === time) {
        return {
          ...item,
          dilatacao,
          fading,
          consistency,
          positionDilatation,
          observation: textArea.value,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    dispatch(addPosition(newDataChart));
    handleCloseModal();
  };

  const onDelete = () => {
    const newDataChart = positionData.map((item, index: number) => {
      if (editDilatation && item.position === editDilatation?.position) {
        return {
          ...item,
          dilatacao: null,
          fading: null,
          consistency: null,
          positionDilatation: null,
          observation: null,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    dispatch(addPosition(newDataChart));
    handleCloseModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById(
      "textarea-fetalMonitoringOne"
    );
    if (editDilatation && editDilatation.timeLegend === time) {
      const aux = await positionData.map((item) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            dilatacao,
            observation: textArea?.value,
            fading,
            consistency,
            positionDilatation,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
    } else {
      const aux = await positionData.map((item) => {
        if (editDilatation && item.timeLegend === editDilatation.timeLegend) {
          return {
            ...item,
            dilatacao: null,
            observation: null,
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            dilatacao,
            observation: textArea?.value,
            fading,
            consistency,
            positionDilatation,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(aux));
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (
      editDilatation &&
      editDilatation.dilatacao &&
      editDilatation.consistency &&
      editDilatation.positionDilatation &&
      editDilatation.fading
    ) {
      setDilatacaoDateTime(editDilatation.time);
      setDilatacao(editDilatation.dilatacao);
      setTime(editDilatation.timeLegend);
      setConsistency(editDilatation.consistency);
      setPositionDilatation(editDilatation.positionDilatation);
      setFading(editDilatation.fading);
    }
  }, [editDilatation]);

  return (
    <TabPanel value={selectedTabIndex} index={1}>
      <div className="tab-dilatacao__container">
        <h6 className="partograma-modal__tab-title">Dilatação</h6>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DateTimePicker
            value={dilatacaoDateTime}
            onChange={handleDilatationDateTimeChange}
            renderInput={(params) => <TextField {...params} />}
            className="tab-dilatacao__datetime-input"
          />
          {editDilatation && (
            <div
              style={{
                marginTop: "-6px",
              }}
            >
              <IconeTrash onClick={() => setIsModalOpen(true)}/>
            </div>
          )}
        </div>

        <div className="tab-dilatacao__dilatacao-input-group">
          <IconeGraficoDilatacao />
          <span className="tab-dilatacao__dilatacao-input-label">
            Cervicodilatação
          </span>
          <Select
            value={dilatacao}
            onChange={handleDilatacaoChange}
            className="tab-dilatacao__dilatacao-input-select"
          >
            <MenuItem value={0}>0</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </div>
        <div
          className="tab-dilatacao__dilatacao-input-group"
          style={{ marginLeft: "20px" }}
        >
          <span className="tab-dilatacao__dilatacao-input-label">
            Esvaecimento
          </span>
          <Select
            value={fading}
            onChange={handleFadingChange}
            className="tab-dilatacao__dilatacao-input-select"
            style={{ marginLeft: "21px" }}
          >
            <MenuItem value="0%">0%</MenuItem>
            <MenuItem value="10%">10%</MenuItem>
            <MenuItem value="20%">20%</MenuItem>
            <MenuItem value="30%">30%</MenuItem>
            <MenuItem value="40%">40%</MenuItem>
            <MenuItem value="50%">50%</MenuItem>
            <MenuItem value="60%">60%</MenuItem>
            <MenuItem value="70%">70%</MenuItem>
            <MenuItem value="80%">80%</MenuItem>
            <MenuItem value="90%">90%</MenuItem>
            <MenuItem value="100%">100%</MenuItem>
          </Select>
        </div>
        <div
          className="tab-dilatacao__dilatacao-input-group"
          style={{ marginLeft: "20px" }}
        >
          <span className="tab-dilatacao__dilatacao-input-label">
            Consistência
          </span>
          <Select
            style={{ marginLeft: "29px" }}
            value={consistency}
            onChange={handleConsistencyChange}
            className="tab-dilatacao__dilatacao-input-select"
          >
            <MenuItem value="Firme">Firme</MenuItem>
            <MenuItem value="Médio">Médio</MenuItem>
            <MenuItem value="Amolecido">Amolecido</MenuItem>
          </Select>
        </div>
        <div
          className="tab-dilatacao__dilatacao-input-group"
          style={{ marginLeft: "20px" }}
        >
          <span className="tab-dilatacao__dilatacao-input-label">Posição</span>
          <Select
            value={positionDilatation}
            onChange={handlePositionChange}
            className="tab-dilatacao__dilatacao-input-select"
            style={{ marginLeft: "61px" }}
          >
            <MenuItem value="Posterior">Posterior</MenuItem>
            <MenuItem value="Médio">Médio</MenuItem>
            <MenuItem value="Anterior">Anterior</MenuItem>
          </Select>
        </div>

        <div className="tab-dilatacao__notes-input-group">
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea className="tab-dilatacao__notes-input-textarea" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={editDilatation ? editSubmit : onSubmit}
            className="tab-dilatacao__save-button"
            style={{ cursor: "pointer" }}
          >
            {editDilatation ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
      <PartogramaConfirmDelete
        isModalOpen={isModalOpen}
        handleCloseModal={() => setIsModalOpen(false)}
        handleSubmit={onDelete}
      />
    </TabPanel>
  );
};

export default PartogramaDilatacaoTab;
