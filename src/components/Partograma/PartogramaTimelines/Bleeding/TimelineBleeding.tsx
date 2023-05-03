import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { addBleeding } from "../../../../store/modules/bleeding/actions";
import TimelineBleedingChart from "./TimelineBleedingChart";
import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";
import { ReactComponent as IconeTrash } from '../../../../assets/Icone_Trash.svg';
import { formatDatetimeAxis, reverseFunction } from "../../../../utils/formatting";

import "../TimelineLiquidoAmniotico.css";
import "./TimelineBleeding.css";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";

const TimelineBleeding = () => {
  const dispatch = useDispatch();

  const { bleedingData } = useSelector(
    (state: Store.State) => state.bleeding.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const [bleeding, setBleeding] = useState(0);
  const [totalBleeding, setTotalBleeding] = useState(0);
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEdit(false)
  };
  const handleOpenModal = () => setIsModalOpen(true);

  const [time, setTime] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [bleedingDateTime, setBleedingDateTime] = useState<number | null>(
    Date.now()
  );

  const handleFluidIntakeDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setBleedingDateTime(newValue.valueOf());
    }
  };
  const [ isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [observation, setObservation] = useState("");

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-bleeding");
    const aux = await bleedingData.map((item: any) => {
      if (item.timeLegend === time) {
        return {
          ...item,
          point: 0.5,
          observation: textArea.value,
          bleeding,
        };
      } else {
        return item;
      }
    });
    setObservation("");
    dispatch(addBleeding(aux));
    handleCloseModal();
  };

  const onEdit = (e: any) => {
    setEdit(e);
    setBleedingDateTime(e.time);
    setObservation(e.observation);
    handleOpenModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById("textarea-bleeding");
    if (edit.timeLegend === time) {
      const aux = await bleedingData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
            bleeding,
          };
        } else {
          return item;
        }
      });
      dispatch(addBleeding(aux));
    } else {
      const aux = await bleedingData.map((item: any) => {
        if (item.timeLegend === edit.timeLegend) {
          return {
            ...item,
            point: null,
            observation: "",
            bleeding: 0
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
            bleeding,
          };
        } else {
          return item;
        }
      });
      dispatch(addBleeding(aux));
    }
    setEdit(null);
    setObservation("");
    handleCloseModal();
  };

  useEffect(() => {
    if (bleedingData) {
      let aux = bleedingData;

      let soma = 0;
      aux.forEach((item: any) => {
        if (item?.bleeding) {
          soma = soma + Number(item.bleeding);
        }
      });
      setTotalBleeding(soma);

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);
      const find: any = dataReverse.find((item: any) => item?.point);
      reverseFunction(dataReverse);
      if (find?.point) {
        setLastInput(find.observation);
      }
    }
  }, [bleedingData]);

  const onDelete = () => {
    const newBleedingData = bleedingData.map((item: any) => {
      if (item.timeLegend === edit.timeLegend) {
        return {
          ...item,
          point: undefined,
          observation: undefined,
          bleeding: undefined
        };
      } else {
        return {
          ...item,
        };
      }
    });
    dispatch(addBleeding(newBleedingData));
    setIsModalDeleteOpen(false)
    handleCloseModal();
  };

  const DatePicker = () => (
    <div className="partograma-page__date-picker-line">
      <DateTimePicker
        value={bleedingDateTime}
        onChange={handleFluidIntakeDateTimeChange}
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
    <div
      className="timeline-liquido-amniotico__container"
      style={{ marginTop: "-8px" }}
    >
      <div
        className="timeline-liquido-amniotico__label-container"
        onClick={() => {
          handleOpenModal();
        }}
      >
        <span className="timeline-liquido-amniotico__label">Sangramento</span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineBleedingChart onEdit={onEdit} />
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
          <strong  className="timeline-liquido-amniotico__modal-title">Sangramento</strong>
          <DatePicker/>
          <div className="timeline-bleeding__volume-box">
            <strong>Volume</strong>
            <div className="timeline-bleeding__values-box">
              <input
                className={`paciente-add-modal__input-textarea`}
                type="number"
                min={0}
                value={bleeding}
                onChange={(e: any) => setBleeding(e.target.value)}
              />
              ml
            </div>
          </div>

          <div className="timeline-bleeding__values-box">
            <strong>Total:</strong> {totalBleeding} ml
          </div>
          <strong>Observações</strong>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-bleeding"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={edit ? editSubmit : onSubmit}
          >
            {edit ? "Atualizar" : "Salvar"}
          </button>
          <ul>
            <li>{lastInput && lastInput}</li>
          </ul>
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

export default TimelineBleeding;
