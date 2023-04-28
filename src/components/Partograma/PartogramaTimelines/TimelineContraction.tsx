import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { addContraction } from "../../../store/modules/contraction/actions";
import { ReactComponent as IconeClose } from "../../../assets/IconeClose.svg";
import { ReactComponent as IconeTimelinePlusSign } from "../../../assets/IconeTimelinePlusSign.svg";
import { ReactComponent as IconeTrash } from '../../../assets/Icone_Trash.svg';
import { formatDatetimeAxis, reverseFunction } from "../../../utils/formatting";

import "./TimelineLiquidoAmniotico.css";
import TimelineContractionChart from "./TimelineContractionChart";
import PartogramaConfirmDelete from "../PartogramaConfirmDelete";
import { mockContractions } from "../../../pages/Pacientes/mock";

const TimelineContraction = () => {
  const dispatch = useDispatch();

  const { contractionData } = useSelector(
    (state: Store.State) => state.contraction.data
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [edit, setEdit] = useState<any>(null);
  const [toggleButton, setToggleButton] = useState(false);
  const handleCloseModal = () => {
    setEdit(null);
    setIsModalOpen(false);
  };
  const handleOpenModal = () => setIsModalOpen(true);
  const [contractions, setContractions] = useState(0);
  const [time, setTime] = useState("");
  const [error, setForm] = useState(false);
  const [contractionDateTime, setContractionDateTime] = useState<number | null>(
    Date.now()
  );
  const [ isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const handleContractionDateTimeChange = (newValue: any | null) => {
    if (newValue !== null) {
      const timeString = formatDatetimeAxis(newValue);
      setTime(timeString);
      setContractionDateTime(newValue.valueOf());
    }
  };

  const onSubmit = async () => {
    if (contractions) {
      setForm(false);

      let find: any = await contractionData.find(
        (item: any) => item.timeLegend === time
      );

      let positionCenter = 0;
      mockContractions.forEach((item) => {
        const isPosition = item.arrayPositions.includes(
          find?.position as number
        );
        if (isPosition) {
          positionCenter = item.positionCenter;
        }
      });
      const contractionTime = (await toggleButton) ? "30s<" : ">30s";
      const iconContraction = await (
        <svg>
          <text
            fontSize="14"
            x={0}
            y={10}
            fontWeight="600"
            width="200"
            height="200"
          >
            {contractions}
          </text>
        </svg>
      );
      const iconContrationTime = await (
        <svg>
          <text fontSize="8.5" x={0} y={24} width="200" height="200">
            {contractionTime}
          </text>
        </svg>
      );
      const aux = await contractionData.map((item: any) => {
        if (item.position === positionCenter) {
          return {
            ...item,
            point: 0.5,
            contractions,
            contractionTime,
            iconContraction,
            iconContrationTime,
          };
        } else {
          return item;
        }
      });
      dispatch(addContraction(aux));
      handleCloseModal();
    } else {
      setForm(true);
    }
  };

  const onEdit = (e: any) => {
    setEdit(e);
    setContractionDateTime(e.time);
    setContractions(e.contractions);
    setToggleButton(e.contractionTime !== ">30s");
    handleOpenModal();
  };

  const editSubmit = async () => {
    const contractionTime = (await toggleButton) ? "30s<" : ">30s";
    const iconContraction = await (
      <svg>
        <text
          fontSize="14"
          x={0}
          y={10}
          fontWeight="600"
          width="200"
          height="200"
        >
          {contractions}
        </text>
      </svg>
    );
    const iconContrationTime = await (
      <svg>
        <text fontSize="8.5" x={0} y={24} width="200" height="200">
          {contractionTime}
        </text>
      </svg>
    );
    if (edit.timeLegend === time) {
      const aux = await contractionData.map((item: any) => {
        if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            contractions,
            contractionTime,
            iconContraction,
            iconContrationTime,
          };
        } else {
          return item;
        }
      });
      dispatch(addContraction(aux));
    } else {
      const aux = await contractionData.map((item: any) => {
        if (item.timeLegend === edit.timeLegend) {
          return {
            ...item,
            point: null,
            contractions: null,
            contractionTime: null,
            iconContraction: null,
            iconContrationTime: null,
          };
        } else if (item.timeLegend === time) {
          return {
            ...item,
            point: 0.5,
            contractions,
            contractionTime,
            iconContraction,
            iconContrationTime,
          };
        } else {
          return item;
        }
      });
      dispatch(addContraction(aux));
    }
    setEdit(null);
    handleCloseModal();
  };

  const onDelete = () => {
    const newContractionData = contractionData.map((item: any) => {
      if (item.timeLegend === edit.timeLegend) {
        return {
          ...item,
          point: undefined,
          contractions: undefined,
          contractionTime: undefined,
          iconContraction: undefined,
          iconContrationTime: undefined,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    dispatch(addContraction(newContractionData));
    setIsModalDeleteOpen(false)
    handleCloseModal();
  };

  const DatePicker = () => (
    <div className="partograma-page__date-picker-line">
      <DateTimePicker
        value={contractionDateTime}
        onChange={handleContractionDateTimeChange}
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
          Contrações/15m
        </span>
        <IconeTimelinePlusSign/>
      </div>
      <TimelineContractionChart onEdit={onEdit} />
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
          <strong style={{ marginBottom: "24px" }}>Contrações/15min</strong>
          
          <DatePicker/>
          
          <div style={{ width: "55%", marginTop: "16px" }}>
            Número de Contrações
            <input
              className={`paciente-add-modal__input-textarea${
                error ? "-error" : ""
              }`}
              type="number"
              style={{ textAlign: "center" }}
              min={0}
              value={contractions}
              onChange={(e: any) => setContractions(e.target.value)}
            />
            <div className="timeline-contraction__display-row">
              <div
                className="timeline-contraction__display-row"
                onClick={() => setToggleButton(true)}
              >
                Menor que 30 segs
                <div
                  className={`timeline-contraction__box-button${
                    !toggleButton ? "-inactive" : ""
                  }`}
                >
                  {"<"}
                </div>
              </div>
              <div
                className="timeline-contraction__display-row"
                onClick={() => setToggleButton(false)}
              >
                <div
                  className={`timeline-contraction__box-button${
                    toggleButton ? "-inactive" : ""
                  }`}
                >
                  {">"}
                </div>
                Maior que 30 segs
              </div>
            </div>
          </div>

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

export default TimelineContraction;
