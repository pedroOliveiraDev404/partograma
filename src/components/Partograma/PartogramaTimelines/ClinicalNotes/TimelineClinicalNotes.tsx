import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";
import { ReactComponent as IconeTrash } from '../../../../assets/Icone_Trash.svg';
import { formatDatetimeAxis, reverseFunction } from "../../../../utils/formatting";
import { addClinicalNotes } from "../../../../store/modules/clinicalNotes/actions";
import TimelineClinicalNotesChart from "./TimeLineClinicalNotesChart";

import "../TimelineLiquidoAmniotico.css";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";

const TimelineClinicalNotes = () => {
  const dispatch = useDispatch();

  const { clinicalNotesData } = useSelector(
    (state: Store.State) => state.clinicalNotes.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState<any>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const [lastInput, setLastInput] = useState<any>(null);
  const [time, setTime] = useState("");
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
  const [ isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [observation, setObservation] = useState("");

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-clinicalnotes");
    const aux = await clinicalNotesData.map((item: any) => {
      if (item.timeLegend === time) {
        return {
          ...item,
          point: 0.5,
          observation: textArea.value,
        };
      } else {
        return item;
      }
    });

    dispatch(addClinicalNotes(aux));
    handleCloseModal();
  };

  const onEdit = (e: any) => {
    setEdit(e);
    setLiquidoAmnioticoDateTime(e.time);
    setObservation(e.observation);
    handleOpenModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById("textarea-clinicalnotes");
    if (edit.timeLegend === time) {
      const aux = await clinicalNotesData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
          };
        } else {
          return item;
        }
      });
      dispatch(addClinicalNotes(aux));
    } else {
      const aux = await clinicalNotesData.map((item: any) => {
        if (item.timeLegend === edit.timeLegend) {
          return {
            ...item,
            point: null,
            observation: "",
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            observation: textArea.value,
          };
        } else {
          return item;
        }
      });
      dispatch(addClinicalNotes(aux));
    }
    setEdit(null);
    handleCloseModal();
  };

  useEffect(() => {
    if (clinicalNotesData) {
      let aux = clinicalNotesData;

      const dataReverse = aux.reduceRight(function (
        previous: any,
        current: any
      ) {
        previous.push(current);
        return previous;
      },
      []);

      const find: any = dataReverse.find((item: any) => item?.point);
      if (find?.point) {
        setLastInput(find);
      }
    }
  }, [clinicalNotesData]);

  const onDelete = () => {
    const newClinicalNotesData = clinicalNotesData.map((item: any) => {
      if (item.timeLegend === edit.timeLegend) {
        return {
          ...item,
          point: undefined,
          observation: undefined,
        };
      }  else {
        return {
          ...item,
        };
      }
    });
    dispatch(addClinicalNotes(newClinicalNotesData));
    setIsModalDeleteOpen(false)
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
        <span className="timeline-liquido-amniotico__label">
          Notas clínicas
        </span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineClinicalNotesChart onEdit={onEdit} />
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
            Notas clínicas
          </span>
          <DatePicker/>
          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-clinicalnotes"
          />
          <button
            className="paciente-add-modal__button-submit"
            onClick={edit ? editSubmit : onSubmit}
          >
            {edit ? "Atualizar" : "Salvar"}
          </button>
          <ul>
            {lastInput && (
              <li>
                {lastInput?.observation} {lastInput?.timeLegend}
              </li>
            )}
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

export default TimelineClinicalNotes;
