import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { ReactComponent as IconeClose } from "../../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../../assets/IconeTimelinePlusSign.svg";
import { ReactComponent as IconeTrash } from '../../../../assets/Icone_Trash.svg';
import { formatDatetimeAxis, reverseFunction } from "../../../../utils/formatting";

import "../TimelineLiquidoAmniotico.css";
import { addPosture } from "../../../../store/modules/posture/actions";
import TimelinePostureChart from "./TimelinePostureChart";
import PartogramaConfirmDelete from "../../PartogramaConfirmDelete";

const TimelinePosture = () => {
  const dispatch = useDispatch();

  const { postureData } = useSelector(
    (state: Store.State) => state.posture.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [edit, setEdit] = useState<any>(null);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const [time, setTime] = useState("");
  const [lastInput, setLastInput] = useState("");
  const [postureDateTime, setPostureDateTime] = useState<number | null>(
    Date.now()
  );

  const handlePostureDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setPostureDateTime(newValue.valueOf());
    }
  };
  const [ isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [observation, setObservation] = useState("");

  const onSubmit = async () => {
    const textArea: any = document.getElementById("textarea-posture");
    const aux = await postureData.map((item: any) => {
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
    setObservation("");
    dispatch(addPosture(aux));
    handleCloseModal();
  };

  const onEdit = (e: any) => {
    setEdit(e);
    setPostureDateTime(e.time);
    setObservation(e.observation);
    handleOpenModal();
  };

  const editSubmit = async () => {
    const textArea: any = document.getElementById("textarea-posture");
    if (edit.timeLegend === time) {
      const aux = await postureData.map((item: any) => {
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
      dispatch(addPosture(aux));
    } else {
      const aux = await postureData.map((item: any) => {
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
      dispatch(addPosture(aux));
    }
    setEdit(null);
    setObservation("");
    handleCloseModal();
  };

  useEffect(() => {
    if (postureData) {
      let aux = postureData;

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
  }, [postureData]);

  const onDelete = () => {
    const newPostureData = postureData.map((item: any) => {
      if (item.timeLegend === edit.timeLegend) {
        return {
          ...item,
          point: undefined,
          observation: undefined,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    dispatch(addPosture(newPostureData));
    setIsModalDeleteOpen(false)
    handleCloseModal();
  };

  const DatePicker = () => (
    <div className="partograma-page__date-picker-line">
      <DateTimePicker
        value={postureDateTime}
        onChange={handlePostureDateTimeChange}
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
        <span className="timeline-liquido-amniotico__label">Postura</span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelinePostureChart onEdit={onEdit} />
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
          <strong className="timeline-liquido-amniotico__modal-title">Postura</strong>

          <DatePicker/>

          <span className="tab-dilatacao__notes-input-label">Observações</span>
          <textarea
            className="paciente-add-modal__notes-input-textarea"
            defaultValue={observation}
            id="textarea-posture"
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

export default TimelinePosture;
