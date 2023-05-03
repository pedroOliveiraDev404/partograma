import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import ListItemText from "@mui/material/ListItemText";

import { optionsPosition, optionsPositionGemelar } from "./mock";
import { addPosition } from "../../../store/modules/partogramaChart/actions";
import { formatDatetimeAxis, valuePosition } from "../../../utils/formatting";
import { TabPanel } from "./utils";
import { ReactComponent as IconeTrash } from "../../../assets/Icone_Trash.svg";
import "./PartogramaDilatacaoTab.css";
import PartogramaConfirmDelete from "../PartogramaConfirmDelete";

interface PartogramaDilatacaoTabProps {
  selectedTabIndex: number;
  handleCloseModal: () => void;
}

const PartogramaPositionTab = ({
  selectedTabIndex,
  handleCloseModal,
}: PartogramaDilatacaoTabProps) => {
  const dispatch = useDispatch();
  const { positionData, firstBabyBirth, editPosition } = useSelector(
    (state: Store.State) => state.partogramaChart.data
  );
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [toggleFirstBaby, setToggleFirstBaby] = useState(firstBabyBirth);
  const [height, setHeight] = useState(0);
  const [optionsVarietyArray, setOptionsVarietyArray] = useState<
    {
      value: string;
      label: string;
      icon?: JSX.Element;
      options: { value: string; label: string; icon?: JSX.Element }[];
    }[]
  >([]);
  const [time, setTime] = useState("");

  const [positionDateTime, setPositionDateTime] = useState<
    number | null | string | Date
  >(Date.now());
  const [apresentation, setApresentation] = useState("Vértice ou occipital");
  const [variety, setVariety] = useState("");

  const handleApresentationChange = (event: SelectChangeEvent<string>) => {
    setApresentation(event.target.value);
    const filter = toggleFirstBaby
      ? optionsPositionGemelar.filter(
          (item: {
            value: string;
            label: string;
            icon: any;
            options: { value: string; label: string }[];
          }) => item.value === event.target.value
        )
      : optionsPosition.filter(
          (item: {
            value: string;
            label: string;
            icon: any;
            options: { value: string; label: string }[];
          }) => item.value === event.target.value
        );
    setOptionsVarietyArray(filter[0].options as any);
  };

  useEffect(() => {
    const filter = toggleFirstBaby
      ? optionsPositionGemelar.filter(
          (item: {
            value: string;
            label: string;
            icon: any;
            options: { value: string; label: string }[];
          }) => item.value === apresentation
        )
      : optionsPosition.filter(
          (item: {
            value: string;
            label: string;
            icon: any;
            options: { value: string; label: string }[];
          }) => item.value === apresentation
        );
    setOptionsVarietyArray(filter[0].options as any);
  }, [apresentation, toggleFirstBaby]);
  const handleVarietyChange = (event: SelectChangeEvent<string>) => {
    setVariety(event.target.value);
  };

  const handleHeightChange = (event: SelectChangeEvent<number>) => {
    setHeight(event.target.value as number);
  };

  const handlePositionDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setPositionDateTime(newValue.valueOf());
    }
  };

  const onSubmit = () => {
    const textArea: any = document.querySelector("textarea");
    const varietyIcon = optionsVarietyArray.find(
      (item) => item.value === variety
    );
    let newDataChart = [];
    if (toggleFirstBaby) {
      newDataChart = positionData.map((item, index: number) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            index: 1,
            posicao: height,
            valuePositionTwo: valuePosition(height),
            observation: textArea.value,
            icon: varietyIcon?.icon,
            apresentation,
            variety,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(newDataChart));
    } else {
      newDataChart = positionData.map((item, index: number) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            index: 1,
            posicao: height,
            valuePosition: valuePosition(height),
            observation: textArea.value,
            icon: varietyIcon?.icon,
            apresentation,
            variety,
          };
        } else {
          return item;
        }
      });
      dispatch(addPosition(newDataChart));
    }

    handleCloseModal();
  };

  useEffect(() => {
    if (
      editPosition &&
      editPosition.apresentation &&
      editPosition.variety &&
      editPosition.posicao
    ) {
      setToggleFirstBaby(editPosition.valuePositionTwo ? true : false);
      setPositionDateTime(editPosition.time);
      setApresentation(editPosition.apresentation);
      setVariety(editPosition.variety);
      setHeight(editPosition.posicao);
      setTime(editPosition.timeLegend);
    }
  }, [editPosition]);

  const editSubmit = async () => {
    const varietyIcon = optionsVarietyArray.find(
      (item) => item.value === variety
    );

    if (toggleFirstBaby) {
      const textArea: any = document.getElementById(
        "textarea-fetalMonitoringTwo"
      );
      if (editPosition && editPosition.timeLegend === time) {
        const aux = await positionData.map((item) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              posicao: height,
              valuePositionTwo: valuePosition(height),
              observation: textArea?.value,
              icon: varietyIcon?.icon,
              apresentation,
              variety,
            };
          } else {
            return item;
          }
        });
        dispatch(addPosition(aux));
      } else {
        const aux = await positionData.map((item) => {
          if (editPosition && item.timeLegend === editPosition.timeLegend) {
            return {
              ...item,
              posicao: null,
              valuePositionTwo: null,
              observation: null,
              icon: null,
              apresentation: null,
              variety: null,
            };
          } else if (item.timeLegend === time) {
            return {
              ...item,
              posicao: height,
              valuePositionTwo: valuePosition(height),
              observation: textArea?.value,
              icon: varietyIcon?.icon,
              apresentation,
              variety,
            };
          } else {
            return item;
          }
        });
        dispatch(addPosition(aux));
      }
    } else {
      const textArea: any = document.getElementById(
        "textarea-fetalMonitoringOne"
      );
      if (editPosition && editPosition.timeLegend === time) {
        const aux = await positionData.map((item) => {
          if (item.timeLegend === time) {
            return {
              ...item,
              posicao: height,
              valuePosition: valuePosition(height),
              observation: textArea?.value,
              icon: varietyIcon?.icon,
              apresentation,
              variety,
            };
          } else {
            return item;
          }
        });
        dispatch(addPosition(aux));
      } else {
        const aux = await positionData.map((item) => {
          if (editPosition && item.timeLegend === editPosition.timeLegend) {
            return {
              ...item,
              posicao: null,
              valuePosition: null,
              observation: null,
              icon: null,
              apresentatio: null,
              variety: null,
            };
          } else if (item.timeLegend === time) {
            return {
              ...item,
              posicao: height,
              valuePosition: valuePosition(height),
              observation: textArea?.value,
              icon: varietyIcon?.icon,
              apresentation,
              variety,
            };
          } else {
            return item;
          }
        });
        dispatch(addPosition(aux));
      }
    }

    handleCloseModal();
  };

  const onDelete = () => {
    const newDataChart = positionData.map((item: any, index: number) => {
      if (editPosition && item.position === editPosition?.position) {
        return {
          ...item,
          posicao: undefined,
          valuePosition: undefined,
          valuePositionTwo: undefined,
          observation: undefined,
          icon: undefined,
          apresentatio: undefined,
          variety: undefined,
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

  return (
    <TabPanel value={selectedTabIndex} index={2}>
      <div className="tab-dilatacao__container">
        <h6 className="partograma-modal__tab-title">Posição fetal</h6>
        <div className="partograma-page__date-picker-line">
          <DateTimePicker
            value={positionDateTime}
            onChange={handlePositionDateTimeChange}
            renderInput={(params: any) => <TextField {...params} />}
            className="timeline-liquido-amniotico__datetime-input"
          />
          {editPosition && (
            <div className="partograma-page__trash-icon">
              <IconeTrash onClick={() => setIsModalDeleteOpen(true)} />
            </div>
          )}
        </div>
        <span className="partograma-page__label-select">
          Aprensetação fetal
        </span>
        {toggleFirstBaby ? (
          <Select
            value={apresentation}
            onChange={handleApresentationChange}
            className="tab-dilatacao__dilatacao-input-select"
            style={{ width: "100%" }}
          >
            {optionsPositionGemelar.map(
              (option: { value: string; label: string; icon: any }) => (
                <MenuItem value={option.value} id={option.value}>
                  {option.icon}
                  <ListItemText
                    primary={option.label}
                    style={{ marginLeft: "16px" }}
                  />
                </MenuItem>
              )
            )}
          </Select>
        ) : (
          <Select
            value={apresentation}
            onChange={handleApresentationChange}
            className="tab-dilatacao__dilatacao-input-select"
            style={{ width: "100%" }}
          >
            {optionsPosition.map(
              (option: { value: string; label: string; icon: any }) => (
                <MenuItem value={option.value} id={option.value}>
                  {option.icon}
                  <ListItemText
                    primary={option.label}
                    style={{ marginLeft: "16px" }}
                  />
                </MenuItem>
              )
            )}
          </Select>
        )}

        <span className="partograma-page__label-select">
          Variedade de posição fetal
        </span>
        <Select
          MenuProps={{ classes: { root: "position-select" } }}
          value={variety}
          onChange={handleVarietyChange}
          className="tab-dilatacao__dilatacao-input-select"
          style={{ width: "100%" }}
        >
          {optionsVarietyArray?.map(
            (option: { value: string; label: string; icon?: any }) => (
              <MenuItem value={option.value} id={option.value}>
                {option?.icon}
                <ListItemText
                  primary={option.label}
                  style={{ marginLeft: "16px" }}
                />
              </MenuItem>
            )
          )}
        </Select>
        <span className="partograma-page__label-select">
          Altura da apresentação fetal
        </span>
        <Select
          value={height}
          style={{ width: "100%", display: "flex" }}
          onChange={handleHeightChange}
          className="tab-dilatacao__dilatacao-input-select"
          defaultValue={0}
        >
          <MenuItem value={5}>+5</MenuItem>
          <MenuItem value={4}>+4</MenuItem>
          <MenuItem value={3}>+3</MenuItem>
          <MenuItem value={2}>+2</MenuItem>
          <MenuItem value={1}>+1</MenuItem>
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={-1}>-1</MenuItem>
          <MenuItem value={-2}>-2</MenuItem>
          <MenuItem value={-3}>-3</MenuItem>
          <MenuItem value={-4}>-4</MenuItem>
          <MenuItem value={-5}>-5</MenuItem>
        </Select>

        <div
          className="tab-dilatacao__notes-input-group"
          style={{ marginTop: "16px" }}
        >
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea className="tab-dilatacao__notes-input-textarea" />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="tab-dilatacao__save-button"
            onClick={editPosition ? editSubmit : onSubmit}
            style={{ cursor: "pointer" }}
          >
            {editPosition ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
      <PartogramaConfirmDelete
        isModalOpen={isModalDeleteOpen}
        handleCloseModal={() => setIsModalDeleteOpen(false)}
        handleSubmit={onDelete}
      />
    </TabPanel>
  );
};

export default PartogramaPositionTab;
