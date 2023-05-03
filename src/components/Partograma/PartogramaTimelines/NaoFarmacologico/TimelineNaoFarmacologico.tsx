import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ListItemText from "@mui/material/ListItemText";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";
import { ReactComponent as IconeCheck } from "../../../../assets/IconeCheck.svg";
import { ReactComponent as IconeTrash } from "../../../../assets/Icone_Trash.svg";

import TimelineChartNonPharmacological from "./TimelineNaoFarmacologicoChart";
import { formatDatetimeAxis } from "../../../../utils/formatting";
import { addNonPharmacological } from "../../../../store/modules/nonPharmacological/actions";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";

import "../TimelineLiquidoAmniotico.css";

const TimelineNaoFarmacologico = () => {
  const dispatch = useDispatch();

  const { nonPharmacologicalData } = useSelector(
    (state: Store.State) => state.nonPharmacological.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [time, setTime] = useState("");
  const [edit, setEdit] = useState<any>(null);
  const [optionPlus, setOptionPlus] = useState("");
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [options, setOptions] = useState([
    "Espaldar",
    "Hidroterapia",
    "Cromoterapia",
    "Massagem de conforto",
    "Acunputura",
  ]);

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

  const [nonPharmacologic, setNonPharmacologic] = useState<string[]>([]);
  const handleNonPharmacologicChange = (event: SelectChangeEvent<string[]>) => {
    setNonPharmacologic(event.target.value as string[]);
  };
  const [observation, setObservation] = useState("");
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const onSubmit = async () => {
    const textArea: any = document.getElementById(
      "textarea-nonPharmacological"
    );
    const aux = await nonPharmacologicalData.map((item: any) => {
      if (item.timeLegend === time) {
        return {
          ...item,
          point: 0.5,
          observation: textArea.value,
          nonPharmacologic: nonPharmacologic.filter((item) => item !== ""),
        };
      } else {
        return item;
      }
    });

    dispatch(addNonPharmacological(aux));
    handleCloseModal();
  };

  const onEdit = (e: any) => {
    setLiquidoAmnioticoDateTime(e.time);
    setNonPharmacologic(e.nonPharmacologic);
    setObservation(e.observation);
    setEdit(e);
    handleOpenModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById(
      "textarea-nonPharmacological"
    );
    if (edit.timeLegend === time) {
      const aux = await nonPharmacologicalData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
            nonPharmacologic: nonPharmacologic.filter((item) => item !== ""),
          };
        } else {
          return item;
        }
      });
      dispatch(addNonPharmacological(aux));
    } else {
      const aux = await nonPharmacologicalData.map((item: any) => {
        if (item.timeLegend === edit.timeLegend) {
          return {
            ...item,
            point: null,
            observation: "",
            nonPharmacologic: null,
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
            nonPharmacologic: nonPharmacologic.filter((item) => item !== ""),
          };
        } else {
          return item;
        }
      });
      dispatch(addNonPharmacological(aux));
    }
    setEdit(null);
    handleCloseModal();
  };

  const handleAddOption = () => {
    const textArea: any = document.getElementById("optionPlus");

    if (textArea.value !== "" && textArea.value !== null) {
      const newOptions = options;
      newOptions.push(textArea.value);
      setOptions(newOptions);
      setOptionPlus(textArea.value);
      textArea.value = "";
    }
  };

  useEffect(() => {
    if (optionPlus) {
      document.getElementById(optionPlus)?.click();
      setOptionPlus("");
    }
  }, [optionPlus]);

  const onDelete = () => {
    const newNonPharmacologicalData = nonPharmacologicalData.map(
      (item: any) => {
        if (item.timeLegend === edit.timeLegend) {
          return {
            ...item,
            point: undefined,
            observation: undefined,
            nonPharmacologic: undefined,
          };
        } else {
          return {
            ...item,
          };
        }
      }
    );
    dispatch(addNonPharmacological(newNonPharmacologicalData));
    setIsModalDeleteOpen(false);
    handleCloseModal();
  };

  const DatePicker = () => (
    <div className="partograma-page__date-picker-line">
      <DateTimePicker
        value={liquidoAmnioticoDateTime}
        onChange={handleLiquidoAmnioticoDateTimeChange}
        renderInput={(params) => <TextField {...params} />}
        className="timeline-liquido-amniotico__datetime-input"
      />
      {edit && (
        <div className="partograma-page__trash-icon">
          <IconeTrash onClick={() => setIsModalDeleteOpen(true)} />
        </div>
      )}
    </div>
  );

  return (
    <div className="timeline-liquido-amniotico__container">
      <div
        className="timeline-liquido-amniotico__label-container"
        onClick={() => {
          setNonPharmacologic([""]);
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">
          Não Farmacológico
        </span>
        <IconeTimelinePlusSign />
      </div>
      <TimelineChartNonPharmacological onEdit={onEdit} />
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        disableAutoFocus
        disableRestoreFocus
        disableEnforceFocus
      >
        <div className="timeline-liquido-amniotico__modal-container">
          <IconeClose
            className="paciente-add-modal__icone-close"
            onClick={handleCloseModal}
          />
          <span className="timeline-liquido-amniotico__modal-title">
            Não Farmacológico
          </span>
          <DatePicker />
          <div className="timeline-liquido-amniotico__input-group">
            <span className="timeline-liquido-amniotico__input-label">
              Analgesia - Não Farmacológico
            </span>
            <Select
              onChange={handleNonPharmacologicChange}
              multiple
              value={nonPharmacologic as string[]}
              defaultOpen
              renderValue={(selected) => selected.slice(1).join(", ")}
            >
              {options
                .filter(function (item, i) {
                  return options.indexOf(item) === i && item !== "";
                })
                .map((option) => (
                  <MenuItem value={option} id={option}>
                    <ListItemText primary={option} />
                    {nonPharmacologic.indexOf(option) > -1 && <IconeCheck />}
                  </MenuItem>
                ))}
              <MenuItem>
                <ListItemText>
                  <input
                    placeholder="Outros"
                    id="optionPlus"
                    style={{ border: "0px solid", marginRight: "6px" }}
                  ></input>
                  <IconeTimelinePlusSign
                    style={{ cursor: "pointer" }}
                    onClick={handleAddOption}
                  />
                </ListItemText>
              </MenuItem>
            </Select>
          </div>
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-nonPharmacological"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={edit ? editSubmit : onSubmit}
          >
            {edit ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </Modal>
      <PartogramaConfirmDelete
        isModalOpen={isModalDeleteOpen}
        handleCloseModal={() => setIsModalDeleteOpen(false)}
        handleSubmit={onDelete}
      />
    </div>
  );
};

export default TimelineNaoFarmacologico;
